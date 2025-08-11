# careConnect

A web application for connecting patients with clinics and healthcare providers.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

careConnect helps users find clinics, healthcare providers, and specialties. Users can search, browse, and view detailed profiles for clinics and providers, including contact information, credentials, and locations.

---

## Frontend (`client/`)

- **Framework:** Vue.js & TypeScript
- **Features:**
  - Home page with navigation links: "Find a Clinic", "Find a Provider", "Find a Specialty"
  - Search pages for each type, with results displayed as cards
  - Profile pages for clinics and providers, showing detailed info and cross-links
- **Structure:**
  - `public/` - Static files and root HTML
  - `src/assets/` - CSS, images, logos, icons
  - `src/components/` - Reusable Vue components (cards, navbar, footer, etc.)
  - `src/interfaces/` - TypeScript interfaces for data models
  - `src/router/` - Routing setup with Vue Router
  - `src/services/` - API and search logic
  - `src/views/` - Main app pages

---

## Backend (`server/`)

- **Framework:** Node.js, Express, TypeScript, Prisma ORM
- **Features:**
  - REST API for clinics, providers, and specialties
  - Business logic and validation middleware
  - Prisma ORM for database modeling and access
- **Structure:**
  - `controllers/` - Handle HTTP requests, connect routes to services
  - `middleware/` - Express middleware (request validation, etc.)
  - `prisma/` - Database client and schema
  - `routes/` - Defines API endpoints and routing
  - `services/` - Business logic and database operations

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kjirstenhernandez/careConnect.git
   ```

2. **Frontend Setup**
   ```bash
   cd careConnect/client
   npm install
   # Optional: edit .env or config files if needed
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd careConnect/server
   npm install
   cp .env.example .env   # Edit DB credentials as needed
   npx prisma migrate dev # Set up the database
   npm run dev
   ```

---

## Usage

- Visit the frontend in your browser (default`https://careconnect-blue.vercel.app/`).
- The backend API runs on `https://careconnect-server-unbx.onrender.com`.
- Use the navigation links to search for clinics, providers, or specialties.
- Click on cards to view detailed profiles and linked locations/providers.

---

## Contributing

Pull requests and issues are welcome!  
- Fork the repo and make your changes in a new branch.
- Open a PR with a clear description of your changes.
- For questions or feature requests, use the Issues tab.

---


## Contact

For support or questions, open an issue or reach out via [careConnect on GitHub](https://github.com/kjirstenhernandez/careConnect).
