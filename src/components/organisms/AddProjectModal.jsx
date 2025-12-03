// src/components/organisms/AddProjectModal.jsx
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

export default function AddProjectModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    school: '',
    description: '',
    grade: 'X'
  });

  const handleSubmit = () => {
    if (formData.title && formData.school && formData.description) {
      onAdd(formData);
      setFormData({ title: '', school: '', description: '', grade: 'X' });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Tambah Project Baru</h2>
              <p className="text-emerald-100 text-sm">Isi informasi project Anda</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-180px)]">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Judul Project <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Contoh: Sistem Smart Irrigation IoT"
            />
          </div>

          {/* School + Grade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* School */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Nama Sekolah <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.school}
                onChange={(e) => handleChange('school', e.target.value)}
                placeholder="Contoh: SMA Negeri 1 Jakarta"
              />
            </div>

            {/* Grade */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Kelas <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-2">
                {['X', 'XI', 'XII'].map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => handleChange('grade', grade)}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      formData.grade === grade
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/30'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Deskripsi Project <span className="text-red-500">*</span>
            </label>

            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Jelaskan project Anda secara singkat..."
              rows={4}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
            />

            <p className="text-xs text-neutral-500 mt-1.5">
              Minimal 20 karakter, maksimal 300 karakter
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">ℹ️</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-800 mb-1">
                  Informasi Penting
                </p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Project akan muncul di daftar setelah disimpan</li>
                  <li>• Anda dapat memberikan penilaian setelah project ditambahkan</li>
                  <li>• Hanya Anda yang dapat mengedit project ini</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex gap-3 justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={!formData.title || !formData.school || !formData.description}
            className="shadow-md shadow-emerald-500/30"
          >
            <Plus className="w-4 h-4" />
            Simpan Project
          </Button>
        </div>
      </div>
    </div>
  );
}
