/* Irish Studies - Parents area: family link (Harbor), per-child progress, settings. */
(function () {
  'use strict';
  const IR = window.IR, h = IR.h;
  const D = () => IR.D();
  const fromHarborParent = () => { try { return sessionStorage.getItem('ir_harbor_parent') === '1'; } catch (e) { return false; } };
  let unlockedAt = 0;
  const unlocked = () => fromHarborParent() || (Date.now() - unlockedAt < 10 * 60 * 1000);
  const ago = t => { if (!t) return 'not yet'; const m = Math.round((Date.now() - t) / 60000); return m < 2 ? 'just now' : m < 90 ? m + ' min ago' : m < 2160 ? Math.round(m / 60) + ' h ago' : Math.round(m / 1440) + ' days ago'; };

  IR.screens.parent = function () {
    const d = D();
    const wrap = h('div', null, IR.topbar('Parents', '/'));
    const needPin = !unlocked() && (d.famPin || d.pin);
    if (needPin) {
      const inp = h('input', { class: 'inp', type: 'password', inputmode: 'numeric', placeholder: 'PIN', maxlength: 8 });
      const fb = h('div', { class: 'feedback' });
      wrap.append(h('div', { class: 'card' }, h('h3', null, '🔒 Parents only'), h('p', { class: 'muted small mt8' }, 'Enter the Harbor parent PIN.'), h('div', { class: 'mt8' }, inp), h('button', { class: 'btn wide mt8', onclick: () => {
        if (inp.value && (inp.value === d.famPin || inp.value === d.pin)) { unlockedAt = Date.now(); IR.render(); } else { fb.className = 'feedback bad'; fb.textContent = 'That PIN does not match.'; }
      } }, 'Unlock'), fb));
      return wrap;
    }

    /* ---- family link ---- */
    const msg = h('div', { class: 'feedback' });
    const code = h('input', { class: 'inp', placeholder: 'MA-AB12', maxlength: 7, autocapitalize: 'characters', value: d.fam || '', oninput: e => { e.target.value = IR.fmtFam(e.target.value); } });
    wrap.append(h('div', { class: 'card' }, h('h3', null, '🏠 Family link'),
      d.fam ? h('p', { class: 'mt8' }, 'Linked to family ', h('b', null, d.fam), '. Progress is saved to the family record, so Harbor can show it.') : h('p', { class: 'muted small mt8' }, 'Not linked yet. Enter the same family code you use in Harbor, Math Adventure and Words Adventure.'),
      h('div', { class: 'mt8' }, code),
      h('div', { class: 'row mt8' },
        h('button', { class: 'btn', onclick: async () => { msg.textContent = 'Joining…'; msg.className = 'feedback'; const r = await IR.joinFamily(code.value, IR.managed()); msg.textContent = r.msg; msg.className = 'feedback ' + (r.ok ? 'good' : 'bad'); if (r.ok) setTimeout(IR.render, 700); } }, d.fam ? 'Re-sync profiles' : 'Join'),
        d.fam ? h('button', { class: 'btn ghost', onclick: async () => { msg.textContent = 'Syncing…'; const ok = await IR.syncNow(); msg.className = 'feedback ' + (ok ? 'good' : 'bad'); msg.textContent = ok ? 'Synced ✓ Harbor will show the latest.' : 'Could not sync. Check the internet.'; } }, '↻ Sync now') : null,
        d.fam && !IR.managed() ? h('button', { class: 'btn ghost', onclick: () => { if (confirm('Unlink this device from the family? Progress stays on this device.')) { IR.leaveFamily(); IR.render(); } } }, 'Unlink') : null), msg));

    /* ---- children ---- */
    wrap.append(h('h3', { class: 'sec' }, '👧 Explorers'));
    if (!d.profiles.length) wrap.append(h('p', { class: 'muted' }, 'No explorers yet.'));
    d.profiles.forEach(p => {
      const pr = IR.PR(p.id); const quizzes = Object.entries(pr.quiz); const last = Math.max(0, ...[].concat(Object.values(pr.labs), Object.values(pr.quiz), Object.values(pr.games)).map(x => x.at || 0));
      const rows = IR.modules.map(m => { const mp = IR.modProgress(m.id, p.id); return h('div', { class: 'mt8' }, h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('span', null, m.emoji + ' ' + m.title), h('b', null, mp.badges + '/' + mp.total + ' badges')), h('div', { class: 'bar mt8' }, h('i', { style: { width: Math.round(100 * mp.badges / Math.max(1, mp.total)) + '%' } }))); });
      const card = h('div', { class: 'card' }, h('div', { class: 'row' }, h('span', { style: { fontSize: '2.2rem' } }, p.avatar), h('div', { style: { flex: 1 } }, h('b', null, p.name), h('div', { class: 'muted small' }, (IR.BANDS.find(b => b.id === p.band) || {}).name + (p.gradeId !== undefined && p.gradeId !== '' ? ' · grade ' + p.gradeId : '') + ' · active ' + ago(last)))),
        h('div', { class: 'row wrap mt8' }, h('span', { class: 'chip gold' }, '⭐ ' + IR.totalStars(p.id)), h('span', { class: 'chip' }, '🗣️ ' + IR.wordsKnown(p.id) + ' words known'), h('span', { class: 'chip' }, '📖 ' + Object.keys(pr.listened).length + ' stories read'), h('span', { class: 'chip grey' }, '🏅 ' + Object.keys(pr.badges).length + ' badges')),
        rows, quizzes.length ? h('p', { class: 'muted small mt12' }, 'Best quiz scores: ' + quizzes.sort((a, b) => b[1].at - a[1].at).slice(0, 6).map(([k, v]) => ((IR.unit(k) || {}).title || k) + ' ' + v.pct + '%').join(' · ')) : null);
      const acts = h('div', { class: 'row wrap mt12' });
      if (!IR.managed()) acts.append(h('select', { class: 'inp', style: { width: 'auto' }, onchange: e => { p.band = e.target.value; IR.save(); IR.render(); } }, IR.BANDS.map(b => h('option', Object.assign({ value: b.id }, p.band === b.id ? { selected: true } : {}), b.name + ' (' + b.ages + ')'))));
      acts.append(h('button', { class: 'btn ghost small', onclick: () => { if (confirm('Reset all of ' + p.name + '’s progress in Irish Studies? This cannot be undone.')) { d.prog[p.id] = IR.emptyPR(); IR.save(); IR.render(); } } }, 'Reset progress'));
      card.append(acts); wrap.append(card);
    });

    /* ---- settings ---- */
    const tog = (label, key) => h('label', { class: 'row', style: { padding: '8px 0' } }, h('input', Object.assign({ type: 'checkbox', onchange: e => { d[key] = e.target.checked; IR.save(); } }, d[key] ? { checked: true } : {})), h('span', null, label));
    wrap.append(h('h3', { class: 'sec' }, '⚙️ Settings'),
      h('div', { class: 'card' }, tog('Sound effects', 'sound'), tog('Read aloud (speech)', 'tts'), IR.voiceTip(),
        h('label', { class: 'lbl' }, 'Local parent PIN on this device (optional)'), h('input', { class: 'inp', type: 'password', inputmode: 'numeric', maxlength: 8, value: d.pin || '', placeholder: 'e.g. 1234', onchange: e => { d.pin = e.target.value.trim(); IR.save(); } })),
      h('div', { class: 'card flat' }, h('h3', null, 'How this works with Harbor'),
        h('p', { class: 'muted small mt8' }, 'Open Irish Studies from the Harbor home screen and the family and the right child are chosen for you. Stars, badges, quiz scores, stories read and Irish words known are saved to the family record (families/' + (d.fam || 'XX-0000') + '_ir), and Harbor’s Parent area shows them next to Math and Words. Children are added and edited in Harbor; changes show up here when you re-sync.')),
      h('p', { class: 'muted small' }, 'Irish Studies v' + IR.VERSION));
    return wrap;
  };
})();
