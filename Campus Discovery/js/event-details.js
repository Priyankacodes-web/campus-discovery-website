// GET EVENT ID FROM URL

const urlParams =
    new URLSearchParams(window.location.search);

const eventId =
    urlParams.get("id");



// LOAD EVENT DETAILS

async function loadEventDetails() {

    if (!eventId) {

        console.error(
            "No event ID found in URL"
        );

        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:8080/api/events/${eventId}`
            );


        if (!response.ok) {

            throw new Error(
                "Event not found"
            );

        }


        const event =
            await response.json();


        displayEventDetails(event);


    } catch (error) {

        console.error(
            "Error loading event:",
            error
        );


        const title =
            document.getElementById(
                "eventTitle"
            );


        if (title) {

            title.textContent =
                "Event not found";

        }

    }

}



// DISPLAY EVENT DETAILS

function displayEventDetails(event) {

    const title =
        document.getElementById(
            "eventTitle"
        );


    const category =
        document.getElementById(
            "eventCategory"
        );


    const description =
        document.getElementById(
            "eventDescription"
        );


    const aboutEvent =
        document.getElementById(
            "aboutEvent"
        );


    const date =
        document.getElementById(
            "eventDate"
        );


    const time =
        document.getElementById(
            "eventTime"
        );


    const venue =
        document.getElementById(
            "eventVenue"
        );


    const organizer =
        document.getElementById(
            "eventOrganizer"
        );



    if (title) {

        title.textContent =
            event.title;

    }


    if (category) {

        category.textContent =
            event.category.toUpperCase() +
            " EVENT";

    }


    if (description) {

        description.textContent =
            event.description;

    }


    if (aboutEvent) {

        aboutEvent.textContent =
            event.description;

    }


    if (date) {

        date.textContent =
            event.date;

    }


    if (time) {

        time.textContent =
            event.time;

    }


    if (venue) {

        venue.textContent =
            event.venue;

    }


    if (organizer) {

        organizer.textContent =
            event.organizer;

    }

}



// REGISTER FOR EVENT

async function registerEvent(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "studentName"
        ).value;


    const email =
        document.getElementById(
            "studentEmail"
        ).value;


    const studentId =
        document.getElementById(
            "studentId"
        ).value;


    const department =
        document.getElementById(
            "department"
        ).value;


    const message =
        document.getElementById(
            "registrationMessage"
        );



    // REGISTRATION DATA

    const registrationData = {

        eventId: Number(eventId),

        studentName: name,

        studentEmail: email,

        studentId: studentId,

        department: department

    };



    try {

        const response =
            await fetch(
                "http://localhost:8080/api/registrations",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            registrationData
                        )

                }
            );



        if (!response.ok) {

            throw new Error(
                "Registration failed"
            );

        }



        const savedRegistration =
            await response.json();



        message.innerHTML =
            "🎉 Registration successful! " +
            "Welcome, " +
            savedRegistration.studentName +
            ". Your registration has been saved.";


        message.style.display =
            "block";



        document
            .getElementById(
                "registrationForm"
            )
            .reset();



    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        message.innerHTML =
            "❌ Registration failed. " +
            "Please make sure the backend is running.";


        message.style.display =
            "block";

    }

}



// START WHEN PAGE LOADS

document.addEventListener(
    "DOMContentLoaded",
    loadEventDetails
);