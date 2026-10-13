let selectedCategory = "all";
let allEvents = [];

// Load events from backend
async function loadEvents() {

    try {

        const response = await fetch("http://localhost:8080/api/events");

        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }

        allEvents = await response.json();

        displayEvents(allEvents);

    } catch (error) {

        console.error("Error loading events:", error);

        const container = document.getElementById("eventsContainer");

        if (container) {
            container.innerHTML = `
                <p class="error-message">
                    Unable to load events. Please make sure the backend is running.
                </p>
            `;
        }
    }
}


// Display events on the page
function displayEvents(events) {

    const container =
        document.getElementById("eventsContainer");

    if (!container) {
        console.error("eventsContainer not found");
        return;
    }

    container.innerHTML = "";

    const noEvents =
        document.getElementById("noEvents");


    if (events.length === 0) {

        noEvents.style.display = "block";

        return;
    }

    noEvents.style.display = "none";


    events.forEach(event => {

        const category =
            event.category.toLowerCase();


        // Choose banner and icon based on category
        let bannerClass = "technical-bg";
        let icon = "💻";


        if (category === "cultural") {
            bannerClass = "cultural-bg";
            icon = "🎭";
        }

        else if (category === "sports") {
            bannerClass = "sports-bg";
            icon = "🏆";
        }

        else if (category === "workshop") {
            bannerClass = "workshop-bg";
            icon = "🤖";
        }

        else if (category === "competition") {
            bannerClass = "competition-bg";
            icon = "🎨";
        }


        const eventCard =
            document.createElement("article");


        eventCard.className =
            "event-card-large";


        eventCard.dataset.category =
            category;


        eventCard.dataset.name =
            event.title.toLowerCase();


        eventCard.innerHTML = `

            <div class="event-banner ${bannerClass}">

                <span class="big-event-icon">
                    ${icon}
                </span>

                <span class="event-badge">
                    ${event.category.toUpperCase()}
                </span>

            </div>


            <div class="event-card-body">

                <h2>
                    ${event.title}
                </h2>


                <p>
                    ${event.description}
                </p>


                <div class="event-details">

                    <span>
                        📅 ${event.date}
                    </span>

                    <span>
                        🕐 ${event.time}
                    </span>

                    <span>
                        📍 ${event.venue}
                    </span>

                </div>


                <div class="event-card-footer">

                    <span class="organizer">
                        Organized by ${event.organizer}
                    </span>


                    <a
                        href="event-details.html?id=${event.id}"
                        class="event-btn">

                        View Details →

                    </a>

                </div>

            </div>

        `;


        container.appendChild(eventCard);

    });

}


// Category filter
function filterCategory(category, button) {

    selectedCategory = category.toLowerCase();


    document
        .querySelectorAll(".filter-btn")
        .forEach(btn => {

            btn.classList.remove("active-filter");

        });


    button.classList.add("active-filter");


    filterEvents();
}


// Search + category filtering
function filterEvents() {

    const searchInput =
        document.getElementById("eventSearch");

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredEvents = allEvents.filter(event => {

        const category =
            event.category.toLowerCase();

        const name =
            event.title.toLowerCase();


        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        const matchesSearch =
            name.includes(searchText);


        return matchesCategory && matchesSearch;

    });


    displayEvents(filteredEvents);
}


// Search button / input
function searchEvents() {

    filterEvents();

}


// Load events when page opens
document.addEventListener("DOMContentLoaded", function () {

    loadEvents();

});