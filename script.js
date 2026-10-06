const root = document.documentElement;
const languageToggle = document.querySelector(".language-toggle");
const languageLabel = document.querySelector(".language-label");
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const likeButton = document.querySelector(".like-button");
const likeLabel = document.querySelector(".like-label");
let currentLanguage = localStorage.getItem("portfolio-language") || "en";
let isLiked = localStorage.getItem("portfolio-liked") === "true";
let likeAnimationTimeout;

function updateLikeButton() {
  const label = currentLanguage === "zh"
    ? (isLiked ? "已点赞 · 谢谢！" : "给我点个赞")
    : (isLiked ? "Liked · Thank you!" : "Like this page");
  likeLabel.textContent = label;
  likeButton.setAttribute("aria-label", label);
  likeButton.setAttribute("aria-pressed", String(isLiked));
  likeButton.classList.toggle("is-liked", isLiked);
}

function setLanguage(language) {
  currentLanguage = language;
  root.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-en][data-zh]").forEach((element) => {
    element.textContent = element.dataset[language];
  });
  languageLabel.textContent = language === "en" ? "中文" : "EN";
  languageToggle.setAttribute("aria-label", language === "en" ? "切换至中文" : "Switch to English");
  themeToggle.setAttribute("aria-label", language === "en" ? "Switch color theme" : "切换颜色主题");
  menuToggle.setAttribute("aria-label", language === "en" ? "Open menu" : "打开菜单");
  document.title = language === "en" ? "Cathy Fang · Portfolio" : "方雨程 · 个人主页";
  localStorage.setItem("portfolio-language", language);
  updateLikeButton();
}

languageToggle.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "zh" : "en"));
root.dataset.theme = localStorage.getItem("portfolio-theme") || "dark";
themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
});

likeButton.addEventListener("click", () => {
  isLiked = !isLiked;
  localStorage.setItem("portfolio-liked", String(isLiked));
  updateLikeButton();
  clearTimeout(likeAnimationTimeout);
  likeButton.classList.remove("celebrate");
  if (isLiked && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    void likeButton.offsetWidth;
    likeButton.classList.add("celebrate");
    likeAnimationTimeout = window.setTimeout(() => likeButton.classList.remove("celebrate"), 950);
  }
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

document.querySelector("#year").textContent = new Date().getFullYear();
setLanguage(currentLanguage);
