//in this file we include code that will be included in all the html files

//we add event listener here to see if all the content has been loaded
document.addEventListener("DOMContentLoaded", function () {
    HamburgerMenu();
    DarkMode();
});
//hamburger
function HamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");

  hamburgerBtn.addEventListener("click", function () {
// toggle() adds the class if it's missing, removes it if present.
navLinks.classList.toggle("active");
    hamburgerBtn.classList.toggle("open");
  });
}
//dark mode
function DarkMode() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  //we use this to see if there is a theme setting in the local storage
  const savedTheme = localStorage.getItem("jobfinder-theme");

  if(savedTheme === "dark"){
    document.body.classList.add("dark-mode");
    updateThemeIcon(true);
  }

  if (!themeToggleBtn) {
    return;
  }

  themeToggleBtn.addEventListener("click", function () {
    //toggle dark mode class on body
    document.body.classList.toggle("dark-mode");

    //check and save result to keep the theme after resfresh
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("jobfinder-theme", isDark ? "dark" : "light");

    //update the button icon
    updateThemeIcon(isDark);
  });
}
//function tp update the icon
function updateThemeIcon(isDark) {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (!themeToggleBtn) {
    return;
  }
  themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
}