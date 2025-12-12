/* ============================================
   Hikes Page JavaScript
   Loads hikes saved from the homepage
============================================ */

function loadFromLocalStorage(key) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
}

let places = loadFromLocalStorage("places");

const hikesList = document.getElementById("hikesList");

function displayHikes() {
    hikesList.innerHTML = "";

    const hikes = places.filter(p => p.type === "hike");

    if (hikes.length === 0) {
        hikesList.innerHTML = "<p>No hikes have been added yet.</p>";
        return;
    }

    hikes.forEach(hike => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${hike.name}</h3>
            <p>${hike.desc}</p>
        `;

        hikesList.appendChild(div);
    });
}

displayHikes();
