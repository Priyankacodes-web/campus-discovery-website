const API_URL = "http://localhost:8080/api/users";


// =========================
// PAGE LOAD
// =========================

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
});


// =========================
// LOAD LOGGED-IN USER
// =========================

async function loadProfile() {

    const storedUser =
        localStorage.getItem("loggedInUser");


    // If user is not logged in
    if (!storedUser) {

        window.location.href =
            "login.html";

        return;
    }


    let user;

    try {

        user = JSON.parse(storedUser);

    } catch (error) {

        console.error(
            "Invalid login data:",
            error
        );

        localStorage.removeItem(
            "loggedInUser"
        );

        window.location.href =
            "login.html";

        return;
    }


    // Check whether user ID exists
    if (!user.id) {

        console.error(
            "User ID not found."
        );

        displayProfile(user);
        fillEditForm(user);

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${user.id}`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load profile"
            );
        }


        const currentUser =
            await response.json();


        // Update localStorage with
        // latest backend data
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(currentUser)
        );


        // Display profile
        displayProfile(
            currentUser
        );


        // Fill edit form
        fillEditForm(
            currentUser
        );


    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );


        // Backend unavailable:
        // use login data
        displayProfile(user);

        fillEditForm(user);
    }
}


// =========================
// DISPLAY PROFILE
// =========================

function displayProfile(user) {


    // =========================
    // HEADER NAME
    // =========================

    const headerName =
        document.getElementById(
            "displayProfileName"
        );


    if (headerName) {

        headerName.textContent =
            user.name ||
            "Student";
    }


    // =========================
    // HEADER DEPARTMENT
    // =========================

    const headerDepartment =
        document.getElementById(
            "displayProfileDepartment"
        );


    if (headerDepartment) {

        headerDepartment.textContent =
            getDepartmentName(
                user.department
            );
    }


    // =========================
    // HEADER STUDENT ID
    // =========================

    const headerStudentId =
        document.getElementById(
            "displayProfileStudentId"
        );


    if (headerStudentId) {

        headerStudentId.textContent =
            user.studentId ||
            "Not available";
    }


    // =========================
    // PERSONAL NAME
    // =========================

    const infoName =
        document.getElementById(
            "displayInfoName"
        );


    if (infoName) {

        infoName.textContent =
            user.name ||
            "Not available";
    }


    // =========================
    // PERSONAL EMAIL
    // =========================

    const infoEmail =
        document.getElementById(
            "displayInfoEmail"
        );


    if (infoEmail) {

        infoEmail.textContent =
            user.email ||
            "Not available";
    }


    // =========================
    // PERSONAL STUDENT ID
    // =========================

    const infoStudentId =
        document.getElementById(
            "displayInfoStudentId"
        );


    if (infoStudentId) {

        infoStudentId.textContent =
            user.studentId ||
            "Not available";
    }


    // =========================
    // PERSONAL DEPARTMENT
    // =========================

    const infoDepartment =
        document.getElementById(
            "displayInfoDepartment"
        );


    if (infoDepartment) {

        infoDepartment.textContent =
            getDepartmentName(
                user.department
            );
    }
}


// =========================
// FILL EDIT FORM
// =========================

function fillEditForm(user) {


    // =========================
    // NAME
    // =========================

    const nameInput =
        document.getElementById(
            "profileName"
        );


    if (nameInput) {

        nameInput.value =
            user.name || "";
    }


    // =========================
    // EMAIL
    // =========================

    const emailInput =
        document.getElementById(
            "profileEmail"
        );


    if (emailInput) {

        emailInput.value =
            user.email || "";
    }


    // =========================
    // STUDENT ID
    // =========================

    const studentIdInput =
        document.getElementById(
            "profileStudentId"
        );


    if (studentIdInput) {

        studentIdInput.value =
            user.studentId || "";
    }


    // =========================
    // DEPARTMENT
    // =========================

    const departmentSelect =
        document.getElementById(
            "profileDepartment"
        );


    if (
        departmentSelect &&
        user.department
    ) {

        const department =
            user.department;


        // First try matching
        // option value

        departmentSelect.value =
            department;


        // If no option matched,
        // compare displayed text

        if (
            departmentSelect.value !==
            department
        ) {

            for (
                let i = 0;
                i < departmentSelect.options.length;
                i++
            ) {

                const option =
                    departmentSelect.options[i];


                if (
                    option.text.trim()
                    === department.trim()
                ) {

                    departmentSelect.selectedIndex =
                        i;

                    break;
                }
            }
        }
    }
}


// =========================
// DEPARTMENT NAME HELPER
// =========================

function getDepartmentName(
    department
) {

    if (!department) {

        return "Department";
    }


    const departments = {

        "CSE":
            "Computer Science & Engineering",

        "ECE":
            "Electronics & Communication",

        "EEE":
            "Electrical Engineering",

        "ME":
            "Mechanical Engineering",

        "CE":
            "Civil Engineering",

        "Computer Science & Engineering":
            "Computer Science & Engineering",

        "Electronics & Communication":
            "Electronics & Communication",

        "Electrical Engineering":
            "Electrical Engineering",

        "Mechanical Engineering":
            "Mechanical Engineering",

        "Civil Engineering":
            "Civil Engineering"
    };


    return departments[department]
        || department;
}


// =========================
// TOGGLE EDIT PROFILE
// =========================

function toggleEditProfile() {

    const editCard =
        document.getElementById(
            "editProfileCard"
        );


    if (!editCard) {

        return;
    }


    const isHidden =
        window.getComputedStyle(
            editCard
        ).display === "none";


    if (isHidden) {

        editCard.style.display =
            "block";


        editCard.scrollIntoView({

            behavior: "smooth",

            block: "start"
        });


    } else {

        editCard.style.display =
            "none";
    }
}


// =========================
// SAVE PROFILE
// =========================

async function saveProfile(event) {

    event.preventDefault();


    const storedUser =
        localStorage.getItem(
            "loggedInUser"
        );


    if (!storedUser) {

        window.location.href =
            "login.html";

        return;
    }


    const user =
        JSON.parse(storedUser);


    // =========================
    // GET FORM VALUES
    // =========================

    const nameInput =
        document.getElementById(
            "profileName"
        );


    const emailInput =
        document.getElementById(
            "profileEmail"
        );


    const studentIdInput =
        document.getElementById(
            "profileStudentId"
        );


    const departmentInput =
        document.getElementById(
            "profileDepartment"
        );


    const message =
        document.getElementById(
            "profileMessage"
        );


    const name =
        nameInput
            ? nameInput.value.trim()
            : user.name;


    const email =
        emailInput
            ? emailInput.value.trim()
            : user.email;


    const studentId =
        studentIdInput
            ? studentIdInput.value.trim()
            : user.studentId;


    const department =
        departmentInput
            ? departmentInput.value
            : user.department;


    // =========================
    // VALIDATION
    // =========================

    if (!name || !email) {

        if (message) {

            message.textContent =
                "❌ Name and email are required.";

            message.style.color =
                "red";
        }

        return;
    }


    // =========================
    // CURRENT BACKEND DOES NOT
    // YET HAVE UPDATE API
    // =========================

    const updatedUser = {

        ...user,

        name: name,

        email: email,

        studentId: studentId,

        department: department
    };


    // Save locally
    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
    );


    // Update visible profile
    displayProfile(
        updatedUser
    );


    // =========================
    // SUCCESS MESSAGE
    // =========================

    if (message) {

        message.textContent =
            "✅ Profile updated successfully!";

        message.style.color =
            "green";
    }
}


// =========================
// LOGOUT
// =========================

function logoutUser() {

    localStorage.removeItem(
        "loggedInUser"
    );


    window.location.href =
        "login.html";
}