// src/components/templates/ProjectTracker.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, Plus, Filter, Search, LogOut, User, Folder, Users, FileDown, Download } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getAllProjects, 
  addProject, 
  updateProjectScores 
} from '../../services/ProjectService';
import { exportToExcel, exportSchoolData } from '../../services/exportService';

// Import Components
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import Select from '../molecules/Select';
import ProjectCard from '../organisms/ProjectCard';
import TopProjectCard from '../organisms/TopProjectCard';
import RatingModal from '../organisms/RatingModal';
import AddProjectModal from '../organisms/AddProjectModal';
import ExportModal from '../organisms/ExportModal';

export default function ProjectTracker() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSchool, setFilterSchool] = useState("All");
  const [filterGrade, setFilterGrade] = useState("All");
  const [viewMode, setViewMode] = useState("all"); // "all" or "mine"

  // Load projects from Firestore
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await getAllProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

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
    let filtered = projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.school.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSchool = filterSchool === "All" || p.school === filterSchool;
      const matchesGrade = filterGrade === "All" || p.grade === filterGrade;
      const matchesView = viewMode === "all" || (viewMode === "mine" && p.userId === user?.uid);
      
      return matchesSearch && matchesSchool && matchesGrade && matchesView;
    });

    return filtered.sort((a, b) => {
      const scoreA = calculateWeightedScore(a.scores);
      const scoreB = calculateWeightedScore(b.scores);
      return scoreB - scoreA;
    });
  }, [projects, searchQuery, filterSchool, filterGrade, viewMode, user]);

  // Get user's projects
  const myProjects = useMemo(() => {
    return projects.filter(p => p.userId === user?.uid);
  }, [projects, user]);

  // Get unique schools and grades for filter
  const schools = useMemo(() => {
    const list = new Set(projects.map(p => p.school));
    return ["All", ...Array.from(list)];
  }, [projects]);

  const grades = ["All", "X", "XI", "XII"];

  const schoolOptions = schools.map(school => ({
    value: school,
    label: school === "All" ? "Semua Sekolah" : school
  }));

  const gradeOptions = grades.map(grade => ({
    value: grade,
    label: grade === "All" ? "Semua Kelas" : `Kelas ${grade}`
  }));

  // Handlers
  const handleRateClick = (project) => {
    if (project.userId !== user.uid) {
      alert('Anda hanya bisa menilai project Anda sendiri!');
      return;
    }
    setSelectedProject(project);
    setIsRateModalOpen(true);
  };

  const handleSaveScore = async (projectId, newScores) => {
    try {
      await updateProjectScores(projectId, newScores);
      setProjects(prev => prev.map(p => 
        p.id === projectId ? { ...p, scores: newScores } : p
      ));
      setIsRateModalOpen(false);
    } catch (error) {
      console.error('Error saving score:', error);
      alert('Gagal menyimpan nilai. Silakan coba lagi.');
    }
  };

  const handleAddProject = async (newProject) => {
    try {
      const projectId = await addProject(
        newProject, 
        user.uid, 
        user.displayName || user.email
      );
      
      const projectWithId = {
        ...newProject,
        id: projectId,
        userId: user.uid,
        userName: user.displayName || user.email,
        scores: null
      };
      
      setProjects(prev => [...prev, projectWithId]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Gagal menambahkan project. Silakan coba lagi.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleExportAll = () => {
    exportToExcel(projects);
    setIsExportModalOpen(false);
  };

  const handleExportSchool = (schoolName) => {
    exportSchoolData(projects, schoolName);
    setIsExportModalOpen(false);
  };

  // Get top project
  const topProject = processedProjects.length > 0 && processedProjects[0].scores 
    ? processedProjects[0] 
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent"></div>
          <p className="mt-4 text-neutral-700 font-medium">Memuat projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-800">
                  Project Assessment Tracker
                </h1>
                <p className="text-xs text-neutral-500">
                  Penilaian & Ranking Project Sekolah
                </p>
              </div>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* User Info */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-neutral-800">
                    {user?.displayName?.split(' ')[0] || 'User'}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {myProjects.length} Project
                  </p>
                </div>
              </div>

              <Button 
                variant="primary"
                onClick={() => setIsAddModalOpen(true)}
                className="shadow-lg shadow-emerald-500/30"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Tambah Project</span>
              </Button>

              <Button 
                variant="secondary"
                onClick={() => setIsExportModalOpen(true)}
                className="shadow-md"
              >
                <FileDown className="w-4 h-4" />
                <span className="hidden sm:inline">Export Excel</span>
              </Button>

              <Button 
                variant="secondary"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Project Highlight */}
        {topProject && viewMode === "all" && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-neutral-800">
                Pemuncak Klasemen
              </h2>
            </div>
            <TopProjectCard project={topProject} />
          </div>
        )}

        {/* View Mode Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-xl p-1.5 inline-flex gap-1 shadow-sm border border-neutral-200">
            <button
              onClick={() => setViewMode("all")}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                viewMode === "all"
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/30"
                  : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              <Users className="w-4 h-4" />
              Semua Project
              <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                viewMode === "all" ? "bg-white/20" : "bg-neutral-100"
              }`}>
                {projects.length}
              </span>
            </button>
            <button
              onClick={() => setViewMode("mine")}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                viewMode === "mine"
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/30"
                  : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              <Folder className="w-4 h-4" />
              Project Saya
              <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                viewMode === "mine" ? "bg-white/20" : "bg-neutral-100"
              }`}>
                {myProjects.length}
              </span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Cari project atau sekolah..."
              />
            </div>
            <div>
              <Select 
                value={filterSchool}
                onChange={setFilterSchool}
                options={schoolOptions}
                icon={Filter}
              />
            </div>
            <div>
              <Select 
                value={filterGrade}
                onChange={setFilterGrade}
                options={gradeOptions}
                icon={Filter}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards - Only for "mine" view */}
        {viewMode === "mine" && myProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Folder className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Total Project</p>
                  <p className="text-2xl font-bold text-neutral-800">{myProjects.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Trophy className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Sudah Dinilai</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {myProjects.filter(p => p.scores).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Filter className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Belum Dinilai</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {myProjects.filter(p => !p.scores).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Grid */}
        {processedProjects.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-600">
                Menampilkan {processedProjects.length} project
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {processedProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  rank={index + 1}
                  onRate={handleRateClick}
                  isOwner={project.userId === user?.uid}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex justify-center items-center w-20 h-20 bg-neutral-100 rounded-full mb-4">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              {viewMode === "mine" ? "Belum ada project" : "Project tidak ditemukan"}
            </h3>
            <p className="text-neutral-500 mb-6">
              {viewMode === "mine" 
                ? "Tambahkan project pertama Anda untuk memulai!" 
                : "Coba ubah filter atau kata kunci pencarian Anda."}
            </p>
            {viewMode === "mine" && (
              <Button 
                variant="primary"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Tambah Project Pertama
              </Button>
            )}
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

      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        projects={projects}
        onExportAll={handleExportAll}
        onExportSchool={handleExportSchool}
      />
    </div>
  );
}