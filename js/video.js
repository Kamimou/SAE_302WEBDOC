document.addEventListener("DOMContentLoaded", () => {
  const frame = document.querySelector(".video-frame");
  if (!frame) return;

  const video = frame.querySelector("video");
  const overlay = frame.querySelector(".video-overlay");

  function hideOverlay() {
    overlay.classList.add("hidden");
  }

  function showOverlay() {
    overlay.classList.remove("hidden");
  }

  // Clic sur l’overlay → play / pause
  overlay.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });

  video.addEventListener("play", hideOverlay);
  video.addEventListener("pause", showOverlay);
  video.addEventListener("ended", showOverlay);
});
