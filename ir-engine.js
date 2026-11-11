/* Irish Studies - lesson engine: modules, unit kinds (vocab / entries / counties / ogham), lesson runners and games.
 * Content files just call IR.addUnit({...}); everything below turns a unit into lessons. */
(function () {
  'use strict';
  const IR = window.IR, h = IR.h, shuffle = IR.shuffle, pick = IR.pick;

  /* ================= modules (order = order on the home screen) ================= */
  IR.addModule({ id: 'gaeilge', title: 'Gaeilge', ga: 'An Ghaeilge', emoji: '🗣️', color: '#1F5A41', desc: 'Words, phrases and proverbs', blurb: 'Learn the Irish language with sounds, pictures, matching games and quizzes. Words you know well are counted and shown in Harbor.' });
  IR.addModule({ id: 'myth', title: 'Myth & Folklore', ga: 'Miotaseolaíocht agus Béaloideas', emoji: '🐉', color: '#6B3FA0', desc: 'Gods, heroes, fairies and festivals', route: '/stories' });
  IR.addModule({ id: 'history', title: 'Irish History', ga: 'Stair na hÉireann', emoji: '🏰', color: '#8A3A3A', desc: 'From the first Celts to today', route: '/stories' });
  IR.addModule({ id: 'culture', title: 'Culture', ga: 'Cultúr', emoji: '🎻', color: '#B7791F', desc: 'Music, books, sport, saints and Ogham', route: '/stories' });
  IR.addModule({ id: 'geography', title: 'Places', ga: 'Áiteanna', emoji: '🗺️', color: '#2B6CB0', desc: 'The 32 counties and wild Ireland', blurb: 'Four provinces, thirty-two counties, Irish names, county towns, landmarks and the nature of the island.' });

  const LESSON = {
    learn: { emoji: '📖', name: 'Meet the words', desc: 'Look, listen and learn' },
    read: { emoji: '📖', name: 'Read & explore', desc: 'Open each story or fact' },
    cards: { emoji: '🃏', name: 'Flashcards', desc: 'Remember them for good' },
    match: { emoji: '🧩', name: 'Match up', desc: 'Pair the words' },
    listen: { emoji: '👂', name: 'Listen & choose', desc: 'Hear it, pick it' },
    spell: { emoji: '✍️', name: 'Spell it', desc: 'Build the word with fadas' },
    clues: { emoji: '🕵️', name: 'Who or what am I?', desc: 'Guess from the clue' },
    timeline: { emoji: '⏳', name: 'Put in order', desc: 'Which came first?' },
    speed: { emoji: '⚡', name: 'Speed round', desc: '30 seconds, how many?' },
    decode: { emoji: '🔍', name: 'Ogham decoder', desc: 'Read the stone' },
    write: { emoji: '🪨', name: 'Carve your name', desc: 'Write in Ogham' },
    quiz: { emoji: '🏅', name: 'Quiz', desc: '70% earns the badge' }
  };
  const L = id => Object.assign({ id }, LESSON[id]);

  /* ================= question builders ================= */
  const textOf = (it, f) => String(it[f]);
  function distract(pool, it, f, n, extra) {
    const seen = new Set([textOf(it, f)]); const out = [];
    for (const x of shuffle(pool.concat(extra || []))) { if (out.length >= n) break; if (x === it || x[f] == null) continue; const t = textOf(x, f); if (seen.has(t)) continue; seen.add(t); out.push(x); }
    return out;
  }
  function mc(prompt, right, wrongs, extra) { const opts = shuffle([right].concat(wrongs)); return Object.assign({ prompt, options: opts, answer: opts.indexOf(right) }, extra || {}); }
  function allVocab(mod) { const a = []; IR.units.forEach(u => { if (u.kind === 'vocab' && u.mod === mod) u.items.forEach(i => a.push(i)); }); return a; }

  function vocabQs(u, n, band, only) {
    const items = u.items, extraPool = allVocab(u.mod);
    const emo = items.filter(i => i.e);
    const types = band === 0 ? ['hear-emoji'] : band === 1 ? ['emoji-ga', 'hear-emoji', 'ga-emoji'] : ['ga-en', 'en-ga', 'hear-en', 'emoji-ga'];
    let use = only ? [only] : types;
    const out = [];
    const order = shuffle(items);
    let i = 0, guard = 0;
    while (out.length < n && guard++ < n * 6) {
      const it = order[i++ % order.length];
      let t = use[IR.rand(use.length)];
      const needE = /emoji/.test(t);
      if (needE && (!it.e || emo.length < 4)) t = (band === 0 ? 'hear-en' : 'ga-en');
      if (t === 'hear-en' && !it.say && !IR.irishVoice()) t = 'ga-en';
      let q;
      if (t === 'ga-en') q = mc('What does “' + it.ga + '” mean?', it.en, distract(items, it, 'en', 3, extraPool).map(x => x.en), { audio: it, tag: it.ga });
      else if (t === 'en-ga') q = mc('How do you say “' + it.en + '” in Irish?', it.ga, distract(items, it, 'ga', 3, extraPool).map(x => x.ga), { tag: it.en });
      else if (t === 'hear-en') q = mc('Listen. What does it mean?', it.en, distract(items, it, 'en', 3, extraPool).map(x => x.en), { audio: it, autoplay: true });
      else if (t === 'hear-emoji') q = mc('Listen. Which picture is it?', it.e, distract(emo, it, 'e', 3).map(x => x.e), { audio: it, autoplay: true, optsEmoji: true });
      else if (t === 'emoji-ga') q = mc('Which Irish word is this?', it.ga, distract(items, it, 'ga', 3, extraPool).map(x => x.ga), { emo: it.e, audio: it });
      else if (t === 'ga-emoji') q = mc('Which picture is “' + it.ga + '”?', it.e, distract(emo, it, 'e', 3).map(x => x.e), { optsEmoji: true, audio: it });
      if (q && q.options.length >= 3) { q.explain = it.ga + ' = ' + it.en + (it.say ? '  (' + it.say + ')' : ''); q.item = it; out.push(q); }
    }
    return out;
  }

  const redact = (summary, title) => {
    let s = summary;
    const words = title.replace(/\(.*?\)/g, m => ' ' + m.slice(1, -1) + ' ').split(/[\s,.&’'–-]+/).filter(w => w.length >= 4 && !/^(the|and|with|of)$/i.test(w));
    words.forEach(w => { s = s.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '▁▁▁'); });
    return s;
  };
  const cleanTitle = t => t.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  function clueQ(u, e) {
    const others = shuffle(u.entries.filter(x => x !== e)).slice(0, 3).map(x => x.title);
    const q = mc('Who or what am I?', e.title, others, { story: redact(e.summary, e.title) });
    q.explain = e.title + ' — ' + e.summary; return q;
  }
  function entryQs(u, n, kidMode) {
    const pool = [];
    u.entries.forEach(e => (e.quiz || []).forEach(q => {
      const right = q.options[q.answer]; pool.push(Object.assign(mc(q.q, right, q.options.filter((_, i) => i !== q.answer)), { explain: 'From “' + e.title + '”.', src: e }));
    }));
    const clues = u.entries.length >= 4 ? shuffle(u.entries).map(e => clueQ(u, e)) : [];
    const a = shuffle(pool), b = clues;
    const out = [];
    const kb = Math.min(b.length, Math.round(n * 0.4));
    return shuffle(a.slice(0, n - kb).concat(b.slice(0, kb))).slice(0, n);
  }

  /* ================= unit kinds ================= */
  IR.kinds.vocab = {
    prep(u) { u.items.forEach(it => { it.id = u.id + '.' + IR.norm(it.ga); }); },
    lessons(u) {
      const ids = ['learn', 'cards', 'match', 'listen'];
      if (spellable(u).length >= 4) ids.push('spell');
      ids.push('speed', 'quiz'); return ids.map(L);
    },
    questions: (u, n) => vocabQs(u, n, IR.bandIdx())
  };
  IR.kinds.entries = {
    prep(u) { u.entries.forEach(e => { e.unit = u.id; }); },
    lessons(u) { return (u.lessonSet || ['read', 'cards', 'clues'].concat(u.timeline ? ['timeline'] : [], ['speed', 'quiz'])).map(L); },
    questions: (u, n) => entryQs(u, n)
  };
  IR.kinds.counties = {
    prep(u) { u.items.forEach(c => { c.id = 'c.' + IR.norm(c.en); c.prov = u.prov; }); },
    lessons(u) { return ['learn', 'cards', 'speed', 'quiz'].map(L); },
    questions: (u, n) => countyQs(u, n)
  };
  IR.kinds.ogham = {
    prep() { },
    lessons() { return ['learn', 'decode', 'write', 'quiz'].map(L); },
    questions: (u, n) => oghamQs(n)
  };

  /* ---------- counties ---------- */
  IR.allCounties = () => { const a = []; IR.units.forEach(u => { if (u.kind === 'counties') u.items.forEach(c => a.push(c)); }); return a; };
  const PROVS = ['Leinster', 'Munster', 'Connacht', 'Ulster'];
  function countyQs(u, n) {
    const all = IR.allCounties(); const out = [];
    const items = shuffle(u.items); let i = 0, g = 0;
    const types = ['prov', 'town', 'irish', 'land'];
    while (out.length < n && g++ < n * 5) {
      const c = items[i++ % items.length]; const t = types[IR.rand(types.length)];
      let q;
      if (t === 'prov') q = mc('Which province is County ' + c.en + ' in?', c.prov, PROVS.filter(p => p !== c.prov), { explain: c.en + ' is in ' + c.prov + '.' });
      else if (t === 'town') q = mc('What is the county town of ' + c.en + '?', c.town, distract(all, c, 'town', 3).map(x => x.town), { explain: 'The county town of ' + c.en + ' is ' + c.town + '.' });
      else if (t === 'irish') q = mc('What is County ' + c.en + ' called in Irish?', c.ga, distract(all, c, 'ga', 3).map(x => x.ga), { explain: c.en + ' = ' + c.ga + '.', audio: { ga: c.ga, say: c.say } });
      else q = mc('Which county is home to ' + c.land + '?', c.en, distract(all, c, 'en', 3).map(x => x.en), { explain: c.land + ' is in County ' + c.en + '.' });
      out.push(q);
    }
    return out;
  }

  /* ---------- ogham ---------- */
  const OG = [
    ['B', 'beith', 'birch', 'b', 1], ['L', 'luis', 'rowan', 'b', 2], ['F', 'fearn', 'alder', 'b', 3], ['S', 'sail', 'willow', 'b', 4], ['N', 'nion', 'ash', 'b', 5],
    ['H', 'úath', 'hawthorn', 'a', 1], ['D', 'dair', 'oak', 'a', 2], ['T', 'tinne', 'holly', 'a', 3], ['C', 'coll', 'hazel', 'a', 4], ['Q', 'ceirt', 'apple', 'a', 5],
    ['M', 'muin', 'vine', 'x', 1], ['G', 'gort', 'ivy', 'x', 2], ['NG', 'gétal', 'reed', 'x', 3], ['Z', 'straif', 'blackthorn', 'x', 4], ['R', 'ruis', 'elder', 'x', 5],
    ['A', 'ailm', 'pine', 'v', 1], ['O', 'onn', 'gorse', 'v', 2], ['U', 'úr', 'heather', 'v', 3], ['E', 'edad', 'aspen', 'v', 4], ['I', 'idad', 'yew', 'v', 5]
  ];
  IR.OGHAM = OG;
  const OGMAP = {}; OG.forEach(o => OGMAP[o[0]] = o);
  const SIMPLE = { J: 'I', K: 'C', P: 'B', V: 'F', W: 'U', Y: 'I', X: 'CS' };
  function toOgham(text) {
    const t = String(text || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
    const out = []; for (const ch of t) { const m = SIMPLE[ch] || ch; for (const c of m) if (OGMAP[c]) out.push(c); }
    return out;
  }
  IR.toOgham = toOgham;
  /* draws letters on one stem. letters: array of keys from OG (NG as 'NG'). */
  function oghamSvg(letters, opts) {
    opts = opts || {}; const gap = 11, len = 15, pad = 12, y0 = 28;
    let x = pad; const strokes = [];
    letters.forEach(k => {
      const o = OGMAP[k]; if (!o) { x += gap * 1.5; return; }
      const n = o[4], grp = o[3];
      for (let i = 0; i < n; i++) {
        const cx = x + gap * (i + 1);
        if (grp === 'b') strokes.push(['M', cx, y0, cx, y0 + len]);
        else if (grp === 'a') strokes.push(['M', cx, y0 - len, cx, y0]);
        else if (grp === 'x') strokes.push(['M', cx - 5, y0 + len - 1, cx + 5, y0 - len + 1]);
        else strokes.push(['M', cx, y0 - 6, cx, y0 + 6, 'v']);
      }
      x += gap * (n + 1);
    });
    const w = Math.max(40, x + pad), svg = IR.s('svg', { class: 'ogham', viewBox: '0 0 ' + w + ' 56', width: Math.min(w * (opts.scale || 3), opts.max || 560), height: 56 * (opts.scale || 3) * Math.min(1, (opts.max || 560) / (w * (opts.scale || 3))), role: 'img', 'aria-label': 'Ogham: ' + letters.join('') });
    svg.append(IR.s('rect', { x: 0, y: 4, width: w, height: 48, rx: 10, fill: opts.fill || '#d9d3c4' }));
    svg.append(IR.s('line', { x1: 4, y1: y0, x2: w - 4, y2: y0, stroke: '#3a332a', 'stroke-width': 3, 'stroke-linecap': 'round' }));
    strokes.forEach(s => svg.append(IR.s('line', { x1: s[1], y1: s[2], x2: s[3], y2: s[4], stroke: '#3a332a', 'stroke-width': s[5] === 'v' ? 4 : 3, 'stroke-linecap': 'round' })));
    return svg;
  }
  IR.oghamSvg = oghamSvg;
  function oghamQs(n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const o = pick(OG); const t = IR.rand(3);
      if (t === 0) out.push(Object.assign(mc('Which letter is this Ogham character?', o[0], shuffle(OG.filter(x => x !== o)).slice(0, 3).map(x => x[0])), { glyph: [o[0]], explain: 'That is ' + o[0] + ' — ' + o[1] + ', the ' + o[2] + '.' }));
      else if (t === 1) out.push(Object.assign(mc('The Ogham letter ' + o[0] + ' is named after which tree?', o[2], shuffle(OG.filter(x => x[2] !== o[2])).slice(0, 3).map(x => x[2])), { explain: o[0] + ' = ' + o[1] + ' (' + o[2] + ').' }));
      else { const w = pick(OGWORDS); const letters = toOgham(w); out.push(Object.assign(mc('Read the stone. What does it say?', w, shuffle(OGWORDS.filter(x => x !== w)).slice(0, 3)), { glyph: letters, explain: 'It says ' + w + '.' })); }
    }
    return out;
  }
  const OGWORDS = ['CAT', 'DOG', 'SUN', 'BOAT', 'FISH', 'BIRD', 'HAND', 'LION', 'MOON', 'TREE', 'EIRE', 'FINN', 'DAIR', 'MAM', 'DAD', 'SEAN'];

  /* ================= helper: spellable words ================= */
  function spellable(u) { return u.items.filter(i => /^[a-záéíóúA-ZÁÉÍÓÚ]+$/.test(i.ga) && i.ga.length >= 3 && i.ga.length <= 9); }

  /* ================= lesson screen ================= */
  IR.screens.lesson = function (unitId, lessonId) {
    const u = IR.unit(unitId); if (!u) return IR.h('div', null, 'Not found');
    const l = u.lessons.find(x => x.id === lessonId); if (!l) return IR.h('div', null, IR.topbar(u.title, '/u/' + u.id), 'That lesson is not here.');
    const m = IR.mod(u.mod) || {};
    const stage = h('div', null);
    const wrap = h('div', null, IR.topbar(l.name, '/u/' + u.id, IR.starPill()), stage);
    wrap.style.setProperty('--c', m.color || 'var(--green)');
    const ctx = {
      u, l, band: IR.bandIdx(), stage,
      finish(stars, o) {
        o = o || {};
        IR.recordLab(u.id + ':' + l.id, stars);
        let badgeNow = false;
        if (o.pct != null && l.id === 'quiz') { const had = !!(IR.PR().badges[u.id]); IR.recordQuiz(u.id, o.pct); badgeNow = !had && !!IR.PR().badges[u.id]; }
        else IR.checkBadge(u.id);
        if (o.game) IR.recordGame(o.game, stars, o.correct);
        result(ctx, stars, o, badgeNow);
      },
      again() { stage.innerHTML = ''; RUN[l.id](ctx); }
    };
    (RUN[l.id] || (() => stage.append(h('p', null, 'Coming soon'))))(ctx);
    return wrap;
  };

  function result(ctx, stars, o, badgeNow) {
    const { u, l, stage } = ctx; stage.innerHTML = '';
    const nextIdx = u.lessons.findIndex(x => x.id === l.id) + 1; const next = u.lessons[nextIdx];
    if (stars >= 2 || badgeNow) { IR.confetti(); IR.sfx.win(); } else IR.sfx.ok();
    const msgs = ['Cuir chuige arís! Keep going.', 'Go maith! Good work.', 'Maith thú! Well done!', 'Iontach! Brilliant!'];
    stage.append(h('div', { class: 'card pop', style: { textAlign: 'center' } },
      h('div', { class: 'big-badge' }, badgeNow ? '🏅' : stars >= 3 ? '🏆' : stars >= 1 ? '🌟' : '🌱'),
      h('h2', null, badgeNow ? 'Badge earned: ' + u.title + '!' : msgs[Math.min(3, stars)]),
      h('div', { style: { fontSize: '2rem', margin: '8px 0' } }, IR.starsEl(stars)),
      o.pct != null ? h('p', null, h('b', null, o.correct + ' / ' + o.total), ' · ' + o.pct + '%') : (o.line ? h('p', null, o.line) : null),
      o.pct != null && l.id === 'quiz' && o.pct < 70 ? h('p', { class: 'muted small mt8' }, 'Get 70% to earn the badge. You can do it!') : null,
      h('div', { class: 'row wrap mt16', style: { justifyContent: 'center' } },
        h('button', { class: 'btn ghost', onclick: () => ctx.again() }, '🔁 Again'),
        next ? h('button', { class: 'btn', onclick: () => IR.go('/u/' + u.id + '/' + next.id) }, next.emoji + ' ' + next.name) : null,
        h('button', { class: 'btn ghost', onclick: () => IR.go('/u/' + u.id) }, 'Back to ' + u.title))));
  }

  /* ================= generic multiple-choice runner ================= */
  function runQuestions(ctx, qs, o) {
    o = o || {}; const { stage } = ctx; let i = 0, right = 0, locked = false;
    function show() {
      stage.innerHTML = ''; locked = false;
      const q = qs[i]; IR._q = q;
      const pg = h('div', { class: 'pgs' }); qs.forEach((_, k) => pg.append(h('i', { class: k < i ? 'on' : k === i ? 'cur' : '' })));
      const card = h('div', { class: 'card pop' });
      if (q.emo) card.append(h('div', { class: 'promptemo' }, q.emo));
      if (q.glyph) card.append(IR.oghamSvg(q.glyph));
      if (q.story) card.append(h('div', { class: 'story card paper', style: { margin: '8px 0' } }, '“' + q.story + '”'));
      card.append(h('div', { class: 'row' }, h('div', { class: 'prompt', style: { flex: 1 } }, q.prompt), q.audio ? IR.gaBtn(q.audio) : (o.readAloud ? IR.enBtn(q.prompt) : null)));
      const fb = h('div', { class: 'feedback' });
      const optsEl = h('div', { class: q.optsEmoji ? 'mgrid' : '' });
      q.options.forEach((opt, k) => {
        const b = h('button', { class: q.optsEmoji ? 'tile' : 'opt', style: q.optsEmoji ? { fontSize: '2.6rem', minHeight: '84px' } : {}, onclick: () => {
          if (locked) return; locked = true;
          const ok = k === q.answer;
          if (ok) { right++; IR.sfx.ok(); } else IR.sfx.bad();
          [...optsEl.children].forEach((c, j) => { if (j === q.answer) c.classList.add('ok'); else if (j === k) c.classList.add('no'); c.disabled = true; });
          if (o.fast) { setTimeout(() => { i++; if (i >= qs.length) done(); else show(); }, ok ? 180 : 420); if (o.onAnswer) o.onAnswer(ok); return; }
          fb.className = 'feedback ' + (ok ? 'good' : 'bad'); fb.textContent = (ok ? 'Yes! ' : 'Not quite. ') + (q.explain || '');
          next.classList.remove('hide');
        } }, opt);
        optsEl.append(b);
      });
      const next = h('button', { class: 'btn wide mt12 hide', onclick: () => { i++; if (i >= qs.length) done(); else show(); } }, i + 1 >= qs.length ? 'See my score' : 'Next →');
      card.append(optsEl, fb, next);
      stage.append(pg, card);
      if (q.autoplay && q.audio) setTimeout(() => IR.sayGa(q.audio), 250);
    }
    function done() {
      const pct = Math.round(100 * right / qs.length);
      ctx.finish(pct >= 90 ? 3 : pct >= 70 ? 2 : 1, { pct, correct: right, total: qs.length });
    }
    show();
  }

  /* ================= lesson runners ================= */
  const RUN = {};

  RUN.quiz = ctx => {
    const k = IR.kinds[ctx.u.kind]; const qs = k.questions(ctx.u, 10);
    if (!qs.length) return ctx.stage.append(h('p', null, 'No questions yet.'));
    runQuestions(ctx, qs, { readAloud: ctx.band <= 1 });
  };
  RUN.listen = ctx => {
    const qs = vocabQs(ctx.u, 8, ctx.band, ctx.band === 0 ? 'hear-emoji' : (ctx.band === 1 ? 'hear-emoji' : 'hear-en'));
    if (!qs.length) return ctx.stage.append(h('p', null, 'No questions yet.'));
    ctx.stage.append(h('div', { class: 'hint' }, IR.irishVoice() ? '👂 Listen, then choose. Tap 🔊 to hear it again.' : '👂 Your device has no Irish voice, so you will hear the pronunciation guide read out. Tap 🔊 to hear it again.'));
    const box = h('div'); ctx.stage.append(box);
    const sub = Object.assign({}, ctx, { stage: box, finish: (s, o) => ctx.finish(s, Object.assign({}, o, { game: 'listen:' + ctx.u.id })) });
    runQuestions(sub, qs, {});
  };

  /* ---- vocab: meet the words ---- */
  RUN.learn = ctx => {
    const { u, stage, band } = ctx;
    if (u.kind === 'counties') return learnCounties(ctx);
    if (u.kind === 'ogham') return learnOgham(ctx);
    stage.append(h('div', { class: 'hint' }, band === 0 ? 'Tap the speaker to hear each word. Say it back!' : 'Tap the speaker to hear it. Letters in CAPITALS in the pronunciation guide are the stressed part.'));
    u.items.forEach(it => {
      stage.append(h('div', { class: 'card flat', style: { padding: '12px 14px' } }, h('div', { class: 'row' },
        it.e ? h('span', { style: { fontSize: band === 0 ? '3rem' : '2.2rem' } }, it.e) : null,
        h('div', { style: { flex: 1, minWidth: 0 } }, h('div', { class: 'ga', style: { fontSize: band === 0 ? '1.7rem' : '1.35rem' } }, it.ga), band === 0 ? null : h('div', null, it.en), it.say ? h('div', { class: 'muted small' }, '🗣️ ' + it.say) : null, it.note ? h('div', { class: 'muted small' }, it.note) : null),
        IR.gaBtn(it))));
    });
    stage.append(h('button', { class: 'btn wide mt16', onclick: () => ctx.finish(3, { line: 'You have met every word. Now try the flashcards!' }) }, 'I have looked at them all ✓'));
  };

  function learnCounties(ctx) {
    const { u, stage } = ctx;
    stage.append(h('div', { class: 'card paper' }, h('div', { class: 'ga', style: { fontSize: '1.2rem' } }, 'Cúige ' + (u.provGa || u.prov)), h('p', { class: 'muted' }, u.fact || '')));
    u.items.forEach(c => stage.append(h('div', { class: 'card flat', style: { padding: '12px 14px' } }, h('div', { class: 'row' },
      h('div', { style: { flex: 1 } }, h('div', { class: 'row wrap', style: { gap: '8px' } }, h('b', { style: { fontSize: '1.15rem' } }, c.en), h('span', { class: 'ga' }, c.ga)), h('div', { class: 'muted small' }, '📍 County town: ' + c.town + ' · 🏞️ ' + c.land), c.fact ? h('div', { class: 'small mt8' }, c.fact) : null),
      IR.gaBtn({ ga: c.ga, say: c.say })))));
    stage.append(h('button', { class: 'btn wide mt16', onclick: () => ctx.finish(3, { line: 'You have visited every county in ' + u.prov + '!' }) }, 'I have looked at them all ✓'));
  }
  function learnOgham(ctx) {
    const { stage } = ctx;
    stage.append(h('div', { class: 'card paper' }, h('div', { class: 'ga', style: { fontSize: '1.2rem' } }, 'Ogham (OH-um)'), h('p', { class: 'mt8' }, 'Ogham is the oldest writing from Ireland. Letters are short strokes cut along the edge of a standing stone, mostly in the 4th to 6th centuries AD. You read from the bottom of the stone upwards, so on screen we read left to right along the line. In the old manuscripts the letters are named after trees.'),
      h('p', { class: 'muted small mt8' }, 'Four groups of five: strokes below the line, strokes above, strokes crossing it, and short notches (the vowels). Scholars still debate which tree a few of the names mean.')));
    const grid = h('div', { class: 'mgrid' });
    OG.forEach(o => grid.append(h('div', { class: 'card flat', style: { padding: '8px', margin: 0, textAlign: 'center' } }, IR.oghamSvg([o[0]], { scale: 2, max: 150 }), h('b', null, o[0]), h('div', { class: 'ga' }, o[1]), h('div', { class: 'muted small' }, o[2]))));
    stage.append(grid, h('button', { class: 'btn wide mt16', onclick: () => ctx.finish(3, { line: 'You know the Ogham alphabet! Try decoding some stones.' }) }, 'I have looked at them all ✓'));
  }

  /* ---- entries: read & explore ---- */
  RUN.read = ctx => {
    const { u, stage, band } = ctx; const groups = new Map();
    u.entries.forEach(e => { const g = e.group || ''; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(e); });
    const pr = IR.PR(); const total = u.entries.length;
    const stars = () => { const n = u.entries.filter(e => pr.listened[e.id]).length; return n >= total ? 3 : n >= Math.ceil(total * 2 / 3) ? 2 : n >= Math.ceil(total / 3) ? 1 : 0; };
    const prog = h('p', { class: 'muted small' }); const upd = () => { const n = u.entries.filter(e => pr.listened[e.id]).length; prog.textContent = 'Read ' + n + ' of ' + total; if (stars() > 0) IR.recordLab(u.id + ':read', stars()); };
    stage.append(prog);
    if (u.intro2) stage.append(h('div', { class: 'hint' }, u.intro2));
    groups.forEach((list, g) => {
      if (g) stage.append(h('h3', { class: 'sec' }, g));
      list.forEach(e => {
        const body = h('div', { class: 'bd hide' });
        const row = h('div', { class: 'entry' });
        const mark = h('span', { class: 'read' }, pr.listened[e.id] ? '✓' : '');
        const kid = (IR.kid || {})[e.id];
        row.append(h('button', { onclick: () => {
          const open = body.classList.toggle('hide') === false;
          if (open) { fill(); IR.markRead(e.id); mark.textContent = '✓'; upd(); }
        } }, h('span', { class: 'em' }, (kid && kid.e) || e.e || u.emoji), h('span', { style: { flex: 1 } }, h('b', null, e.title), h('small', { class: 'muted' }, e.period || '')), mark), body);
        function fill() {
          if (body.childElementCount) return;
          const young = band <= 1 && kid && kid.t;
          const text = young ? kid.t : (band <= 1 ? e.summary : e.detail);
          body.append(h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('span', { class: 'chip' }, e.group || u.title), IR.enBtn(e.title + '. ' + text)),
            h('p', { class: 'story mt8' }, text));
          if (!young && band >= 2 && e.summary) body.append(h('p', { class: 'muted small mt8' }, 'In short: ' + e.summary));
          if (kid && kid.t && band >= 2) body.append(h('details', { class: 'mt8' }, h('summary', { class: 'small muted' }, 'Tell it simply'), h('p', { class: 'story' }, kid.t)));
          if (e.extra) body.append(h('div', { class: 'hint mt8' }, e.extra));
        }
        stage.append(row);
      });
    });
    upd();
  };

  /* ---- flashcards (Leitner) ---- */
  function cardsOf(u, band) {
    if (u.kind === 'vocab') return u.items.map(it => ({ id: it.id, item: it, front: band === 0 && it.e ? { emo: it.e } : { big: it.ga, emo: band === 1 ? it.e : null, small: it.say ? '🗣️ ' + it.say : '' }, back: { big: it.en, small: band === 0 ? it.ga : (it.note || ''), emo: it.e }, say: it }));
    if (u.kind === 'counties') return u.items.map(c => ({ id: c.id, front: { big: 'County ' + c.en, small: 'Which province? What is it called in Irish?' }, back: { big: c.ga + ' · ' + c.prov, small: 'County town: ' + c.town + ' · ' + c.land }, say: { ga: c.ga, say: c.say } }));
    return u.entries.map(e => ({ id: e.id, front: { emo: ((IR.kid || {})[e.id] || {}).e || e.e, big: e.title, small: e.period || '' }, back: { big: e.title, small: e.summary }, speakEn: e.title + '. ' + e.summary }));
  }
  RUN.cards = ctx => {
    const { u, stage, band } = ctx; const all = cardsOf(u, band);
    const deck = all.map(c => ({ c, w: IR.srsBox(c.id) + Math.random() * 2 })).sort((a, b) => a.w - b.w).slice(0, 10).map(x => x.c);
    let i = 0, known = 0, flipped = false;
    function show() {
      stage.innerHTML = ''; flipped = false;
      const c = deck[i]; const pg = h('div', { class: 'pgs' }); deck.forEach((_, k) => pg.append(h('i', { class: k < i ? 'on' : k === i ? 'cur' : '' })));
      const face = h('div', { class: 'face' });
      const fill = side => {
        face.innerHTML = '';
        if (side.emo) face.append(h('div', { class: 'emo' }, side.emo));
        if (side.big) face.append(h('div', { class: 'big' }, side.big));
        if (side.small) face.append(h('div', { class: 'res' }, side.small));
        face.append(h('div', { class: 'row', style: { justifyContent: 'center' } }, c.say ? IR.gaBtn(c.say) : (c.speakEn ? IR.enBtn(c.speakEn) : null)));
        if (!flipped) face.append(h('div', { class: 'muted small' }, 'Tap the card to turn it over'));
      };
      fill(c.front);
      const act = h('div', { class: 'row mt12 hide' }, h('button', { class: 'btn wine wide', onclick: () => grade(false) }, 'Not yet 🔁'), h('button', { class: 'btn wide', onclick: () => grade(true) }, 'Got it ✅'));
      face.onclick = () => { flipped = !flipped; fill(flipped ? c.back : c.front); if (flipped) act.classList.remove('hide'); };
      stage.append(pg, h('div', { class: 'flash' }, face), act);
      if (c.say && !c.front.emo || (c.say && band === 0)) setTimeout(() => IR.sayGa(c.say), 200);
    }
    function grade(ok) { IR.srsSet(deck[i].id, ok); if (ok) known++; IR.sfx.click(); i++; if (i >= deck.length) { const pct = Math.round(100 * known / deck.length); ctx.finish(pct >= 90 ? 3 : pct >= 60 ? 2 : 1, { line: 'You knew ' + known + ' of ' + deck.length + ' cards.' }); } else show(); }
    show();
  };

  /* ---- match up ---- */
  RUN.match = ctx => {
    const { u, stage, band } = ctx;
    const pool = shuffle(band === 0 ? u.items.filter(i => i.e) : u.items).slice(0, 6);
    if (pool.length < 3) return stage.append(h('p', null, 'Not enough words yet.'));
    let mistakes = 0, doneN = 0, sel = null;
    const left = shuffle(pool), right = shuffle(pool);
    const L = h('div'), R = h('div');
    const lt = band === 0 ? (it => it.e) : (it => it.ga), rt = band === 0 ? (it => it.ga) : (it => it.en);
    const tiles = [];
    const mk = (it, side, txt) => {
      const t = h('button', { class: 'tile mt8', style: { fontSize: band === 0 && side === 'L' ? '2.2rem' : '1.05rem' }, onclick: () => {
        if (side === 'L') { IR.sayGa(it); if (sel) sel.t.classList.remove('sel'); sel = { it, t }; t.classList.add('sel'); return; }
        if (!sel) return;
        if (sel.it === it) { sel.t.classList.remove('sel'); sel.t.classList.add('done'); t.classList.add('done'); IR.sfx.ok(); doneN++; sel = null; if (doneN === pool.length) setTimeout(() => ctx.finish(mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1, { line: mistakes + ' mistake' + (mistakes === 1 ? '' : 's'), game: 'match:' + u.id, correct: pool.length - mistakes }), 400); }
        else { mistakes++; IR.sfx.bad(); t.classList.add('bad'); setTimeout(() => t.classList.remove('bad'), 450); }
      } }, txt);
      return t;
    };
    left.forEach(it => L.append(mk(it, 'L', lt(it)))); right.forEach(it => R.append(mk(it, 'R', rt(it))));
    stage.append(h('div', { class: 'hint' }, 'Tap a word on the left, then tap its partner on the right.'), h('div', { class: 'mgrid mt12' }, L, R));
  };

  /* ---- spell it ---- */
  RUN.spell = ctx => {
    const { u, stage } = ctx; const words = shuffle(spellable(u)).slice(0, 6); let i = 0, wrong = 0;
    function show() {
      stage.innerHTML = ''; const it = words[i], target = [...it.ga.normalize('NFC')];
      const slots = Array(target.length).fill(null);
      const pg = h('div', { class: 'pgs' }); words.forEach((_, k) => pg.append(h('i', { class: k < i ? 'on' : k === i ? 'cur' : '' })));
      const extra = shuffle('aeioubcdfghlmnrstáéíóú'.split('').filter(c => !target.includes(c))).slice(0, 2);
      const bank = shuffle(target.concat(extra)).map((c, k) => ({ c, k, used: false }));
      const slotEl = h('div', { class: 'slots' }), bankEl = h('div', { class: 'letters' }), fb = h('div', { class: 'feedback' });
      function draw() {
        slotEl.innerHTML = ''; bankEl.innerHTML = '';
        slots.forEach((s, k) => slotEl.append(h('button', { class: 'tile' + (s ? ' filled' : ''), onclick: () => { if (s) { s.used = false; slots[k] = null; draw(); } } }, s ? s.c : '')));
        bank.forEach(b => bankEl.append(h('button', { class: 'tile' + (b.used ? ' done' : ''), onclick: () => { const k = slots.indexOf(null); if (k < 0 || b.used) return; b.used = true; slots[k] = b; draw(); check(); } }, b.c)));
      }
      function check() {
        if (slots.includes(null)) return;
        const got = slots.map(s => s.c).join('');
        if (got === target.join('')) { IR.sfx.ok(); fb.className = 'feedback good'; fb.textContent = 'Yes! ' + it.ga; IR.sayGa(it); setTimeout(() => { i++; if (i >= words.length) ctx.finish(wrong === 0 ? 3 : wrong <= 2 ? 2 : 1, { line: wrong + ' wrong tr' + (wrong === 1 ? 'y' : 'ies'), game: 'spell:' + u.id, correct: words.length - wrong }); else show(); }, 900); }
        else { wrong++; IR.sfx.bad(); fb.className = 'feedback bad'; fb.textContent = 'Not quite — tap a letter to take it out and try again.'; }
      }
      draw();
      stage.append(pg, h('div', { class: 'card pop', style: { textAlign: 'center' } }, it.e ? h('div', { class: 'promptemo' }, it.e) : null, h('div', { class: 'prompt' }, 'Spell “' + it.en + '” in Irish'), h('div', { class: 'row', style: { justifyContent: 'center' } }, IR.gaBtn(it)), slotEl, bankEl, fb,
        h('p', { class: 'muted small' }, 'Watch the fadas (á é í ó ú)!')));
    }
    show();
  };

  /* ---- who or what am I ---- */
  RUN.clues = ctx => {
    const qs = shuffle(ctx.u.entries).slice(0, Math.min(8, ctx.u.entries.length)).map(e => clueQ(ctx.u, e));
    const sub = Object.assign({}, ctx, { finish: (s, o) => ctx.finish(s, Object.assign({}, o, { game: 'clues:' + ctx.u.id })) });
    runQuestions(sub, qs, { readAloud: ctx.band <= 1 });
  };

  /* ---- speed round ---- */
  RUN.speed = ctx => {
    const { u, stage } = ctx; const SECS = 30;
    stage.append(h('div', { class: 'card', style: { textAlign: 'center' } }, h('div', { class: 'promptemo' }, '⚡'), h('h2', null, 'Speed round'), h('p', { class: 'muted mt8' }, 'Answer as many as you can in ' + SECS + ' seconds. Wrong answers just skip ahead.'),
      h('button', { class: 'btn big mt16', onclick: go }, 'Go!')));
    function go() {
      stage.innerHTML = '';
      const k = IR.kinds[u.kind]; let qs = k.questions(u, 40); let score = 0, t = SECS, over = false;
      const bar = h('div', { class: 'timer' }, h('i', { style: { width: '100%' } })); const sc = h('div', { class: 'muted', style: { textAlign: 'right', fontWeight: 800 } }, 'Score 0');
      const box = h('div'); stage.append(bar, sc, box);
      const tick = IR.every(() => { t -= 0.25; bar.firstChild.style.width = Math.max(0, 100 * t / SECS) + '%'; if (t <= 0 && !over) { over = true; end(); } }, 250);
      const sub = { stage: box, finish: () => { }, band: ctx.band };
      runQuestions(Object.assign({}, sub, { finish: () => { if (!over) { qs = k.questions(u, 40); } } }), qs, { fast: true, onAnswer: ok => { if (ok) { score++; sc.textContent = 'Score ' + score; } } });
      function end() { clearInterval(tick); box.querySelectorAll('button').forEach(b => b.disabled = true); setTimeout(() => ctx.finish(score >= 10 ? 3 : score >= 6 ? 2 : score >= 2 ? 1 : 0, { line: score + ' correct in ' + SECS + ' seconds!', game: 'speed:' + u.id, correct: score }), 500); }
    }
  };

  /* ---- timeline ---- */
  RUN.timeline = ctx => {
    const { u, stage } = ctx; let round = 0, wrong = 0; const ROUNDS = 5;
    function show() {
      stage.innerHTML = '';
      const withYear = u.entries.filter(e => e.year != null); const set = [];
      const s = shuffle(withYear); for (const e of s) { if (set.length >= 4) break; if (set.every(x => Math.abs(x.year - e.year) >= 25)) set.push(e); }
      const sorted = set.slice().sort((a, b) => a.year - b.year); const picked = [];
      const pg = h('div', { class: 'pgs' }); for (let k = 0; k < ROUNDS; k++) pg.append(h('i', { class: k < round ? 'on' : k === round ? 'cur' : '' }));
      const fb = h('div', { class: 'feedback' }), list = h('div'), placed = h('div');
      function draw() {
        placed.innerHTML = ''; picked.forEach((e, k) => placed.append(h('div', { class: 'card flat', style: { padding: '10px 14px', margin: '6px 0', borderColor: 'var(--leaf)' } }, h('b', null, (k + 1) + '. ' + e.title), h('span', { class: 'muted small' }, '  ' + e.period))));
        list.innerHTML = ''; shuffle(set).forEach(e => { if (picked.includes(e)) return; list.append(h('button', { class: 'opt', onclick: () => {
          if (e === sorted[picked.length]) { picked.push(e); IR.sfx.ok(); draw(); if (picked.length === set.length - 0) { fb.className = 'feedback good'; fb.textContent = 'In order!'; setTimeout(() => { round++; if (round >= ROUNDS) ctx.finish(wrong === 0 ? 3 : wrong <= 3 ? 2 : 1, { line: wrong + ' slip' + (wrong === 1 ? '' : 's'), game: 'timeline:' + u.id, correct: ROUNDS * 4 - wrong }); else show(); }, 900); } }
          else { wrong++; IR.sfx.bad(); fb.className = 'feedback bad'; fb.textContent = 'Not that one — which happened EARLIER?'; }
        } }, e.title)); });
      }
      draw();
      stage.append(pg, h('div', { class: 'card pop' }, h('div', { class: 'prompt' }, 'Tap the events in order, oldest first'), placed, list, fb));
    }
    show();
  };

  /* ---- counties / ogham extras ---- */
  RUN.decode = ctx => {
    const qs = []; for (let i = 0; i < 8; i++) { const w = pick(OGWORDS); qs.push(Object.assign(mc('Read the stone. What does it say?', w, shuffle(OGWORDS.filter(x => x !== w)).slice(0, 3)), { glyph: toOgham(w), explain: 'It says ' + w + '.' })); }
    const sub = Object.assign({}, ctx, { finish: (s, o) => ctx.finish(s, Object.assign({}, o, { game: 'ogham:decode', correct: o.correct })) });
    runQuestions(sub, qs, {});
  };
  RUN.write = ctx => {
    const { stage } = ctx;
    const inp = h('input', { class: 'inp', placeholder: 'Type a name or a word', maxlength: 14, autocomplete: 'off' });
    const out = h('div', { class: 'mt12' }); const info = h('p', { class: 'muted small' });
    const render = () => { out.innerHTML = ''; const L = IR.toOgham(inp.value); if (!L.length) { info.textContent = ''; return; } out.append(IR.oghamSvg(L)); info.textContent = L.join(' · ') + '   (Old Irish had no J, K, P, V, W, X or Y, so those are swapped for the nearest letter.)'; };
    inp.oninput = render;
    stage.append(h('div', { class: 'card' }, h('h3', null, 'Carve your name 🪨'), h('p', { class: 'muted mt8' }, 'Type your name and see it in Ogham, as it might be cut on a standing stone.'), h('div', { class: 'mt12' }, inp), out, info,
      h('button', { class: 'btn wide mt12', onclick: () => { if (IR.toOgham(inp.value).length < 2) { info.textContent = 'Type at least two letters first.'; return; } ctx.finish(3, { line: 'You carved “' + inp.value + '” in Ogham!' }); } }, 'Carve it! ✓')));
  };

  /* ================= games launcher ================= */
  const GAMES = [
    { id: 'match', emoji: '🧩', name: 'Match up', desc: 'Pair Irish words with pictures or meanings' },
    { id: 'listen', emoji: '👂', name: 'Listen & choose', desc: 'Hear an Irish word, pick the right one' },
    { id: 'spell', emoji: '✍️', name: 'Spell it', desc: 'Build Irish words, fadas and all' },
    { id: 'speed', emoji: '⚡', name: 'Speed round', desc: '30 seconds on any topic' },
    { id: 'clues', emoji: '🕵️', name: 'Who or what am I?', desc: 'Guess the myth, hero or event' },
    { id: 'timeline', emoji: '⏳', name: 'Put in order', desc: 'Sort history, oldest first' },
    { id: 'decode', emoji: '🔍', name: 'Ogham decoder', desc: 'Read the ancient stones' }
  ];
  IR.screens.games = function () {
    const wrap = h('div', null, IR.topbar('Cluichí · Games', '/', IR.starPill()));
    wrap.append(h('p', { class: 'muted' }, 'Pick a game, then pick a topic.'));
    GAMES.forEach(g => {
      const us = IR.units.filter(u => u.lessons.some(l => l.id === g.id));
      if (!us.length) return;
      wrap.append(h('button', { class: 'lesson', onclick: () => {
        const box = h('div', null, h('h3', null, g.emoji + ' ' + g.name), h('p', { class: 'muted small mt8' }, 'Choose a topic'));
        const bi = IR.bandIdx(); const list = us.slice().sort((a, b) => (a.min > bi) - (b.min > bi));
        list.forEach(u => box.append(h('button', { class: 'lesson', onclick: () => { IR.closeModal(); IR.go('/u/' + u.id + '/' + g.id); } }, h('span', { class: 'em' }, u.emoji), h('span', { class: 't' }, h('b', null, u.title), h('div', { class: 'muted small' }, u.ga || (IR.mod(u.mod) || {}).title)))));
        box.append(h('button', { class: 'btn ghost wide mt12', onclick: IR.closeModal }, 'Close'));
        IR.modal(box);
      } }, h('span', { class: 'em' }, g.emoji), h('span', { class: 't' }, h('b', null, g.name), h('div', { class: 'muted small' }, g.desc))));
    });
    return wrap;
  };
})();
