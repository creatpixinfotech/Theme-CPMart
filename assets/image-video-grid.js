function videoToggle(videoId) {
  const originalVideo = document.getElementById(videoId);

  const fullscreenContainer = document.getElementById('video-fullscreen');
  const fullscreenVideo = document.getElementById('fullscreen-video');

  fullscreenVideo.src = originalVideo.querySelector('source').src;
  fullscreenVideo.poster = originalVideo.poster;

  fullscreenContainer.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  fullscreenVideo.play();
}

function closeFullscreen() {
  const fullscreenContainer = document.getElementById('video-fullscreen');
  const fullscreenVideo = document.getElementById('fullscreen-video');

  fullscreenVideo.pause();
  fullscreenVideo.currentTime = 0;

  fullscreenContainer.style.display = 'none';
  document.body.style.overflow = 'auto';
}
document.getElementById('video-fullscreen').addEventListener('click', function (event) {
  var videoContener = document.querySelector('.video-contener');
  if (!videoContener.contains(event.target)) {
    closeFullscreen();
  }
});
