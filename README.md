# AnimeSpring

AnimeSpring is an Angular-based web application designed to manage a list of anime titles. It allows users to view, add, update, delete, and filter anime records. This project interacts with a Spring Boot backend (assumed running on `localhost:8080`) to persist data.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Future Plans](#future-plans)

## Features

- **List Animes**: View a complete list of available animes.
- **Filter Animes**: Filter the anime list by title, number of episodes, and protagonist. Pagination is supported.
- **CRUD Operations**:
    - **Create**: Add new anime entries.
    - **Read**: View details of an anime.
    - **Update**: Edit existing anime information.
    - **Delete**: Remove an anime from the list.

## Project Structure

The project follows a standard Angular structure:

- **src/app/components**: Contains the main functional components.
    - `anime-list`: Displays the full list of animes.
    - `anime-add`: Handles adding and updating anime details.
- **src/app/anime-filtered-list**: Contains the component for the filtered and paginated view.
- **src/app/service**: Contains `AnimeServiceService`, which handles API communication.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v14.x or higher
- **npm**: v6.x or higher
- **Angular CLI**: v14.0.4 (recommended)
- **Backend Service**: A backend service running on `http://localhost:8080` that provides the following endpoints:
    - `GET /api/animes`: List all animes.
    - `GET /api/animes/filtered`: List filtered animes with pagination.
    - `GET /api/animes/{id}`: Get a single anime.
    - `POST /api/animes`: Create a new anime.
    - `PUT /api/animes`: Update an anime.
    - `DELETE /api/animes/{id}`: Delete an anime.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd anime-spring
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

1.  **Start the development server:**
    ```bash
    ng serve
    ```

2.  **Access the application:**
    Open your browser and navigate to `http://localhost:4200/`.

## Development

### Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Future Plans

We have outlined a roadmap for future enhancements in [FUTURE_PLAN.md](FUTURE_PLAN.md). This includes features like authentication, advanced filtering, and UI improvements.
