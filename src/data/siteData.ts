export type OfferingKind = 'product' | 'service';

export interface OfferingItem {
  id: string;
  kind: OfferingKind;
  numberLabel?: string;
  title: string;
  subtitle: string;
  summary: string;
  deliverables: string[];
  deploymentTarget: string;
  slaMetric: string;
  featured?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  city: string;
  metricValue: string;
  metricUnit: string;
  timeframe: string;
  challenge: string;
  outcome: string;
}

export interface TeamRole {
  id: string;
  track: 'Experienced' | 'Freshers 2026';
  title: string;
  experience: string;
  location: string;
  focus: string;
  skills: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  category: 'Engineering' | 'IT Products' | 'Nagpur & Culture' | 'Careers';
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  coverAlt: string;
  featured?: boolean;
  paragraphs: string[];
}

export const SITE_ASSETS = {
  heroStudio: '/src/assets/images/hero_nagpur_tech_1795348002099.jpg',
  productErp: '/src/assets/images/product_erp_dashboard_1795348002154.jpg',
  teamMentorship: '/src/assets/images/team_mentorship_studio_1795348002451.jpg',
  blogCloud: '/src/assets/images/blog_cloud_infra_1795348003844.jpg',
};

export const HERO_FACTS = [
  {
    label: 'Founded & Base',
    value: '2026 · Nagpur',
    detail: 'IT Park Corridor, Maharashtra',
  },
  {
    label: 'Engineering Talent',
    value: 'Senior + Freshers',
    detail: 'Principal leads mentoring 2026 grads',
  },
  {
    label: 'Product Suite',
    value: '3 Flagship Systems',
    detail: 'ERP, Service Desk & Audit Vault',
  },
  {
    label: 'Response SLA',
    value: 'Under 24 Hours',
    detail: 'Direct architecture scoping call',
  },
];

export const OFFERINGS: OfferingItem[] = [
  {
    id: 'pulse-erp',
    kind: 'product',
    title: 'PulseERP Core',
    subtitle: 'Modular Inventory, GST Billing & Dispatch Suite',
    summary:
      'Built in Nagpur for multi-warehouse manufacturers and regional distributors. Unifies raw-material procurement, GST e-invoicing, batch tracking, and dispatch telemetry without bloated enterprise licensing.',
    deliverables: [
      'Real-time multi-depot stock ledger with barcode & batch traceability',
      'Automated GST e-way bill generation and Tally / Zoho accounting sync',
      'Role-based branch dashboards with offline-tolerant mobile dispatch mode',
      'Dedicated onboarding and data migration in 3–5 weeks',
    ],
    deploymentTarget: 'Cloud SaaS or Private VPC (India Region)',
    slaMetric: '99.95% Uptime Guarantee',
    featured: true,
    imageSrc: SITE_ASSETS.productErp,
    imageAlt: 'PulseERP Core regional logistics and warehouse analytics dashboard on a studio display',
  },
  {
    id: 'deskflow-sla',
    kind: 'product',
    title: 'DeskFlow SLA',
    subtitle: 'Internal IT Service Desk & Asset Ticketing',
    summary:
      'A structured ticketing, SLA escalation, and hardware inventory platform engineered for growing 50-to-1,500 employee organizations.',
    deliverables: [
      'Automated ticket routing with SLA breach alerts and escalation rules',
      'IT asset lifecycle registry covering laptops, licenses, and vendor renewals',
      'Self-service employee portal with knowledge base and audit trails',
    ],
    deploymentTarget: 'Web & Single Sign-On Ready',
    slaMetric: '15-Minute Incident Triage Workflow',
  },
  {
    id: 'auditvault-log',
    kind: 'product',
    title: 'AuditVault Compliance',
    subtitle: 'Tamper-Evident Access & Change Telemetry',
    summary:
      'Lightweight compliance logging middleware for Indian fintechs, healthcare portals, and B2B SaaS teams preparing for ISO 27001 or DPDP audits.',
    deliverables: [
      'Cryptographically chained event logs with instant CSV & PDF auditor exports',
      'REST & webhook ingestion SDKs for Node.js, Python, and Java services',
      'Automated retention policies and anomalous privilege alert rules',
    ],
    deploymentTarget: 'Containerized Sidecar or Managed API',
    slaMetric: 'Sub-25ms Async Log Ingestion',
  },
  {
    id: 'custom-engineering',
    kind: 'service',
    numberLabel: '01.',
    title: '01. Custom Web & Cloud Engineering',
    subtitle: 'Full-Stack Product Architecture & Delivery',
    summary:
      'End-to-end engineering of customer portals, B2B SaaS platforms, and high-throughput APIs built with TypeScript, React, Node.js, PostgreSQL, and cloud-native infrastructure.',
    deliverables: [
      'Architecture blueprint, schema modeling, and UI systems in sprint one',
      'Automated unit, integration, and end-to-end test suites before release',
      'Clean source-code ownership with full operational runbooks',
    ],
    deploymentTarget: 'AWS, GCP, or Azure (Mumbai & Hyderabad Zones)',
    slaMetric: '2-Week Verified Release Cadence',
  },
  {
    id: 'erp-modernization',
    kind: 'service',
    numberLabel: '02.',
    title: '02. Legacy Modernization & System Integration',
    subtitle: 'Bridging Desktop Accounting, ERPs & Web Portals',
    summary:
      'We replace fragile spreadsheet workflows and aging desktop software with reliable web applications and resilient API bridges.',
    deliverables: [
      'Zero-loss data migration from legacy SQL, Excel, or desktop ERPs',
      'Bi-directional payment gateway, WhatsApp Business, and logistics API integration',
      'Incremental cutover plans that keep daily operations uninterrupted',
    ],
    deploymentTarget: 'Hybrid On-Premise & Cloud Connectors',
    slaMetric: 'Zero Unplanned Cutover Downtime',
  },
  {
    id: 'managed-devops',
    kind: 'service',
    numberLabel: '03.',
    title: '03. Managed DevOps, QA & Security Hardening',
    subtitle: 'CI/CD Automation, Observability & Load Testing',
    summary:
      'Continuous delivery pipelines, infrastructure-as-code, automated regression testing, and 24x7 uptime monitoring run from our Nagpur engineering center.',
    deliverables: [
      'Docker & Kubernetes deployment automation with zero-downtime rollbacks',
      'Vulnerability scanning, TLS hardening, and automated encrypted backups',
      'Monthly infrastructure cost optimization and latency profiling',
    ],
    deploymentTarget: 'Linux, Containers & Managed Cloud',
    slaMetric: '30% Average Cloud Cost Reduction',
  },
  {
    id: 'hybrid-pods',
    kind: 'service',
    numberLabel: '04.',
    title: '04. Hybrid Engineering Pods (Senior + Freshers)',
    subtitle: 'Dedicated Long-Term Delivery Teams from Nagpur',
    summary:
      'A balanced team structure where Principal Engineers own architecture and code quality while mentored 2026 engineering graduates accelerate feature delivery and test coverage.',
    deliverables: [
      '1 Principal/Senior Architect paired with 2–4 vetted Nagpur engineering graduates',
      'Daily code reviews, architectural guardrails, and transparent sprint velocity',
      'Predictable monthly retainers tailored for startups and mid-market enterprises',
    ],
    deploymentTarget: 'Dedicated Remote or Hybrid Nagpur Pod',
    slaMetric: '40% Lower Total Delivery Cost vs Tier-1 Metros',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'vidarbha-logistics',
    client: 'Vidarbha Cold-Chain Logistics',
    sector: 'Supply Chain & Warehousing',
    city: 'Nagpur & Amravati',
    metricValue: '-42%',
    metricUnit: 'Dispatch Turnaround Time',
    timeframe: 'Achieved in 90 Days',
    challenge:
      'Paper manifests and disconnected branch spreadsheets delayed cold-storage truck clearances across 14 regional depots.',
    outcome:
      'Deployed PulseERP Core with barcode gate check-ins and real-time GST e-way generation, cutting average loading clearance from 52 minutes to 30 minutes.',
  },
  {
    id: 'central-medsupply',
    client: 'Central MedSupply Distributors',
    sector: 'Healthcare Wholesale',
    city: 'Nagpur, Raipur & Indore',
    metricValue: '99.96%',
    metricUnit: 'Order Sync Uptime',
    timeframe: 'Measured over 6 Months',
    challenge:
      'Legacy desktop billing crashed during peak evening pharmacy restocking windows handling 18,400+ daily line items.',
    outcome:
      'Migrated core ordering to a fault-tolerant Node.js and PostgreSQL cluster engineered by a hybrid InfoWorldtech pod with automated failover.',
  },
  {
    id: 'orange-city-finserve',
    client: 'Deccan MSME FinServe',
    sector: 'NBFC Operations Portal',
    city: 'Nagpur & Pune',
    metricValue: '3.4x',
    metricUnit: 'Faster Monthly Reconciliation',
    timeframe: 'First Quarter Post-Launch',
    challenge:
      'Operations analysts spent 6 business days every month manually matching NEFT/UPI repayment CSVs against loan ledgers.',
    outcome:
      'Built an automated reconciliation engine and DeskFlow SLA ticket desk, reducing close cycles to under 36 hours with full audit traceability.',
  },
];

export const TEAM_ROLES: TeamRole[] = [
  {
    id: 'senior-fullstack',
    track: 'Experienced',
    title: 'Principal / Senior Full-Stack Architect',
    experience: '6–12 Years Experience',
    location: 'Nagpur (IT Park) / Hybrid',
    focus:
      'Own system architecture, database modeling, client technical discovery, and mentor a cohort of 2026 associate engineers.',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'System Design'],
  },
  {
    id: 'devops-lead',
    track: 'Experienced',
    title: 'Senior Cloud & DevOps Engineer',
    experience: '5–9 Years Experience',
    location: 'Nagpur (IT Park)',
    focus:
      'Architect CI/CD pipelines, Kubernetes clusters, observability dashboards, and security compliance across InfoWorldtech products.',
    skills: ['AWS / GCP', 'Docker', 'Terraform', 'CI/CD', 'Linux Security'],
  },
  {
    id: 'fresher-swe-2026',
    track: 'Freshers 2026',
    title: 'Graduate Software Engineer (2026 Batch)',
    experience: '0–1 Year · B.E. / B.Tech / MCA',
    location: 'Nagpur (On-site Mentorship)',
    focus:
      'Join our 18-week structured engineering residency pairing with principal leads on live TypeScript, UI, and API production modules.',
    skills: ['JavaScript / TypeScript', 'React Basics', 'SQL', 'Git', 'Problem Solving'],
  },
  {
    id: 'fresher-qa-2026',
    track: 'Freshers 2026',
    title: 'Associate QA & Automation Engineer (2026 Batch)',
    experience: '0–1 Year · Freshers Welcome',
    location: 'Nagpur (On-site Mentorship)',
    focus:
      'Build end-to-end Playwright test suites, API contract checks, and regression workflows alongside experienced product owners.',
    skills: ['Manual & API Testing', 'Playwright / Cypress', 'Postman', 'SQL Basics'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'why-nagpur-2026',
    slug: 'why-we-built-infoworldtech-nagpur-2026',
    category: 'Nagpur & Culture',
    title: 'Why We Founded InfoWorldtech in Nagpur in 2026: Pairing Veteran Architects with Freshers',
    excerpt:
      'Most software firms either burn budgets on top-heavy teams or hand critical systems to unsupervised juniors. Here is the balanced hybrid engineering model we built in Nagpur.',
    authorName: 'Rajesh Deshmukh',
    authorRole: 'Co-Founder & Principal Architect',
    publishedAt: 'Nov 14, 2026',
    readTime: '5 min read',
    coverImage: SITE_ASSETS.blogCloud,
    coverAlt: 'InfoWorldtech engineering command workspace in Nagpur',
    featured: true,
    paragraphs: [
      'When we incorporated InfoWorldtech.co.in in Nagpur in early 2026, we started with a practical observation from twenty years of enterprise software delivery across India: clients rarely struggle because of a lack of frameworks. They struggle because architecture ownership and execution velocity are disconnected.',
      'Nagpur sits at a pivotal inflection point. With MIHAN, the IT Park corridor, and strong engineering graduates emerging each year from local universities, Central India holds deep technical talent that previously had to relocate to Bengaluru or Pune just to work on serious production systems.',
      'We designed InfoWorldtech around a deliberate two-tier craft structure. Every client engagement and internal product—like PulseERP Core and DeskFlow SLA—is architected by experienced engineers with 6 to 14 years of production battle scars. Right beside them sit our 2026 fresher cohorts, embedded directly inside small delivery pods rather than siloed in dead-end support queues.',
      'Experienced leads handle domain modeling, security boundaries, database indexing, and code review standards. Freshers bring tireless curiosity, modern testing rigor, and rapid UI iteration under daily mentorship. Within 18 weeks, our graduates ship audited, production-grade TypeScript—and our clients get senior-level reliability without metropolitan overhead.',
    ],
  },
  {
    id: 'gst-inventory-sync',
    slug: 'zero-downtime-gst-inventory-sync-indian-msmes',
    category: 'IT Products',
    title: 'Designing Zero-Downtime GST & Multi-Warehouse Inventory Sync in PulseERP Core',
    excerpt:
      'How we engineered an idempotent event ledger in PostgreSQL so regional warehouses stay accurate even when branch internet connections drop.',
    authorName: 'Sneha Kulkarni',
    authorRole: 'Senior Backend Engineer',
    publishedAt: 'Oct 28, 2026',
    readTime: '7 min read',
    coverImage: SITE_ASSETS.productErp,
    coverAlt: 'PulseERP Core warehouse metrics display',
    paragraphs: [
      'Distributors operating depots across Vidarbha and Central India face a reality that textbook cloud tutorials ignore: warehouse internet links flicker during peak evening dispatch hours, yet trucks cannot wait at loading bays.',
      'In PulseERP Core, we avoided naive optimistic overwrites. Instead, every stock movement—inward GRN, inter-depot transfer, or GST invoice allocation—is recorded as an append-only ledger entry with a client-generated idempotency key.',
      'When a branch terminal reconnects after a brief outage, queued dispatch events replay in deterministic sequence. Database constraints verify batch availability atomically before finalizing e-way bill payloads, eliminating phantom stock counts and duplicate tax filings.',
      'For mid-market manufacturers, reliability is not a slide-deck promise—it is knowing that 6:00 PM dispatch manifests reconcile cleanly with morning accounting reports every single day.',
    ],
  },
  {
    id: 'fresher-first-120-days',
    slug: 'first-120-days-as-a-2026-fresher-in-nagpur',
    category: 'Careers',
    title: 'My First 120 Days as a 2026 Engineering Graduate Shipping Production Code in Nagpur',
    excerpt:
      'What structured mentorship actually looks like when your first pull request is reviewed line-by-line by a Principal Architect.',
    authorName: 'Aarav Meshram',
    authorRole: 'Associate Software Engineer (2026 Cohort)',
    publishedAt: 'Oct 12, 2026',
    readTime: '4 min read',
    coverImage: SITE_ASSETS.teamMentorship,
    coverAlt: 'Senior engineer mentoring fresh graduates over architecture diagrams',
    paragraphs: [
      'Joining an IT company straight out of college in 2026 can feel intimidating—especially when everyone talks about AI-assisted coding and rapid releases. At InfoWorldtech, my onboarding did not start with watching forty hours of generic videos.',
      'In week one, I was paired with a senior engineer to trace a real customer ticket inside DeskFlow SLA. Instead of writing throwaway dummy code, I wrote integration tests for SLA escalation edge cases, learning how database transactions and timezone boundaries behave in production.',
      'By month two, I was building accessible React views for warehouse reporting with strict TypeScript contracts. Every pull request received patient, concrete feedback—not just what to change, but why an index or an error boundary mattered six months down the line.',
      'Staying in Nagpur while working on enterprise-grade products has given our entire 2026 fresher batch real engineering confidence from day one.',
    ],
  },
  {
    id: 'cloud-latency-egress',
    slug: 'cutting-cloud-egress-and-latency-by-38-percent',
    category: 'Engineering',
    title: 'Cutting Cloud Egress and Query Latency by 38% on Regional Logistics Dashboards',
    excerpt:
      'Practical PostgreSQL indexing, payload trimming, and edge caching adjustments that saved a regional fleet operator real monthly cloud spend.',
    authorName: 'Vikram Joshi',
    authorRole: 'Cloud & DevOps Lead',
    publishedAt: 'Sep 29, 2026',
    readTime: '6 min read',
    coverImage: SITE_ASSETS.heroStudio,
    coverAlt: 'Engineers analyzing query performance at Nagpur office',
    paragraphs: [
      'Performance bottlenecks rarely require exotic rewrites. During a quarterly infrastructure audit for a regional logistics portal, we discovered that 64% of their cloud database CPU time came from unindexed dashboard summary queries polling every thirty seconds.',
      'By introducing covering composite indexes on shipment status and depot timestamps, replacing full-row JSON payloads with lean projected DTOs, and adding short-lived materialized rollups for daily KPI strips, P95 API latency dropped from 640ms to 195ms.',
      'Simultaneously, enabling Brotli compression and trimming redundant payload fields reduced monthly outbound cloud egress by 38%. The result was faster browser responsiveness for depot operators on modest mobile connections and an immediate reduction in recurring AWS bills.',
    ],
  },
];
