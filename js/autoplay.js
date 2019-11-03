const BGVIDEO = document.getElementsByClassName('actual-video');

console.log(BGVIDEO);

BGVIDEO.autoplay = true;
BGVIDEO.allowedToPlay = true;
BGVIDEO.controls

var autoplay = BGVIDEO.autoplay;

console.log(autoplay);s

var promise = BGVIDEO.play();