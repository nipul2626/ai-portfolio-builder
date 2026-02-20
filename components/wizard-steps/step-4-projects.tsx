'use client';

import { useState } from 'react';
import { useWizard } from '@/contexts/wizard-context';
import { Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
const uuidv4 = () => crypto.randomUUID();

export default function Step4Projects() {
  const { data, updateData, nextStep, prevStep } = useWizard();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

  const addProject = () => {
    const newProject = {
      id: uuidv4(),
      title: '',
      description: '',
      technologies: [],
      link: '',
      image: null,
    };
    updateData({ projects: [...data.projects, newProject] });
    setExpandedProject(newProject.id);
  };

  const updateProject = (id: string, updates: any) => {
    updateData({
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const deleteProject = (id: string) => {
    updateData({ projects: data.projects.filter((p) => p.id !== id) });
    if (expandedProject === id) setExpandedProject(null);
  };

  const addExperience = () => {
    const newExp = {
      id: uuidv4(),
      title: '',
      company: '',
      duration: '',
      description: '',
    };
    updateData({ experience: [...data.experience, newExp] });
    setExpandedExperience(newExp.id);
  };

  const updateExperience = (id: string, updates: any) => {
    updateData({
      experience: data.experience.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    });
  };

  const deleteExperience = (id: string) => {
    updateData({ experience: data.experience.filter((e) => e.id !== id) });
    if (expandedExperience === id) setExpandedExperience(null);
  };

  const handleContinue = () => {
    if (data.projects.length > 0 || data.experience.length > 0) {
      nextStep();
    }
  };

  const isValid = data.projects.length > 0 || data.experience.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Work Experience</h2>
        <p className="text-slate-400">Add your projects and professional experience</p>
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Projects</h3>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        {data.projects.length === 0 ? (
          <p className="text-slate-500 text-sm">No projects added yet. Add one to showcase your work!</p>
        ) : (
          <div className="space-y-2">
            {data.projects.map((project) => (
              <div key={project.id} className="rounded-lg border-2 border-slate-700 bg-slate-800/50 overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedProject(expandedProject === project.id ? null : project.id)
                  }
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-800/80 transition-colors"
                >
                  <span className="text-white font-medium">{project.title || 'Untitled Project'}</span>
                  {expandedProject === project.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {expandedProject === project.id && (
                  <div className="px-4 py-4 border-t border-slate-700 space-y-4 bg-slate-800/30">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={project.title}
                      onChange={(e) => updateProject(project.id, { title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Project Link (optional)"
                      value={project.link}
                      onChange={(e) => updateProject(project.id, { link: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm"
                    >
                      <Trash2 size={16} />
                      Delete Project
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Experience Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Experience</h3>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            <Plus size={16} />
            Add Experience
          </button>
        </div>

        {data.experience.length === 0 ? (
          <p className="text-slate-500 text-sm">No experience added yet. Add your work history!</p>
        ) : (
          <div className="space-y-2">
            {data.experience.map((exp) => (
              <div key={exp.id} className="rounded-lg border-2 border-slate-700 bg-slate-800/50 overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedExperience(expandedExperience === exp.id ? null : exp.id)
                  }
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-800/80 transition-colors"
                >
                  <div className="text-left">
                    <div className="text-white font-medium">{exp.title || 'Untitled Position'}</div>
                    <div className="text-xs text-slate-400">{exp.company || 'Company'}</div>
                  </div>
                  {expandedExperience === exp.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {expandedExperience === exp.id && (
                  <div className="px-4 py-4 border-t border-slate-700 space-y-4 bg-slate-800/30">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 2020 - 2023)"
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, { duration: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Job Description"
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm"
                    >
                      <Trash2 size={16} />
                      Delete Experience
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
