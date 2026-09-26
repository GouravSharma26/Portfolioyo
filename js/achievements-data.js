/*
  ONE PLACE TO EDIT WHEN ADDING CERTIFICATIONS/AWARDS.
  category: "certification" | "award" | "hackathon"
  accent:   "teal" | "amber" | "violet" | "rose" — matches project accent system
*/
window.ACHIEVEMENTS = [
  {
    id: "aws-cert",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jun 2025",
    category: "certification",
    credentialUrl: "https://www.credly.com/badges/your-badge-id",
    accent: "amber"
  },
  {
    id: "hackathon-win",
    title: "1st Place — SRM Hack 2025",
    issuer: "SRM Institute of Science and Technology",
    date: "Mar 2025",
    category: "hackathon",
    credentialUrl: null,
    accent: "teal"
  }

  /*
  ADD NEW ENTRIES BY COPYING THIS BLOCK:
  {
    id: "unique-slug",
    title: "Certification/Award Name",
    issuer: "Issuing Organization",
    date: "Mon Year",
    category: "certification", // certification | award | hackathon
    credentialUrl: "https://...", // or null
    accent: "teal" // teal | amber | violet | rose
  },
  */
];
