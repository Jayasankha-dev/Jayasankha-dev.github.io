import { ProjectItem, SkillItem, FAQItem, AudioTrack, TimelineEvent, SystemTelemetryData } from '../types';

export const OPERATOR_PROFILE = {
  fullName: 'D.B. Jayasankha Madhusith',
  shortName: 'Jayasankha Madhusith',
  callsign: 'BENJAMINUS // ROOT_OPERATOR',
  headline: 'Self-Taught Cybersecurity Specialist & Tools Developer',
  subheadline: 'Psychology & Criminology Graduate | Low-Level Systems & Reverse Engineering Specialist',
  bio1: 'Operating with a unique cognitive framework derived from a B.A. in Psychology, Criminology & International Relations. I analyze human-centric threat vectors, behavioral deception patterns, and adversarial psychology while engineering low-level systemic countermeasures.',
  bio2: 'Specializing in Digital Forensics, Malware Analysis, Blockchain Reconnaissance, and Systems Programming (Rust/Python) to architect uncompromising offensive and defensive security tools.',
  location: 'Kurunegala, Sri Lanka',
  phone: '071-1482061',
  phoneIntl: '+94 71 148 2061',
  email: 'jmadhumax@gmail.com',
  telegram: 'https://t.me/benjaminus',
  github: 'https://github.com/Jayasankha-dev',
  linkedin: 'https://www.linkedin.com/in/jayasankha-madhusith/',
  whatsapp: 'https://wa.link/z1syel',
  formspreeEndpoint: 'https://formspree.io/f/mgaekarl',
  cvDownloadPath: 'CV.pdf',
};

export const TELEMETRY_INITIAL: SystemTelemetryData = {
  chromeExtensions: 4,
  githubRepos: 37,
  forensicsProficiency: 85,
  terminalOperability: 100,
  systemUptime: '99.98%',
  threatLevel: 'DEFCON 4',
  firewallStatus: 'ENFORCING',
  encryptionStandard: 'AES-256-GCM / SHA-384',
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'checkers-pro',
    name: 'Checkers Pro',
    category: 'extension',
    title: 'Checkers Pro - Tactical Board Engine Extension',
    description: 'A performance-engineered, algorithmically optimized Chrome browser extension delivering real-time heuristic move evaluation and tactical analysis.',
    fullDetails: 'Engineered as a lightweight, sandboxed Chrome Extension with zero external tracking dependencies. Uses minimax decision trees with alpha-beta pruning compiled into optimized web workers.',
    language: 'JavaScript',
    stars: 18,
    forks: 4,
    liveUrl: 'https://chromewebstore.google.com/search/Checkers%20Pro',
    githubUrl: 'https://github.com/Jayasankha-dev',
    tags: ['Chrome Web Store', 'JavaScript', 'Algorithms', 'Web Workers', 'Game Engine'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    featured: true,
    status: 'PUBLISHED',
    version: 'v2.4.0',
    architecture: ['Manifest V3 Sandbox', 'Web Workers Async Evaluation', 'Local State Storage Engine']
  },
  {
    id: 'aeon-hunter-lite',
    name: 'Aeon Hunter Lite',
    category: 'extension',
    title: 'Aeon Hunter Lite - Cyber Asset & Threat Recon Extension',
    description: 'Automated browser intelligence gathering tool detecting hidden script injections, third-party trackers, DOM modifications, and insecure API calls.',
    fullDetails: 'Published on Chrome Web Store. Intercepts web network requests via WebRequest APIs, parses suspicious header signatures, and alerts operators to tracking beacons and DOM-based XSS vectors in real time.',
    language: 'JavaScript',
    stars: 29,
    forks: 8,
    liveUrl: 'https://chromewebstore.google.com/search/Aeon%20Hunter',
    githubUrl: 'https://github.com/Jayasankha-dev',
    tags: ['Chrome Web Store', 'Cyber Recon', 'DOM Forensics', 'Security Audit'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    featured: true,
    status: 'PUBLISHED',
    version: 'v1.8.2',
    architecture: ['DOM MutationObserver Hook', 'Header Telemetry Parser', 'Real-time Threat Scoring Engine']
  },
  {
    id: 'console-injection-plus',
    name: 'Console Injection+',
    category: 'extension',
    title: 'Console Injection+ DevSecOps Browser Extension',
    description: 'Advanced browser developer companion enabling rapid script execution, variable inspection, automated payload injection testing, and CSP header bypass simulation.',
    fullDetails: 'Equipped with custom script snippets, sandbox isolation management, and encrypted local storage for rapid penetration testing and QA debugging across diverse web targets.',
    language: 'JavaScript',
    stars: 24,
    forks: 6,
    liveUrl: 'https://chromewebstore.google.com/search/Console%20Injection',
    githubUrl: 'https://github.com/Jayasankha-dev',
    tags: ['Chrome Extension', 'DevTools', 'Payload Testing', 'Penetration Testing'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    status: 'PUBLISHED',
    version: 'v3.1.0',
    architecture: ['Chrome Debugger API integration', 'Custom Payload Repository', 'Encrypted State Store']
  },
  {
    id: 'memvault-rust',
    name: 'MemVault Rust Scanner',
    category: 'rust',
    title: 'MemVault - High-Performance Memory Analysis Scanner',
    description: 'Ultra-fast low-level Windows/Linux process memory inspection tool written in Rust with direct memory offsets mapping, pattern scanning, and entropy analysis.',
    fullDetails: 'Leverages Rust zero-cost abstractions and memory safety guarantees to read virtual process memory, scan for injected shellcode signatures, detect hidden DLL hooks, and calculate byte entropy.',
    language: 'Rust',
    stars: 42,
    forks: 11,
    githubUrl: 'https://github.com/Jayasankha-dev',
    tags: ['Rust', 'Memory Forensics', 'Win32 API', 'Entropy Analysis', 'Hook Detection'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    featured: true,
    status: 'ACTIVE_OPS',
    version: 'v1.2.0',
    architecture: ['Direct VirtualAlloc Ex Scan', 'Simd String Pattern Matcher', 'Memory Entropy Radar']
  },
  {
    id: 'aegis-x-rat',
    name: 'AEGIS-X Security Framework',
    category: 'python',
    title: 'AEGIS-X Python Automation & Endpoint Research Suite',
    description: 'An advanced educational remote administration & telemetry orchestration framework built with encrypted socket pipelines and evasion modeling.',
    fullDetails: 'Crafted for testing defensive EDR detection thresholds. Features dynamic XOR payload obfuscation, encrypted C2 transport via TLS, simulated telemetry gathering, and in-memory execution mechanics.',
    language: 'Python',
    stars: 65,
    forks: 19,
    githubUrl: 'https://github.com/Jayasankha-dev',
    tags: ['Python', 'EDR Evasion', 'Encrypted C2', 'Socket Programming', 'Telemetry'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    status: 'MAINTAINED',
    version: 'v4.0.5',
    architecture: ['Custom TLS Sockets', 'Dynamic Byte Stager', 'Anti-Sandbox Heuristics']
  },
  {
    id: 'etherscan-recon',
    name: 'Etherscan Wallet Watcher',
    category: 'python',
    title: 'Etherscan On-Chain Recon & Whale Tracker',
    description: 'Automated blockchain intelligence script tracking high-value wallet movements, ERC-20 token transfers, and smart contract anomaly interactions.',
    fullDetails: 'Queries Ethereum nodes and Etherscan APIs with automated webhook alerts to Telegram when flagged smart contracts or suspicious wash-trading wallets interact.',
    language: 'Python',
    tags: ['Python', 'Blockchain Recon', 'Web3', 'Telegram Bot API', 'OSINT'],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/Jayasankha-dev',
    status: 'ACTIVE_OPS',
    version: 'v2.1.0',
    architecture: ['Web3.py Client', 'Asynchronous Event Polling', 'Telegram Dispatcher']
  },
  {
    id: 'android-forensics-suite',
    name: 'Android Cryptographic Forensics',
    category: 'forensics',
    title: 'Android Artifact Extractor & SQLite Decryptor',
    description: 'Forensic acquisition tool for dumping protected app databases, parsing shared preferences, analyzing keystore flags, and reconstructing deleted records.',
    fullDetails: 'Automates ADB bridging, backup extraction, encrypted SQLite database carving, and timeline reconstruction for mobile threat investigation.',
    language: 'Python',
    tags: ['Digital Forensics', 'Android ADB', 'SQLite Carving', 'Keystore Analysis'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/Jayasankha-dev',
    status: 'ACTIVE_OPS',
    version: 'v1.5.0',
    architecture: ['ADB Root Extractor', 'SQLite B-Tree Carving Engine', 'Timeline Reconstructor']
  },
  {
    id: 'js-obfuscator-reverser',
    name: 'JS De-Obfuscator & AST Inspector',
    category: 'javascript',
    title: 'JavaScript De-Obfuscator & Control-Flow Unflattener',
    description: 'Automated reverse engineering engine converting obfuscated JavaScript malware and anti-debugging scripts into human-readable Abstract Syntax Trees.',
    fullDetails: 'Evaluates dead-code injection, hex string arrays, eval-based packers, and control-flow flattening algorithms to recover original source intent.',
    language: 'JavaScript',
    tags: ['Reverse Engineering', 'AST Parsing', 'Babel', 'Malware Analysis'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/Jayasankha-dev',
    status: 'ACTIVE_OPS',
    version: 'v1.1.2',
    architecture: ['Babel Parser & Traverser', 'Dead Code Elimination Logic', 'Eval Sandbox Runner']
  }
];

export const SKILL_ITEMS: SkillItem[] = [
  {
    name: 'Python Automation & C2 Architecture',
    percentage: 92,
    category: 'offensive',
    description: 'Custom penetration testing tooling, automated recon pipelines, socket programming, multi-threading, and evasion modeling.',
    technologies: ['Asyncio', 'CustomTkinter', 'Scapy', 'Cryptography', 'Requests/Aiohttp', 'Web3.py']
  },
  {
    name: 'Digital Forensics & Incident Response',
    percentage: 88,
    category: 'defensive',
    description: 'Memory dump analysis, SQLite database carving, Android APK decompilation, network packet inspection, and log timeline reconstruction.',
    technologies: ['Volatility', 'Wireshark', 'Autopsy', 'Ghidra', 'JADX', 'FTK Imager']
  },
  {
    name: 'Web Security & JS Obfuscation / DevTools',
    percentage: 86,
    category: 'defensive',
    description: 'DOM-based XSS detection, CSP analysis, Chrome Extension engineering (Manifest V3), AST reverse-engineering, and anti-debugging techniques.',
    technologies: ['Manifest V3', 'Chrome APIs', 'AST Parsing', 'Babel', 'Burp Suite', 'OWASP Top 10']
  },
  {
    name: 'Rust Systems & Memory Manipulation',
    percentage: 78,
    category: 'systems',
    description: 'Direct Win32/POSIX API manipulation, memory entropy calculation, signature pattern scanners, and high-performance concurrent binaries.',
    technologies: ['Winapi / Windows-rs', 'Zero-Cost Abstractions', 'Rayon', 'FFI', 'Byte Entropy']
  },
  {
    name: 'Behavioral Psychology & Threat Modeling',
    percentage: 95,
    category: 'core',
    description: 'Applying cognitive psychology, social engineering vector analysis, criminal profiling, and deceptive behavioral heuristics to digital security.',
    technologies: ['Social Engineering Modeling', 'Deception Heuristics', 'Criminological Analysis', 'OSINT']
  },
  {
    name: 'Blockchain & Cryptographic Recon',
    percentage: 82,
    category: 'offensive',
    description: 'On-chain transaction forensics, Ethereum node querying, smart contract bytecode decompilation, and token flow visualization.',
    technologies: ['Etherscan API', 'Solidity Analysis', 'Wallet Clustering', 'AES/RSA Implementations']
  }
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: '2026',
    title: 'Bachelor of Arts (General) Degree',
    role: 'Criminology, Psychology & International Relations',
    location: 'University of Sri Jayewardenepura',
    badge: 'ACADEMIC GRADUATION',
    highlights: [
      'Graduated with multidisciplinary expertise in Criminology, Psychology, and International Relations.',
      'Specialized in behavioral deception patterns, social engineering vulnerability analysis, and cyber governance.',
      'Concurrently architected low-level security tools, malware analysis frameworks, and published browser extensions.'
    ]
  },
  {
    year: '2022 - 2023',
    title: 'Management Assistant',
    role: 'Asiri Home Building Service',
    location: 'Sri Lanka',
    badge: 'WORK EXPERIENCE',
    highlights: [
      'Managed administrative workflows, operational documentation, and digital record systems.',
      'Coordinated operational schedules, resource logistics, and client communication workflows.',
      'Maintained organizational protocols to streamline company operations and workflow execution.'
    ]
  },
  {
    year: '2017 & 2014',
    title: 'G.C.E. Advanced Level (2017) & Ordinary Level (2014)',
    role: 'Secondary & High School Academic Foundations',
    location: 'Sri Lanka',
    badge: 'EXAMINATIONS',
    highlights: [
      'Successfully completed G.C.E. Advanced Level (A/L) Examination in 2017.',
      'Completed G.C.E. Ordinary Level (O/L) Examination with strong academic performance in 2014.',
      'Built early foundations in logic, analytical thinking, and computer systems.'
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What kind of engineering projects and roles can I hire you for?',
    badge: 'SERVICES',
    answer: 'I specialize in engineering offensive/defensive cybersecurity tools, automated reconnaissance systems (Python/Rust), deep digital forensics investigation, reverse engineering, and secure Chrome Web Store browser extensions. I am available for bespoke tool development, security audits, and specialized contracts.'
  },
  {
    id: 'faq-2',
    question: 'How does your psychology & criminology degree aid in cybersecurity?',
    badge: 'CROSS-DOMAIN',
    answer: 'Traditional cybersecurity often ignores the human factor until a breach happens. My academic background in Psychology and Criminology allows me to anticipate social engineering vectors, analyze threat actor methodologies, decode deception cues, and build forensic tools that map digital footprints back to human intent.'
  },
  {
    id: 'faq-3',
    question: 'Are your extensions verified and safe on the Chrome Web Store?',
    badge: 'STORE VERIFIED',
    answer: 'Yes! Extensions such as Checkers Pro, Aeon Hunter Lite, and Console Injection+ are officially reviewed, signed, and published on the Chrome Web Store, fully complying with Google Manifest V3 security requirements with strict zero-telemetry policies.'
  },
  {
    id: 'faq-4',
    question: 'What is your primary tech stack for custom tool development?',
    badge: 'TECH STACK',
    answer: 'My primary stack consists of Python (for fast automation, C2 frameworks, and network packet analysis), Rust (for raw speed, memory safety, and low-level process scanning), and TypeScript/JavaScript (for browser extensions, AST manipulation, and SOC web dashboards).'
  },
  {
    id: 'faq-5',
    question: 'How do I initiate a secure communication or hire inquiry?',
    badge: 'COMMUNICATION',
    answer: 'You can use the interactive terminal on this page (type "send"), submit via the contact modal, connect directly on Telegram (@benjaminus), or reach out on WhatsApp/Email. All transmissions are encrypted in transit.'
  }
];

export const PLAYLIST: AudioTrack[] = [
  {
    id: 'track-1',
    name: 'Cyber Horizon (Synthwave 01)',
    artist: 'SoundHelix Cyber',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    type: 'synth'
  },
  {
    id: 'track-2',
    name: 'Matrix Infiltration (Synthwave 02)',
    artist: 'SoundHelix Cyber',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    type: 'synth'
  },
  {
    id: 'track-3',
    name: 'SOC Nightwatch (Synthwave 03)',
    artist: 'SoundHelix Cyber',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    type: 'ambient'
  },
  {
    id: 'track-4',
    name: '[UK_RADIO] Capital FM London',
    artist: 'London Radio Live',
    url: 'https://media-ice.musicradio.com/CapitalMP3',
    type: 'radio'
  },
  {
    id: 'track-5',
    name: '[UK_RADIO] Classic FM',
    artist: 'Classic FM Stream',
    url: 'https://media-ice.musicradio.com/ClassicFMMP3',
    type: 'radio'
  },
  {
    id: 'track-6',
    name: '[UK_RADIO] Smooth Radio UK',
    artist: 'Smooth UK Stream',
    url: 'https://media-ice.musicradio.com/SmoothUKMP3',
    type: 'radio'
  }
];

export const CODE_STREAMS = [
  [
    'def bypass_legacy_auth(target_ip): # Extracting keystore hashes...',
    'fn scan_memory() -> Result<Vec<u8>, Error> { let dump = mem::read(); }',
    "SELECT * FROM users WHERE access_level = 'ROOT' -- [INJECTION VERIFIED]",
    'const obfuscate_js = (code) => { return btoa(code).replace(/=/g, ""); }'
  ],
  [
    '[OK] Checkers Pro, Aeon Hunter Lite & Console Injection+ published on CWS.',
    'rustc --release -C opt-level=3 memvault.rs && ./memvault --target 0x7FFF00',
    'void execute_shellcode(void* payload) { ((void(*)())payload)(); }',
    '[INFO] Extracting encrypted databases and cryptographic keys from Android device...'
  ],
  [
    'import customtkinter as ctk; app = ctk.CTk(); app.title("Cyber Recon Terminal")',
    'SHA256(e0f84a8c9b4e72d1...) -> MATCH: Verified Cryptographic Checksum',
    '0x00400000 | 48 89 5C 24 08 48 89 74 24 10 57 48 83 EC 20',
    'SOCKET_OPEN // TLS_AES_256_GCM_SHA384 Established with C2 Node'
  ]
];

export const TICKER_ITEMS = [
  { tag: '[SYS_LOG]', text: 'Checkers Pro, Aeon Hunter Lite & Console Injection+ live on Chrome Web Store.' },
  { tag: '[ALERT]', text: 'Etherscan Wallet Watcher active on Ethereum Mainnet & Polygon nodes.' },
  { tag: '[INFO]', text: 'MemVault Rust Scanner v1.2 process entropy heuristics operational.' },
  { tag: '[UPDATE]', text: 'AEGIS-X Framework updated with dynamic payload memory staging.' },
  { tag: '[RADAR]', text: 'Android Forensic Artifact Extractor deployed for mobile incident response.' },
  { tag: '[STATUS]', text: 'Operator DB Jayasankha connected via secure shell from Colombo.' },
  { tag: '[DEFCON]', text: 'System Telemetry 100% Nominal. Defensive firewalls enforcing.' }
];
