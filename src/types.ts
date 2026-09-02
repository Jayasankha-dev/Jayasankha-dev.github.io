export interface ProjectItem {
  id: string;
  name: string;
  category: 'python' | 'rust' | 'javascript' | 'extension' | 'forensics' | 'other';
  title: string;
  description: string;
  fullDetails?: string;
  language?: string;
  stars?: number;
  forks?: number;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  imageUrl: string;
  featured?: boolean;
  status: 'PUBLISHED' | 'ACTIVE_OPS' | 'MAINTAINED' | 'PROTOTYPE';
  architecture?: string[];
  version?: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
  category: 'core' | 'offensive' | 'defensive' | 'systems';
  description: string;
  iconName?: string;
  technologies: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  badge?: string;
}

export interface AudioTrack {
  id: string;
  name: string;
  artist: string;
  url: string;
  type: 'synth' | 'radio' | 'ambient';
}

export interface TimelineEvent {
  year: string;
  title: string;
  role: string;
  location: string;
  highlights: string[];
  badge: string;
}

export interface SystemTelemetryData {
  chromeExtensions: number;
  githubRepos: number;
  forensicsProficiency: number;
  terminalOperability: number;
  systemUptime: string;
  threatLevel: 'DEFCON 5' | 'DEFCON 4' | 'DEFCON 3' | 'DEFCON 2' | 'DEFCON 1';
  firewallStatus: 'ACTIVE' | 'ENFORCING';
  encryptionStandard: 'AES-256-GCM / SHA-384';
}

export type ThemeVariant = 'matrix' | 'cyan' | 'crimson' | 'amber';
