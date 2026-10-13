const API_URL = "http://localhost:8080/api/clubs";

let allClubs = [];

document.addEventListener("DOMContentLoaded", () => {
    loadClubs();
});


/* =========================================
   LOAD CLUBS FROM BACKEND
   ========================================= */

async function loadClubs() {

    const clubsGrid = document.getElementById("clubsGrid");
    const noClubs = document.getElementById("noClubs");

    if (!clubsGrid) {
        console.error("clubsGrid not found.");
        return;
    }

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load clubs");
        }

        allClubs = await response.json();

        displayClubs(allClubs);

    } catch (error) {

        console.error("Error loading clubs:", error);

        clubsGrid.innerHTML = "";

        if (noClubs) {
            noClubs.style.display = "block";
            noClubs.querySelector("h2").textContent =
                "Unable to load clubs";
            noClubs.querySelector("p").textContent =
                "Please make sure the backend server is running.";
        }
    }
}


/* =========================================
   DISPLAY CLUBS
   ========================================= */

function displayClubs(clubs) {

    const clubsGrid = document.getElementById("clubsGrid");
    const noClubs = document.getElementById("noClubs");

    clubsGrid.innerHTML = "";

    if (clubs.length === 0) {

        if (noClubs) {
            noClubs.style.display = "block";
        }

        return;
    }

    if (noClubs) {
        noClubs.style.display = "none";
    }

    clubs.forEach(club => {

        const category = (club.category || "").toLowerCase();

        let icon = "👥";

        if (category === "technical") {
            icon = "💻";
        } else if (category === "creative") {
            icon = "🎨";
        } else if (category === "cultural") {
            icon = "🎭";
        } else if (category === "sports") {
            icon = "🏆";
        } else if (category === "business") {
            icon = "💡";
        }

        const clubCard = document.createElement("div");

        clubCard.className = "club-card";

        clubCard.setAttribute(
            "data-category",
            category
        );

        clubCard.setAttribute(
            "data-name",
            (club.name || "").toLowerCase()
        );

        clubCard.innerHTML = `

            <div class="club-icon ${category}-icon">
                ${icon}
            </div>

            <div class="club-content">

                <span class="club-category">
                    ${escapeHTML(club.category)}
                </span>

                <h2>
                    ${escapeHTML(club.name)}
                </h2>

                <p>
                    ${escapeHTML(club.description)}
                </p>

                <div class="club-info">

                    <span>
                        👤 ${escapeHTML(club.coordinator)}
                    </span>

                    <span>
                        📅 ${escapeHTML(club.meetingDay)}
                    </span>

                    <span>
                        🕐 ${escapeHTML(club.meetingTime)}
                    </span>

                    <span>
                        📍 ${escapeHTML(club.venue)}
                    </span>

                </div>

                <a href="login.html" class="club-btn">
                    Explore Club →
                </a>

            </div>
        `;

        clubsGrid.appendChild(clubCard);
    });
}


/* =========================================
   SEARCH CLUBS
   ========================================= */

function searchClubs() {

    const searchInput =
        document.getElementById("clubSearch");

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        document.getElementById("clubCategory").value;

    filterAndDisplay(
        searchText,
        selectedCategory
    );
}


/* =========================================
   FILTER CLUBS
   ========================================= */

function filterClubs() {

    const searchInput =
        document.getElementById("clubSearch");

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        document.getElementById("clubCategory").value;

    filterAndDisplay(
        searchText,
        selectedCategory
    );
}


/* =========================================
   SEARCH + CATEGORY FILTER
   ========================================= */

function filterAndDisplay(searchText, selectedCategory) {

    const filteredClubs = allClubs.filter(club => {

        const name =
            (club.name || "").toLowerCase();

        const description =
            (club.description || "").toLowerCase();

        const category =
            (club.category || "").toLowerCase();

        const matchesSearch =
            name.includes(searchText) ||
            description.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayClubs(filteredClubs);
}


/* =========================================
   ESCAPE HTML
   ========================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}