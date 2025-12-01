import React, { useState, useMemo } from 'react';
import { Trophy, Plus, Filter, Search } from 'lucide-react';

// Import Atoms
import Button from './components/atoms/Button';

// Import Molecules
import SearchBar from './components/molecules/SearchBar';
import Select from './components/molecules/Select';

// Import Organisms
import ProjectCard from './components/organisms/ProjectCard';
import TopProjectCard from './components/organisms/TopProjectCard';
import RatingModal from './components/organisms/RatingModal';
import AddProjectModal from './components/organisms/AddProjectModal';

export default function ProjectTracker() {
  const INITIAL_PROJECTS = [
    {
      id: 1,
      title: "tester project",
      school: "Binus School Semprong",
      description: "Sistem penyiraman otomatis berbasis kelembaban tanah menggunakan ESP32.",
      scores: { originality: 85, usefulness: 90, technology: 80, creativity: 75 }
    },
    
  ];

  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSchool, setFilterSchool] = useState("All");

  // Calculate weighted score function
  const calculateWeightedScore = (scores) => {
    if (!scores) return 0;
    return (
      scores.originality * 0.35 +
      scores.usefulness * 0.35 +
      scores.technology * 0.20 +
      scores.creativity * 0.10
    );
  };

  // Process and filter projects
  const processedProjects = useMemo(() => {
    let filtered = projects.filter(p => 
      (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       p.school.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterSchool === "All" || p.school === filterSchool)
    );

    return filtered.sort((a, b) => {
      const scoreA = calculateWeightedScore(a.scores);
      const scoreB = calculateWeightedScore(b.scores);
      return scoreB - scoreA;
    });
  }, [projects, searchQuery, filterSchool]);

  // Get unique schools for filter
  const schools = useMemo(() => {
    const list = new Set(projects.map(p => p.school));
    return ["All", ...Array.from(list)];
  }, [projects]);

  const schoolOptions = schools.map(school => ({
    value: school,
    label: school === "All" ? "Semua Sekolah" : school
  }));

  // Handlers
  const handleRateClick = (project) => {
    setSelectedProject(project);
    setIsRateModalOpen(true);
  };

  const handleSaveScore = (id, newScores) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, scores: newScores } : p
    ));
    setIsRateModalOpen(false);
  };

  const handleAddProject = (newProject) => {
    const id = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([...projects, { ...newProject, id, scores: null }]);
    setIsAddModalOpen(false);
  };

  // Get top project
  const topProject = processedProjects.length > 0 && processedProjects[0].scores 
    ? processedProjects[0] 
    : null;

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 rounded-xl">
                <Trophy className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight text-neutral-800">
                  Project Assessment Tracker
                </h1>
                <p className="text-neutral-500 text-xs mt-0.5">
                  Penilaian & Ranking Project Sekolah
                </p>
              </div>
            </div>
            
            <Button 
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Tambah Project
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 pb-20">
        {/* Top Project Highlight */}
        {topProject && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Pemuncak Klasemen
            </h2>
            <TopProjectCard project={topProject} />
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-white p-5 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex-1">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Cari project atau sekolah..."
            />
          </div>
          <div className="w-full lg:w-80">
            <Select 
              value={filterSchool}
              onChange={setFilterSchool}
              options={schoolOptions}
              icon={Filter}
            />
          </div>
        </div>

        {/* Project Grid - FULL WIDTH with 4 columns on XL screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {processedProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              rank={index + 1}
              onRate={handleRateClick} 
            />
          ))}
        </div>

        {/* Empty State */}
        {processedProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex justify-center items-center w-20 h-20 bg-neutral-100 rounded-full mb-4">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Project tidak ditemukan
            </h3>
            <p className="text-neutral-500">
              Coba ubah filter atau kata kunci pencarian Anda.
            </p>
          </div>
        )}
      </main>

      {/* Modals */}
      <RatingModal 
        isOpen={isRateModalOpen} 
        onClose={() => setIsRateModalOpen(false)} 
        project={selectedProject} 
        onSave={handleSaveScore}
      />

      <AddProjectModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddProject} 
      />
    </div>
  );
}