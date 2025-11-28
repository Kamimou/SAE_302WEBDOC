document.addEventListener('DOMContentLoaded', () => {
  // --- Récupération des éléments ---
  const images = Array.from(document.querySelectorAll('.carousel-image'));
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const captionEl = document.querySelector('.carousel-caption');

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  if (!images.length) return;

  let currentIndex = 0;

  // --- Mise à jour de la légende avec animation ---
  function updateCaption() {
    if (!captionEl) return;
    const newText = images[currentIndex].dataset.caption || images[currentIndex].alt || '';

    captionEl.textContent = newText;

    // Reset + relance l'animation CSS
    captionEl.classList.remove('caption-animate');
    // force reflow
    void captionEl.offsetWidth;
    captionEl.classList.add('caption-animate');
  }

  // --- Mise à jour du carrousel (3 images visibles) ---
  function updateCarousel() {
    const total = images.length;

    images.forEach((img, i) => {
      img.classList.remove('visible', 'active', 'prev', 'next');
    });

    const getIndex = (i) => (i + total) % total;

    const prevIndex = getIndex(currentIndex - 1);
    const nextIndex = getIndex(currentIndex + 1);

    images[prevIndex].classList.add('visible', 'prev');
    images[currentIndex].classList.add('visible', 'active');
    images[nextIndex].classList.add('visible', 'next');

    updateCaption();
  }

  // --- Navigation carrousel ---
  function goNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  }

  nextBtn?.addEventListener('click', goNext);
  prevBtn?.addEventListener('click', goPrev);

  // --- Clic sur une image : ouverture de la lightbox ---
  function openLightbox(index) {
    const img = images[index];
    if (!img) return;

    currentIndex = index;
    updateCarousel(); // pour que le carrousel se cale

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCaption.textContent = img.dataset.caption || img.alt || '';

    lightbox.classList.add('open');
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  // --- Navigation dans la lightbox ---
  function lightboxNextImg() {
    currentIndex = (currentIndex + 1) % images.length;
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCaption.textContent = img.dataset.caption || img.alt || '';
    updateCarousel();
  }

  function lightboxPrevImg() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCaption.textContent = img.dataset.caption || img.alt || '';
    updateCarousel();
  }

  lightboxNext?.addEventListener('click', lightboxNextImg);
  lightboxPrev?.addEventListener('click', lightboxPrevImg);

  // --- Fermeture de la lightbox ---
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // --- Navigation au clavier ---
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lightboxNextImg();
      if (e.key === 'ArrowLeft') lightboxPrevImg();
    } else {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }
  });

  // --- Initialisation ---
  updateCarousel();
});
