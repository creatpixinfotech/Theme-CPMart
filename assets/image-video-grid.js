function videoToggle(videoId) {
  var videoElement = document.getElementById(videoId);
  videoElement.style.width = '100%';
  videoElement
    ? videoElement.paused
      ? videoElement.play()
      : videoElement.pause()
    : console.error('Video element not found for id:', videoId);
}
