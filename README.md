# 💫 Harsh Thakkar | Full Stack Developer Portfolio

<p align="center">
  <a href="https://harsh-thakkar-portfolio.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Site-Visit_Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Site">
  </a>
  <a href="https://in.linkedin.com/in/harsh-thakkar1508">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/HarshThakkar15">
    <img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="mailto:thakkarharsh1508@gmail.com">
    <img src="https://img.shields.io/badge/Email-Contact_Me-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</p>

A premium, highly interactive, and responsive portfolio designed for modern web browsers. Built with **React.js**, **Vite**, **Tailwind CSS**, and animated using **Framer Motion**, this single-page application highlights my full-stack engineering capabilities and professional experience.

---

## 🌟 Key Features

- **Glassmorphic UI**: Beautiful glassmorphism effects, curated dark/light style highlights, customized scrollbars, and card hovers.
- **Seamless Responsiveness**: Tailored layout transitions that adjust fluidly from ultra-wide displays down to mobile screens.
- **Config-Driven Architecture**: The entire application contents are decoupled into a modular Javascript config file (`portfolio.js`), enabling fast updates and high maintainability.

---

## 🛠️ Tech Stack & Capabilities

### Core Technologies
<p align="left">
  <img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Framer_Motion-00C58E?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion">
</p>

---

## 🚀 Getting Started

Get a local copy of this portfolio running on your local machine by completing these steps:

### 1. Clone & Install
```bash
git clone https://github.com/HarshThakkar15/Portfolio.git
cd Portfolio
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open the local server URL (e.g. `http://localhost:5173`) in your web browser.

---

## ⚙️ Customization Guide

You don't need to crawl multiple React component files to update the portfolio. The system is designed with a **fully centralized config** model. 

Modify your content directly inside:
📍 **`src/constants/portfolio.js`**

Simply alter the key-value structures to instantly updates pages:
- Enable or disable entire pages or sections (About, Skills, Experience, Projects, Certifications) using simple booleans in `sectionToggles`.
- Adjust personal coordinates, social page URLs, and email anchors.
- Append new tech skill icons and badges.
- Edit project descriptions, GitHub code source links, and production deployment URLs.
- Update resume details, education history, and certification links.