/* =========================================================
   script.js – logika tampilan. Data ada di data.js.
   Isi: Util · Tab · Ringkasan · Lore · Pemegang · Video
        · Deck · Modal · Bintang · Mulai
   ========================================================= */

/* ---------- Util ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const slug = text => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Buat elemen dengan teks aman (tanpa innerHTML). */
function el(tag, { text = "", className = "", ...attrs } = {}, ...children) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  node.append(...children);
  return node;
}

/** Gambar kartu; bila file tidak ada, tampilkan placeholder dengan nama file yang dicari. */
function createImage(name, file) {
  const path = IMG_DIR + (file || slug(name) + ".jpg");
  const img = new Image();
  img.alt = name;
  img.loading = "lazy";
  img.src = path;
  img.onerror = () => img.replaceWith(
    el("div", { className: "ph" },
      el("b", { text: "🖼️" }),
      el("span", { text: name }),
      el("small", { text: path }))
  );
  return img;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function externalLink(label, href) {
  return el("a", { text: label, href, target: "_blank", rel: "noopener" });
}

/* ---------- Tab ---------- */
const tabHooks = {};   // fungsi yang dijalankan saat tab tertentu dibuka

function openTab(id, { scroll = true } = {}) {
  $$(".tab").forEach(btn => {
    const active = btn.dataset.tab === id;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active);
  });
  $$(".panel").forEach(panel => {
    const active = panel.id === id;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
  history.replaceState(null, "", "#" + id);
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  tabHooks[id]?.();
}

function initTabs() {
  $$(".tab").forEach(btn => btn.addEventListener("click", () => openTab(btn.dataset.tab)));
  const fromUrl = location.hash.slice(1);
  if (fromUrl && document.getElementById(fromUrl)) openTab(fromUrl, { scroll: false });
}

/* ---------- Ringkasan ---------- */
function initSummary() {
  $("#mainCard").append(createImage(MAIN_CARD.name, MAIN_CARD.img));

  const popup = $("#infopop");
  $$(".feature").forEach(feature => feature.addEventListener("click", () => {
    const wasActive = feature.classList.contains("active");
    $$(".feature").forEach(f => f.classList.remove("active"));
    popup.classList.toggle("show", !wasActive);
    if (wasActive) return;
    feature.classList.add("active");
    popup.textContent = feature.dataset.info;
  }));
}

/* ---------- Lore (accordion – tinggi diatur CSS) ---------- */
function initLore() {
  $$(".acc-head").forEach(head =>
    head.addEventListener("click", () => head.parentElement.classList.toggle("open")));
}

/* ---------- Pemegang ---------- */
function initHolder() {
  $("#holderImg").append(createImage(HOLDER.name, HOLDER.img));

  const list = $("#aceList");
  const button = $("#holderBtn");
  const LABEL_SHOW = "Tampilkan Extra Deck Yusei (Season 5)";

  list.replaceChildren(...YUSEI_EXTRA.map(name =>
    el("li", { text: name, className: name === MAIN_CARD.name ? "hl" : "" })));

  button.textContent = LABEL_SHOW;
  button.addEventListener("click", () => {
    list.hidden = !list.hidden;
    button.textContent = list.hidden ? LABEL_SHOW : "Sembunyikan";
  });
}

/* ---------- Video ---------- */
function initVideo() {
  const player = $("#player");
  const nowPlaying = $("#vidNow");
  const list = $("#videoList");
  let loaded = false;

  function play(id, title = "Video kustom", activeButton = null) {
    player.src = `https://www.youtube.com/embed/${id}`;
    nowPlaying.replaceChildren(
      document.createTextNode(title),
      externalLink("Buka di YouTube ↗", `https://www.youtube.com/watch?v=${id}`));
    $$(".vid-btn", list).forEach(btn => btn.classList.toggle("active", btn === activeButton));
  }

  VIDEOS.forEach(video => {
    const btn = el("button", { className: "vid-btn", type: "button" },
      document.createTextNode("▶ " + video.title),
      el("small", { text: video.by }));
    btn.addEventListener("click", () => play(video.id, video.title, btn));
    list.append(btn);
  });

  $("#vidBtn").addEventListener("click", () => {
    const value = $("#vidInput").value.trim();
    const match = value.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    const id = match ? match[1] : (/^[\w-]{11}$/.test(value) ? value : null);
    if (!id) return showToast("Link/ID tidak valid");
    play(id);
    showToast("Video dimuat");
  });

  // Iframe baru dimuat saat tab Video pertama kali dibuka
  tabHooks.video = () => {
    if (loaded) return;
    loaded = true;
    play(VIDEOS[0].id, VIDEOS[0].title, $(".vid-btn", list));
  };
}

/* ---------- Deck ---------- */
function initDeck() {
  const grid = $("#deckGrid");
  const stats = $("#deckStats");
  const filterBar = $("#filters");
  const state = { filter: "all", query: "" };

  const totalOf = category =>
    DECK.filter(c => c.category === category).reduce((sum, c) => sum + (c.qty || 1), 0);

  function render() {
    const visible = DECK.filter(card =>
      (state.filter === "all" || card.category === state.filter) &&
      card.name.toLowerCase().includes(state.query));

    grid.replaceChildren(...visible.map(createCardElement));

    const parts = ["extra", "tuner", "monster", "spell", "trap"]
      .map(key => `${CATEGORIES[key]}: ${totalOf(key)}`);
    stats.textContent = `${parts.join(" · ")} · Menampilkan ${visible.length} kartu`;
  }

  function createCardElement(card) {
    const btn = el("button", {
      className: "card" + (card.name === MAIN_CARD.name ? " hero" : ""),
      type: "button",
      "data-c": card.category
    },
      el("div", { className: "img" }, createImage(card.name, card.img)),
      el("div", { className: "name", text: card.name }),
      el("span", { className: "cat", text: CATEGORIES[card.category] }));

    if (card.qty > 1) btn.append(el("span", { className: "qty", text: `x${card.qty}` }));
    btn.addEventListener("click", () => openModal(card));
    return btn;
  }

  // Tombol filter dibuat dari CATEGORIES
  const filters = [["all", "Semua"], ...Object.entries(CATEGORIES)];
  filters.forEach(([key, label]) => {
    const btn = el("button", { className: "filter" + (key === "all" ? " active" : ""), text: label, type: "button" });
    btn.addEventListener("click", () => {
      $$(".filter", filterBar).forEach(b => b.classList.toggle("active", b === btn));
      state.filter = key;
      render();
    });
    filterBar.append(btn);
  });

  $("#search").addEventListener("input", e => {
    state.query = e.target.value.toLowerCase();
    render();
  });

  $("#copyDeck").addEventListener("click", async () => {
    const lines = categories => DECK
      .filter(c => categories.includes(c.category))
      .map(c => `${c.qty || 1}x ${c.name}`)
      .join("\n");
    const text = `# Main Deck (anime)\n${lines(["tuner", "monster", "spell", "trap"])}\n\n# Extra Deck\n${lines(["extra"])}`;
    try {
      await navigator.clipboard.writeText(text);
      showToast("Daftar deck disalin!");
    } catch {
      showToast("Gagal menyalin. Buka lewat localhost/https.");
    }
  });

  render();
}

/* ---------- Modal ---------- */
const modal = $("#modal");

function openModal(card) {
  const query = encodeURIComponent(card.name);

  $("#modalImg").replaceChildren(createImage(card.name, card.img));
  $("#modalName").textContent = card.name;
  $("#modalMeta").textContent = CATEGORIES[card.category] + (card.qty > 1 ? ` · x${card.qty}` : "");
  $("#modalDesc").textContent = NOTES[card.name] || card.desc ||
    "Teks efek tidak saya salin di sini. Lihat teks resmi lewat tautan di bawah.";
  $("#modalLinks").replaceChildren(
    externalLink("Yugipedia ↗",   `https://yugipedia.com/index.php?search=${query}`),
    externalLink("YGOPRODeck ↗", `https://ygoprodeck.com/card-database/?&name=${query}`));

  modal.classList.add("show");
}

function initModal() {
  const close = () => modal.classList.remove("show");
  $("#closeModal").addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

/* ---------- Latar bintang ---------- */
function initStarfield() {
  const canvas = $("#stars");
  const ctx = canvas.getContext("2d");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];

  const randomStar = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.2,
    speed: Math.random() * 0.4 + 0.05,
    phase: Math.random() * 6
  });

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    stars = Array.from({ length: 140 }, randomStar);
    if (reduceMotion) draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      if (!reduceMotion) {
        s.y += s.speed;
        s.phase += 0.03;
        if (s.y > canvas.height) Object.assign(s, randomStar(), { y: 0 });
      }
      ctx.globalAlpha = 0.5 + Math.sin(s.phase) * 0.4;
      ctx.fillStyle = s.r > 1.2 ? "#5de6ff" : "#ffffff";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  addEventListener("resize", resize);
  resize();
  if (!reduceMotion) draw();
}

/* ---------- Mulai ---------- */
initSummary();
initLore();
initHolder();
initVideo();
initDeck();
initModal();
initStarfield();
initTabs();