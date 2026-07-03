# AI-Driven Job Board Assessment

## Project Overview
This project is a high-performance, frontend-focused job board engineered as a technical assessment for the Software Engineer position. It features a fully responsive UI, real-time intersecting search and filtering capabilities, client-side data persistence, and a seamless application modal workflow. To ensure zero latency and eliminate database connection points of failure during the evaluation, the data layer utilizes a static JSON architecture.

## Tech Stack
* **Frontend Framework:** Next.js (App Router) 
* **Styling:** Tailwind CSS & Custom CSS Variables
* **Language:** TypeScript 
* **CI/CD & Deployment:** GitHub Actions

## UX Decisions
The application was designed to feel native, responsive, and immediate:
* **Aesthetic & Typography:** Implements a premium, high-contrast aesthetic using deep darks and clean spacing. It relies on minimal, bold, and modern typography (Sora and Inter fonts) to establish a dominant visual hierarchy on screen.
* **State Management:** Utilizes React `useState` and `useMemo` to handle real-time filtering across search inputs, location constraints, and job categories without page reloads.
* **Perceived Performance:** Integrates custom CSS skeleton loading animations that mimic the exact layout of the job cards, masking network latency and enhancing the premium feel during initial data fetches.
* **Edge Case Handling:** Features a robust "Empty State" UI that gracefully presents a custom "No matching roles found" message if a user's filter criteria yield zero results.

## CI/CD Architecture
This repository implements a custom Continuous Integration and Continuous Deployment (CI/CD) pipeline via GitHub Actions, bypassing standard auto-deploy configurations. 

1. **Trigger:** The pipeline listens for any `push` event to the `main` branch.
2. **Environment:** It initializes an `ubuntu-latest` runner and fetches the repository code.
3. **Vercel CLI Integration:** It globally installs the Vercel CLI.
4. **Authentication & Deployment:** Using securely stored GitHub Repository Secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`), the pipeline authenticates with Vercel, pulls the production environment variables, builds the Next.js artifacts, and forces a prebuilt production deployment directly to Vercel's edge network.

## Local Setup
Instructions for running the project locally:

1. Clone the repository and navigate into the directory.
2. Install dependencies:
   ```bash
   npm install