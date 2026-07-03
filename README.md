# AI-Driven Job Board Assessment

## Project Overview
This project is a high-performance, frontend-focused job board built as a technical assessment for the Software Engineer position. It features a fully responsive UI, instantaneous search and filtering capabilities, and a seamless application modal workflow. To ensure zero latency and eliminate database connection points of failure during evaluation, the data layer utilizes a static JSON architecture.

## Tech Stack
*   **Frontend Framework:** Next.js (App Router) 
*   **Styling:** Tailwind CSS 
*   **Language:** TypeScript 
*   **CI/CD & Deployment:** GitHub Actions to Vercel 

## UX & UI Decisions
The application was designed with a modern, minimalist aesthetic to prioritize usability and speed:
*   **Visual Hierarchy & Styling:** Utilizes a clean, light/dark responsive theme featuring animated background orbs and glassmorphism elements in the sticky header for a premium feel. 
*   **State Management & Filtering:** Built with React `useState` and `useMemo` to handle real-time, instantaneous filtering across search inputs, location constraints, and job categories (e.g., Remote vs. Onsite). The filters dynamically intersect, ensuring accurate results.
*   **Edge Case Handling:** Features a robust "Empty State" UI. If a user inputs criteria that yield no results, the application gracefully presents a custom "No matching roles found" message with a prompt to reset filters, preventing blank screens or crashes.
*   **Client-Side Persistence:** Bookmarked jobs and application states are persisted seamlessly using browser `localStorage`.

## CI/CD Architecture
This repository implements a custom Continuous Integration and Continuous Deployment (CI/CD) pipeline via GitHub Actions, bypassing standard auto-deploy configurations. 

1. **Trigger:** The pipeline listens for any `push` event to the `main` branch.
2. **Environment:** It initializes an `ubuntu-latest` runner and fetches the repository code.
3. **Vercel CLI Integration:** It globally installs the Vercel CLI (`npm install --global vercel@latest`).
4. **Authentication & Deployment:** Using securely stored GitHub Repository Secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`), the pipeline authenticates with Vercel, pulls the production environment variables, builds the Next.js artifacts, and forces a prebuilt production deployment directly to Vercel's edge network.

## Local Setup Instructions
To run this project locally, execute the following commands in your terminal:

1. Clone the repository:
   ```bash
   git clone <your-public-repo-url>