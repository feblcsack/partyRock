// src/services/exportService.js
import * as XLSX from 'xlsx';

// Calculate weighted score
const calculateWeightedScore = (scores) => {
  if (!scores) return 0;
  return (
    scores.originality * 0.35 +
    scores.usefulness * 0.35 +
    scores.technology * 0.20 +
    scores.creativity * 0.10
  );
};

// Export projects to Excel
export const exportToExcel = (projects) => {
  // Sort projects by score
  const sortedProjects = [...projects]
    .filter(p => p.scores) // Only projects with scores
    .sort((a, b) => {
      const scoreA = calculateWeightedScore(a.scores);
      const scoreB = calculateWeightedScore(b.scores);
      return scoreB - scoreA;
    });

  // Get top 10
  const top10 = sortedProjects.slice(0, 10);

  // Calculate school statistics
  const schoolStats = {};
  projects.forEach(project => {
    if (!schoolStats[project.school]) {
      schoolStats[project.school] = {
        total: 0,
        scored: 0,
        totalScore: 0,
        projects: []
      };
    }
    schoolStats[project.school].total++;
    if (project.scores) {
      schoolStats[project.school].scored++;
      schoolStats[project.school].totalScore += calculateWeightedScore(project.scores);
      schoolStats[project.school].projects.push({
        title: project.title,
        score: calculateWeightedScore(project.scores)
      });
    }
  });

  // Convert school stats to array and sort by average score
  const schoolStatsArray = Object.entries(schoolStats).map(([school, stats]) => ({
    school,
    total: stats.total,
    scored: stats.scored,
    avgScore: stats.scored > 0 ? (stats.totalScore / stats.scored).toFixed(2) : 0,
    projects: stats.projects
  })).sort((a, b) => b.avgScore - a.avgScore);

  // Create workbook
  const workbook = XLSX.utils.book_new();

  // Sheet 1: Summary
  const summaryData = [
    ['LAPORAN PROJECT ASSESSMENT TRACKER'],
    ['Tanggal Export:', new Date().toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })],
    [],
    ['RINGKASAN DATA'],
    ['Total Project:', projects.length],
    ['Project Sudah Dinilai:', sortedProjects.length],
    ['Project Belum Dinilai:', projects.length - sortedProjects.length],
    ['Total Sekolah:', Object.keys(schoolStats).length],
    [],
    ['STATISTIK NILAI'],
    ['Nilai Tertinggi:', sortedProjects.length > 0 ? calculateWeightedScore(sortedProjects[0].scores).toFixed(2) : 0],
    ['Nilai Terendah:', sortedProjects.length > 0 ? calculateWeightedScore(sortedProjects[sortedProjects.length - 1].scores).toFixed(2) : 0],
    ['Rata-rata Nilai:', sortedProjects.length > 0 ? (sortedProjects.reduce((sum, p) => sum + calculateWeightedScore(p.scores), 0) / sortedProjects.length).toFixed(2) : 0],
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Ringkasan');

  // Sheet 2: Top 10 Projects
  const top10Data = [
    ['TOP 10 PROJECT TERBAIK'],
    [],
    ['Peringkat', 'Judul Project', 'Sekolah', 'Kelas', 'Owner', 'Originalitas', 'Kegunaan', 'Teknologi', 'Kreativitas', 'Skor Akhir'],
    ...top10.map((project, index) => [
      index + 1,
      project.title,
      project.school,
      project.grade || '-',
      project.userName || 'Anonymous',
      project.scores.originality,
      project.scores.usefulness,
      project.scores.technology,
      project.scores.creativity,
      calculateWeightedScore(project.scores).toFixed(2)
    ])
  ];
  const top10Sheet = XLSX.utils.aoa_to_sheet(top10Data);
  XLSX.utils.book_append_sheet(workbook, top10Sheet, 'Top 10');

  // Sheet 3: All Projects (Scored)
  const allProjectsData = [
    ['SEMUA PROJECT (SUDAH DINILAI)'],
    [],
    ['Peringkat', 'Judul Project', 'Sekolah', 'Kelas', 'Owner', 'Deskripsi', 'Originalitas', 'Kegunaan', 'Teknologi', 'Kreativitas', 'Skor Akhir'],
    ...sortedProjects.map((project, index) => [
      index + 1,
      project.title,
      project.school,
      project.grade || '-',
      project.userName || 'Anonymous',
      project.description,
      project.scores.originality,
      project.scores.usefulness,
      project.scores.technology,
      project.scores.creativity,
      calculateWeightedScore(project.scores).toFixed(2)
    ])
  ];
  const allProjectsSheet = XLSX.utils.aoa_to_sheet(allProjectsData);
  XLSX.utils.book_append_sheet(workbook, allProjectsSheet, 'Semua Project');

  // Sheet 4: School Statistics
  const schoolStatsData = [
    ['STATISTIK PER SEKOLAH'],
    [],
    ['Peringkat', 'Nama Sekolah', 'Total Project', 'Sudah Dinilai', 'Belum Dinilai', 'Rata-rata Nilai'],
    ...schoolStatsArray.map((stat, index) => [
      index + 1,
      stat.school,
      stat.total,
      stat.scored,
      stat.total - stat.scored,
      stat.avgScore
    ])
  ];
  const schoolStatsSheet = XLSX.utils.aoa_to_sheet(schoolStatsData);
  XLSX.utils.book_append_sheet(workbook, schoolStatsSheet, 'Statistik Sekolah');

  // Sheet 5: Unscored Projects
  const unscoredProjects = projects.filter(p => !p.scores);
  if (unscoredProjects.length > 0) {
    const unscoredData = [
      ['PROJECT BELUM DINILAI'],
      [],
      ['No', 'Judul Project', 'Sekolah', 'Kelas', 'Owner', 'Deskripsi'],
      ...unscoredProjects.map((project, index) => [
        index + 1,
        project.title,
        project.school,
        project.grade || '-',
        project.userName || 'Anonymous',
        project.description
      ])
    ];
    const unscoredSheet = XLSX.utils.aoa_to_sheet(unscoredData);
    XLSX.utils.book_append_sheet(workbook, unscoredSheet, 'Belum Dinilai');
  }

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `Project_Assessment_Report_${timestamp}.xlsx`;

  // Write and download file
  XLSX.writeFile(workbook, filename);
};

// Export specific school data
export const exportSchoolData = (projects, schoolName) => {
  const schoolProjects = projects.filter(p => p.school === schoolName);
  
  const scoredProjects = schoolProjects
    .filter(p => p.scores)
    .sort((a, b) => {
      const scoreA = calculateWeightedScore(a.scores);
      const scoreB = calculateWeightedScore(b.scores);
      return scoreB - scoreA;
    });

  const workbook = XLSX.utils.book_new();

  // Summary
  const summaryData = [
    [`LAPORAN PROJECT - ${schoolName}`],
    ['Tanggal Export:', new Date().toLocaleDateString('id-ID')],
    [],
    ['Total Project:', schoolProjects.length],
    ['Sudah Dinilai:', scoredProjects.length],
    ['Belum Dinilai:', schoolProjects.length - scoredProjects.length],
    [],
    ['Nilai Tertinggi:', scoredProjects.length > 0 ? calculateWeightedScore(scoredProjects[0].scores).toFixed(2) : 0],
    ['Rata-rata Nilai:', scoredProjects.length > 0 ? (scoredProjects.reduce((sum, p) => sum + calculateWeightedScore(p.scores), 0) / scoredProjects.length).toFixed(2) : 0],
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Ringkasan');

  // Projects
  const projectsData = [
    [`PROJECT ${schoolName}`],
    [],
    ['Peringkat', 'Judul', 'Kelas', 'Owner', 'Originalitas', 'Kegunaan', 'Teknologi', 'Kreativitas', 'Skor Akhir'],
    ...scoredProjects.map((p, i) => [
      i + 1,
      p.title,
      p.grade || '-',
      p.userName || 'Anonymous',
      p.scores.originality,
      p.scores.usefulness,
      p.scores.technology,
      p.scores.creativity,
      calculateWeightedScore(p.scores).toFixed(2)
    ])
  ];
  const projectsSheet = XLSX.utils.aoa_to_sheet(projectsData);
  XLSX.utils.book_append_sheet(workbook, projectsSheet, 'Projects');

  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `${schoolName.replace(/\s+/g, '_')}_Report_${timestamp}.xlsx`;
  XLSX.writeFile(workbook, filename);
};