const siteMetadata = {
  title: "Harsh Thakkar | Full Stack Developer Portfolio",
  description:
    "Harsh Thakkar is a Full Stack Developer focused on React, Node.js, Express, MongoDB, and secure, production-ready web applications.",
  keywords: [
    "Harsh Thakkar",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Portfolio",
    "Cybersecurity Enthusiast",
  ],
  author: "Harsh Thakkar",
  siteName: "Harsh Thakkar Portfolio",
  siteUrl: "https://your-domain.com",
  locale: "en_US",
  ogImage: "/og-cover.png",
  twitterCard: "summary_large_image",
};

const sectionToggles = {
  about: true,
  skills: true,
  developerActivity: true,
  projects: true,
  experience: true,
  certifications: true,
  contact: true,
  achievements: false,
};

const sectionDefinitions = [
  { id: "about", title: "About", toggleKey: "about" },
  { id: "skills", title: "Skills", toggleKey: "skills" },
  { id: "experience", title: "Experience", toggleKey: "experience" },
  { id: "projects", title: "Projects", toggleKey: "projects" },
  { id: "activity", title: "Activity", toggleKey: "developerActivity" },
  { id: "certifications", title: "Certifications", toggleKey: "certifications" },
  { id: "contact", title: "Contact", toggleKey: "contact" },
];

const navLinks = sectionDefinitions
  .filter((section) => section.id !== "activity")
  .filter((section) => sectionToggles[section.toggleKey])
  .map(({ id, title }) => ({ id, title }));

const personalInfo = {
  name: "Harsh Thakkar",
  tagline:
    "Full Stack Developer focused on building responsive frontend experiences, scalable backend systems, and clean production-ready applications.",
  location: "Gandhinagar, Gujarat, India",
  phone: "+91 9662050094",
  email: "thakkarharsh1508@gmail.com",
  linkedIn: "https://in.linkedin.com/in/harsh-thakkar1508",
  github: "https://github.com/HarshThakkar15",
  leetCode: "",
  roles: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "React.js Developer",
    "Cybersecurity Enthusiast",
  ],
  availabilityMessage:
    "Open to Full Stack / MERN Stack Developer roles, internships and freelance opportunities - available for remote, hybrid or on-site opportunities.",
  availabilityShort:
    "Open to Full Stack & MERN opportunities.",
  resumeHeadline:
    "Full Stack Developer focused on MERN applications, API architecture, and secure deployment workflows.",
  about:
    "I'm a full stack developer focused on building scalable, user-centric web applications with clean architecture, responsive interfaces and efficient backend systems. My internship experience strengthened my expertise in React, Node.js, Express.js and MongoDB.",
  education: {
    institute: "Ganpat University",
    degree: "B. Tech in IT",
    period: "2022 - 2026",
    score: "CGPA 8.65/10",
  },
};

const aboutHighlights = [
  {
    title: "Frontend Engineering",
    value:
      "Responsive and interactive React interfaces with reusable component architecture.",
  },
  {
    title: "Backend Systems",
    value:
      "Scalable REST APIs using Node.js, Express.js and MongoDB with optimized schema design.",
  },
  {
    title: "Security Mindset",
    value:
      "Hands-on exposure to Kali Linux, Nmap, Wireshark and cybersecurity fundamentals.",
  },
];

const technologies = [
  {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend",
  },
  { name: "Express.js", icon: "/tech-icons/express.svg", category: "Backend" },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Database",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Database",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Language",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Language",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Language",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    category: "Language",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "Frontend",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    category: "Frontend",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Tooling",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    category: "Tooling",
  },
  {
    name: "Kali Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kalilinux/kalilinux-original.svg",
    category: "Cybersecurity",
  },
  { name: "Nmap", icon: "/tech-icons/nmap.svg", category: "Cybersecurity" },
  {
    name: "Wireshark",
    icon: "/tech-icons/wireshark.svg",
    category: "Cybersecurity",
  },
  { name: "SEO", icon: "/tech-icons/seo.svg", category: "Concept" },
  {
    name: "Cryptography",
    icon: "/tech-icons/cryptography.svg",
    category: "Concept",
  },
];

const skillCapabilities = [
  {
    title: "Frontend Engineering",
    proof:
      "Built responsive React interfaces during internship work with reusable components and smooth section level interactions.",
    tags: ["React.js", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Backend Development",
    proof:
      "Implemented REST APIs with Node.js and Express.js, including authentication oriented flows and structured route design.",
    tags: ["Node.js", "Express.js", "REST API"],
  },
  {
    title: "Database Design",
    proof:
      "Designed MongoDB and MySQL data models focused on consistency, maintainability and practical query performance.",
    tags: ["MongoDB", "MySQL", "Schema Design"],
  },
  {
    title: "Performance Optimization",
    proof:
      "Applied lightweight UI patterns, clean component boundaries and optimized data access practices for faster, smoother experiences.",
    tags: ["Rendering", "Scalable Patterns"],
  },
  {
    title: "Testing & Code Quality",
    proof:
      "Followed clean architecture and collaborative review practices to keep code production-ready and easier to maintain.",
    tags: ["Code Review", "Debugging", "Maintainability"],
  },
];

const experiences = [
  {
    title: "Full Stack Developer Intern",
    companyName: "REAI Innovations Pvt. Ltd.",
    iconBg: "#1D4ED8",
    date: "Dec 2025 - Apr 2026",
    points: [
      "Developed and optimized responsive React.js interfaces to improve user engagement.",
      "Built and integrated REST APIs using Node.js and Express.js.",
      "Designed scalable MongoDB schemas to improve data consistency and query performance.",
      "Collaborated in an Agile team using Git workflows and peer code reviews.",
    ],
  },
];

const projects = [
  {
    name: "Developer TaskHub",
    description:
      "MERN stack task management and developer showcase platform with secure authentication, API integration and dynamic routing.",
    image: "taskhub",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Render"],
    sourceCodeLink: "https://github.com/HarshThakkar15/Developer-TaskHub",
    liveDemoLink: "https://developer-taskhub.onrender.com/",
  },
  {
    name: "WanderLust",
    description:
      "Airbnb inspired full stack application built with MVC architecture, authentication, review system and RESTful APIs.",
    image: "wanderlust",
    tags: ["Node.js", "Express.js", "EJS", "MVC", "REST API"],
    sourceCodeLink: "https://github.com/HarshThakkar15/Major-Project",
    liveDemoLink: "https://major-project-qeey.onrender.com/listings",
  },
  {
    name: "Face Recognition Attendance System",
    description:
      "Team project that automates attendance using OpenCV with React dashboard, backend services and MySQL based data persistence.",
    image: "faceAttendance",
    tags: ["React.js", "Node.js", "MySQL", "OpenCV"],
  },
  {
    name: "Weather App",
    description:
      "Responsive real time weather application with OpenWeather API integration and modern UI components.",
    image: "weather",
    tags: ["React.js", "Material UI", "OpenWeather API"],
    sourceCodeLink: "https://github.com/HarshThakkar15/Weather-App",
  },
  {
    name: "Doctor Appointment Booking System",
    description:
      "PHP + MySQL appointment booking platform with slot management and confirmation workflows.",
    image: "doctor",
    tags: ["PHP", "MySQL"],
  },
];

const certifications = [
  {
    name: "Introduction to Red Hat OpenShift AI",
    issuer: "Red Hat",
    credentialUrl: "https://www.credly.com/badges/a8899dd6-a101-4693-aa16-5433f07a56eb/",
  },
  {
    name: "Getting Started with Linux Fundamentals",
    issuer: "Red Hat Training",
    credentialUrl: "https://www.credly.com/badges/e795f3ce-b27e-4762-bd80-2a795b202d99/",
  },
  {
    name: "SQL (Intermediate)",
    issuer: "HackerRank",
    credentialUrl: "https://www.hackerrank.com/certificates/bf6abb25dfe9",
  },
  {
    name: "Java (Basic)",
    issuer: "HackerRank",
    credentialUrl: "https://www.hackerrank.com/certificates/e9a3ef831779",
  },
  {
    name: "Career Essentials in Cybersecurity",
    issuer: "Microsoft + LinkedIn Learning",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/21eeb82c7cba9f1613e8e330b6a9ab48a790bf624fc90ff7b5b8ca019aea82cc",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    credentialUrl: "https://www.credly.com/badges/03ec336a-6919-4dc3-b752-77054a21c1e8",
  },
  {
    name: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    credentialUrl: "",
  },
  {
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    credentialUrl: "",
  },
];

const socialLinks = [
  { name: "GitHub", url: "https://github.com/HarshThakkar15", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://in.linkedin.com/in/harsh-thakkar1508",
    icon: "linkedin",
  },
  { name: "WhatsApp", url: "https://wa.me/919662050094", icon: "whatsapp" },
];

const portfolioConfig = {
  siteMetadata,
  sectionToggles,
  sectionDefinitions,
  navLinks,
  personalInfo,
  aboutHighlights,
  technologies,
  skillCapabilities,
  experiences,
  projects,
  certifications,
  socialLinks,
};

export default portfolioConfig;
export {
  portfolioConfig,
  siteMetadata,
  sectionToggles,
  sectionDefinitions,
  navLinks,
  personalInfo,
  aboutHighlights,
  technologies,
  skillCapabilities,
  experiences,
  projects,
  certifications,
  socialLinks,
};
