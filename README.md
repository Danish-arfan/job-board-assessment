# AI-Driven Job Board 

## Project Overview
This project is a high-performance, responsive job board built as a technical assessment for the Software Engineer position at Dexterity. It features client-side search and filtering capabilities, backed by a static JSON data layer to ensure zero-latency querying and maximum deployment stability. 

## Tech Stack
* **Frontend Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Data Layer:** Local JSON Mock Database
* **Deployment & CI/CD:** GitHub Actions & Vercel CLI

## UX Decisions
* **Minimalist Aesthetics:** Implemented a clean, modern interface using Tailwind's utility classes to reduce cognitive load, prioritizing readability and essential job data.
* **Responsive Design:** Engineered to scale flawlessly from mobile devices to desktop monitors using CSS grid and flexbox logic.
* **Compound State Management:** Utilized React's `useState` and `useMemo` to intersect search queries and category filters simultaneously.
* **Graceful Degradation:** Designed a dedicated "Empty State" UI that clearly communicates to the user when a specific search criteria yields no results, preventing blank screens or system crashes.

## CI/CD Architecture
This repository bypasses standard auto-deployment in favor of a robust, custom CI/CD pipeline. 
1. A GitHub Actions YAML file (`deploy.yml`) listens for any push to the `main` branch.
2. Upon triggering, it provisions an Ubuntu runner and installs the Vercel CLI.
3. The pipeline securely authenticates using repository secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).
4. It pulls the production environment variables, builds the Next.js artifacts, and forces a prebuilt deployment directly to Vercel's servers.

## Local Setup
To run this project locally, execute the following commands in your terminal:

\`\`\`bash
# Install dependencies
npm install

# Start the local development server
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.