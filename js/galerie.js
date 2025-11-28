document.addEventListener('DOMContentLoaded', () => {
  // --- Carrousel ---
  const images = Array.from(document.querySelectorAll('.carousel-image'));
  const caption = document.querySelector('.carousel-caption');
  const btnPrev = document.querySelector('.carousel-prev');
  const btnNext = document.querySelector('.carousel-next');

  // --- Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  if (!images.length) return;

  let currentIndex = 0;
  const len = images.length;
  const mod = (n, m) => ((n % m) + m) % m;

  // ---------------- MISE À JOUR CARROUSEL ----------------

  function updateCarousel() {
    images.forEach(img => {
      img.classList.remove('active', 'prev', 'next', 'visible');
    });

    const center = mod(currentIndex, len);
    const prev = mod(center - 1, len);
    const next = mod(center + 1, len);

    images[center].classList.add('active', 'visible');
    images[prev].classList.add('prev', 'visible');
    images[next].classList.add('next', 'visible');

    const img = images[center];
    if (caption) {
      caption.textContent = img.dataset.caption || img.alt || '';
    }
  }

  function goNext() {
    currentIndex = mod(currentIndex + 1, len);
    updateCarousel();
    if (lightbox && lightbox.classList.contains('open')) {
      refreshLightbox();
    }
  }

  function goPrev() {
    currentIndex = mod(currentIndex - 1, len);
    updateCarousel();
    if (lightbox && lightbox.classList.contains('open')) {
      refreshLightbox();
    }
  }

  // ---------------- LIGHTBOX ----------------

  function openLightbox(index) {
    currentIndex = index;
    updateCarousel();
    refreshLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function refreshLightbox() {
    const img = images[mod(currentIndex, len)];
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCaption.textContent = img.dataset.caption || img.alt || '';
  }

  // Boutons carrousel
  if (btnPrev) btnPrev.addEventListener('click', goPrev);
  if (btnNext) btnNext.addEventListener('click', goNext);

  // Clic sur image = ouverture lightbox
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  // Boutons lightbox
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', goPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', goNext);

  // Fermer en cliquant sur le fond
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Navigation clavier
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  });

  // Init
  updateCarousel();
});
