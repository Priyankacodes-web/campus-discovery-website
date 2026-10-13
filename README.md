# Campus Discovery Website

A full-stack web application designed to help students discover campus events and access campus-related information through a centralized website.

## About the Project

The **Campus Discovery Website** is an academic project developed as part of my BTech in Computer Science and Engineering. It combines a web-based frontend with a Java Spring Boot backend and a MySQL database to support event-related functionality.

The project helps me gain practical experience in frontend development, REST API integration, backend programming, and database connectivity.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Java, Spring Boot
- **Data Access:** Spring Data JPA
- **Database:** MySQL
- **Development Tools:** Visual Studio Code, Maven, Git, GitHub

## Key Features

- Browse campus events.
- Search and filter events by category or name.
- View individual event details.
- Submit event registration information.
- Connect the frontend to backend REST APIs.
- Store and retrieve event data using MySQL.

*Additional modules, including club information, announcements, and administrative management, can be documented here as they are completed and tested.*

## Project Structure

```text
Campus Discovery Website/
├── Campus Discovery/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── pages/
├── campus-discovery-backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw.cmd
└── .gitignore
```

## How to Run the Project

### 1. Prerequisites

Install the following:

- Java Development Kit (JDK)
- MySQL Server
- Visual Studio Code
- A web browser

### 2. Configure the database

- Create the MySQL database used by the application.
- Configure the database connection settings in the backend's local `application.properties` file.
- Use `application-example.properties` as a reference if it contains the required configuration placeholders.
- Ensure the required tables are created according to the project's entity and database configuration.

**Security note:** Keep database passwords, API keys, and other private credentials out of GitHub.

### 3. Start the backend

Open a terminal in the `campus-discovery-backend` directory and run:

```powershell
.\mvnw.cmd spring-boot:run
```

When the backend starts successfully, test the events API:

```text
http://localhost:8080/api/events
```

### 4. Start the frontend

Open the `Campus Discovery` frontend folder in Visual Studio Code and launch `index.html` using the Live Server extension.

Keep the backend running while testing frontend features that require API access.

## Learning Outcomes

Through this project, I am developing practical skills in:

- Building responsive web interfaces using HTML, CSS, and JavaScript.
- Developing REST APIs with Java and Spring Boot.
- Connecting backend applications to MySQL using Spring Data JPA.
- Integrating frontend pages with backend services.
- Using Git and GitHub for version control and project sharing.

## Project Status

Academic project — under development and improvement.

## Author

**Priyanka Nayak**

BTech Computer Science and Engineering

## Repository

Source code: [Campus Discovery Website](https://github.com/Priyankacodes_web/campus-discovery-website)
