// ✅ Wait for the DOM to fully load before running
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-button');
  const nav = document.querySelector('nav');

  menuButton.addEventListener('click', () => {
    // Toggle the 'open' class on the nav
    nav.classList.toggle('open');
  });
});
