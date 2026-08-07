/*
  ONE PLACE TO EDIT WHEN ADDING/UPDATING PROJECTS.
  Every field is used somewhere on the site — don't delete keys, just fill them in.

  live:  full URL if deployed, or null if not deployed yet.
         If null, the big preview box on the detail page links to the repo instead.
  date:  e.g. "Mar 2025". Leave as "" if unknown — the date row just won't render.
  accent: "teal" | "amber" | "violet" | "rose" — controls the placeholder thumbnail glow color.
          Swap thumb.style with a real screenshot later: give the card an <img> instead
          of the .thumb placeholder markup once you have one.
*/

window.PROJECTS = [
  {
    id: "healthtech",
    title: "HealthTech Website",
    tagline: "Appointment booking & doctor consultation platform",
    description: "A platform for booking medical appointments with separate roles for patients and doctors. Patients can browse doctor listings, filter by specialty, view profiles and reviews, and book slots. Doctors manage their schedule and consultations from a dedicated dashboard.",
    tech: ["React.js", "Django", "PostgreSQL", "Tailwind CSS"],
    repo: "https://github.com/GouravSharma26/HealthTechWebsite-Basic-.git",
    live: null, // TODO: add deployed URL if this one is live
    date: "", // TODO: add build month/year
    accent: "teal"
  },
  {
    id: "ebook-system",
    title: "E-Book Management System",
    tagline: "Online e-book shopping platform",
    description: "An online bookstore where users browse, purchase, and manage e-books. Includes a cart, payment integration, and an admin panel for managing inventory and orders. Originally built with server-rendered templates, later revamped with a React frontend.",
    tech: ["React.js", "Django", "PostgreSQL"],
    repo: "https://github.com/GouravSharma26/E-Book-System.git",
    live: null, // TODO
    date: "", // TODO
    accent: "amber"
  },
  {
    id: "chat-bot",
    title: "Chat Bot Application",
    tagline: "NLP-powered chatbot with REST API backend",
    description: "A chatbot that responds to user queries using natural language processing. Backed by a REST API with user authentication, so conversations can be tied to individual accounts.",
    tech: ["React.js", "Django", "PostgreSQL"],
    repo: "https://github.com/GouravSharma26/Chat_Bot.git",
    live: null, // TODO
    date: "", // TODO
    accent: "violet"
  },
  {
    id: "old-newspaper",
    title: "Old Newspaper Archive",
    tagline: "Digital archive for historical newspaper editions",
    description: "A digital archive platform that collects and displays old newspaper editions. Includes filtering, file uploads, an admin dashboard for managing entries, and a responsive reading interface.",
    tech: ["React.js", "Django", "PostgreSQL", "Tailwind CSS"],
    repo: "https://github.com/GouravSharma26/Old_Newspaper.git",
    live: null, // TODO
    date: "", // TODO
    accent: "rose"
  }

  /*
  ADD NEW PROJECTS BY COPYING THIS BLOCK:
  {
    id: "unique-slug-no-spaces",
    title: "Project Name",
    tagline: "One line, shows on the card",
    description: "Longer paragraph, shows on the detail page.",
    tech: ["Tech1", "Tech2"],
    repo: "https://github.com/you/repo",
    live: "https://your-live-url.com",  // or null
    date: "Jul 2025",
    accent: "teal"  // teal | amber | violet | rose
  },
  */
];
