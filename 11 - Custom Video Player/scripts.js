const video = document.querySelector("video");
const playButton = document.querySelector(".toggle");
const volume = document.getElementById("volume");
const playBackRate = document.getElementById("rate");
const buttons = document.querySelectorAll(".skips");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const fullscreenButton = document.querySelector(".full");

function togglePlay () {
    if(video.paused){
        video.play();
        playButton.textContent = "❚ ❚";
    } else {
        video.pause();
        playButton.textContent = "►";
    }
}

function updateVolume (e) {
    video.volume = e.target.value;
}

function updatePlayBack (e) {
    video.playbackRate = e.target.value;
}

function skipButton (e) {
    video.currentTime += parseFloat(e.target.dataset.skip);
}

function updateProgress (e) {
    if(e.type === "click" || e.buttons === 1){
        const width = (e.offsetX / progress.offsetWidth) * 100;
        progressBar.style.flexBasis = `${width}%`;
        const time = width * video.duration / 100;
        video.currentTime = parseFloat(time);
    }
}

function toggleFullScreen () {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE/Edge */
    video.msRequestFullscreen();
  }
}

function handleProgress () {
    const width = (video.currentTime / video.duration ) * 100;
    progressBar.style.flexBasis = `${width}%`;
}

playButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

volume.addEventListener("change", updateVolume);
volume.addEventListener("mousemove", updateVolume);

playBackRate.addEventListener("change", updatePlayBack);
playBackRate.addEventListener("mousemove", updatePlayBack);

buttons.forEach(button => button.addEventListener("click", skipButton));

progress.addEventListener("click", updateProgress);
progress.addEventListener("mousemove", updateProgress);

fullscreenButton.addEventListener("click", toggleFullScreen);

video.addEventListener('timeupdate', handleProgress);