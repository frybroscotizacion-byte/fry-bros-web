(() => {
  const container = document.querySelector('.ambient');
  const video = container?.querySelector('video');
  const toggle = document.querySelector('.ambient-toggle');
  if (!video || !toggle) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let wantsMotion = !reduced.matches && !navigator.connection?.saveData;
  let sourceLoaded = false;
  const updateLabel = () => {
    const active = wantsMotion;
    toggle.textContent = active ? 'Ⅱ Pausar fondo' : '▷ Activar fondo';
    toggle.setAttribute('aria-label', active ? 'Pausar video de fondo' : 'Activar video de fondo');
    toggle.setAttribute('aria-pressed', String(active));
  };
  const loadSource = () => {
    if (sourceLoaded) return;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    video.src = mobile ? video.dataset.mobileSrc : video.dataset.desktopSrc;
    video.muted = true;
    sourceLoaded = true;
  };
  const resume = () => {
    if (!wantsMotion || document.hidden) return;
    loadSource();
    const result = video.play();
    result?.catch(() => { wantsMotion = false; updateLabel(); });
  };
  video.addEventListener('playing', () => { container.classList.add('has-video'); updateLabel(); });
  video.addEventListener('pause', updateLabel);
  video.addEventListener('error', () => { container.classList.remove('has-video'); wantsMotion = false; updateLabel(); });
  toggle.addEventListener('click', () => {
    wantsMotion = !wantsMotion;
    if (wantsMotion) resume(); else video.pause();
    updateLabel();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); else resume(); });
  reduced.addEventListener('change', () => { wantsMotion = !reduced.matches && !navigator.connection?.saveData; if (wantsMotion) resume(); else video.pause(); updateLabel(); });
  updateLabel();
  resume();
})();
