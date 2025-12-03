// src/components/organisms/ExportModal.jsx
import React, { useState } from 'react';
import { X, FileDown, FileSpreadsheet, Building2, Trophy, CheckCircle } from 'lucide-react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';

export default function ExportModal({ isOpen, onClose, projects, onExportAll, onExportSchool }) {
  const [selectedSchool, setSelectedSchool] = useState('');

  if (!isOpen) return null;

  // Get unique schools
  const schools = [...new Set(projects.map(p => p.school))].sort();

  // Calculate stats
  const totalProjects = projects.length;
  const scoredProjects = projects.filter(p => p.scores).length;
  const totalSchools = schools.length;

  // School stats
  const schoolStats = schools.map(school => {
    const schoolProjects = projects.filter(p => p.school === school);
    const scored = schoolProjects.filter(p => p.scores).length;
    return {
      name: school,
      total: schoolProjects.length,
      scored
    };
  });

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur rounded-xl shadow-lg">
              <FileDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Export ke Excel</h2>
              <p className="text-blue-50 text-sm mt-0.5">Pilih data yang ingin di-export</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 hover:bg-white/20 rounded-xl transition-all duration-200 group"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {/* Stats Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200">
            <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Ringkasan Data
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">{totalProjects}</div>
                <div className="text-xs text-blue-600 font-medium mt-1">Total Project</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{scoredProjects}</div>
                <div className="text-xs text-blue-600 font-medium mt-1">Sudah Dinilai</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{totalSchools}</div>
                <div className="text-xs text-blue-600 font-medium mt-1">Total Sekolah</div>
              </div>
            </div>
          </div>

          {/* Export All Option */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-5 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group" onClick={onExportAll}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-neutral-800 mb-1 group-hover:text-emerald-600 transition-colors">
                  Export Semua Data (Lengkap)
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Export laporan lengkap dengan semua sheet dan statistik
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" size="sm">
                    <CheckCircle className="w-3 h-3" />
                    Ringkasan
                  </Badge>
                  <Badge variant="info" size="sm">Top 10</Badge>
                  <Badge variant="info" size="sm">Semua Project</Badge>
                  <Badge variant="warning" size="sm">Statistik Sekolah</Badge>
                  <Badge variant="default" size="sm">Belum Dinilai</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Export by School */}
          <div>
            <h3 className="text-base font-bold text-neutral-800 mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Export Per Sekolah
            </h3>
            
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {schoolStats.map((school) => (
                <button
                  key={school.name}
                  onClick={() => onExportSchool(school.name)}
                  className="w-full bg-white border-2 border-neutral-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-neutral-800 group-hover:text-blue-600 transition-colors truncate">
                        {school.name}
                      </h4>
                      <div className="flex gap-3 mt-1.5">
                        <span className="text-xs text-neutral-600">
                          <span className="font-semibold">{school.total}</span> project
                        </span>
                        <span className="text-xs text-emerald-600">
                          <span className="font-semibold">{school.scored}</span> dinilai
                        </span>
                      </div>
                    </div>
                    <FileDown className="w-5 h-5 text-neutral-400 group-hover:text-blue-600 transition-colors shrink-0 ml-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💡</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-amber-900 mb-1">
                  Informasi Export
                </p>
                <ul className="text-xs text-amber-800 space-y-1 font-medium">
                  <li>• File Excel akan otomatis terdownload</li>
                  <li>• Export lengkap berisi 5 sheet dengan data detail</li>
                  <li>• Export per sekolah fokus pada data sekolah tersebut</li>
                  <li>• Semua data termasuk top 10 dan statistik</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t-2 border-neutral-200 flex justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="px-6 py-3 text-base font-bold"
          >
            <X className="w-4 h-4" />
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}