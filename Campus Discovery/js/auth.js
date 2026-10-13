const API_URL = "http://localhost:8080/api/users";


// =========================
// SHOW REGISTER FORM
// =========================

function showRegister(event) {

    event.preventDefault();

    const registerCard =
        document.getElementById("registerCard");

    if (registerCard) {

        registerCard.style.display = "block";

        registerCard.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// =========================
// SHOW LOGIN FORM
// =========================

function showLogin(event) {

    event.preventDefault();

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// =========================
// REGISTER USER
// =========================

async function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const studentId =
        document.getElementById("studentId").value.trim();

    const department =
        document.getElementById("department").value;

    const message =
        document.getElementById("registerMessage");


    // Password validation
    if (password !== confirmPassword) {

        message.textContent =
            "❌ Passwords do not match.";

        message.style.color = "red";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        password: password,

                        studentId: studentId,

                        department: department,

                        role: "STUDENT"
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(data);
        }


        message.textContent =
            "🎉 Registration successful! You can now login.";

        message.style.color =
            "green";


        document
            .getElementById("registerForm")
            .reset();


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        message.textContent =
            "❌ " + error.message;

        message.style.color =
            "red";
    }
}


// =========================
// LOGIN USER
// =========================

async function loginUser(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const message =
        document.getElementById(
            "loginMessage"
        );


    try {

        const response =
            await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        email: email,

                        password: password
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(data);
        }


        // Save logged-in user
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(data)
        );


        message.textContent =
            "✅ Login successful! Redirecting...";

        message.style.color =
            "green";


        setTimeout(() => {

            if (data.role === "ADMIN") {

                window.location.href =
                    "admin.html";

            } else {

                window.location.href =
                    "profile.html";
            }

        }, 800);


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        message.textContent =
            "❌ " + error.message;

        message.style.color =
            "red";
    }
}


// =========================
// FORGOT PASSWORD
// =========================

async function forgotPassword(event) {

    event.preventDefault();


    // Ask for registered email
    const email =
        prompt(
            "Enter your registered email address:"
        );


    if (!email) {

        return;
    }


    const cleanEmail =
        email.trim();


    if (!cleanEmail) {

        alert(
            "Please enter a valid email address."
        );

        return;
    }


    // Ask for new password
    const newPassword =
        prompt(
            "Enter your new password:"
        );


    if (!newPassword) {

        return;
    }


    if (newPassword.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    // Confirm password
    const confirmPassword =
        prompt(
            "Confirm your new password:"
        );


    if (!confirmPassword) {

        return;
    }


    if (newPassword !== confirmPassword) {

        alert(
            "❌ Passwords do not match."
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/reset-password`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        email: cleanEmail,

                        newPassword:
                            newPassword
                    })
                }
            );


        const data =
            await response.text();


        if (!response.ok) {

            throw new Error(data);
        }


        alert(
            "✅ Password reset successful!\n\nYou can now login with your new password."
        );


    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );


        alert(
            "❌ " + error.message
        );
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