'use client';

import { useState, useRef } from 'react';
import { useWizard } from '@/contexts/wizard-context';
import { Upload, X } from 'lucide-react';

export default function Step2BasicInfo() {
  const { data, updateData, nextStep, prevStep } = useWizard();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(data.profileImage);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        updateData({ profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    updateData({ profileImage: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = () => {
    if (data.fullName && data.headline && data.bio) {
      nextStep();
    }
  };

  const isValid = data.fullName && data.headline && data.bio;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
        <p className="text-slate-400">Add your personal information to get started</p>
      </div>

      {/* Profile Image Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-white">Profile Picture</label>
        {!imagePreview ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 rounded-lg border-2 border-dashed border-slate-700 hover:border-cyan-500 transition-colors duration-300 flex flex-col items-center justify-center gap-2 bg-slate-800/50 hover:bg-cyan-500/5"
          >
            <Upload size={24} className="text-slate-400" />
            <span className="text-sm text-slate-400">Click to upload or drag and drop</span>
          </button>
        ) : (
          <div className="relative w-32 h-32 mx-auto">
            <img src={imagePreview} alt="Profile" className="w-32 h-32 rounded-lg object-cover" />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium text-white">
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="e.g., Jane Doe"
          value={data.fullName}
          onChange={(e) => updateData({ fullName: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
        />
      </div>

      {/* Headline */}
      <div className="space-y-2">
        <label htmlFor="headline" className="block text-sm font-medium text-white">
          Professional Headline *
        </label>
        <input
          id="headline"
          type="text"
          placeholder="e.g., Full Stack Developer & UI Designer"
          value={data.headline}
          onChange={(e) => updateData({ headline: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
        />
        <p className="text-xs text-slate-400">One line that describes what you do</p>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label htmlFor="bio" className="block text-sm font-medium text-white">
          Bio *
        </label>
        <textarea
          id="bio"
          placeholder="Share your story, expertise, and what makes you unique..."
          value={data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300 resize-none"
        />
        <p className="text-xs text-slate-400">{data.bio.length} / 500 characters</p>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium text-white">
          Location
        </label>
        <input
          id="location"
          type="text"
          placeholder="e.g., San Francisco, CA"
          value={data.location}
          onChange={(e) => updateData({ location: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={prevStep}
          className="flex-1 py-3 px-4 rounded-lg border-2 border-slate-700 text-white font-medium hover:border-slate-600 transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
