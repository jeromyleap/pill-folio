/**
 * Resume content for the Sunday card, from Jeromy's supplied resume.
 * Span artifacts from the source export are stripped.
 */

export const resumeDesign = {
  colors: [
    { name: "Old Glory red", hex: "#B22234" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Old Glory blue", hex: "#3C3B6E" },
    { name: "Ink", hex: "#3c332b" },
  ],
  fonts: [{ name: "English", role: "Spoken", className: "font-sans font-bold" }],
} as const;

export const resumeBrief = {
  name: "Jeromy Allen Leap",
  location: "Saint Petersburg, FL",
  phone: "570-677-3483",
  email: "jeromy.leap@gmail.com",
  site: "https://nicheleap.com",
  linkedIn: "https://www.linkedin.com/in/jeromy-leap-989967431/",
  tagline: "Software engineering student. Pharmacy ops leader.",
  cta: "Open full resume",
  summary:
    "Detail-oriented Software Engineering student and seasoned healthcare operations leader with over two decades of experience managing high-throughput pharmacy environments, inventory systems, and team training. Proven ability to bridge clinical workflows with modern web architectures and automated pipelines.",
};

export const resumeSkills = [
  {
    group: "Languages & frameworks",
    items: [
      "Python",
      "JavaScript / TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "HTML / CSS",
    ],
  },
  {
    group: "Databases & back-end",
    items: ["SQL", "PostgreSQL", "Supabase", "Firebase", "REST APIs"],
  },
  {
    group: "Tools & platforms",
    items: ["Git", "GitHub", "Vercel", "Cursor", "Replit", "POS / DSD", "ScriptPro", "RxConnect"],
  },
  {
    group: "Domain",
    items: [
      "Pharmacy operations",
      "MTM compliance",
      "Workflow automation",
      "Inventory management",
      "Team leadership",
    ],
  },
];

export const resumeExperience = [
  {
    title: "Lead Certified Pharmacy Technician (CPhT)",
    org: "CVS Pharmacy",
    place: "Saint Petersburg, FL",
    dates: "2010 – Present",
    bullets: [
      "Direct daily pharmacy operations: prescription processing, fulfillment, quality control, and inventory.",
      "Manage multi-employee scheduling, labor budgeting, and script-count tracking against corporate metrics.",
      "Oversee third-party claims reconciliation, audit compliance, and patient outreach for medication adherence and MTM.",
      "Collaborate with pharmacists on complex clinical workflows, clarifications, and provider follow-ups.",
    ],
  },
  {
    title: "Satellite Trainer / Coach",
    org: "CVS Pharmacy",
    place: "Saint Petersburg, FL",
    dates: "2023 – Present",
    bullets: [
      "Regional onboarding coach for pharmacy technician trainees routed through the store for practical training.",
      "Hands-on instruction covering retail pharmacy operations, data entry standards, processing systems, and safety compliance.",
      "Evaluate trainee progress, enforce operational accuracy, and mentor new staff into active store workflows.",
    ],
  },
  {
    title: "Regional Photo Satellite Trainer & Manager",
    org: "CVS Pharmacy",
    place: "East Stroudsburg, PA",
    dates: "2005 – 2010",
    bullets: [
      "Technical troubleshooting, maintenance training, and operational support for regional store equipment and imaging labs.",
      "Educated new hires on inventory control, loss prevention, and standard operating procedures.",
      "Maintained customer satisfaction scores averaging 20% above company benchmarks.",
    ],
  },
];

export const resumeProjects = [
  {
    name: "Fluxo",
    detail:
      "Clinic revenue and waitlist automation: intercepts appointment cancellations through EHR connections and fills open slots via waitlist messaging.",
  },
  {
    name: "MTM Prescription Pickup Compliance Bridge",
    detail:
      "Health-tech pipeline in Python and Flask/FastAPI to streamline prescription pickup verification and adherence tracking.",
  },
  {
    name: "The Memory Thread",
    detail:
      "Installable PWA for collaborative digital legacy and memorials — audio guestbooks, secure media, and custom themes.",
  },
  {
    name: "Wristed",
    detail:
      "PWA that uses multimodal AI to generate custom smartwatch faces matching outfit photos and selfies.",
  },
];

export const resumeEducation = [
  {
    title: "Bachelor of Science in Computer Science and Software Engineering",
    school: "Colorado Technical University",
    detail: "Expected graduation: December 2027",
  },
  {
    title: "High School Diploma",
    school: "East Stroudsburg Senior High School South",
    detail: "East Stroudsburg, PA",
  },
];

export const resumeCerts = [
  {
    title: "Certified Pharmacy Technician (CPhT)",
    detail: "Nationally recognized through the PTCB.",
  },
  {
    title: "Registered Pharmacy Technician",
    detail: "State of Florida.",
  },
];
