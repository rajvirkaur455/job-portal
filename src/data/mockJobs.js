export const MOCK_JOBS = [
  {
    id: "job-1",
    title: "Senior AI / Full-Stack Engineer",
    company: "OpenAI",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    location: "San Francisco, CA",
    remoteType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$190,000 - $260,000",
    minSalary: 190000,
    maxSalary: 260000,
    category: "Engineering",
    skills: ["React", "TypeScript", "Python", "LLMs", "Next.js", "Tailwind CSS"],
    experienceLevel: "Senior",
    postedDate: "2 hours ago",
    featured: true,
    urgent: true,
    aiMatchScore: 96,
    companySize: "500-1000",
    applicantsCount: 42,
    description: `We are looking for a Senior Full-Stack Engineer to join OpenAI's Product Engineering team. You will build user-facing AI interfaces, real-time collaboration engines, and scalable agent infrastructure powered by our flagship models.`,
    responsibilities: [
      "Architect and implement ultra-responsive Web UIs for generative AI workflows.",
      "Design low-latency WebSocket / Streaming API consumers for real-time model outputs.",
      "Partner with research scientists to bring state-of-the-art model capabilities to millions of creators.",
      "Optimize web application performance, bundle size, and rendering pipelines."
    ],
    requirements: [
      "5+ years of experience with modern React, TypeScript, and state management.",
      "Hands-on experience integrating LLM APIs (OpenAI, Anthropic, or open-source models).",
      "Deep understanding of web performance, browser APIs, and component architecture.",
      "Strong background in CSS/Tailwind, UI micro-interactions, and accessibility."
    ],
    perks: [
      "Generous equity package",
      "Unlimited PTO & annual wellness stipend",
      "Top-tier health, dental & vision insurance",
      "$5,000 annual home office setup budget"
    ]
  },
  {
    id: "job-2",
    title: "Staff Frontend Architect",
    company: "Linear",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    location: "Remote (Global)",
    remoteType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$210,000 - $280,000",
    minSalary: 210000,
    maxSalary: 280000,
    category: "Engineering",
    skills: ["React", "TypeScript", "WebAssembly", "IndexedDB", "Tailwind CSS", "GraphQL"],
    experienceLevel: "Lead",
    postedDate: "5 hours ago",
    featured: true,
    urgent: false,
    aiMatchScore: 94,
    companySize: "50-200",
    applicantsCount: 28,
    description: `Linear is building the tool of choice for modern high-performance software teams. As Staff Frontend Architect, you will own the client-side architecture that powers our famous instant-loading UI and local-first sync engine.`,
    responsibilities: [
      "Drive frontend design standards and client performance across web and desktop applications.",
      "Lead initiatives in offline-first data sync, optimistic updates, and instant keyboard shortcuts.",
      "Mentor senior engineers and influence product direction.",
      "Create reusable, pixel-perfect design system components."
    ],
    requirements: [
      "7+ years building enterprise-grade client applications with React and TypeScript.",
      "Expertise in optimistic UI patterns, state synchronization, and complex DOM interactions.",
      "Obsessive attention to UI details, micro-interactions, and typography.",
      "Experience with WebSockets, Web Workers, or WebAssembly is a huge plus."
    ],
    perks: [
      "Work from anywhere in the world",
      "Competitive salary & equity",
      "Workstation setup & yearly tech upgrade",
      "Company retreats twice a year in Europe/Americas"
    ]
  },
  {
    id: "job-3",
    title: "Lead Product Designer (UI/UX)",
    company: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80",
    location: "New York, NY",
    remoteType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$180,000 - $245,000",
    minSalary: 180000,
    maxSalary: 245000,
    category: "Design",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Tailwind CSS"],
    experienceLevel: "Senior",
    postedDate: "1 day ago",
    featured: true,
    urgent: false,
    aiMatchScore: 88,
    companySize: "5000+",
    applicantsCount: 64,
    description: `Stripe's Design team builds the infrastructure for internet commerce. We're looking for a Lead Product Designer to shape the future of our financial dashboard and global developer documentation experience.`,
    responsibilities: [
      "Craft end-to-end user journeys for complex financial products.",
      "Expand and refine Stripe's global design system, Sail.",
      "Collaborate closely with product managers and engineers from concept to ship.",
      "Conduct user interviews and synthesize feedback into crisp interaction models."
    ],
    requirements: [
      "6+ years of product design experience at tech companies.",
      "Strong portfolio demonstrating sleek SaaS dashboard interactions and clean visual design.",
      "Proficiency in Figma, interactive prototyping (Framer/Principle), and basic code awareness."
    ],
    perks: [
      "Premium health & mental wellness coverage",
      "Parental leave & family planning support",
      "Generous 401(k) matching",
      "Learning & development stipends"
    ]
  },
  {
    id: "job-4",
    title: "Cloud & DevOps Infrastructure Lead",
    company: "Supabase",
    companyLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80",
    location: "Remote",
    remoteType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$175,000 - $230,000",
    minSalary: 175000,
    maxSalary: 230000,
    category: "DevOps / Infrastructure",
    skills: ["Kubernetes", "AWS", "Terraform", "PostgreSQL", "Docker", "Go"],
    experienceLevel: "Lead",
    postedDate: "2 days ago",
    featured: false,
    urgent: true,
    aiMatchScore: 82,
    companySize: "100-500",
    applicantsCount: 19,
    description: `Supabase is the open source Firebase alternative. We provide developers with instant Postgres databases, authentication, real-time subscriptions, and auto-generated APIs. Join us to scale our global edge network!`,
    responsibilities: [
      "Manage multi-region Kubernetes clusters handling millions of database transactions per second.",
      "Build automated infrastructure code using Terraform and Ansible.",
      "Improve site reliability, latency, and automated incident recovery.",
      "Optimize PostgreSQL storage engines and connection poolers."
    ],
    requirements: [
      "5+ years running production infrastructure on AWS or GCP.",
      "Deep knowledge of Kubernetes, Docker containers, and CI/CD pipelines.",
      "Strong coding skills in Go, Rust, or Python.",
      "Experience with high-scale PostgreSQL replication and backup strategies."
    ],
    perks: [
      "Fully remote, async work culture",
      "Flexible working hours",
      "Annual team offsites",
      "Health & wellness allowance"
    ]
  },
  {
    id: "job-5",
    title: "Senior Machine Learning / NLP Engineer",
    company: "Anthropic",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    location: "San Francisco, CA",
    remoteType: "On-site",
    employmentType: "Full-time",
    salaryRange: "$230,000 - $310,000",
    minSalary: 230000,
    maxSalary: 310000,
    category: "Data & AI",
    skills: ["PyTorch", "Python", "CUDA", "LLMs", "Distributed Systems", "Transformers"],
    experienceLevel: "Senior",
    postedDate: "3 days ago",
    featured: true,
    urgent: false,
    aiMatchScore: 91,
    companySize: "200-500",
    applicantsCount: 51,
    description: `Anthropic is an AI safety and research company. We build reliable, beneficial, and interpretable AI systems such as Claude. We're hiring engineers to scale training pipelines and model evaluation suites.`,
    responsibilities: [
      "Train large transformer models across thousands of GPUs.",
      "Optimize GPU memory layout, FP8 training precision, and distributed gradient operations.",
      "Design evaluation benchmarks for reasoning, code generation, and safety alignment.",
      "Collaborate with research teams to test new architectural innovations."
    ],
    requirements: [
      "MS or PhD in Computer Science, Machine Learning, or related field (or equivalent experience).",
      "Extensive experience with PyTorch and distributed training frameworks (DeepSpeed, Megatron).",
      "Proven track record training large scale models in production environments."
    ],
    perks: [
      "Industry leading compensation & equity",
      "Catered gourmet lunch and dinner daily",
      "Relocation stipend provided",
      "Comprehensive medical coverage"
    ]
  },
  {
    id: "job-6",
    title: "Full-Stack Web Developer",
    company: "Vercel",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80",
    location: "Remote",
    remoteType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$150,000 - $200,000",
    minSalary: 150000,
    maxSalary: 200000,
    category: "Engineering",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Serverless"],
    experienceLevel: "Mid-Level",
    postedDate: "Just now",
    featured: false,
    urgent: false,
    aiMatchScore: 98,
    companySize: "500-1000",
    applicantsCount: 14,
    description: `Vercel is the platform for frontend developers. We provide automated CI/CD, global edge network deployment, and creator tools for Next.js. We're looking for a Full-Stack Developer for our v0 & AI SDK engineering team.`,
    responsibilities: [
      "Build generative UI editing features for Next.js apps.",
      "Develop high-speed serverless endpoints and Edge Functions.",
      "Ensure fast load times and clean component design.",
      "Contribute to open source SDKs used by thousands of developers."
    ],
    requirements: [
      "3+ years of experience with Next.js, React, and TypeScript.",
      "Familiarity with Vercel AI SDK or similar LLM streaming toolkits.",
      "Strong understanding of modern web standards and CSS styling."
    ],
    perks: [
      "100% remote working flexibility",
      "Home workspace budget ($2,500)",
      "Continuous learning & book stipends",
      "Stock option plan"
    ]
  },
  {
    id: "job-7",
    title: "Senior Product Manager - AI Tools",
    company: "Notion",
    companyLogo: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80",
    location: "San Francisco, CA",
    remoteType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$185,000 - $240,000",
    minSalary: 185000,
    maxSalary: 240000,
    category: "Product",
    skills: ["Product Strategy", "UI/UX", "Data Analytics", "AI/ML Integration", "User Research"],
    experienceLevel: "Senior",
    postedDate: "4 days ago",
    featured: false,
    urgent: false,
    aiMatchScore: 85,
    companySize: "500-1000",
    applicantsCount: 38,
    description: `Notion is the connected workspace where better, faster work happens. As Senior PM for Notion AI, you will define the roadmap for intelligence features that summarize, write, and analyze knowledge across millions of documents.`,
    responsibilities: [
      "Define product vision, goals, and specs for Notion AI features.",
      "Analyze telemetry data and user feedback to refine AI search and generation models.",
      "Partner with engineering leaders to drive rapid bi-weekly release cycles.",
      "Conduct competitive analysis in the productivity workspace landscape."
    ],
    requirements: [
      "4+ years of product management experience at high-growth SaaS companies.",
      "Proven success launching customer-facing AI or productivity tools.",
      "Analytical mindset with strong SQL and qualitative research skills."
    ],
    perks: [
      "Generous salary & equity packages",
      "Free meals in office",
      "Wellness & gym reimbursement",
      "Comprehensive medical package"
    ]
  },
  {
    id: "job-8",
    title: "DevOps & Site Reliability Engineer",
    company: "Datadog",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80",
    location: "Boston, MA",
    remoteType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$160,000 - $210,000",
    minSalary: 160000,
    maxSalary: 210000,
    category: "DevOps / Infrastructure",
    skills: ["Go", "Kubernetes", "Linux", "Prometheus", "Terraform", "Python"],
    experienceLevel: "Mid-Level",
    postedDate: "5 days ago",
    featured: false,
    urgent: false,
    aiMatchScore: 79,
    companySize: "5000+",
    applicantsCount: 22,
    description: `Datadog is the monitoring and security platform for cloud applications. We aggregate metrics, traces, and logs across hyper-scale infrastructure for global enterprise customers.`,
    responsibilities: [
      "Maintain 99.99% uptime across high-throughput data intake clusters.",
      "Automate cluster provisioning and secret management with Terraform and Vault.",
      "Participate in on-call rotation with rapid response automation.",
      "Build real-time monitoring dashboards for system health."
    ],
    requirements: [
      "3+ years experience in SRE or DevOps role.",
      "Solid knowledge of Linux internals, networking protocols, and container runtimes.",
      "Experience writing automation in Go or Python."
    ],
    perks: [
      "Competitive 401(k) matching",
      "Commuter subsidies",
      "Onsite gym and healthy snacks",
      "Health & dental plans"
    ]
  }
];

export const MOCK_COMPANIES = [
  {
    id: "comp-1",
    name: "OpenAI",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    industry: "Artificial Intelligence",
    employees: "800+",
    openJobsCount: 14,
    rating: 4.9,
    location: "San Francisco, CA",
    techStack: ["Python", "PyTorch", "React", "TypeScript", "CUDA"],
    description: "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity."
  },
  {
    id: "comp-2",
    name: "Linear",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    industry: "Developer Tools & SaaS",
    employees: "120+",
    openJobsCount: 8,
    rating: 4.9,
    location: "Remote / San Francisco",
    techStack: ["React", "TypeScript", "WebAssembly", "GraphQL", "Tailwind"],
    description: "Linear is a purpose-built tool for modern software development. Streamline issues, projects, and product roadmaps."
  },
  {
    id: "comp-3",
    name: "Stripe",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80",
    industry: "Fintech & Payments",
    employees: "7,000+",
    openJobsCount: 42,
    rating: 4.7,
    location: "San Francisco & Remote",
    techStack: ["Ruby", "Go", "React", "TypeScript", "Java"],
    description: "Stripe is a financial infrastructure platform for businesses. Millions of companies use Stripe to accept payments and grow their revenue."
  },
  {
    id: "comp-4",
    name: "Supabase",
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80",
    industry: "Database & Cloud Infrastructure",
    employees: "250+",
    openJobsCount: 11,
    rating: 4.8,
    location: "Remote Worldwide",
    techStack: ["PostgreSQL", "Go", "Elixir", "TypeScript", "React"],
    description: "Supabase is an open source Firebase alternative providing Postgres databases, Auth, instant APIs, and Realtime subscriptions."
  },
  {
    id: "comp-5",
    name: "Vercel",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80",
    industry: "Cloud & Developer Experience",
    employees: "600+",
    openJobsCount: 19,
    rating: 4.8,
    location: "Remote Worldwide",
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "Rust"],
    description: "Vercel provides developer tools and cloud infrastructure to build, deploy, and scale web applications effortlessly."
  }
];

export const DEFAULT_USER_PROFILE = {
  name: "Alex Morgan",
  title: "Senior Full-Stack Engineer",
  email: "alex.morgan@dev.io",
  location: "San Francisco, CA (Open to Remote)",
  salaryPreference: "$160,000 - $220,000",
  experienceLevel: "Senior",
  bio: "Passionate engineer with 6+ years experience building high-scale React apps, AI workflows, and cloud backends. Creator of open-source UI toolkits.",
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Python", "Next.js", "PostgreSQL", "GraphQL", "Docker"],
  resumeText: `ALEX MORGAN - SENIOR FULL-STACK ENGINEER
Location: San Francisco, CA | Email: alex.morgan@dev.io

SUMMARY:
Results-driven Full Stack Engineer with 6+ years of experience architecting high-performance React web applications and scalable REST/GraphQL APIs. Proven track record of improving site speed by 40% and integrating modern LLM AI workflows into enterprise products.

SKILLS:
- Frontend: React, TypeScript, Next.js, Tailwind CSS, Redux Toolkit, Webpack, Vite
- Backend & DB: Node.js, Express, Python, PostgreSQL, Redis, REST APIs, GraphQL
- Cloud & DevOps: AWS (S3, Lambda), Docker, GitHub Actions, CI/CD, Vercel

EXPERIENCE:
Senior Frontend Lead | TechFlow Solutions (2022 - Present)
- Led frontend redesign using React and Tailwind CSS, increasing conversion rates by 28%.
- Integrated OpenAI API streaming responses for real-time customer assistant dashboard.
- Mentored a team of 5 junior engineers and established code quality guidelines.

Software Engineer | CloudScale Inc. (2019 - 2022)
- Developed real-time telemetry dashboards processing 100k events/min with React and WebSockets.
- Migrated legacy codebase to TypeScript, reducing runtime production bugs by 35%.`
};

export const DEFAULT_APPLICATIONS = [
  {
    id: "app-101",
    jobId: "job-1",
    company: "OpenAI",
    title: "Senior AI / Full-Stack Engineer",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    status: "Interviewing",
    appliedDate: "2026-09-24",
    salary: "$190,000 - $260,000",
    notes: "Technical interview scheduled for Thursday at 2 PM. Brush up on streaming WebSockets & vector search concepts!",
    matchScore: 96
  },
  {
    id: "app-102",
    jobId: "job-2",
    company: "Linear",
    title: "Staff Frontend Architect",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    status: "Offer Received",
    appliedDate: "2026-09-18",
    salary: "$210,000 - $280,000",
    notes: "Offer received: $235,000 base + 0.15% equity. Decision requested by end of next week.",
    matchScore: 94
  },
  {
    id: "app-103",
    jobId: "job-6",
    company: "Vercel",
    title: "Full-Stack Web Developer",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80",
    status: "Applied",
    appliedDate: "2026-09-29",
    salary: "$150,000 - $200,000",
    notes: "Submitted tailored resume and cover letter emphasizing Next.js and AI SDK projects.",
    matchScore: 98
  },
  {
    id: "app-104",
    jobId: "job-3",
    company: "Stripe",
    title: "Lead Product Designer (UI/UX)",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80",
    status: "Saved",
    appliedDate: "2026-09-30",
    salary: "$180,000 - $245,000",
    notes: "Saved job to review requirements and refine design portfolio samples.",
    matchScore: 88
  }
];
