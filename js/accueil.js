document.querySelectorAll('.ingredient-item a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const img = link.querySelector('img');
    img.style.boxShadow = '0 0 25px 5px #4CAF50';

    setTimeout(() => {
      window.location.href = link.href;
    }, 400);
  });
});
