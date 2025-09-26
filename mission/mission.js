
const themeSelector = document.querySelector("#theme");

themeSelector.addEventListener("change", changeTheme);

function changeTheme() {
  const body = document.body; 
  const logo = document.querySelector(".image");
  const selectedTheme = themeSelector.value;  

  if (selectedTheme === "dark") {
    body.classList.add("dark");           
  } else {
    body.classList.remove("dark");        
  }

}


changeTheme();
