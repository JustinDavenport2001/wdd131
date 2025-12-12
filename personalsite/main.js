/* ============================================
   Hikes Page JavaScript
   Loads hikes saved from the homepage
============================================ */

/* -------------------------------
   Load places from localStorage
--------------------------------*/
function loadFromLocalStorage(key) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
}

let places = loadFromLocalStorage("places");

/* -------------------------------
   Display only hikes
--------------------------------*/
const hikesList = document.getElementById("hikesList");

function displayHikes() {
    hikesList.innerHTML = "";

    // Filter for only items marked as "hike"
    const hikes = places.filter(p => p.type === "hike");

    if (hikes.length === 0) {
        hikesList.innerHTML = "<p>No hikes have been added yet.</p>";
        return;
    }

    hikes.forEach(hike => {
        const div = document.createElement("div");
        div.classList.add("hike-card");

        div.innerHTML = `
            <h3>${hike.name}</h3>
            <p>${hike.desc}</p>
        `;

        hikesList.appendChild(div);
    });
}

/* -------------------------------
   INITIAL LOAD
--------------------------------*/
displayHikes();

