(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const tbd = v => v ? v : '<span class="tbd">A verificar</span>';

  /* Menu mobile */
  const btn = $('.menu-btn'), menu = $('#menu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
  });

  /* Seletor genérico de botões com painel */
  function tabs(boxId, panelId, items, label, render) {
    const box = $(boxId), panel = $(panelId);
    box.innerHTML = items.map((it, i) => `<button type="button" aria-pressed="false" data-i="${i}">${label(it, i)}</button>`).join('');
    const select = i => {
      box.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-pressed', i === j));
      panel.innerHTML = render(items[i]);
    };
    box.addEventListener('click', e => { const b = e.target.closest('button'); if (b) select(+b.dataset.i); });
    select(0);
  }

  tabs('#ciclo', '#ciclo-painel', ETAPAS, (e, i) => `${i + 1}. ${e.t}`, e => `
    <h3>${e.t}</h3>
    <dl><dt>O que acontece</dt><dd>${e.o}</dd><dt>Quem participa</dt><dd>${e.q}</dd>
    <dt>Importância</dt><dd>${e.i}</dd><dt>Exemplo prático</dt><dd>${e.e}</dd></dl>`);

  tabs('#carreira', '#carreira-painel', NIVEIS, n => n.n, n => `
    <h3>${n.n}</h3>
    <p class="price">${n.f}<span class="badge">Preliminar, não verificado</span></p>
    ${n.nota ? `<p class="muted">${n.nota}</p>` : ''}
    <dl><dt>Responsabilidades</dt><dd>${n.r}</dd><dt>Conhecimentos esperados</dt><dd>${n.c}</dd>
    <dt>Possibilidades de evolução</dt><dd>${n.v}</dd></dl>`);

  /* Faculdades: filtros e comparador */
  const lista = $('#lista'), form = $('#filtros'), aviso = $('#filtros-aviso'), comp = $('#comparador');
  const sel = new Set();
  const key = f => f.nome + '|' + f.curso;
  const cur = {};
  FACULDADES.forEach(f => cur[key(f)] = f);

  // Filtros sem dados ficam desativados até haver informação verificada
  ['grau', 'modalidade'].forEach(c => {
    if (!FACULDADES.some(f => f[c])) form.elements[c].disabled = true;
  });
  if (form.elements.grau.disabled || form.elements.modalidade.disabled)
    aviso.textContent = 'Os filtros de grau e modalidade serão ativados quando esses dados forem verificados.';

  function drawList() {
    const v = Object.fromEntries(new FormData(form));
    const out = FACULDADES.filter(f =>
      (!v.cat || f.cat === v.cat) && (!v.rede || f.rede === v.rede) &&
      (!v.grau || f.grau === v.grau) && (!v.modalidade || f.modalidade === v.modalidade));
    lista.innerHTML = out.length ? out.map(f => `
      <article class="card">
        <h4>${f.nome}</h4>
        <p class="tag">${f.cat === 'A' ? 'Engenharia de Software' : 'Curso relacionado'} (${f.rede.toLowerCase()})</p>
        <dl><dt>Curso</dt><dd>${f.curso}</dd><dt>Grau</dt><dd>${tbd(f.grau)}</dd><dt>Modalidade</dt><dd>${tbd(f.modalidade)}</dd>
        <dt>Campus</dt><dd>${tbd(f.campus)}</dd><dt>Duração</dt><dd>${tbd(f.duracao)}</dd>
        <dt>Mensalidade</dt><dd>${tbd(f.mensalidade)}</dd>
        <dt>Link oficial</dt><dd>${f.link ? `<a href="${f.link}" target="_blank" rel="noopener">Site da instituição</a>` : tbd()}</dd></dl>
        <label><input type="checkbox" data-k="${key(f)}" ${sel.has(key(f)) ? 'checked' : ''}> Comparar</label>
      </article>`).join('') : '<p>Nenhuma instituição corresponde a esses filtros.</p>';
  }

  function drawComp() {
    if (sel.size < 2) { comp.innerHTML = '<p class="muted">Selecione pelo menos 2 instituições.</p>'; return; }
    const rows = [['Curso', 'curso'], ['Rede', 'rede'], ['Grau', 'grau'], ['Modalidade', 'modalidade'], ['Campus', 'campus'], ['Duração', 'duracao'], ['Mensalidade', 'mensalidade']];
    const items = [...sel].map(k => cur[k]);
    comp.innerHTML = `<table><thead><tr><th scope="col">Critério</th>${items.map(f => `<th scope="col">${f.nome}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(([l, c]) => `<tr><th scope="row">${l}</th>${items.map(f => `<td>${tbd(f[c])}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }

  form.addEventListener('change', drawList);
  form.addEventListener('submit', e => e.preventDefault());
  lista.addEventListener('change', e => {
    const k = e.target.dataset.k; if (!k) return;
    if (e.target.checked) {
      if (sel.size >= 3) { e.target.checked = false; aviso.textContent = 'Você pode comparar no máximo 3 instituições.'; return; }
      sel.add(k);
    } else sel.delete(k);
    drawComp();
  });
  drawList(); drawComp();

  /* Analogias */
  $('#analogias').innerHTML = ANALOGIAS.map(a => `
    <details><summary>${a.t}</summary>
    <div class="body"><div><h4>Conceito técnico</h4><p>${a.c}</p></div><div><h4>Analogia</h4><p>${a.a}</p></div></div></details>`).join('');

  /* Feira: espaços reservados até haver registros reais */
  const slots = (n, txt) => Array.from({ length: n }, () => `<div class="slot">${txt}</div>`).join('');
  $('#galeria').innerHTML = FEIRA.fotos.length
    ? FEIRA.fotos.map(f => `<figure><img src="${f.src}" alt="${f.alt || ''}" loading="lazy">${f.legenda ? `<figcaption>${f.legenda}</figcaption>` : ''}</figure>`).join('')
    : slots(6, 'Espaço reservado para fotografia real da Feira');
  $('#videos').innerHTML = FEIRA.videos.length
    ? FEIRA.videos.map(v => `<figure><video src="${v.src}" controls preload="none"></video>${v.legenda ? `<figcaption>${v.legenda}</figcaption>` : ''}</figure>`).join('')
    : slots(2, 'Espaço reservado para vídeo real da Feira');
})();
