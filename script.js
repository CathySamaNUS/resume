const root = document.documentElement;
const languageToggle = document.querySelector(".language-toggle");
const languageLabel = document.querySelector(".language-label");
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
let currentLanguage = localStorage.getItem("portfolio-language") || "en";

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
}

languageToggle.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "zh" : "en"));
root.dataset.theme = localStorage.getItem("portfolio-theme") || "dark";
themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
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
