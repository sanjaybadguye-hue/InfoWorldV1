import heroStudioImg from '../assets/images/hero_nagpur_tech_1795348002099.jpg';
import productErpImg from '../assets/images/product_erp_dashboard_1795348002154.jpg';
import teamMentorshipImg from '../assets/images/team_mentorship_studio_1795348002451.jpg';
import blogCloudImg from '../assets/images/blog_cloud_infra_1795348003844.jpg';

export type OfferingKind = 'infrastructure' | 'software';

export interface CapabilityPillar {
  id: string;
  code: string;
  kind: OfferingKind;
  title: string;
  description: string;
  highlights: string[];
  deploymentTarget: string;
  slaMetric: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface InfrastructurePiece {
  id: string;
  title: string;
  category: 'Hardware' | 'Systems' | 'Support' | 'Software';
  detail: string;
}

export interface ProcessStep {
  code: string;
  label: string;
  title: string;
  description: string;
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
  category: 'Infrastructure' | 'Business Software' | 'Nagpur & Culture' | 'Careers';
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  coverAlt: string;
  paragraphs: string[];
}

export interface PartnerTrack {
  id: string;
  name: string;
  category: 'Networking & Security' | 'Cloud & Enterprise';
  statusLabel: string;
  targetWindow: string;
  summary: string;
  scopeItems: string[];
}

export const SITE_ASSETS = {
  heroStudio: heroStudioImg,
  productErp: productErpImg,
  teamMentorship: teamMentorshipImg,
  blogCloud: blogCloudImg,
};

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: 'it-infrastructure',
    code: '01 — INFRASTRUCTURE',
    kind: 'infrastructure',
    title: 'IT infrastructure',
    description:
      'Design, supply, configuration, integration, management and maintenance for the systems behind your business.',
    highlights: [
      'End-user compute: enterprise desktops, laptops, engineering workstations, and thin clients',
      'On-premise and hybrid servers, structured LAN/WAN networking, and secure firewall integration',
      'Print fleet & CAD plotters configured with centralized user quotas and AMC support',
      'Proactive configuration management, preventive health checks, and rapid on-site Nagpur SLA',
    ],
    deploymentTarget: 'On-Premise, Branch Office & Hybrid VPC',
    slaMetric: 'Same-Day Nagpur Dispatch Support',
    imageSrc: SITE_ASSETS.heroStudio,
    imageAlt: 'InfoWorld Technologies engineers managing enterprise IT infrastructure and workstations in Nagpur',
  },
  {
    id: 'software-solutions',
    code: '02 — BUSINESS SOFTWARE',
    kind: 'software',
    title: 'Software solutions',
    description:
      'Business software that makes work more connected: SAP Business One, custom software, mobile apps and e-invoicing.',
    highlights: [
      'SAP Business One implementation, add-on workflows, and GST-compliant e-invoicing integration',
      'Custom web applications and PulseERP modules tailored to manufacturing and distribution ops',
      'Field-ready Android & iOS mobile apps for sales ordering, dispatch proof, and service tickets',
      'Ongoing release maintenance, database tuning, and DeskFlow SLA helpdesk coverage',
    ],
    deploymentTarget: 'Cloud SaaS, Private Server or Mobile',
    slaMetric: '99.95% Production Uptime SLA',
    imageSrc: SITE_ASSETS.productErp,
    imageAlt: 'Business software analytics and SAP Business One connected operations dashboard',
  },
];

export const INFRASTRUCTURE_PIECES: InfrastructurePiece[] = [
  {
    id: 'desktops-laptops',
    title: 'Desktops, laptops & workstations',
    category: 'Hardware',
    detail: 'Commercial-grade endpoints sized for office teams, CAD designers, and engineering pods with pre-imaged security policies.',
  },
  {
    id: 'servers-thin-clients',
    title: 'Servers & thin clients',
    category: 'Hardware',
    detail: 'Rack/tower application servers, virtualization hosts, and low-maintenance thin-client terminals for branch operations.',
  },
  {
    id: 'networking-integration',
    title: 'Networking & integration',
    category: 'Systems',
    detail: 'Managed switches, enterprise Wi-Fi, site-to-site VPNs, and reliable multi-branch connectivity.',
  },
  {
    id: 'printers-plotters',
    title: 'Printers & plotters',
    category: 'Hardware',
    detail: 'High-volume office multifunction printers, barcode label printers, and wide-format engineering plotters.',
  },
  {
    id: 'infrastructure-design',
    title: 'Infrastructure design & supply',
    category: 'Systems',
    detail: 'Vendor-neutral BOM specification, hardware sourcing, cabling layout, and power backup planning.',
  },
  {
    id: 'configuration-management',
    title: 'Configuration & management',
    category: 'Systems',
    detail: 'Directory services, endpoint patching, automated backups, and role-based access governance.',
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & support',
    category: 'Support',
    detail: 'Preventive maintenance contracts, DeskFlow ticket tracking, and direct Nagpur technician escalation.',
  },
  {
    id: 'business-software-apps',
    title: 'Business software & apps',
    category: 'Software',
    detail: 'SAP Business One workflows, GST e-invoicing bridges, custom web portals, and field mobile apps.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    code: '01 / UNDERSTAND',
    label: 'Understand',
    title: 'Listen first',
    description:
      'We get to know your objectives, existing setup and the work that needs to happen.',
  },
  {
    code: '02 / PLAN',
    label: 'Plan',
    title: 'Specify with care',
    description:
      'We shape a practical solution around what fits your requirements and environment.',
  },
  {
    code: '03 / DELIVER',
    label: 'Deliver',
    title: 'Put it in place',
    description:
      'We help configure, integrate and deploy the products and software you need.',
  },
  {
    code: '04 / SUPPORT',
    label: 'Support',
    title: 'Stay involved',
    description:
      'Maintenance and ongoing support help keep your technology working as intended.',
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
      'Paper manifests and disconnected depot spreadsheets delayed truck clearances and GST e-way generation across 14 hubs.',
    outcome:
      'Deployed integrated warehouse hardware, barcode endpoints, and automated e-invoicing workflows, cutting loading clearance from 52 to 30 minutes.',
  },
  {
    id: 'central-medsupply',
    client: 'Central MedSupply Distributors',
    sector: 'Healthcare Wholesale',
    city: 'Nagpur, Raipur & Indore',
    metricValue: '99.96%',
    metricUnit: 'Order & ERP Sync Uptime',
    timeframe: 'Measured over 6 Months',
    challenge:
      'Aging on-premise servers and desktop billing crashed during peak evening pharmacy restocking windows handling 18,400+ daily line items.',
    outcome:
      'Upgraded branch server infrastructure and connected SAP Business One billing with a resilient web ordering portal engineered by our hybrid Nagpur pod.',
  },
  {
    id: 'deccan-manufacturing',
    client: 'Deccan Precision Components',
    sector: 'Industrial Manufacturing',
    city: 'MIHAN & Hingna MIDC, Nagpur',
    metricValue: '3.4x',
    metricUnit: 'Faster Monthly Reconciliation',
    timeframe: 'First Quarter Post-Launch',
    challenge:
      'Shop-floor attendance, CAD workstations, and finance ledgers operated in separate silos requiring 6 days of manual monthly reconciliation.',
    outcome:
      'Unified shop-floor networking, thin clients, and custom finance connectors under a single maintenance SLA—reducing close cycles to under 36 hours.',
  },
];

export const TEAM_ROLES: TeamRole[] = [
  {
    id: 'senior-erp-architect',
    track: 'Experienced',
    title: 'Senior Business Software & SAP B1 Architect',
    experience: '6–12 Years Experience',
    location: 'Nagpur (Ganji Peth) / Hybrid',
    focus:
      'Lead SAP Business One integrations, custom TypeScript web portals, e-invoicing APIs, and mentor our 2026 associate engineers.',
    skills: ['SAP Business One', 'SQL / HANA', 'TypeScript', 'Node.js', 'GST E-Invoicing'],
  },
  {
    id: 'infra-systems-lead',
    track: 'Experienced',
    title: 'Senior IT Infrastructure & Systems Lead',
    experience: '5–10 Years Experience',
    location: 'Nagpur (Ganji Peth)',
    focus:
      'Design server, networking, workstation, and firewall deployments for regional enterprises and oversee AMC support SLAs.',
    skills: ['Enterprise Servers', 'LAN / VPN', 'Virtualization', 'Windows / Linux', 'Endpoint Security'],
  },
  {
    id: 'fresher-swe-2026',
    track: 'Freshers 2026',
    title: 'Graduate Software Engineer (2026 Batch)',
    experience: '0–1 Year · B.E. / B.Tech / MCA',
    location: 'Nagpur (On-site Mentorship)',
    focus:
      'Join our 18-week structured residency working directly with principal architects on custom web apps, mobile tools, and ERP connectors.',
    skills: ['TypeScript / JavaScript', 'React', 'SQL Basics', 'Git', 'Problem Solving'],
  },
  {
    id: 'fresher-infra-2026',
    track: 'Freshers 2026',
    title: 'Junior Systems & Support Engineer (2026 Batch)',
    experience: '0–1 Year · Freshers Welcome',
    location: 'Nagpur (On-site Mentorship)',
    focus:
      'Hands-on deployment and configuration of workstations, thin clients, printers/plotters, and branch networking under senior supervision.',
    skills: ['Hardware & OS Setup', 'Networking Basics', 'Troubleshooting', 'Ticketing Support'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'why-nagpur-2026',
    slug: 'why-we-built-infoworldtech-nagpur-2026',
    category: 'Nagpur & Culture',
    title: 'The Right Tech, Ready for Work: Why We Built InfoWorld Technologies in Nagpur in 2026',
    excerpt:
      'Businesses rarely need hype—they need dependable IT infrastructure, connected software, and a team of experienced leads and freshers who stay accountable after launch.',
    authorName: 'Rajesh Deshmukh',
    authorRole: 'Co-Founder & Principal Architect',
    publishedAt: 'Nov 14, 2026',
    readTime: '5 min read',
    coverImage: SITE_ASSETS.blogCloud,
    coverAlt: 'InfoWorld Technologies engineering and infrastructure command center in Nagpur',
    paragraphs: [
      'When we launched InfoWorld Technologies (infoworldtech.co.in) in Nagpur in 2026, we wanted to bridge a gap we saw across growing Indian businesses: hardware vendors disappeared after invoice delivery, while software agencies rarely understood the networks, printers, servers, and accounting workflows running on the ground.',
      'Good technology is more than a purchase. Whether a company needs 40 properly configured workstations and branch servers, SAP Business One connected to GST e-invoicing, or a custom web and mobile application, the real test happens on Monday morning when operations begin.',
      'From our Ganji Peth, Nagpur office, we combine two complementary strengths. Experienced specialists with 6 to 14 years of real-world infrastructure and enterprise software delivery lead architecture, vendor sizing, and SLAs. Right alongside them work our 2026 freshers—selected from Central India engineering colleges and mentored daily inside live project pods.',
      'That balance allows us to plan carefully, put systems in place cleanly, and stay available long after go-live.',
    ],
  },
  {
    id: 'sap-b1-e-invoicing',
    slug: 'connecting-sap-business-one-and-gst-e-invoicing',
    category: 'Business Software',
    title: 'Connecting SAP Business One, Mobile Ordering & GST E-Invoicing Without Manual Re-Entry',
    excerpt:
      'How connected business software eliminates duplicate spreadsheet exports between warehouse dispatch counters and finance teams.',
    authorName: 'Sneha Kulkarni',
    authorRole: 'Senior Business Software Lead',
    publishedAt: 'Oct 28, 2026',
    readTime: '6 min read',
    coverImage: SITE_ASSETS.productErp,
    coverAlt: 'Business software operations and regional logistics metrics monitor',
    paragraphs: [
      'Many distributors run a solid core ERP like SAP Business One in their head office, yet still rely on WhatsApp photos and Excel sheets for field orders, warehouse picking, and e-way bill reconciliation.',
      'By building lightweight web and mobile extensions directly integrated with SAP Business One APIs and GST IRP e-invoicing gateways, field teams enter an order once on mobile, warehouse terminals print barcode dispatch slips immediately, and finance sees IRN numbers reflected in real time.',
      'Every integration we ship uses idempotent transaction queues so temporary branch network drops never produce duplicate invoices or stalled trucks.',
    ],
  },
  {
    id: 'fresher-first-120-days',
    slug: 'first-120-days-as-a-2026-fresher-in-nagpur',
    category: 'Careers',
    title: 'My First 120 Days as a 2026 Graduate Deploying Software & Systems in Nagpur',
    excerpt:
      'Inside InfoWorld Technologies’ mentorship model where fresh graduates learn architecture discipline, hardware-software integration, and production QA firsthand.',
    authorName: 'Aarav Meshram',
    authorRole: 'Associate Software Engineer (2026 Cohort)',
    publishedAt: 'Oct 12, 2026',
    readTime: '4 min read',
    coverImage: SITE_ASSETS.teamMentorship,
    coverAlt: 'Senior engineer mentoring 2026 graduates over system diagrams',
    paragraphs: [
      'Joining a new IT company right out of college in 2026 can feel overwhelming if you are left reading docs in isolation. At InfoWorld Technologies in Nagpur, every 2026 fresher is paired directly with a senior architect or systems lead from week one.',
      'During my first month, I shadowed a full branch rollout—seeing how servers, thin clients, and barcode printers connect to the web inventory software I was writing tests for. Understanding the physical office environment made me a far more practical developer.',
      'By month three, I was shipping TypeScript modules and automated regression checks reviewed line-by-line by experienced engineers who genuinely invest time in teaching why reliability matters.',
    ],
  },
  {
    id: 'practical-it-infrastructure-sizing',
    slug: 'sizing-servers-workstations-and-networking-for-growing-offices',
    category: 'Infrastructure',
    title: 'Sizing Workstations, Servers & Branch Networking Without Overbuying',
    excerpt:
      'A practical checklist we use in Nagpur when specifying desktops, thin clients, plotters, and backup power for 25-to-250 seat offices.',
    authorName: 'Vikram Joshi',
    authorRole: 'Senior Infrastructure & Systems Lead',
    publishedAt: 'Sep 29, 2026',
    readTime: '5 min read',
    coverImage: SITE_ASSETS.heroStudio,
    coverAlt: 'Modern office workstations and collaborative IT environment',
    paragraphs: [
      'Over-specifying hardware wastes capital; under-specifying creates daily slowdowns that cost far more in lost team hours. Before supplying a single machine, we map exact workflows by department.',
      'Finance and ERP data-entry desks run reliably on centrally managed thin clients or modest business desktops backed by automated server snapshots, whereas engineering and CAD teams require dedicated workstation GPUs and calibrated wide-format plotters.',
      'Pairing right-sized hardware with clean structured cabling, dual-WAN failover, and scheduled preventive maintenance keeps office IT predictable year after year.',
    ],
  },
];

export const PARTNER_TRACKS: PartnerTrack[] = [
  {
    id: 'cisco-networking',
    name: 'Cisco',
    category: 'Networking & Security',
    statusLabel: 'Planned Technology Partnership',
    targetWindow: '2026–2027 Rollout',
    summary:
      'Enterprise switching, branch routing, firewall security appliances, and Meraki/Catalyst wireless deployments for multi-floor offices and industrial parks across Nagpur.',
    scopeItems: [
      'Managed Layer-2/Layer-3 switching & VLAN segmentation',
      'Next-generation firewalls and secure site-to-site branch VPNs',
      'High-density enterprise Wi-Fi planning and controller setup',
    ],
  },
  {
    id: 'microsoft-cloud',
    name: 'Microsoft',
    category: 'Cloud & Enterprise',
    statusLabel: 'Planned Technology Partnership',
    targetWindow: '2026–2027 Rollout',
    summary:
      'Microsoft 365 productivity licensing, Azure hybrid cloud workloads, Windows Server licensing, and Intune endpoint governance for growing businesses.',
    scopeItems: [
      'Microsoft 365 Business & Enterprise tenant migration',
      'Azure virtual machines, backup vaults, and SQL hosting',
      'Active Directory, Entra ID SSO & Windows Server administration',
    ],
  },
  {
    id: 'networking-cabling',
    name: 'Networking & Structured Cabling',
    category: 'Networking & Security',
    statusLabel: 'Planned Infrastructure Alliance',
    targetWindow: '2026 Rollout',
    summary:
      'End-to-end passive and active networking—Cat6A/fiber backbone cabling, server racks, patch panels, dual-ISP failover, and campus wireless links.',
    scopeItems: [
      'Cat6A & single/multi-mode fiber backbone installation and testing',
      '42U/24U server rack dressing, PDU power, and UPS redundancy',
      'Multi-WAN SD-WAN load balancing for uninterrupted branch ERP access',
    ],
  },
  {
    id: 'cctv-surveillance',
    name: 'CCTV & Physical Security Systems',
    category: 'Networking & Security',
    statusLabel: 'Planned Security Partnership',
    targetWindow: '2026 Rollout',
    summary:
      'Commercial IP CCTV camera networks, NVR/VMS storage servers, biometric access control, and warehouse perimeter monitoring built for factories and offices.',
    scopeItems: [
      'PoE IP cameras for warehouses, loading bays, and office floors',
      'Redundant NVR recording, retention sizing, and mobile remote viewing',
      'Biometric door access & attendance sync with HR/ERP systems',
    ],
  },
  {
    id: 'endpoint-server-oems',
    name: 'Enterprise Workstations, Servers & Print OEMs',
    category: 'Cloud & Enterprise',
    statusLabel: 'Planned Hardware Channel',
    targetWindow: '2026–2027 Rollout',
    summary:
      'Authorized commercial supply and warranty coordination for business desktops, CAD workstations, rack servers, thin clients, and wide-format plotters.',
    scopeItems: [
      'Pre-imaged commercial laptops, desktops, and thin-client fleets',
      'Tower & rack servers sized for local ERP and database workloads',
      'Multifunction printers, barcode labelers, and engineering plotters',
    ],
  },
  {
    id: 'sap-erp-backup',
    name: 'Business ERP & Automated Backup Ecosystem',
    category: 'Cloud & Enterprise',
    statusLabel: 'Planned Software & Continuity Track',
    targetWindow: '2026–2027 Rollout',
    summary:
      'Complementary partnerships across SAP Business One add-on tooling, GST e-invoicing connectors, endpoint antivirus/EDR, and encrypted off-site backups.',
    scopeItems: [
      'SAP Business One & Tally integration middleware',
      'Immutable 3-2-1 backup policies for branch servers and databases',
      'Centralized EDR endpoint security and patch compliance',
    ],
  },
];

