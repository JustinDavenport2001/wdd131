
const themeSelector = document.querySelector("#theme");

themeSelector.addEventListener("change", changeTheme);

function changeTheme() {
  const body = document.body; 
  const logo = document.querySelector(".image");
  const selectedTheme = themeSelector.value;  

  if (selectedTheme === "dark") {
    body.classList.add("dark");           // Add dark mode
  } else {
    body.classList.remove("dark");        // Remove dark mode
  }

 
  logo.src = selectedTheme === "dark" 
    ? "byui-logo_white.webp" 
    : "byui-logo_blue.webp";
}


changeTheme();
