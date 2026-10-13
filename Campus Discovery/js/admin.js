const API_URL = "http://localhost:8080";

/* =========================================
   PAGE LOAD
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    loadDashboardStats();
    loadEvents();
    loadClubs();
    loadRegistrations();
    loadAnnouncements();
});


/* =========================================
   SECTION NAVIGATION
   ========================================= */

function showSection(sectionName, event) {

    if (event) {
        event.preventDefault();
    }

    const sections = [
        "dashboardSection",
        "eventsSection",
        "clubsSection",
        "announcementsSection",
        "registrationsSection"
    ];

    sections.forEach(section => {

        const element =
            document.getElementById(section);

        if (element) {
            element.style.display = "none";
        }
    });

    const selectedSection =
        document.getElementById(
            sectionName + "Section"
        );

    if (selectedSection) {
        selectedSection.style.display = "block";
    }

    document
        .querySelectorAll(".sidebar-link")
        .forEach(link => {
            link.classList.remove("active");
        });

    if (event && event.currentTarget) {
        event.currentTarget.classList.add("active");
    }

    if (sectionName === "dashboard") {
        loadDashboardStats();
    }

    if (sectionName === "events") {
        loadEvents();
    }

    if (sectionName === "clubs") {
        loadClubs();
    }

    if (sectionName === "announcements") {
        loadAnnouncements();
    }

    if (sectionName === "registrations") {
        loadRegistrations();
    }
}


/* =========================================
   MODAL FUNCTIONS
   ========================================= */

function openModal(modalId) {

    const modal =
        document.getElementById(modalId);

    if (modal) {
        modal.style.display = "flex";
    }
}


function closeModal(modalId) {

    const modal =
        document.getElementById(modalId);

    if (modal) {
        modal.style.display = "none";
    }
}


window.addEventListener("click", function (event) {

    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            if (event.target === modal) {
                modal.style.display = "none";
            }

        });

});


/* =========================================
   DASHBOARD STATISTICS
   ========================================= */

async function loadDashboardStats() {

    try {

        const eventsResponse =
            await fetch(`${API_URL}/api/events`);

        const events =
            await eventsResponse.json();


        const clubsResponse =
            await fetch(`${API_URL}/api/clubs`);

        const clubs =
            await clubsResponse.json();


        const registrationsResponse =
            await fetch(`${API_URL}/api/registrations`);

        const registrations =
            await registrationsResponse.json();


        const announcementsResponse =
            await fetch(`${API_URL}/api/announcements`);

        const announcements =
            await announcementsResponse.json();


        document.getElementById(
            "eventCount"
        ).textContent = events.length;


        document.getElementById(
            "clubCount"
        ).textContent = clubs.length;


        document.getElementById(
            "registrationCount"
        ).textContent = registrations.length;


        document.getElementById(
            "announcementCount"
        ).textContent = announcements.length;


    } catch (error) {

        console.error(
            "Error loading dashboard statistics:",
            error
        );

    }
}


/* =========================================
   EVENTS
   ========================================= */

function openAddEventModal() {

    document.getElementById(
        "eventModal"
    ).style.display = "flex";
}


async function addEvent(event) {

    event.preventDefault();

    const eventData = {

        title:
            document.getElementById(
                "eventTitle"
            ).value,

        category:
            document.getElementById(
                "eventCategory"
            ).value,

        description:
            document.getElementById(
                "eventDescription"
            ).value,

        date:
            document.getElementById(
                "eventDate"
            ).value,

        time:
            document.getElementById(
                "eventTime"
            ).value,

        venue:
            document.getElementById(
                "eventVenue"
            ).value,

        organizer:
            document.getElementById(
                "eventOrganizer"
            ).value
    };


    try {

        const response =
            await fetch(
                `${API_URL}/api/events`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(eventData)
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to create event"
            );
        }


        alert(
            "🎉 Event added successfully!"
        );


        closeModal("eventModal");

        event.target.reset();

        loadEvents();

        loadDashboardStats();


    } catch (error) {

        console.error(error);

        alert(
            "❌ Failed to add event."
        );
    }
}


async function loadEvents() {

    const tableBody =
        document.getElementById(
            "eventTableBody"
        );

    if (!tableBody) return;


    try {

        const response =
            await fetch(
                `${API_URL}/api/events`
            );


        if (!response.ok) {
            throw new Error(
                "Failed to load events"
            );
        }


        const events =
            await response.json();


        tableBody.innerHTML = "";


        if (events.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="8">
                        No events found.
                    </td>
                </tr>
            `;

            return;
        }


        events.forEach(event => {

            tableBody.innerHTML += `

                <tr>

                    <td>
                        ${event.id}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(event.title)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(event.category)}
                    </td>

                    <td>
                        ${escapeHTML(event.date)}
                    </td>

                    <td>
                        ${escapeHTML(event.time)}
                    </td>

                    <td>
                        ${escapeHTML(event.venue)}
                    </td>

                    <td>
                        ${escapeHTML(event.organizer)}
                    </td>

                    <td>

                        <button
                            class="table-btn"
                            onclick="openEditEvent(${event.id})">
                            Edit
                        </button>

                        <button
                            class="table-btn delete-btn"
                            onclick="deleteEvent(${event.id})">
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        });


    } catch (error) {

        console.error(
            "Error loading events:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    Failed to load events.
                </td>
            </tr>
        `;
    }
}


async function openEditEvent(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/api/events/${id}`
            );


        if (!response.ok) {
            throw new Error(
                "Event not found"
            );
        }


        const event =
            await response.json();


        document.getElementById(
            "editEventId"
        ).value = event.id;


        document.getElementById(
            "editEventTitle"
        ).value = event.title;


        document.getElementById(
            "editEventCategory"
        ).value = event.category;


        document.getElementById(
            "editEventDescription"
        ).value = event.description;


        document.getElementById(
            "editEventDate"
        ).value = event.date;


        document.getElementById(
            "editEventTime"
        ).value = event.time;


        document.getElementById(
            "editEventVenue"
        ).value = event.venue;


        document.getElementById(
            "editEventOrganizer"
        ).value = event.organizer;


        openModal("editEventModal");


    } catch (error) {

        console.error(error);

        alert(
            "❌ Failed to load event."
        );
    }
}


async function updateEvent(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "editEventId"
        ).value;


    const eventData = {

        title:
            document.getElementById(
                "editEventTitle"
            ).value,

        category:
            document.getElementById(
                "editEventCategory"
            ).value,

        description:
            document.getElementById(
                "editEventDescription"
            ).value,

        date:
            document.getElementById(
                "editEventDate"
            ).value,

        time:
            document.getElementById(
                "editEventTime"
            ).value,

        venue:
            document.getElementById(
                "editEventVenue"
            ).value,

        organizer:
            document.getElementById(
                "editEventOrganizer"
            ).value
    };


    try {

        const response =
            await fetch(
                `${API_URL}/api/events/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(eventData)
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to update event"
            );
        }


        alert(
            "✅ Event updated successfully!"
        );


        closeModal("editEventModal");

        loadEvents();

        loadDashboardStats();


    } catch (error) {

        console.error(error);

        alert(
            "❌ Failed to update event."
        );
    }
}


async function deleteEvent(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this event?"
        );


    if (!confirmed) return;


    try {

        const response =
            await fetch(
                `${API_URL}/api/events/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to delete event"
            );
        }


        alert(
            "🗑️ Event deleted successfully!"
        );


        loadEvents();

        loadDashboardStats();


    } catch (error) {

        console.error(error);

        alert(
            "❌ Failed to delete event."
        );
    }
}


/* =========================================
   CLUBS
   ========================================= */

function openAddClubModal() {

    document.getElementById(
        "clubModal"
    ).style.display = "flex";
}


async function addClub(event) {

    event.preventDefault();


    const clubData = {

        name:
            document.getElementById(
                "clubName"
            ).value,

        category:
            document.getElementById(
                "clubCategory"
            ).value,

        description:
            document.getElementById(
                "clubDescription"
            ).value,

        coordinator:
            document.getElementById(
                "clubCoordinator"
            ).value,

        meetingDay:
            document.getElementById(
                "clubMeetingDay"
            ).value,

        meetingTime:
            document.getElementById(
                "clubMeetingTime"
            ).value,

        venue:
            document.getElementById(
                "clubVenue"
            ).value
    };


    try {

        const response =
            await fetch(
                `${API_URL}/api/clubs`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(clubData)
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to create club"
            );
        }


        alert(
            "🎉 Club added successfully!"
        );


        closeModal("clubModal");

        event.target.reset();

        loadClubs();

        loadDashboardStats();


    } catch (error) {

        console.error(
            "Error adding club:",
            error
        );

        alert(
            "❌ Failed to add club."
        );
    }
}


async function loadClubs() {

    const tableBody =
        document.getElementById(
            "clubTableBody"
        );

    if (!tableBody) return;


    try {

        const response =
            await fetch(
                `${API_URL}/api/clubs`
            );


        if (!response.ok) {
            throw new Error(
                "Failed to load clubs"
            );
        }


        const clubs =
            await response.json();


        tableBody.innerHTML = "";


        if (clubs.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="8">
                        No clubs found.
                    </td>
                </tr>
            `;

            return;
        }


        clubs.forEach(club => {

            tableBody.innerHTML += `

                <tr>

                    <td>
                        ${club.id}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(club.name)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(club.category)}
                    </td>

                    <td>
                        ${escapeHTML(club.coordinator)}
                    </td>

                    <td>
                        ${escapeHTML(club.meetingDay)}
                    </td>

                    <td>
                        ${escapeHTML(club.meetingTime)}
                    </td>

                    <td>
                        ${escapeHTML(club.venue)}
                    </td>

                    <td>

                        <button
                            class="table-btn"
                            onclick="openEditClub(${club.id})">
                            Edit
                        </button>

                        <button
                            class="table-btn delete-btn"
                            onclick="deleteClub(${club.id})">
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        });


    } catch (error) {

        console.error(
            "Error loading clubs:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    Failed to load clubs.
                </td>
            </tr>
        `;
    }
}


async function openEditClub(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/api/clubs/${id}`
            );


        if (!response.ok) {
            throw new Error(
                "Club not found"
            );
        }


        const club =
            await response.json();


        document.getElementById(
            "editClubId"
        ).value = club.id;


        document.getElementById(
            "editClubName"
        ).value = club.name;


        document.getElementById(
            "editClubCategory"
        ).value = club.category;


        document.getElementById(
            "editClubDescription"
        ).value = club.description;


        document.getElementById(
            "editClubCoordinator"
        ).value = club.coordinator;


        document.getElementById(
            "editClubMeetingDay"
        ).value = club.meetingDay;


        document.getElementById(
            "editClubMeetingTime"
        ).value = club.meetingTime;


        document.getElementById(
            "editClubVenue"
        ).value = club.venue;


        openModal("editClubModal");


    } catch (error) {

        console.error(error);

        alert(
            "❌ Failed to load club."
        );
    }
}


async function updateClub(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "editClubId"
        ).value;


    const clubData = {

        name:
            document.getElementById(
                "editClubName"
            ).value,

        category:
            document.getElementById(
                "editClubCategory"
            ).value,

        description:
            document.getElementById(
                "editClubDescription"
            ).value,

        coordinator:
            document.getElementById(
                "editClubCoordinator"
            ).value,

        meetingDay:
            document.getElementById(
                "editClubMeetingDay"
            ).value,

        meetingTime:
            document.getElementById(
                "editClubMeetingTime"
            ).value,

        venue:
            document.getElementById(
                "editClubVenue"
            ).value
    };


    try {

        const response =
            await fetch(
                `${API_URL}/api/clubs/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(clubData)
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to update club"
            );
        }


        alert(
            "✅ Club updated successfully!"
        );


        closeModal("editClubModal");

        loadClubs();

        loadDashboardStats();


    } catch (error) {

        console.error(
            "Error updating club:",
            error
        );

        alert(
            "❌ Failed to update club."
        );
    }
}


async function deleteClub(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this club?"
        );


    if (!confirmed) return;


    try {

        const response =
            await fetch(
                `${API_URL}/api/clubs/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to delete club"
            );
        }


        alert(
            "🗑️ Club deleted successfully!"
        );


        loadClubs();

        loadDashboardStats();


    } catch (error) {

        console.error(
            "Error deleting club:",
            error
        );

        alert(
            "❌ Failed to delete club."
        );
    }
}


/* =========================================
   ANNOUNCEMENTS
   ========================================= */

function openAddAnnouncementModal() {

    document.getElementById(
        "announcementModal"
    ).style.display = "flex";
}


async function addAnnouncement(event) {

    event.preventDefault();


    const announcementData = {

        title:
            document.getElementById(
                "announcementTitle"
            ).value,

        category:
            document.getElementById(
                "announcementCategory"
            ).value,

        description:
            document.getElementById(
                "announcementDescription"
            ).value,

        date:
            new Date()
                .toISOString()
                .split("T")[0]
    };


    try {

        const response =
            await fetch(
                `${API_URL}/api/announcements`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            announcementData
                        )
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to create announcement"
            );
        }


        alert(
            "📢 Announcement published successfully!"
        );


        closeModal(
            "announcementModal"
        );

        event.target.reset();

        loadAnnouncements();

        loadDashboardStats();


    } catch (error) {

        console.error(
            "Error adding announcement:",
            error
        );

        alert(
            "❌ Failed to publish announcement."
        );
    }
}


async function loadAnnouncements() {

    const tableBody =
        document.getElementById(
            "announcementTableBody"
        );

    if (!tableBody) return;


    try {

        const response =
            await fetch(
                `${API_URL}/api/announcements`
            );


        if (!response.ok) {
            throw new Error(
                "Failed to load announcements"
            );
        }


        const announcements =
            await response.json();


        tableBody.innerHTML = "";


        if (announcements.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6">
                        No announcements found.
                    </td>
                </tr>
            `;

            return;
        }


        announcements.forEach(
            announcement => {

                tableBody.innerHTML += `

                    <tr>

                        <td>
                            ${announcement.id}
                        </td>

                        <td>
                            <strong>
                                ${escapeHTML(
                                    announcement.title
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                announcement.category
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                announcement.description
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                announcement.date
                            )}
                        </td>

                        <td>

                            <button
                                class="table-btn delete-btn"
                                onclick="deleteAnnouncement(${announcement.id})">
                                Delete
                            </button>

                        </td>

                    </tr>

                `;
            }
        );


    } catch (error) {

        console.error(
            "Error loading announcements:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    Failed to load announcements.
                </td>
            </tr>
        `;
    }
}


async function deleteAnnouncement(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this announcement?"
        );


    if (!confirmed) return;


    try {

        const response =
            await fetch(
                `${API_URL}/api/announcements/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to delete announcement"
            );
        }


        alert(
            "🗑️ Announcement deleted successfully!"
        );


        loadAnnouncements();

        loadDashboardStats();


    } catch (error) {

        console.error(
            "Error deleting announcement:",
            error
        );

        alert(
            "❌ Failed to delete announcement."
        );
    }
}


/* =========================================
   REGISTRATIONS
   ========================================= */

async function loadRegistrations() {

    const tableBody =
        document.getElementById(
            "registrationTableBody"
        );

    if (!tableBody) return;


    try {

        const response =
            await fetch(
                `${API_URL}/api/registrations`
            );


        if (!response.ok) {
            throw new Error(
                "Failed to load registrations"
            );
        }


        const registrations =
            await response.json();


        tableBody.innerHTML = "";


        if (registrations.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="8">
                        No registrations found.
                    </td>
                </tr>
            `;

            return;
        }


        registrations.forEach(
            registration => {

                tableBody.innerHTML += `

                    <tr>

                        <td>
                            ${registration.id}
                        </td>

                        <td>
                            ${escapeHTML(
                                registration.studentName
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                registration.studentId
                            )}
                        </td>

                        <td>
                            ${registration.eventId}
                        </td>

                        <td>
                            ${escapeHTML(
                                registration.studentEmail
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                registration.department
                            )}
                        </td>

                        <td>

                            <span class="status-badge">
                                Registered
                            </span>

                        </td>

                        <td>

                            <button
                                class="table-btn delete-btn"
                                onclick="deleteRegistration(${registration.id})">
                                Delete
                            </button>

                        </td>

                    </tr>

                `;
            }
        );


    } catch (error) {

        console.error(
            "Error loading registrations:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    Failed to load registrations.
                </td>
            </tr>
        `;
    }
}


async function deleteRegistration(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this registration?"
        );


    if (!confirmed) return;


    try {

        const response =
            await fetch(
                `${API_URL}/api/registrations/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to delete registration"
            );
        }


        alert(
            "🗑️ Registration deleted successfully!"
        );


        loadRegistrations();

        loadDashboardStats();


    } catch (error) {

        console.error(error);

        alert(
            "❌ Failed to delete registration."
        );
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