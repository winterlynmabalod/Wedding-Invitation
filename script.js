const weddingDate = new Date("2027-06-21T14:30:00+08:00");
const openButton = document.getElementById("openInvitation");
const invitation = document.getElementById("invitation");
const musicButton = document.getElementById("musicButton");
const calendarButton = document.getElementById("calendarButton");

let player;
let playerReady = false;
let musicPlaying = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    height: "0",
    width: "0",
    videoId: "0gmK98Rs9YM",
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: "0gmK98Rs9YM",
      playsinline: 1,
      rel: 0
    },
    events: {
      onReady: () => {
        playerReady = true;
      },
      onStateChange: (event) => {
        musicPlaying = event.data === YT.PlayerState.PLAYING;
        musicButton.classList.toggle("playing", musicPlaying);
        musicButton.setAttribute(
          "aria-label",
          musicPlaying ? "Pause music" : "Play music"
        );
      }
    }
  });
}

function tryPlayMusic() {
  if (!playerReady || !player) return;

  try {
    player.setVolume(45);
    player.playVideo();
  } catch (error) {
    console.log("Music requires another user interaction.", error);
  }
}

openButton.addEventListener("click", () => {
  invitation.hidden = false;
  document.body.classList.add("opened");

  requestAnimationFrame(() => {
    invitation.scrollIntoView({ behavior: "smooth", block: "start" });
    observeSections();
  });

  tryPlayMusic();
});

musicButton.addEventListener("click", () => {
  if (!playerReady || !player) return;

  if (musicPlaying) {
    player.pauseVideo();
  } else {
    player.setVolume(45);
    player.playVideo();
  }
});

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;

  if (difference <= 0) {
    document.getElementById("days").textContent = "000";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

let observerStarted = false;

function observeSections() {
  if (observerStarted) return;
  observerStarted = true;

  const sections = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    sections.forEach(section => section.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  sections.forEach(section => observer.observe(section));
}

calendarButton.addEventListener("click", () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    "UID:alexander-beatrice-wedding-20270621",
    "DTSTAMP:20260902T000000Z",
    "DTSTART:20270621T063000Z",
    "DTEND:20270621T143000Z",
    "SUMMARY:Alexander & Beatrice's Wedding",
    "LOCATION:Tagaytay City, Philippines",
    "DESCRIPTION:Celebrate the wedding of Alexander and Beatrice.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "alexander-beatrice-wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
