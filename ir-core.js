/* Irish Studies - core: helpers, storage, voices, progress, family sync (Harbor), router and the main screens.
 * Plain JS, no build step. Content lives in ir-gaeilge.js / ir-history.js / ir-myth.js / ir-places.js / ir-culture.js (+ ir-kid.js).
 * Lesson engines and games: ir-engine.js. Parent area: ir-parent.js. */
(function () {
  'use strict';
  const IR = window.IR = window.IR || {};
  IR.VERSION = '1.0.0';
  IR.modules = [];
  IR.units = [];
  IR.kinds = {};
  IR.screens = {};
  IR.games = {};

  /* ================= DOM helpers ================= */
  const SVGNS = 'http://www.w3.org/2000/svg';
  function applyProps(el, props) {
    if (!props) return;
    for (const k in props) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.setAttribute('class', v);
      else if (k === 'style' && typeof v === 'object') { for (const sk in v) { if (sk.slice(0, 2) === '--') el.style.setProperty(sk, v[sk]); else el.style[sk] = v[sk]; } }
      else if (k === 'html') el.innerHTML = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
  }
  function kids(el, list) { for (const c of list.flat(Infinity)) { if (c == null || c === false) continue; el.append(c.nodeType ? c : document.createTextNode(String(c))); } }
  const h = IR.h = function (tag, props, ...list) { const el = document.createElement(tag); applyProps(el, props); kids(el, list); return el; };
  IR.s = function (tag, props, ...list) { const el = document.createElementNS(SVGNS, tag); applyProps(el, props); kids(el, list); return el; };
  const $ = IR.$ = (sel, root) => (root || document).querySelector(sel);
  IR.rand = n => Math.floor(Math.random() * n);
  IR.pick = a => a[Math.floor(Math.random() * a.length)];
  IR.shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  IR.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  IR.esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  IR.norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');

  /* ================= cleanup registry ================= */
  let cleanups = [];
  IR.onLeave = fn => { cleanups.push(fn); };
  IR.cleanup = () => {
    const c = cleanups; cleanups = [];
    c.forEach(fn => { try { fn(); } catch (e) { } });
    try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) { }
  };
  IR.every = (fn, ms) => { const id = setInterval(fn, ms); IR.onLeave(() => clearInterval(id)); return id; };
  IR.after = (fn, ms) => { const id = setTimeout(fn, ms); IR.onLeave(() => clearTimeout(id)); return id; };

  /* ================= storage ================= */
  const KEY = 'ir_v1';
  const defaults = () => ({ v: 1, profiles: [], cur: null, prog: {}, pin: '', fam: '', famPin: '', sound: true, tts: true, tipSeen: false });
  function load() { try { return Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { return defaults(); } }
  let D = load();
  IR.D = () => D;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) { } scheduleSync(); }
  IR.save = save;

  /* ================= bands + avatars ================= */
  IR.BANDS = [
    { id: 'sprout', e: '🌱', name: 'Sprout', ages: '2–4', desc: 'Pictures and listening, no reading' },
    { id: 'spark', e: '✨', name: 'Spark', ages: '5–7', desc: 'Picture words, short stories, simple games' },
    { id: 'rover', e: '🥾', name: 'Rover', ages: '8–10', desc: 'Words, myths, counties, quizzes' },
    { id: 'scholar', e: '📜', name: 'Scholar', ages: '11+', desc: 'History, grammar, proverbs, deeper reading' }
  ];
  IR.AVATARS = ['🦊', '🐱', '🐶', '🦉', '🐢', '🦋', '🌟', '🍀', '🌈', '🐸', '🦄', '🐼', '🐙', '🦁', '🐧', '🌻', '🐳', '🎨', '🐝', '🦜'];
  const bandFromGrade = g => { g = String(g); if (g === 'PS' || g === 'PK') return 'sprout'; if (g === 'K' || g === '1' || g === '2') return 'spark'; if (g === '3' || g === '4' || g === '5') return 'rover'; return 'scholar'; };
  IR.bandFromGrade = bandFromGrade;
  IR.P = () => D.profiles.find(p => p.id === D.cur) || null;
  IR.bandIdx = () => Math.max(0, IR.BANDS.findIndex(b => b.id === ((IR.P() || {}).band || 'rover')));
  IR.band = () => (IR.P() || {}).band || 'rover';

  /* ================= speech (Irish voice if the device has one, else a spoken respelling) ================= */
  let voices = [];
  function loadVoices() { try { voices = (window.speechSynthesis && speechSynthesis.getVoices()) || []; } catch (e) { voices = []; } }
  loadVoices();
  try { window.speechSynthesis && speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) { }
  const rank = v => (/natural|online|neural/i.test(v.name) ? 2 : 0) + (v.localService ? 0 : 1);
  IR.irishVoice = () => voices.filter(v => /^ga([-_]|$)/i.test(v.lang)).sort((a, b) => rank(b) - rank(a))[0] || null;
  IR.englishVoice = () => {
    const by = re => voices.filter(v => re.test(v.lang)).sort((a, b) => rank(b) - rank(a))[0];
    return by(/^en[-_]IE/i) || by(/^en[-_]GB/i) || by(/^en/i) || null;
  };
  function speak(text, lang, voice, rate) {
    try {
      if (!window.speechSynthesis || !text) return false;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang; if (voice) u.voice = voice; u.rate = rate || 0.88; u.pitch = 1.03;
      speechSynthesis.speak(u); return true;
    } catch (e) { return false; }
  }
  /* mode returned: 'ga' real Irish voice, 'approx' English voice reading the respelling, 'none' */
  IR.sayGa = function (item) {
    if (!D.tts || !item) return 'none';
    const iv = IR.irishVoice();
    if (iv && item.ga) { speak(String(item.ga).replace(/\.\.\./g, ''), 'ga-IE', iv, 0.8); return 'ga'; }
    if (item.say) { speak(String(item.say).toLowerCase().replace(/-/g, ' '), 'en-IE', IR.englishVoice(), 0.75); return 'approx'; }
    return 'none';
  };
  IR.sayEn = function (text) { if (!D.tts) return false; return speak(String(text).replace(/[✨🍀☘️]/g, ''), 'en-IE', IR.englishVoice(), 0.9); };
  IR.gaBtn = item => IR.h('button', { class: 'say', 'aria-label': 'Hear it', onclick: e => { e.stopPropagation(); IR.sayGa(item); } }, '🔊');
  IR.enBtn = text => IR.h('button', { class: 'say', 'aria-label': 'Read aloud', onclick: e => { e.stopPropagation(); IR.sayEn(text); } }, '🔊');

  /* ================= tiny sound effects (Web Audio, no files) ================= */
  let ac = null;
  function tone(freq, dur, type, vol, when) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const t = ac.currentTime + (when || 0), o = ac.createOscillator(), g = ac.createGain();
      o.type = type || 'sine'; o.frequency.value = freq; g.gain.setValueAtTime(vol || 0.12, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + 0.02);
    } catch (e) { }
  }
  IR.sfx = {
    ok() { if (D.sound) { tone(660, .12, 'triangle'); tone(880, .16, 'triangle', .12, .1); } },
    bad() { if (D.sound) tone(180, .22, 'sawtooth', .07); },
    win() { if (D.sound) [523, 659, 784, 1046].forEach((f, i) => tone(f, .2, 'triangle', .12, i * .11)); },
    click() { if (D.sound) tone(520, .05, 'sine', .06); }
  };
  IR.confetti = function () {
    const cols = ['#D4A12B', '#2E8B5E', '#8A3A3A', '#3E7CB1', '#F2A65A', '#F8F1DF'];
    for (let i = 0; i < 40; i++) {
      const c = h('i', { class: 'confetti', style: { left: Math.random() * 100 + 'vw', background: cols[i % cols.length], animationDelay: (Math.random() * 0.5) + 's', animationDuration: (2 + Math.random() * 1.6) + 's' } });
      document.body.append(c); setTimeout(() => c.remove(), 4200);
    }
  };
  IR.starsEl = (n, max) => { max = max || 3; const el = h('span', { class: 'stars' }); for (let i = 0; i < max; i++) el.append(h('span', { class: i < n ? '' : 'off' }, '⭐')); return el; };

  /* ================= modules + units ================= */
  IR.addModule = m => { IR.modules.push(m); return m; };
  IR.mod = id => IR.modules.find(m => m.id === id);
  IR.addUnit = function (u) {
    const kind = IR.kinds[u.kind];
    if (kind && kind.prep) kind.prep(u);
    u.lessons = kind ? kind.lessons(u) : [];
    u.min = u.min == null ? 1 : u.min;
    IR.units.push(u); return u;
  };
  IR.unit = id => IR.units.find(u => u.id === id);
  IR.unitsOf = modId => IR.units.filter(u => u.mod === modId);

  /* ================= progress (shape shared with Harbor: labs / quiz / games / badges / listened) ================= */
  const emptyPR = () => ({ labs: {}, quiz: {}, games: {}, badges: {}, listened: {}, srs: {} });
  function PR(pid) {
    pid = pid || D.cur; if (!pid) return null;
    const p = D.prog[pid] || (D.prog[pid] = emptyPR());
    ['labs', 'quiz', 'games', 'badges', 'listened', 'srs'].forEach(k => { if (!p[k]) p[k] = {}; });
    return p;
  }
  IR.PR = PR; IR.emptyPR = emptyPR;
  IR.recordLab = function (labId, stars) {
    const pr = PR(); if (!pr) return;
    const old = pr.labs[labId] || {};
    pr.labs[labId] = { stars: Math.max(old.stars || 0, stars), at: Date.now() };
    save();
  };
  IR.recordQuiz = function (unitId, pct) {
    const pr = PR(); if (!pr) return;
    const old = pr.quiz[unitId] || {};
    pr.quiz[unitId] = { pct: Math.max(old.pct || 0, pct), at: Date.now() };
    save(); IR.checkBadge(unitId);
  };
  IR.recordGame = function (gameId, stars, correct) {
    const pr = PR(); if (!pr) return;
    const old = pr.games[gameId] || { stars: 0, plays: 0 };
    pr.games[gameId] = { stars: Math.max(old.stars || 0, stars), plays: (old.plays || 0) + 1, best: Math.max(old.best || 0, correct || 0), at: Date.now() };
    save();
  };
  IR.markRead = function (id) {
    const pr = PR(); if (!pr) return;
    if (!pr.listened[id]) { pr.listened[id] = { at: Date.now() }; save(); }
  };
  /* Leitner boxes 0..4. Box 3+ counts as "known". */
  IR.srsBox = (id, pid) => ((PR(pid) || { srs: {} }).srs[id] || {}).box || 0;
  IR.srsSet = function (id, known) {
    const pr = PR(); if (!pr) return;
    const cur = (pr.srs[id] || {}).box || 0;
    pr.srs[id] = { box: known ? Math.min(4, cur + 1) : Math.max(0, cur - 1), at: Date.now() };
    save();
  };
  IR.wordsKnown = pid => { const pr = PR(pid); if (!pr) return 0; return Object.keys(pr.srs).filter(k => k.indexOf('g-') === 0 && pr.srs[k].box >= 3).length; };
  IR.totalStars = pid => {
    const pr = PR(pid); if (!pr) return 0; let n = 0;
    for (const k in pr.labs) n += pr.labs[k].stars || 0;
    for (const k in pr.quiz) n += pr.quiz[k].pct >= 90 ? 3 : pr.quiz[k].pct >= 70 ? 2 : 1;
    for (const k in pr.games) n += pr.games[k].stars || 0;
    n += Object.keys(pr.listened).length;
    return n;
  };
  IR.unitStatus = function (u, pid) {
    const pr = PR(pid) || emptyPR();
    const done = u.lessons.filter(l => ((pr.labs[u.id + ':' + l.id] || {}).stars || 0) > 0).length;
    const q = pr.quiz[u.id]; const quizBest = q ? q.pct : null;
    return { done, total: u.lessons.length, quizBest, badge: !!pr.badges[u.id], pct: Math.round(100 * done / Math.max(1, u.lessons.length)) };
  };
  IR.checkBadge = function (unitId) {
    const u = IR.unit(unitId); const pr = PR(); if (!u || !pr || pr.badges[unitId]) return false;
    const st = IR.unitStatus(u);
    if ((st.quizBest || 0) >= 70 && st.done >= Math.ceil(st.total / 2)) { pr.badges[unitId] = { at: Date.now() }; save(); return true; }
    return false;
  };
  IR.modProgress = function (modId, pid) {
    const us = IR.unitsOf(modId); const pr = PR(pid) || emptyPR();
    return { badges: us.filter(u => pr.badges[u.id]).length, total: us.length };
  };
  /* date-seeded pick so "word of the day" is the same all day */
  IR.daily = function (arr, salt) {
    const d = new Date(); const n = d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate() + (salt || 0);
    return arr[n % arr.length];
  };

  /* ================= cloud sync (optional; the app works offline) ================= */
  IR.FIREBASE = {
    apiKey: 'AIzaSyCxqGRhdCyh92LyiFvrTi6ETTiFKVhDvUM', authDomain: 'homeschool-math.firebaseapp.com', projectId: 'homeschool-math',
    storageBucket: 'homeschool-math.firebasestorage.app', messagingSenderId: '275309549483', appId: '1:275309549483:web:3c118499f22eb23e6f24ee'
  };
  let fbP = null;
  function fb() {
    if (fbP) return fbP;
    fbP = (async () => {
      try {
        const app = await import('https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js');
        const fs = await import('https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js');
        const a = app.getApps().length ? app.getApp() : app.initializeApp(IR.FIREBASE);
        return { fs, db: fs.getFirestore(a) };
      } catch (e) { console.warn('Firebase unavailable', e); fbP = null; return null; }
    })();
    return fbP;
  }
  function mergeProg(a, b) {
    const out = Object.assign({}, a);
    for (const pid of Object.keys(b || {})) {
      const x = out[pid] || emptyPR(), y = b[pid] || {};
      const m = { labs: Object.assign({}, x.labs), quiz: Object.assign({}, x.quiz), games: Object.assign({}, x.games), badges: Object.assign({}, y.badges || {}, x.badges), listened: Object.assign({}, y.listened || {}, x.listened), srs: Object.assign({}, x.srs) };
      for (const k in (y.labs || {})) { const c = m.labs[k]; if (!c || (y.labs[k].stars || 0) > (c.stars || 0)) m.labs[k] = y.labs[k]; }
      for (const k in (y.quiz || {})) { const c = m.quiz[k]; if (!c || (y.quiz[k].pct || 0) > (c.pct || 0)) m.quiz[k] = y.quiz[k]; }
      for (const k in (y.games || {})) { const c = m.games[k]; if (!c || (y.games[k].stars || 0) > (c.stars || 0) || ((y.games[k].stars || 0) === (c.stars || 0) && (y.games[k].plays || 0) > (c.plays || 0))) m.games[k] = y.games[k]; }
      for (const k in (y.srs || {})) { const c = m.srs[k]; if (!c || (y.srs[k].at || 0) > (c.at || 0)) m.srs[k] = y.srs[k]; }
      Object.keys(x).forEach(k => { if (!(k in m)) m[k] = x[k]; });
      out[pid] = m;
    }
    return out;
  }
  IR.mergeProg = mergeProg;
  async function cloudPull() {
    if (!D.fam) return false;
    const f = await fb(); if (!f) return false;
    try {
      const snap = await f.fs.getDoc(f.fs.doc(f.db, 'families', D.fam + '_ir'));
      if (snap.exists()) { const r = snap.data(); D.prog = mergeProg(D.prog, r.prog || {}); try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) { } }
      return true;
    } catch (e) { console.warn('pull failed', e); return false; }
  }
  async function cloudPush() {
    if (!D.fam) return false;
    const f = await fb(); if (!f) return false;
    try {
      await cloudPull();
      await f.fs.setDoc(f.fs.doc(f.db, 'families', D.fam + '_ir'), { app: 'irish-studies', prog: D.prog, ts: Date.now() }, { merge: false });
      return true;
    } catch (e) { console.warn('push failed', e); return false; }
  }
  let syncT = null;
  function scheduleSync() { if (!D.fam) return; clearTimeout(syncT); syncT = setTimeout(cloudPush, 2500); }
  IR.syncNow = cloudPush; IR.pullNow = cloudPull;
  /* Family codes: 2 letters + dash + 4 characters (MA-AB12, WA-AB12, HB-AB12 ...). Same code as Math, Words, Harbor. */
  IR.fmtFam = v => { v = String(v || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); return v.length > 2 ? v.slice(0, 2) + '-' + v.slice(2, 6) : v; };
  IR.managed = () => { try { return sessionStorage.getItem('ir_harbor_managed') === '1'; } catch (e) { return false; } };
  IR.joinFamily = async function (code, mirror) {
    code = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length === 6) code = code.slice(0, 2) + '-' + code.slice(2);
    if (!/^[A-Z]{2}-[A-Z0-9]{4}$/.test(code)) return { ok: false, msg: 'That code does not look right (' + (code || 'empty') + '). A family code looks like MA-AB12.' };
    const f = await fb(); if (!f) return { ok: false, msg: 'Could not reach the cloud. Check the internet and try again.' };
    try {
      const snap = await f.fs.getDoc(f.fs.doc(f.db, 'families', code));
      if (!snap.exists()) return { ok: false, msg: 'No family found with that code.' };
      const fam = snap.data(); let added = 0;
      for (const p of (fam.profiles || [])) {
        const id = String(p.id);
        const ex = D.profiles.find(x => x.id === id);
        if (!ex) { D.profiles.push({ id, name: p.name || 'Explorer', avatar: p.avatar || '🌟', band: bandFromGrade(p.gradeId), gradeId: p.gradeId == null ? '' : String(p.gradeId) }); added++; }
        else if (mirror) { ex.name = p.name || ex.name; ex.avatar = p.avatar || ex.avatar; ex.band = bandFromGrade(p.gradeId) || ex.band; ex.gradeId = p.gradeId == null ? ex.gradeId : String(p.gradeId); }
      }
      if (mirror && (fam.profiles || []).length) {
        const ids = new Set((fam.profiles || []).map(p => String(p.id)));
        D.profiles.forEach(x => {
          if (ids.has(x.id) || !D.prog || !D.prog[x.id]) return;
          const m = (fam.profiles || []).find(p => String(p.name || '').trim().toLowerCase() === String(x.name || '').trim().toLowerCase());
          if (m) D.prog = mergeProg(D.prog, { [String(m.id)]: D.prog[x.id] });
        });
        D.profiles = D.profiles.filter(x => ids.has(x.id));
        if (!D.profiles.some(x => x.id === D.cur)) D.cur = D.profiles[0] ? D.profiles[0].id : null;
      }
      D.fam = code; D.famPin = fam.parentPin || '';
      if (!D.cur && D.profiles.length) D.cur = D.profiles[0].id;
      save(); await cloudPull(); save();
      return { ok: true, msg: added ? 'Joined! Added ' + added + ' explorer' + (added > 1 ? 's' : '') + '.' : 'Joined! Progress synced.', added };
    } catch (e) { return { ok: false, msg: 'Something went wrong joining. Try again.' }; }
  };
  IR.leaveFamily = () => { D.fam = ''; D.famPin = ''; save(); };

  /* ================= router ================= */
  IR.go = path => { if (location.hash === '#' + path) render(); else location.hash = '#' + path; };
  IR.back = fallback => { if (history.length > 1) history.back(); else IR.go(fallback || '/'); };
  function seg() { const raw = (location.hash.slice(1) || '/'); const [path, qs] = raw.split('?'); return { parts: path.split('/').filter(Boolean), qs: new URLSearchParams(qs || '') }; }
  IR.seg = seg;
  const NAV = [['/', '🏠', 'Baile'], ['/m/gaeilge', '🗣️', 'Gaeilge'], ['/stories', '📜', 'Scéalta'], ['/m/geography', '🗺️', 'Áiteanna'], ['/games', '🎮', 'Cluichí'], ['/parent', '🔒', 'Parents']];
  function navBar(active) {
    return h('nav', { class: 'nav' }, h('div', null, NAV.map(([p, e, t]) => h('button', { class: active === p ? 'on' : '', onclick: () => IR.go(p) }, h('span', { class: 'e' }, e), t))));
  }
  IR.topbar = function (title, backPath, right) {
    return h('div', { class: 'topbar' }, h('button', { class: 'iconbtn', 'aria-label': 'Back', onclick: () => backPath ? IR.go(backPath) : IR.back('/') }, '←'), h('h2', null, title), right || null);
  };
  IR.starPill = () => h('span', { class: 'starpill' }, '⭐ ' + IR.totalStars());
  IR.modal = function (content) {
    IR.closeModal();
    const m = h('div', { class: 'modal', id: 'irmodal', onclick: e => { if (e.target === m) IR.closeModal(); } }, h('div', { class: 'pop' }, content));
    document.body.append(m); return m;
  };
  IR.closeModal = () => { const m = $('#irmodal'); if (m) m.remove(); };

  function render() {
    IR.cleanup(); IR.closeModal();
    const app = $('#app'); app.innerHTML = ''; app.style.removeProperty('--c');
    document.querySelectorAll('.nav').forEach(n => n.remove());
    window.scrollTo(0, 0);
    const { parts, qs } = seg();
    const r = parts[0] || '';
    if (!D.profiles.length && r !== 'welcome' && r !== 'parent') return IR.go('/welcome');
    let el, active = null;
    try {
      if (r === '') { el = screenHome(); active = '/'; }
      else if (r === 'welcome') el = screenWelcome(qs);
      else if (r === 'who') el = screenWho();
      else if (r === 'm') { el = screenModule(parts[1]); active = '/m/' + parts[1]; }
      else if (r === 'stories') { el = screenStories(); active = '/stories'; }
      else if (r === 'u') { el = (parts[2] ? IR.screens.lesson : screenUnit)(parts[1], parts[2], qs); active = null; }
      else if (r === 'badges') el = screenBadges();
      else if (IR.screens[r]) { el = IR.screens[r](parts.slice(1), qs); active = r === 'games' ? '/games' : r === 'parent' ? '/parent' : null; }
      else el = screenHome();
    } catch (e) { console.error(e); el = h('div', { class: 'card' }, h('h3', null, 'Oops'), h('p', { class: 'muted mt8' }, 'Something went wrong on this page. ' + e.message), h('button', { class: 'btn mt12', onclick: () => IR.go('/') }, 'Go home')); }
    app.append(el);
    if (r !== 'welcome' && !(r === 'u' && parts[2])) document.body.append(navBar(active));
  }
  IR.render = render;

  /* ================= shared pieces ================= */
  const KNOT = '<svg viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M50 50c0-14 10-24 22-24s20 10 20 20c0 12-10 18-18 18-9 0-14-6-14-12"/><path d="M50 50c-12-7-26-3-32 8s-2 22 8 26c11 4 20-2 22-10 2-8-3-13-9-13"/><path d="M50 50c12-7 14-22 5-32S34 8 26 14c-9 7-8 18-1 22 7 4 14 1 16-5"/></svg>';
  function hero(title, sub, opts) {
    opts = opts || {};
    const p = IR.P();
    const who = p ? h('button', { class: 'who', onclick: () => IR.go('/who') }, h('span', { class: 'av' }, p.avatar), p.name) : null;
    return h('div', { class: 'hero' }, h('div', { class: 'knot', html: KNOT }),
      h('div', { class: 'row' }, h('div', { class: 'brand' }, h('div', { class: 'logo' }, '☘️'), h('div', null, h('h1', null, title || 'Irish Studies'), h('small', null, sub || 'Éire · Gaeilge · Stair · Scéalta'))), who),
      opts.hello ? h('div', { class: 'hello' }, opts.hello[0], h('span', null, opts.hello[1])) : null);
  }
  IR.hero = hero;

  function profileForm(onDone, opts) {
    opts = opts || {};
    const name = h('input', { class: 'inp', placeholder: 'Name', maxlength: 20, autocomplete: 'off' });
    let av = IR.AVATARS[IR.rand(IR.AVATARS.length)], band = 'rover';
    const avRow = h('div', { class: 'row wrap', style: { gap: '4px' } });
    const bRow = h('div', null);
    const draw = () => {
      avRow.innerHTML = ''; IR.AVATARS.forEach(a => avRow.append(h('button', { class: 'iconbtn', style: { borderColor: a === av ? 'var(--green)' : '', background: a === av ? '#e1f4e8' : '' }, onclick: () => { av = a; draw(); } }, a)));
      bRow.innerHTML = ''; IR.BANDS.forEach(b => bRow.append(h('button', { class: 'unit', style: { '--c': b.id === band ? 'var(--gold)' : 'var(--line)', margin: '6px 0' }, onclick: () => { band = b.id; draw(); } }, h('span', { class: 'em' }, b.e), h('span', { class: 't' }, h('b', null, b.name + ' · ' + b.ages), h('small', null, b.desc)))));
    }; draw();
    return h('div', null, h('label', { class: 'lbl' }, 'Name'), name, h('label', { class: 'lbl' }, 'Picture'), avRow, h('label', { class: 'lbl' }, 'Level'), bRow,
      h('button', { class: 'btn wide mt16', onclick: () => {
        const n = name.value.trim(); if (!n) { name.focus(); return; }
        const p = { id: 'p' + Date.now().toString(36) + IR.rand(99), name: n, avatar: av, band };
        D.profiles.push(p); D.cur = p.id; save(); onDone(p);
      } }, opts.cta || 'Start exploring ☘️'));
  }

  function screenWelcome(qs) {
    const wrap = h('div', null, hero('Irish Studies', 'Welcome, explorer!'));
    const joinMsg = h('div', { class: 'feedback' });
    const code = h('input', { class: 'inp', placeholder: 'MA-AB12 or WA-AB12', maxlength: 7, autocapitalize: 'characters', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false', value: D.fam || qs.get('family') || '', oninput: e => { e.target.value = IR.fmtFam(e.target.value); } });
    const joinBtn = h('button', { class: 'btn wide mt8', onclick: async () => {
      joinBtn.disabled = true; joinMsg.textContent = 'Joining…'; joinMsg.className = 'feedback';
      const r = await IR.joinFamily(code.value); joinBtn.disabled = false;
      joinMsg.textContent = r.msg; joinMsg.className = 'feedback ' + (r.ok ? 'good' : 'bad');
      if (r.ok && D.profiles.length) setTimeout(() => IR.go('/'), 800);
    } }, 'Join my family');
    wrap.append(h('div', { class: 'card', style: { marginTop: '-30px', position: 'relative' } }, h('h3', null, '🏠 I have a family code'),
      h('p', { class: 'muted small mt8' }, 'Use the same code as Harbor, Math Adventure or Words Adventure. Your explorers and progress come along.'), h('div', { class: 'mt8' }, code), joinBtn, joinMsg));
    wrap.append(h('div', { class: 'card' }, h('h3', null, '✨ New explorer'), profileForm(() => IR.go('/'))));
    return wrap;
  }

  function screenWho() {
    const wrap = h('div', null, IR.topbar('Who is exploring?', '/'));
    D.profiles.forEach(p => {
      wrap.append(h('button', { class: 'unit', style: { '--c': p.id === D.cur ? 'var(--gold)' : 'var(--line)' }, onclick: () => { D.cur = p.id; save(); IR.go('/'); } },
        h('span', { class: 'em' }, p.avatar), h('span', { class: 't' }, h('b', null, p.name), h('small', null, (IR.BANDS.find(b => b.id === p.band) || {}).name + ' · ⭐ ' + IR.totalStars(p.id) + ' · ' + IR.wordsKnown(p.id) + ' words')), p.id === D.cur ? h('span', null, '✔️') : null));
    });
    if (!IR.managed()) wrap.append(h('div', { class: 'card mt16' }, h('h3', null, '➕ Add an explorer'), profileForm(() => IR.go('/'), { cta: 'Add explorer' })));
    else wrap.append(h('p', { class: 'muted small mt16' }, 'Add or change children in Harbor → Parents → Children.'));
    return wrap;
  }

  /* ---------- home ---------- */
  function nextUp() {
    const bi = IR.bandIdx();
    const cands = IR.units.filter(u => u.min <= bi).concat(IR.units.filter(u => u.min > bi));
    for (const u of cands) {
      const pr = PR() || emptyPR();
      for (const l of u.lessons) if (!((pr.labs[u.id + ':' + l.id] || {}).stars)) return { u, l };
    }
    return null;
  }
  function screenHome() {
    const p = IR.P(); const bi = IR.bandIdx();
    const wrap = h('div', null, hero('Irish Studies', 'Éire · Gaeilge · Stair · Scéalta', { hello: ['Dia duit, ' + (p ? p.name : '') + '! 👋', bi === 0 ? 'Let’s learn some Irish words together.' : 'What shall we explore today?'] }));
    wrap.append(h('div', { style: { marginTop: '-34px', position: 'relative' } }, h('div', { class: 'row', style: { justifyContent: 'flex-end' } }, IR.starPill())));
    // word of the day
    const vocab = []; IR.units.forEach(u => { if (u.kind === 'vocab' && u.mod === 'gaeilge' && u.min <= Math.max(1, bi)) u.items.forEach(it => { if (it.say && it.e) vocab.push(it); }); });
    if (vocab.length) {
      const w = IR.daily(vocab);
      wrap.append(h('div', { class: 'card paper' }, h('div', { class: 'row' }, h('span', { style: { fontSize: '2.6rem' } }, w.e), h('div', { style: { flex: 1 } }, h('div', { class: 'muted small' }, 'Focal an lae · Word of the day'), h('div', { class: 'ga', style: { fontSize: '1.6rem' } }, w.ga), h('div', null, w.en, h('span', { class: 'muted small' }, '  ·  ' + w.say))), IR.gaBtn(w))));
    }
    const nx = nextUp();
    if (nx) wrap.append(h('button', { class: 'unit', style: { '--c': 'var(--gold)' }, onclick: () => IR.go('/u/' + nx.u.id + '/' + nx.l.id) }, h('span', { class: 'em' }, nx.l.emoji || nx.u.emoji), h('span', { class: 't' }, h('small', null, 'Next up'), h('b', null, nx.u.title + ' · ' + nx.l.name), h('small', null, nx.u.ga || '')), h('span', null, '▶')));
    wrap.append(h('h3', { class: 'sec' }, 'Explore'));
    const grid = h('div', { class: 'mods' });
    IR.modules.forEach(m => {
      const mp = IR.modProgress(m.id);
      grid.append(h('button', { class: 'mod', style: { '--c': m.color }, onclick: () => IR.go(m.route || '/m/' + m.id) }, h('span', { class: 'ring' }, '🏅 ' + mp.badges + '/' + mp.total), h('span', { class: 'em' }, m.emoji), h('b', null, m.title), h('small', null, m.ga), h('small', null, m.desc)));
    });
    wrap.append(grid);
    const sf = []; IR.units.forEach(u => { if (u.id === 'g-proverbs') u.items.forEach(i => sf.push(i)); });
    if (sf.length && bi >= 2) { const s = IR.daily(sf, 7); wrap.append(h('div', { class: 'card flat mt16' }, h('div', { class: 'muted small' }, 'Seanfhocal an lae · Proverb of the day'), h('div', { class: 'story mt8' }, h('b', null, s.ga)), h('div', { class: 'muted' }, s.en), h('div', { class: 'row mt8' }, IR.gaBtn(s)))); }
    wrap.append(h('div', { class: 'row mt16', style: { justifyContent: 'center', gap: '10px' } }, h('button', { class: 'btn ghost small', onclick: () => IR.go('/badges') }, '🏅 My badges'), h('button', { class: 'btn ghost small', onclick: () => IR.go('/who') }, '🔄 Switch explorer')));
    if (!D.fam) wrap.append(h('div', { class: 'hint mt16' }, '🏠 Not linked to your family yet. Open Irish Studies from Harbor, or add your family code in the Parents area, and progress will show up in Harbor.'));
    return wrap;
  }

  /* ---------- module / stories / unit pages ---------- */
  function unitRow(u) {
    const st = IR.unitStatus(u); const bi = IR.bandIdx(); const older = u.min > bi;
    return h('button', { class: 'unit' + (older ? ' old' : ''), style: { '--c': (IR.mod(u.mod) || {}).color || 'var(--green)' }, onclick: () => IR.go('/u/' + u.id) },
      h('span', { class: 'em' }, u.emoji),
      h('span', { class: 't' }, h('b', null, u.title), h('small', null, (u.ga ? u.ga + ' · ' : '') + st.done + '/' + st.total + ' done' + (older ? ' · for ' + IR.BANDS[u.min].name + 's' : '')), h('div', { class: 'bar mt8' }, h('i', { style: { width: st.pct + '%' } }))),
      st.badge ? h('span', { style: { fontSize: '1.6rem' } }, '🏅') : null);
  }
  function screenModule(id) {
    const m = IR.mod(id); if (!m) return screenHome();
    const wrap = h('div', null, IR.topbar(m.title, '/', IR.starPill()));
    wrap.style.setProperty('--c', m.color);
    wrap.append(h('div', { class: 'card paper' }, h('div', { class: 'ga', style: { fontSize: '1.3rem' } }, m.ga), h('p', { class: 'muted mt8' }, m.blurb || m.desc)));
    if (id === 'gaeilge') wrap.append(voiceTip());
    const us = IR.unitsOf(id); const bi = IR.bandIdx();
    us.filter(u => u.min <= bi).forEach(u => wrap.append(unitRow(u)));
    const older = us.filter(u => u.min > bi);
    if (older.length) { wrap.append(h('h3', { class: 'sec' }, 'For older explorers')); older.forEach(u => wrap.append(unitRow(u))); }
    return wrap;
  }
  function screenStories() {
    const wrap = h('div', null, IR.topbar('Scéalta agus Stair', '/', IR.starPill()));
    wrap.append(h('div', { class: 'card paper' }, h('div', { class: 'ga', style: { fontSize: '1.3rem' } }, 'Stories, history and culture'), h('p', { class: 'muted mt8' }, 'Myths and monsters, kings and saints, music and books. Little ones can have stories read aloud with the 🔊 button.')));
    ['myth', 'history', 'culture'].forEach(id => {
      const m = IR.mod(id); if (!m) return;
      wrap.append(h('h3', { class: 'sec' }, m.emoji + ' ' + m.title, h('span', { class: 'muted small' }, m.ga)));
      const bi = IR.bandIdx();
      IR.unitsOf(id).forEach(u => wrap.append(unitRow(u)));
    });
    return wrap;
  }
  function voiceTip() {
    const iv = IR.irishVoice();
    if (iv) return h('div', { class: 'hint mt8' }, '🔊 Irish voice found on this device: ' + iv.name + '.');
    return h('div', { class: 'hint mt8' }, '🔊 No Irish voice on this device, so 🔊 reads the pronunciation guide (the letters in CAPITALS are the stressed part). On Windows, Microsoft Edge has Irish voices; on Android or iPhone, check the language settings for Irish (Gaeilge).');
  }
  IR.voiceTip = voiceTip;

  function screenUnit(id) {
    const u = IR.unit(id); if (!u) return screenHome();
    const m = IR.mod(u.mod) || {};
    const wrap = h('div', null, IR.topbar(u.title, m.route || '/m/' + u.mod, IR.starPill()));
    wrap.style.setProperty('--c', m.color || 'var(--green)');
    const st = IR.unitStatus(u);
    wrap.append(h('div', { class: 'card paper' }, h('div', { class: 'row' }, h('span', { style: { fontSize: '2.6rem' } }, u.emoji), h('div', { style: { flex: 1 } }, u.ga ? h('div', { class: 'ga', style: { fontSize: '1.3rem' } }, u.ga) : null, h('div', { class: 'muted small' }, st.badge ? '🏅 Badge earned' : 'Pass the quiz (70%) to earn the badge'))), u.intro ? h('p', { class: 'mt12' }, u.intro) : null));
    if (u.mod === 'gaeilge') wrap.append(voiceTip());
    const pr = PR() || emptyPR();
    u.lessons.forEach(l => {
      const rec = pr.labs[u.id + ':' + l.id] || {};
      wrap.append(h('button', { class: 'lesson', onclick: () => IR.go('/u/' + u.id + '/' + l.id) }, h('span', { class: 'em' }, l.emoji), h('span', { class: 't' }, h('b', null, l.name), h('div', { class: 'muted small' }, l.desc || '')), IR.starsEl(rec.stars || 0)));
    });
    const q = pr.quiz[u.id]; if (q) wrap.append(h('p', { class: 'muted small mt12' }, 'Best quiz score: ' + q.pct + '%'));
    return wrap;
  }

  function screenBadges() {
    const wrap = h('div', null, IR.topbar('My badges', '/', IR.starPill()));
    const pr = PR() || emptyPR();
    IR.modules.forEach(m => {
      const us = IR.unitsOf(m.id); if (!us.length) return;
      wrap.append(h('h3', { class: 'sec' }, m.emoji + ' ' + m.title));
      const row = h('div', { class: 'row wrap', style: { alignItems: 'flex-start' } });
      us.forEach(u => row.append(h('div', { class: 'badge' + (pr.badges[u.id] ? '' : ' off') }, h('div', { class: 'e' }, u.emoji), u.title)));
      wrap.append(row);
    });
    wrap.append(h('p', { class: 'muted small mt16' }, 'Words you know well: ' + IR.wordsKnown() + ' · Stories read: ' + Object.keys(pr.listened).length));
    return wrap;
  }

  /* ================= start ================= */
  IR.start = function () {
    // Harbor hand-off: ?from=harbor&family=MA-XXXX&child=<id>&view=parent
    const q = new URLSearchParams(location.search);
    IR.fromHarbor = q.get('from') === 'harbor';
    if (IR.fromHarbor) { try { sessionStorage.setItem('ir_harbor_managed', '1'); } catch (e) { } }
    const refresh = ok => { if (ok && !document.querySelector('.modal')) { const r = seg().parts[0]; if (!r || r === 'badges' || r === 'who') render(); } };
    const boot = async () => {
      if (q.get('family') && (q.get('family') !== D.fam || IR.fromHarbor)) await IR.joinFamily(q.get('family'), IR.fromHarbor);
      if (q.get('child') && D.profiles.some(p => p.id === q.get('child'))) { D.cur = q.get('child'); save(); }
      if (q.get('view') === 'parent' && IR.fromHarbor) { try { sessionStorage.setItem('ir_harbor_parent', '1'); } catch (e) { } location.hash = '#/parent'; }
      render();
      if (D.fam) cloudPull().then(refresh);
    };
    window.addEventListener('hashchange', render);
    window.addEventListener('pointerdown', () => { try { loadVoices(); } catch (e) { } }, { once: true, capture: true });
    if (q.get('family') || q.get('child') || q.get('view')) boot(); else { render(); if (D.fam) cloudPull().then(refresh); }
  };
})();
