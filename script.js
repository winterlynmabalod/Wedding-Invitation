const openInvite = document.getElementById('openInvite');
const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');
const musicButton = document.getElementById('musicButton');
const youtubePlayer = document.getElementById('youtubePlayer');
const calendarLink = document.getElementById('calendarLink');

let musicPlaying = false;
let coverOpened = false;

function youtubeCommand(command) {
  if (!youtubePlayer || !youtubePlayer.contentWindow) return;
  youtubePlayer.contentWindow.postMessage(
    JSON.stringify({ event: 'command', func: command, args: [] }),
    '*'
  );
}

function setMusicUI(playing) {
  musicPlaying = playing;
  musicButton.classList.toggle('playing', playing);
  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  musicButton.querySelector('.music-note').textContent = playing ? '❚❚' : '♪';
}

function tryPlayMusic() {
  youtubeCommand('playVideo');
  setMusicUI(true);
}

function openInvitation(event) {
  // Keep the anchor as a fallback, but enhance it with animation when JS works.
  if (event) event.preventDefault();
  if (coverOpened) return;
  coverOpened = true;
  document.body.classList.add('opened');

  // This is triggered by a real user tap/click, which gives browsers the best chance to allow audio.
  window.setTimeout(tryPlayMusic, 250);

  window.setTimeout(() => {
    invitation.scrollIntoView({ behavior: 'smooth', block: 'start' });
    cover.style.display = 'none';
  }, 760);
}

if (openInvite) {
  openInvite.addEventListener('click', openInvitation);
  openInvite.addEventListener('touchend', (event) => {
    // Prevent duplicate click on some mobile browsers.
    if (!coverOpened) openInvitation(event);
  }, { passive: false });
}

if (musicButton) {
  musicButton.addEventListener('click', () => {
    if (musicPlaying) {
      youtubeCommand('pauseVideo');
      setMusicUI(false);
    } else {
      tryPlayMusic();
    }
  });
}

// Countdown
const countdown = document.getElementById('countdown');
if (countdown) {
  const target = new Date(countdown.dataset.date).getTime();
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  const updateCountdown = () => {
    const distance = Math.max(0, target - Date.now());
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    daysEl.textContent = String(days).padStart(3, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Add-to-calendar link (Google Calendar)
if (calendarLink) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Alexander & Beatrice Wedding',
    dates: '20270621T063000Z/20270621T143000Z',
    details: 'Join us as we celebrate the wedding of Alexander Reyes and Beatrice Lorenzo.',
    location: 'Tagaytay City, Philippines'
  });
  calendarLink.href = `https://calendar.google.com/calendar/render?${params.toString()}`;
  calendarLink.target = '_blank';
  calendarLink.rel = 'noopener';
}

// Gentle reveal-on-scroll animation
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}
