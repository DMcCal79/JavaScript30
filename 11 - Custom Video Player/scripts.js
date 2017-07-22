/*Get the elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*Build functions*/
function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function UpdateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  // console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  // console.log(this.name);
  // console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  // console.log(percent);
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  // console.log(scrubTime);
}


/*Hook up the event listeners*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', UpdateButton);
video.addEventListener('pause', UpdateButton);
video.addEventListener('play', handleProgress);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
})

ranges.forEach(range => {
  range.addEventListener('mousemove', handleRangeUpdate);
})
let mousedown = false;
progress.addEventListener('click', scrub);
/*This will allow scrubbing by moving the mouse
only if the mouse remains clicked*/
progress.addEventListener('mousemove', (e)=> {
  if (mousedown) {
    scrub(e);
    }
  })

progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = false);
