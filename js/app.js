const photos = [
  ["WhatsApp Image 2026-11-02 at 20.59.22.jpeg", "Hasta con sueñito consigues ser mi foto favorita."],
  ["WhatsApp Image 2026-11-02 at 20.59.23.jpeg", "París tenía la pirámide, pero tú eras lo más bonito de la foto."],
  ["WhatsApp Image 2026-11-02 at 20.59.31 (1).jpeg", "Mi niña trabajadora, preciosa y capaz de lograr todo lo que se proponga."],
  ["WhatsApp Image 2026-11-02 at 20.59.31 (2).jpeg", "La del espejo también sabe que eres demasiado bonita."],
  ["WhatsApp Image 2026-11-02 at 20.59.31.jpeg", "Una foto seria para fingir que no me derrito viéndote."],
  ["WhatsApp Image 2026-11-02 at 20.59.32.jpeg", "Esa carita que hace que extrañarte sea tan fácil."],
  ["WhatsApp Image 2026-11-02 at 20.59.33.jpeg", "Mi chueñito favorito. Sí, también guardé esta."],
  ["WhatsApp Image 2026-11-02 at 20.59.34 (1).jpeg", "Bonita incluso cuando solo pasas a saludar desde el espejo."],
  ["WhatsApp Image 2026-11-02 at 20.59.34.jpeg", "Un besito guardado para cuando me haces falta."],
  ["WhatsApp Image 2026-11-02 at 20.59.39.jpeg", "¿Cómo se supone que uno no se encariñe con esa carita?"],
  ["WhatsApp Image 2026-11-02 at 20.59.41 (1).jpeg", "La niña de mis fotobesitos y de demasiados pensamientos bonitos."],
  ["WhatsApp Image 2026-11-02 at 20.59.41.jpeg", "Parece una foto normal, pero a mí me arregla el día."],
  ["WhatsApp Image 2026-11-02 at 20.59.42 (1).jpeg", "Una de las muchas razones por las que sonrío viendo mi galería."],
  ["WhatsApp Image 2026-11-02 at 20.59.42 (2).jpeg", "La pose de quien sabe perfectamente que se ve preciosa."],
  ["WhatsApp Image 2026-11-02 at 20.59.42.jpeg", "Encontrarte entre tanta gente siempre sería mi parte favorita."],
  ["WhatsApp Image 2026-11-02 at 20.59.43 (1).jpeg", "Esa carita, ese collar y yo queriendo darte muchos besitos."],
  ["WhatsApp Image 2026-11-02 at 20.59.43.jpeg", "Otro fotobesito para guardar y volver a mirar cuando te extraño."],
  ["WhatsApp Image 2026-11-02 at 20.59.44 (1).jpeg", "Una foto juntos y otra razón para querer fabricar más recuerdos."],
  ["WhatsApp Image 2026-11-02 at 20.59.44.jpeg", "No sé cómo haces, pero todas tus versiones terminan gustándome."],
  ["WhatsApp Image 2026-11-02 at 20.59.45 (1).jpeg", "Un acercamiento científicamente necesario a tus ojitos bonitos."],
  ["WhatsApp Image 2026-11-02 at 20.59.45.jpeg", "Mi niña bonita recorriendo el mundo y contándome un poquito de él."],
  ["WhatsApp Image 2026-11-02 at 20.59.47 (1).jpeg", "Hasta una foto movida consigue guardar una sonrisa tuya."],
  ["WhatsApp Image 2026-11-02 at 20.59.47.jpeg", "Un abrazo, un recuerdo y demasiadas ganas de volver a verte."],
  ["WhatsApp Image 2026-11-02 at 20.59.48 (1).jpeg", "La misma carita bonita; otro fotobesito para la colección."],
  ["WhatsApp Image 2026-11-02 at 20.59.48 (2).jpeg", "Dormidita, preciosa y consiguiendo que te extrañe un poquito más."],
  ["WhatsApp Image 2026-11-02 at 20.59.48.jpeg", "Una cita pendiente y muchas ganas de sentarme otra vez frente a ti."],
  ["WhatsApp Image 2026-11-02 at 20.59.51.jpeg", "Bonitos recuerdos y la esperanza de fabricar muchísimos más."],
  ["WhatsApp Image 2026-11-02 at 20.59.52.jpeg", "Esa carita juguetona que siempre termina sacándome una sonrisa."],
  ["WhatsApp Image 2026-11-02 at 20.59.53.jpeg", "El mundo podrá ser enorme, pero mi atención siempre termina aquí."],
  ["WhatsApp Image 2026-11-02 at 20.59.58.jpeg", "Londres te recibió, pero acá hay alguien que te extraña demasiado."],
  ["WhatsApp Image 2026-11-02 at 20.59.59.jpeg", "La viajera más bonita volviendo pronto, espero yo."],
];

const tracks = [
  { title: "Harry Stamper", artist: "HUMBE", file: "mp3/harry-stamper-lyric-video.mp3" },
  { title: "Amor de cine", artist: "HUMBE", file: "mp3/amor-de-cine.mp3" },
  { title: "309", artist: "HUMBE", file: "mp3/309.mp3" },
  {
    title: "Con los dos en la cabeza",
    artist: "Pedro Guerra, Cruz Cafuné",
    file: "mp3/Pedro Guerra, Cruz Cafuné - Con Los Dos En La Cabeza.mp3",
  },
];

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const intro = $("#intro");
const startButton = $("#start-experience");
const audio = $("#audio-player");
const player = $("#music-player");
const trackTitle = $("#track-title");
const playPause = $("#play-pause");
const progress = $("#track-progress");
const currentTimeLabel = $("#current-time");
const durationLabel = $("#track-duration");
const playlistElement = $("#playlist");
let currentTrack = 0;
let heartsTimer;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function renderGallery() {
  const gallery = $("#photo-gallery");
  const fragment = document.createDocumentFragment();

  photos.forEach(([file, caption], index) => {
    const button = document.createElement("button");
    button.className = "photo-card";
    button.type = "button";
    button.style.setProperty("--tilt", `${index % 3 === 0 ? -0.7 : index % 3 === 1 ? 0.6 : 0}deg`);
    button.setAttribute("aria-label", `Abrir fotografía: ${caption}`);

    const image = document.createElement("img");
    image.src = `images/${file}`;
    image.alt = caption;
    image.loading = index < 4 ? "eager" : "lazy";
    image.decoding = "async";

    const label = document.createElement("span");
    label.textContent = caption;
    button.append(image, label);
    button.addEventListener("click", () => openLightbox(image.src, caption));
    fragment.append(button);
  });

  gallery.append(fragment);
}

function renderPlaylist() {
  tracks.forEach((track, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.track = index;
    button.innerHTML = `<span>${track.title}</span><span>${track.artist}</span>`;
    button.addEventListener("click", () => loadTrack(index, true));
    playlistElement.append(button);
  });
  updatePlaylistState();
}

function updatePlaylistState() {
  $$("button", playlistElement).forEach((button, index) => {
    button.classList.toggle("is-active", index === currentTrack);
  });
}

function loadTrack(index, shouldPlay = false) {
  currentTrack = (index + tracks.length) % tracks.length;
  const track = tracks[currentTrack];
  audio.src = track.file;
  trackTitle.textContent = `${track.title} · ${track.artist}`;
  progress.value = 0;
  currentTimeLabel.textContent = "0:00";
  durationLabel.textContent = "0:00";
  updatePlaylistState();
  if (shouldPlay) playAudio();
}

async function playAudio() {
  try {
    await audio.play();
    player.classList.add("is-playing");
    playPause.textContent = "Ⅱ";
    playPause.setAttribute("aria-label", "Pausar música");
  } catch (error) {
    player.classList.remove("is-playing");
    playPause.textContent = "▶";
    playPause.setAttribute("aria-label", "Reproducir música");
  }
}

function pauseAudio() {
  audio.pause();
  player.classList.remove("is-playing");
  playPause.textContent = "▶";
  playPause.setAttribute("aria-label", "Reproducir música");
}

function toggleAudio() {
  if (audio.paused) playAudio();
  else pauseAudio();
}

function beginExperience() {
  startButton.disabled = true;
  startButton.querySelector("span:last-child").textContent = "Preparando la sorpresa…";
  loadTrack(0, true);
  intro.classList.add("is-leaving");
  player.classList.add("is-ready");
  document.body.classList.remove("is-locked");
  startHearts();
  setTimeout(() => intro.remove(), 1400);
}

function startHearts() {
  createHeart();
  heartsTimer = window.setInterval(createHeart, 1150);
}

function createHeart(originX = null, originY = null, burst = false) {
  const heart = document.createElement("span");
  heart.className = "ambient-heart";
  heart.textContent = Math.random() > 0.48 ? "♥" : "♡";
  heart.style.left = originX === null ? `${Math.random() * 100}%` : `${originX}px`;
  if (originY !== null) {
    heart.style.top = `${originY}px`;
    heart.style.bottom = "auto";
  }
  heart.style.fontSize = `${0.65 + Math.random() * 1.2}rem`;
  heart.style.setProperty("--duration", `${burst ? 2.5 : 7 + Math.random() * 5}s`);
  heart.style.setProperty("--drift", `${-45 + Math.random() * 90}px`);
  $("#ambient-hearts").append(heart);
  setTimeout(() => heart.remove(), burst ? 2700 : 12500);
}

function heartBurst(element, amount = 18) {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => createHeart(x + (Math.random() - 0.5) * 70, y, true), i * 35);
  }
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.1 },
  );

  $$(".reveal, .photo-card").forEach((element) => observer.observe(element));
}

function setupVideos() {
  const videos = $$("video");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
    },
    { threshold: 0.55 },
  );

  videos.forEach((video) => {
    observer.observe(video);
    video.addEventListener("volumechange", () => {
      if (!video.muted && !video.paused) pauseAudio();
    });
    video.addEventListener("ended", () => {
      if (audio.paused) playAudio();
    });
  });
}

function createConfetti() {
  const container = $("#confetti");
  const colors = ["#f08bae", "#eac68c", "#ffd9e5", "#a82f66", "#ffffff"];
  for (let index = 0; index < 34; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--fall", `${4 + Math.random() * 4}s`);
    piece.style.setProperty("--delay", `${-Math.random() * 7}s`);
    piece.style.setProperty("--sway", `${-45 + Math.random() * 90}px`);
    container.append(piece);
  }
}

function openLightbox(source, caption) {
  const lightbox = $("#lightbox");
  $("#lightbox-image").src = source;
  $("#lightbox-image").alt = caption;
  $("#lightbox-caption").textContent = caption;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
}

function closeLightbox() {
  const lightbox = $("#lightbox");
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
}

startButton.addEventListener("click", beginExperience);
playPause.addEventListener("click", toggleAudio);
$("#prev-track").addEventListener("click", () => loadTrack(currentTrack - 1, true));
$("#next-track").addEventListener("click", () => loadTrack(currentTrack + 1, true));
$("#player-toggle").addEventListener("click", () => player.classList.toggle("is-expanded"));
$("#play-harry").addEventListener("click", () => {
  loadTrack(0, true);
  player.classList.add("is-expanded");
});

audio.addEventListener("timeupdate", () => {
  const percentage = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progress.value = percentage;
  currentTimeLabel.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationLabel.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", () => loadTrack(currentTrack + 1, true));
audio.addEventListener("pause", () => {
  player.classList.remove("is-playing");
  playPause.textContent = "▶";
});
audio.addEventListener("play", () => {
  player.classList.add("is-playing");
  playPause.textContent = "Ⅱ";
});

progress.addEventListener("input", () => {
  if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
});

$("#final-heart").addEventListener("click", (event) => {
  const message = $("#final-message");
  message.classList.add("is-open");
  message.setAttribute("aria-hidden", "false");
  heartBurst(event.currentTarget, 28);
  setTimeout(() => message.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
});

$("#lightbox-close").addEventListener("click", closeLightbox);
$("#lightbox").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

renderGallery();
renderPlaylist();
createConfetti();
setupRevealAnimations();
setupVideos();
