const cover = document.getElementById('cover');
const invite = document.getElementById('invitation');
const openBtn = document.getElementById('openInvite');
const musicToggle = document.getElementById('musicToggle');
let ytPlayer;
let playerReady = false;
let isPlaying = false;

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('youtubePlayer', {
    height: '1',
    width: '1',
    videoId: '0gmK98Rs9YM',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      loop: 1,
      playlist: '0gmK98Rs9YM'
    },
    events: {
      onReady: () => { playerReady = true; },
      onStateChange: (event) => {
        isPlaying = event.data === YT.PlayerState.PLAYING;
        musicToggle.classList.toggle('playing', isPlaying);
        musicToggle.textContent = isPlaying ? '❚❚' : '♫';
      }
    }
  });
};

openBtn.addEventListener('click', () => {
  cover.style.transition = 'opacity .7s ease';
  cover.style.opacity = '0';
  setTimeout(() => {
    cover.style.display = 'none';
    invite.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (playerReady) ytPlayer.playVideo();
  }, 700);
});

musicToggle.addEventListener('click', () => {
  if (!playerReady) return;
  if (isPlaying) ytPlayer.pauseVideo();
  else ytPlayer.playVideo();
});

const weddingDate = new Date('2027-06-21T14:30:00+08:00');
function updateCountdown(){
  const now = new Date();
  let diff = weddingDate - now;
  if (diff < 0) diff = 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('days').textContent = String(d).padStart(2,'0');
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

document.getElementById('giftBtn').addEventListener('click', () => {
  document.getElementById('giftDetails').classList.toggle('hidden-panel');
});

const calendarLink = document.getElementById('calendarLink');
const title = encodeURIComponent('Alexander & Beatrice Wedding');
const details = encodeURIComponent('Wedding ceremony and reception');
const location = encodeURIComponent('La Bellezza Garden, Tagaytay City, Philippines');
calendarLink.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270621T063000Z/20270621T143000Z&details=${details}&location=${location}`;
calendarLink.target = '_blank';
calendarLink.rel = 'noopener';
