# Harsh Thakkar Portfolio

A modern personal portfolio built with React and Vite.  
This project showcases skills, projects, experience, certifications, and contact details in a fast and responsive single-page experience.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- ESLint

## Features

- Fully responsive portfolio layout
- Animated hero and section transitions
- Skills, projects, and experience sections
- Certifications and contact section
- Social profile links

## Project Structure

```text
portfolio/
  public/
    og-cover.png
    tech-icons/
  src/
    assets/
    components/
    constants/
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

The app will start on the local Vite dev URL shown in your terminal.

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks

## Customization Guide

Most content is centralized in:

- `src/constants/portfolio.js`

Update this file to change:

- Personal information
- Social links
- Skills and technologies
- Projects
- Experience
- Certifications
- Section visibility toggles

## Deployment

You can deploy this project to any static host, such as:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages