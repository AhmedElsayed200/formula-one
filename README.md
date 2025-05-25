# Formula One Explorer

A modern, responsive web application for exploring Formula One seasons, races, and race details. Built with React, TypeScript, Vite, TailwindCSS, and Recharts, it provides a beautiful and interactive experience for F1 fans.


## Table of Contents

- [About](#about)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)


## About

**Formula One Explorer** allows users to browse F1 seasons, view races for each season, and dive into detailed race results, including driver stats, charts, and more. The app is designed for both desktop and mobile, with a focus on usability and performance.


## Features

- **Seasons Browser:** Paginated list of all F1 seasons, with Wikipedia links and details for each.
- **Races Viewer:** For each season, view all races, with favorite functionality (pinning).
- **Race Details:** See detailed results for each race, including drivers positions, points, laps, status, finish time, fastest lap, and average speed.
- **Charts & Visualizations:** Fastest lap, points, and total race time charts for quick comparison.
- **Favorites:** Mark races as favorites for quick access.
- **Responsive Design:** Works on all screen sizes.
- **Modern UI:** Card and list views, smooth transitions.
- **Robust Error & Loading States:** User-friendly feedback for loading and errors.


## Architecture

### **Component-Based Structure**
- **Pages:** Each route (seasons, races, race details) is a page in `src/pages/`.
- **Components:** Reusable UI elements (CardView, ListView, Header, Pagination, Button, etc.) in `src/components/`.
- **Hooks:** Custom hooks for data fetching, favorites, and breakpoints (screenSizes) in `src/hooks/`.
- **Types:** Centralized TypeScript types in `src/types/`.
- **Utils:** Helper functions for formatting and utilities in `src/utils/`.

### **Why This Architecture?**
- **Separation of Concerns:** Pages handle data and state, components handle UI.
- **Reusability:** Components and hooks are designed to be reusable and composable.
- **Scalability:** Easy to add new features or pages.
- **Type Safety:** TypeScript ensures robust, maintainable code.
- **Performance:** Vite and React 19 provide fast builds and HMR.


## Tech Stack & Libraries

- **React 19** – UI library
- **TypeScript** – Type safety
- **Vite** – Fast build tool and dev server
- **TailwindCSS** – Utility-first CSS framework
- **React Router v7** – Routing
- **Recharts** – Data visualizations
- **@testing-library/react** – Component testing
- **Vitest** – Unit testing
- **JSDOM** – DOM emulation for tests


## Getting Started

### **1. Clone the repository**
```sh
git clone https://github.com/AhmedElsayed200/formula-one.git
cd formula-one
```

### **2. Install dependencies**
```sh
npm install
```

### **3. Creat .env file**
```sh
check .env.example
```

### **4. Start the development server**
```sh
npm run dev
```
- The app will be available at `http://localhost:5173` (or as shown in your terminal).

### **4. Build for production**
```sh
npm run build
```

### **5. Preview the production build**
```sh
npm run preview
```


## Running Tests

### **Unit & Component Tests**
This project uses [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/).

**To run all tests:**
```sh
npm run test
```

- Tests are located alongside their components/pages, typically as `.test.tsx` files.
- The test environment is set up with JSDOM and jest-dom matchers for assertions.


## Check the deployed version : )

- The website is deployed so you can easily access it through this link: [Formula One Explorer](https://formula-one-explorer.netlify.app/).

