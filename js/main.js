const topbar = document.querySelector(".topbar");
const navBtn = document.querySelector("#nav-btn");
const mobileNav = document.querySelector("#mobile-nav");
const typedEl = document.querySelector("#typed-line");
const codeRain = document.querySelector("#code-rain");

const phrases = [
  "Full-Stack .NET Developer",
  "Building banking systems",
  "Shipping production code",
  "C# · Azure · React",
];

window.addEventListener(
  "scroll",
  () => {
    topbar?.classList.toggle("is-scrolled", window.scrollY > 12);
  },
  { passive: true }
);

function closeMenu() {
  mobileNav?.setAttribute("hidden", "");
  document.body.classList.remove("nav-open");
  navBtn?.classList.remove("is-open");
  navBtn?.setAttribute("aria-expanded", "false");
  navBtn?.setAttribute("aria-label", "Open menu");
}

function openMenu() {
  mobileNav?.removeAttribute("hidden");
  document.body.classList.add("nav-open");
  navBtn?.classList.add("is-open");
  navBtn?.setAttribute("aria-expanded", "true");
  navBtn?.setAttribute("aria-label", "Close menu");
}

navBtn?.addEventListener("click", () => {
  if (mobileNav?.hasAttribute("hidden")) openMenu();
  else closeMenu();
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* Typing effect */
async function typewrite() {
  if (!typedEl) return;
  let i = 0;
  while (true) {
    const phrase = phrases[i % phrases.length];
    typedEl.textContent = "";
    for (let c = 0; c < phrase.length; c++) {
      typedEl.textContent += phrase[c];
      await wait(38);
    }
    await wait(1600);
    for (let c = phrase.length; c >= 0; c--) {
      typedEl.textContent = phrase.slice(0, c);
      await wait(20);
    }
    await wait(350);
    i++;
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* Floating code rain */
function spawnCodeRain() {
  if (!codeRain || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;

  const snippets = [
    "async Task Run()",
    "dotnet build",
    "SELECT * FROM",
    "useState()",
    "Azure.Deploy()",
    "git push origin",
    "{ success: true }",
    "Console.WriteLine",
    "api/v1/loans",
    "npm run build",
  ];

  for (let i = 0; i < 14; i++) {
    const span = document.createElement("span");
    span.textContent = snippets[i % snippets.length];
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDuration = `${10 + Math.random() * 14}s`;
    span.style.animationDelay = `${Math.random() * 8}s`;
    codeRain.appendChild(span);
  }
}

/* Scroll reveal */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => io.observe(el));
}

typewrite();
spawnCodeRain();
initReveal();
