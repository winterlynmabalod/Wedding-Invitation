const cover = document.getElementById('cover');
const invite = document.getElementById('invitation');
const openBtn = document.getElementById('openInvite');
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

openBtn.addEventListener('click', () => {
  cover.style.transition = 'opacity .7s ease';
  cover.style.opacity = '0';
  setTimeout(() => {
    cover.style.display = 'none';
    invite.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    music.play().then(() => musicToggle.classList.add('playing')).catch(() => {});
  }, 700);
});

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try { await music.play(); musicToggle.classList.add('playing'); } catch(e) {}
  } else {
    music.pause(); musicToggle.classList.remove('playing');
  }
});

const weddingDate = new Date('2025-06-21T14:30:00');
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

document.getElementById('rsvpForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  document.getElementById('rsvpMessage').textContent = `Thank you, ${data.get('name')}! Your RSVP has been recorded in this demo.`;
  e.target.reset();
});

const calendarLink = document.getElementById('calendarLink');
const title = encodeURIComponent('Alexander & Beatrice Wedding');
const details = encodeURIComponent('Wedding ceremony and reception');
const location = encodeURIComponent('La Bellezza Garden, Tagaytay City, Philippines');
calendarLink.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20250621T063000Z/20250621T143000Z&details=${details}&location=${location}`;
calendarLink.target = '_blank';
calendarLink.rel = 'noopener';
