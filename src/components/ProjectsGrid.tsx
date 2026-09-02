import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../types';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Github, ExternalLink, Star, GitFork, Search, Shield, Filter, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectsGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(FEATURED_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync live GitHub repos from Jayasankha-dev
  useEffect(() => {
    const fetchGitHub = async () => {
      setIsSyncing(true);
      try {
        const res = await fetch('https://api.github.com/users/Jayasankha-dev/repos?sort=updated&per_page=12');
        if (res.ok) {
          const githubData = await res.json();
          if (Array.isArray(githubData)) {
            const cyberImages = [
              'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            ];

            const fetchedItems: ProjectItem[] = githubData.map((repo: {
              id: number;
              name: string;
              language?: string;
              description?: string;
              stargazers_count?: number;
              forks_count?: number;
              html_url?: string;
              homepage?: string;
              topics?: string[];
            }, idx: number) => {
              const lang = repo.language ? repo.language.toLowerCase() : 'other';
              let cat: ProjectItem['category'] = 'other';
              if (lang.includes('python')) cat = 'python';
              else if (lang.includes('rust')) cat = 'rust';
              else if (lang.includes('javascript') || lang.includes('typescript')) cat = 'javascript';

              return {
                id: `gh-${repo.id}`,
                name: repo.name,
                category: cat,
                title: repo.name,
                description: repo.description || 'Open-source security tooling stream synchronized from GitHub repository.',
                language: repo.language || 'Code',
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || undefined,
                tags: repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language || 'Security', 'GitHub Sync'],
                imageUrl: cyberImages[idx % cyberImages.length],
                status: 'ACTIVE_OPS',
                version: 'GitHub Sync'
              };
            });

            // Merge unique projects
            const existingNames = new Set(FEATURED_PROJECTS.map((p) => p.name.toLowerCase()));
            const filteredNew = fetchedItems.filter((p) => !existingNames.has(p.name.toLowerCase()));
            setProjectsList([...FEATURED_PROJECTS, ...filteredNew]);
          }
        }
      } catch (err) {
        console.log('GitHub API fetch fallback to static showcase.', err);
      } finally {
        setIsSyncing(false);
      }
    };

    fetchGitHub();
  }, []);

  const filteredProjects = projectsList.filter((project) => {
    const matchesCategory =
      activeFilter === 'all' ||
      project.category === activeFilter ||
      (activeFilter === 'extension' && project.category === 'extension') ||
      (activeFilter === 'forensics' && project.category === 'forensics');

    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const filterOptions = [
    { id: 'all', label: '[*] ALL_MODULES' },
    { id: 'extension', label: 'CHROME EXTENSIONS' },
    { id: 'python', label: 'PYTHON' },
    { id: 'rust', label: 'RUST' },
    { id: 'javascript', label: 'JAVASCRIPT' },
    { id: 'forensics', label: 'FORENSICS' },
  ];

  return (
    <section id="github-repos" className="py-12 relative z-10">
      <div className="flex items-center justify-between mb-8 border-b border-[#003b00] pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[#00ff41] font-mono text-sm font-bold">[+]</span>
          <h2 className="font-['Orbitron'] text-xl md:text-2xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
            OPEN_SOURCE_INTEL & EXTENSIONS <Sparkles className="w-5 h-5 text-[#00ff41]" />
          </h2>
        </div>

        {/* Sync status tag */}
        <div className="text-xs font-mono flex items-center gap-2 text-gray-400">
          <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
          <span>{isSyncing ? 'SYNCING GITHUB API...' : 'LIVE REPO STREAM ACTIVE'}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                soundFX.playKeyClick();
                setActiveFilter(opt.id);
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all uppercase ${
                activeFilter === opt.id
                  ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_12px_rgba(0,255,65,0.4)]'
                  : 'bg-[#000f00]/70 text-gray-400 border border-[#003b00] hover:border-[#00ff41]/50 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Keyword Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search intel modules..."
            className="w-full bg-[#000f00]/80 border border-[#003b00] focus:border-[#00ff41] pl-8 pr-3 py-1.5 rounded text-xs font-mono text-white outline-none placeholder-gray-600"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -4 }}
              key={project.id}
              className="bg-[#000f00]/65 border border-[#003b00] hover:border-[#00ff41] rounded-lg overflow-hidden backdrop-blur-md flex flex-col transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
            >
              {/* Card Image Banner */}
              <div
                onClick={() => {
                  soundFX.playKeyClick();
                  setSelectedProject(project);
                }}
                className="relative h-44 w-full overflow-hidden cursor-pointer border-b border-[#003b00]"
              >
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover filter grayscale sepia hue-rotate-[70deg] brightness-70 contrast-125 group-hover:scale-105 group-hover:brightness-90 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000f00] via-transparent to-black/50" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#00ff41] text-black uppercase">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/80 border border-yellow-400/50 text-yellow-400 flex items-center gap-1">
                      <Shield className="w-2.5 h-2.5" /> STORE
                    </span>
                  )}
                </div>

                {/* Stars/Forks if present */}
                <div className="absolute bottom-2 right-3 flex items-center gap-3 text-xs font-mono text-gray-300 bg-black/70 px-2 py-0.5 rounded border border-gray-800">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {project.stars || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-gray-400" />
                    {project.forks || 0}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between font-mono text-xs">
                <div>
                  <h3
                    onClick={() => {
                      soundFX.playKeyClick();
                      setSelectedProject(project);
                    }}
                    className="font-['Orbitron'] text-base font-bold text-white group-hover:text-[#00ff41] transition-colors mb-1.5 cursor-pointer flex items-center justify-between"
                  >
                    <span>{project.name}</span>
                    <Github className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </h3>

                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-black/60 border border-[#00ff41]/20 text-[#00ff41]/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#003b00]">
                    <button
                      onClick={() => {
                        soundFX.playKeyClick();
                        setSelectedProject(project);
                      }}
                      className="py-1.5 px-2 rounded bg-black/80 border border-[#00ff41]/30 hover:border-[#00ff41] text-gray-300 hover:text-white transition-all text-center text-[11px]"
                    >
                      [+] Inspect Specs
                    </button>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded bg-[#00ff41]/10 hover:bg-[#00ff41] border border-[#00ff41]/40 text-[#00ff41] hover:text-black font-bold transition-all text-center flex items-center justify-center gap-1 text-[11px]"
                      >
                        <ExternalLink className="w-3 h-3" /> Live
                      </a>
                    ) : (
                      <a
                        href={project.githubUrl || 'https://github.com/Jayasankha-dev'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded bg-[#00ff41]/10 hover:bg-[#00ff41] border border-[#00ff41]/40 text-[#00ff41] hover:text-black font-bold transition-all text-center flex items-center justify-center gap-1 text-[11px]"
                      >
                        <Github className="w-3 h-3" /> Repo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-gray-500 font-mono text-xs bg-[#000f00]/40 border border-[#003b00] rounded-lg">
          [!] No intel modules matching filter or search query.
        </div>
      )}

      {/* Details Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
