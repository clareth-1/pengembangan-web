/* =========================================================
   uts4.js – dipakai SEMUA halaman.
   Isi: Daftar menu (NAV) · Util · Navigasi & DROPDOWN
        · Fitur per halaman · Bintang · Mulai
   Setiap fitur memeriksa dulu apakah elemennya ada, jadi
   aman dimuat di halaman yang tidak memilikinya.
   ========================================================= */

/* ---------- DAFTAR MENU (edit di sini untuk menambah halaman) ---------- */
const NAV = [
  { label: "Home", page: "index" },
  { label: "About", items: [
      { label: "Lore",     page: "lore" },
      { label: "Anime",    page: "anime" },
      { label: "Pemegang", page: "pemegang" }
  ]},
  { label: "Gallery", items: [
      { label: "Video", page: "video" },
      { label: "Deck",  page: "deck" }
  ]}
];

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

function externalLink(label, href) {
  return el("a", { text: label, href, target: "_blank", rel: "noopener" });
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
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

/* ---------- NAVIGASI & DROPDOWN MENU ---------- */
function initNav() {
  const bar = $("#topbar");
  const current = location.pathname.split("/").pop().replace(/\.html$/, "") || "index";
  const hrefOf = page => (page === "index" ? "index.html" : page + ".html");

  // Link lama seperti index.html#deck diarahkan ke halaman barunya
  const oldHash = location.hash.slice(1);
  if (current === "index" && ["lore", "anime", "pemegang", "video", "deck"].includes(oldHash)) {
    location.replace(hrefOf(oldHash));
    return;
  }

  const link = (item, cls) => el("a", {
    className: cls + (item.page === current ? " active" : ""),
    href: hrefOf(item.page),
    text: item.label
  });

  // Bangun menu dari NAV
  const menu = el("ul", { className: "menu" });
  NAV.forEach(item => {
    if (!item.items) {                       // menu biasa
      menu.append(el("li", {}, link(item, "tab")));
      return;
    }
    // menu dengan DROPDOWN
    const parent = el("button", { className: "tab dd-parent", type: "button", "aria-expanded": "false", text: item.label });
    const sub = el("ul", { className: "dropdown" },
      ...item.items.map(sub => el("li", {}, link(sub, "dd-item"))));
    const hasActive = item.items.some(sub => sub.page === current);
    menu.append(el("li", { className: "has-dropdown" + (hasActive ? " has-active" : "") }, parent, sub));
  });

  const brand = el("a", { className: "brand", href: "index.html" },
    document.createTextNode("✦ "), el("span", { text: "YUSEI" }), document.createTextNode(" WIKI"));
  const burger = el("button", { className: "nav-toggle", type: "button", "aria-label": "Buka menu", "aria-expanded": "false", text: "☰" });
  const nav = el("nav", { className: "nav", "aria-label": "Navigasi utama" }, menu);
  bar.replaceChildren(brand, burger, nav);

  // --- Perilaku dropdown ---
  const groups = $$(".has-dropdown", bar);
  const closeAll = except => groups.forEach(group => {
    if (group === except) return;
    group.classList.remove("open");
    $(".dd-parent", group).setAttribute("aria-expanded", "false");
  });

  // Klik tombol induk (About / Gallery): buka-tutup submenu
  groups.forEach(group => {
    const parent = $(".dd-parent", group);
    parent.addEventListener("click", e => {
      e.stopPropagation();
      const open = group.classList.toggle("open");
      parent.setAttribute("aria-expanded", open);
      closeAll(group);
    });
  });

  // Hamburger (layar kecil)
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });

  // Klik di luar menu atau tekan Esc: tutup semua submenu
  document.addEventListener("click", e => { if (!e.target.closest(".has-dropdown")) closeAll(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeAll(); nav.classList.remove("open"); }
  });
}

/* ---------- Home: kartu utama & kotak fitur ---------- */
function initSummary() {
  const card = $("#mainCard");
  if (!card) return;
  card.append(createImage(MAIN_CARD.name, MAIN_CARD.img));

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

/* ---------- Lore: accordion (tinggi diatur CSS) ---------- */
function initAccordion() {
  $$(".acc-head").forEach(head =>
    head.addEventListener("click", () => head.parentElement.classList.toggle("open")));
}

/* ---------- Pemegang ---------- */
function initHolder() {
  const button = $("#holderBtn");
  if (!button) return;

  $("#holderImg").append(createImage(HOLDER.name, HOLDER.img));

  const list = $("#aceList");
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
  if (!player) return;
  const nowPlaying = $("#vidNow");
  const list = $("#videoList");

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

  if (VIDEOS.length) play(VIDEOS[0].id, VIDEOS[0].title, $(".vid-btn", list));
}

/* ---------- Deck ---------- */
function initDeck() {
  const grid = $("#deckGrid");
  if (!grid) return;
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

  [["all", "Semua"], ...Object.entries(CATEGORIES)].forEach(([key, label]) => {
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
  initModal();
}

/* ---------- Modal kartu (hanya di halaman Deck) ---------- */
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

  $("#modal").classList.add("show");
}

function initModal() {
  const modal = $("#modal");
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
initNav();
initSummary();
initAccordion();
initHolder();
initVideo();
initDeck();
initStarfield();