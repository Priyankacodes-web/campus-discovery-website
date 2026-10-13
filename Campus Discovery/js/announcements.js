const API_URL = "http://localhost:8080/api/announcements";

let allAnnouncements = [];

document.addEventListener("DOMContentLoaded", () => {
    loadAnnouncements();
});


/* =========================================
   LOAD ANNOUNCEMENTS
   ========================================= */

async function loadAnnouncements() {

    const announcementsList =
        document.getElementById("announcementsList");

    if (!announcementsList) {
        console.error("announcementsList not found.");
        return;
    }

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load announcements");
        }

        allAnnouncements = await response.json();

        displayAnnouncements(allAnnouncements);

    } catch (error) {

        console.error(
            "Error loading announcements:",
            error
        );

        announcementsList.innerHTML = "";

        showNoAnnouncements(
            "Unable to load announcements",
            "Please make sure the backend server is running."
        );
    }
}


/* =========================================
   DISPLAY ANNOUNCEMENTS
   ========================================= */

function displayAnnouncements(announcements) {

    const announcementsList =
        document.getElementById("announcementsList");

    announcementsList.innerHTML = "";

    if (announcements.length === 0) {

        showNoAnnouncements(
            "No announcements found",
            "There are currently no announcements available."
        );

        return;
    }

    hideNoAnnouncements();

    announcements.forEach(announcement => {

        const date = formatDate(announcement.date);

        const day = getDay(announcement.date);

        const month = getMonth(announcement.date);

        const tagClass =
            getCategoryClass(announcement.category);

        const card =
            document.createElement("div");

        card.className = "announcement-card";

        card.setAttribute(
            "data-title",
            (announcement.title || "").toLowerCase()
        );

        card.innerHTML = `

            <div class="announcement-date">

                <span class="date-day">
                    ${day}
                </span>

                <span class="date-month">
                    ${month}
                </span>

            </div>


            <div class="announcement-content">

                <span class="announcement-tag ${tagClass}">
                    ${escapeHTML(announcement.category)}
                </span>

                <h2>
                    ${escapeHTML(announcement.title)}
                </h2>

                <p>
                    ${escapeHTML(announcement.description)}
                </p>

                <div class="announcement-meta">
                    📅 Published: ${date}
                </div>

            </div>

        `;

        announcementsList.appendChild(card);
    });
}


/* =========================================
   SEARCH
   ========================================= */

function searchAnnouncements() {

    const searchInput =
        document.getElementById(
            "announcementSearch"
        );

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredAnnouncements =
        allAnnouncements.filter(announcement => {

            const title =
                (announcement.title || "")
                    .toLowerCase();

            const description =
                (announcement.description || "")
                    .toLowerCase();

            const category =
                (announcement.category || "")
                    .toLowerCase();

            return (
                title.includes(searchText) ||
                description.includes(searchText) ||
                category.includes(searchText)
            );
        });


    displayAnnouncements(
        filteredAnnouncements
    );
}


/* =========================================
   NO ANNOUNCEMENTS MESSAGE
   ========================================= */

function showNoAnnouncements(title, message) {

    const noAnnouncements =
        document.getElementById(
            "noAnnouncements"
        );

    if (!noAnnouncements) return;


    noAnnouncements.style.display = "block";


    const heading =
        noAnnouncements.querySelector("h2");

    const paragraph =
        noAnnouncements.querySelector("p");


    if (heading) {
        heading.textContent = title;
    }


    if (paragraph) {
        paragraph.textContent = message;
    }
}


function hideNoAnnouncements() {

    const noAnnouncements =
        document.getElementById(
            "noAnnouncements"
        );

    if (noAnnouncements) {
        noAnnouncements.style.display = "none";
    }
}


/* =========================================
   DATE FUNCTIONS
   ========================================= */

function getDay(dateString) {

    if (!dateString) {
        return "--";
    }

    const date =
        new Date(dateString + "T00:00:00");

    return String(
        date.getDate()
    ).padStart(2, "0");
}


function getMonth(dateString) {

    if (!dateString) {
        return "---";
    }

    const date =
        new Date(dateString + "T00:00:00");

    return date
        .toLocaleString(
            "en-US",
            {
                month: "short"
            }
        )
        .toUpperCase();
}


function formatDate(dateString) {

    if (!dateString) {
        return "Date not available";
    }

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


/* =========================================
   CATEGORY STYLING
   ========================================= */

function getCategoryClass(category) {

    const value =
        (category || "").toLowerCase();

    switch (value) {

        case "event":
            return "event-tag";

        case "workshop":
            return "workshop-tag";

        case "academic":
            return "academic-tag";

        case "sports":
            return "sports-tag";

        case "club":
            return "club-tag";

        default:
            return "event-tag";
    }
}


/* =========================================
   ESCAPE HTML
   ========================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}