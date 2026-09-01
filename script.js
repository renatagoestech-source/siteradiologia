// ============================================================
// Radiologia — Fundamentos & Técnica
// Interatividade: menu mobile, navegação ativa, escala de
// densidades, diagrama do tubo de raios X e contador de seções.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function closeMenu(){
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu(){
    const open = sidebar.classList.toggle('is-open');
    overlay.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
  sidebar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Navegação ativa via IntersectionObserver ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const trackedSections = Array.from(document.querySelectorAll('[data-section]'));
  const visited = new Set();
  const doseCounter = document.getElementById('doseCounter');
  const totalSections = trackedSections.length;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = navLinks.find(a => a.getAttribute('href') === '#' + id);

      if (entry.isIntersecting){
        navLinks.forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');

        if (!visited.has(id)){
          visited.add(id);
          if (doseCounter){
            doseCounter.textContent = visited.size + '/' + totalSections + ' seções vistas';
          }
        }
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  trackedSections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Escala de densidades radiográficas ---------- */
  const densityInfo = {
    ar: 'O ar tem densidade praticamente nula e baixíssimo número atômico: quase não atenua o feixe, por isso aparece preto (regiões pulmonares, alças intestinais com gás).',
    gordura: 'O tecido adiposo é pouco denso, absorvendo um pouco mais que o ar. Aparece em tons de cinza escuro, contornando órgãos e planos musculares.',
    agua: 'Água e a maioria dos tecidos moles (músculo, órgãos, sangue) têm densidade intermediária e aparecem em cinza médio na imagem.',
    osso: 'O tecido ósseo é denso e rico em cálcio, de número atômico mais alto: absorve grande parte do feixe e aparece branco-acinzentado.',
    metal: 'Próteses, clipes cirúrgicos e outros metais têm altíssima densidade e número atômico: absorvem quase toda a radiação, aparecendo em branco intenso.'
  };

  const densityCards = document.querySelectorAll('.density-card');
  const densityExplain = document.getElementById('densityExplain');

  densityCards.forEach(card => {
    card.addEventListener('click', () => {
      densityCards.forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');
      const key = card.getAttribute('data-density');
      if (densityExplain && densityInfo[key]){
        densityExplain.textContent = densityInfo[key];
      }
    });
  });

  /* ---------- Diagrama do tubo de raios X ---------- */
  const tubeInfo = {
    filamento: {
      title: 'Filamento',
      text: 'Um fio de tungstênio aquecido por corrente elétrica, que libera elétrons por efeito termiônico — a "nuvem" de elétrons que dará origem ao feixe.'
    },
    catodo: {
      title: 'Catodo (polo negativo)',
      text: 'Estrutura que abriga o filamento. Concentra e direciona o feixe de elétrons liberados em direção ao ânodo, do outro lado do tubo.'
    },
    anodo: {
      title: 'Ânodo giratório (polo positivo)',
      text: 'Alvo metálico, geralmente de tungstênio, onde os elétrons colidem em alta velocidade. É nesse impacto que a energia cinética se converte em raios X. O giro contínuo distribui o calor gerado, evitando danos ao alvo.'
    },
    feixe: {
      title: 'Feixe útil',
      text: 'O conjunto de fótons de raios X que emerge do tubo em direção ao paciente e ao receptor de imagem, após ser colimado para a área de interesse.'
    },
    janela: {
      title: 'Janela do tubo',
      text: 'Abertura na blindagem de chumbo do invólucro do tubo por onde o feixe útil escapa; o restante da radiação, espalhada em outras direções, é bloqueado.'
    }
  };

  const tubeParts = document.querySelectorAll('.tube-part');
  const tubeInfoTitle = document.getElementById('tubeInfoTitle');
  const tubeInfoText = document.getElementById('tubeInfoText');

  function activateTubePart(part){
    const key = part.getAttribute('data-part');
    const data = tubeInfo[key];
    if (!data) return;

    tubeParts.forEach(p => {
      p.classList.remove('is-active');
      p.setAttribute('aria-pressed', 'false');
    });
    part.classList.add('is-active');
    part.setAttribute('aria-pressed', 'true');

    if (tubeInfoTitle) tubeInfoTitle.textContent = data.title;
    if (tubeInfoText) tubeInfoText.textContent = data.text;
  }

  tubeParts.forEach(part => {
    part.addEventListener('click', () => activateTubePart(part));
    part.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        activateTubePart(part);
      }
    });
  });

  /* ---------- Apenas um exame aberto por vez, por região ---------- */
  document.querySelectorAll('.exam-list').forEach(list => {
    const cards = list.querySelectorAll('.exam-card');
    cards.forEach(card => {
      card.addEventListener('toggle', () => {
        if (card.open){
          cards.forEach(other => {
            if (other !== card) other.open = false;
          });
        }
      });
    });
  });

});
