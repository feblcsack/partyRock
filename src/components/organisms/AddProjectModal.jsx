import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const AddProjectModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    school: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (formData.title && formData.school && formData.description) {
      onAdd(formData);
      setFormData({ title: '', school: '', description: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-neutral-800 mb-5 flex items-center gap-2">
          <Plus className="w-6 h-6 text-emerald-600" /> 
          Tambah Project Baru
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Nama Sekolah</label>
            <Input 
              type="text" 
              placeholder="Contoh: SMKN 1 Jakarta"
              value={formData.school}
              onChange={(e) => setFormData({...formData, school: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Judul Project</label>
            <Input 
              type="text" 
              placeholder="Contoh: Smart Garden System"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Deskripsi Singkat</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
              placeholder="Jelaskan secara singkat tentang project..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button 
              variant="ghost"
              onClick={onClose}
            >
              Batal
            </Button>
            <Button 
              variant="primary"
              onClick={handleSubmit}
            >
              <Plus className="w-4 h-4" />
              Tambah Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;