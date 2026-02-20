'use client';

import { useState } from 'react';
import { useWizard } from '@/contexts/wizard-context';
import { X, Plus } from 'lucide-react';

const suggestedSkills = [
  'Problem Solving',
  'Communication',
  'Leadership',
  'Teamwork',
  'Project Management',
  'Critical Thinking',
  'Creativity',
  'Time Management',
  'Adaptability',
  'Attention to Detail',
];

const suggestedTechnologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'JavaScript',
  'Tailwind CSS',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'AWS',
  'Git',
  'Vue.js',
  'GraphQL',
  'REST APIs',
];

export default function Step3Skills() {
  const { data, updateData, nextStep, prevStep } = useWizard();
  const [newSkill, setNewSkill] = useState('');
  const [newTech, setNewTech] = useState('');

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      updateData({ skills: [...data.skills, skill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    updateData({ skills: data.skills.filter((s) => s !== skill) });
  };

  const addTechnology = (tech: string) => {
    if (tech && !data.technologies.includes(tech)) {
      updateData({ technologies: [...data.technologies, tech] });
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    updateData({ technologies: data.technologies.filter((t) => t !== tech) });
  };

  const handleContinue = () => {
    if (data.skills.length > 0 && data.technologies.length > 0) {
      nextStep();
    }
  };

  const isValid = data.skills.length > 0 && data.technologies.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Skills & Technologies</h2>
        <p className="text-slate-400">Add the skills and technologies you specialize in</p>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Skills *</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., Leadership"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSkill(newSkill);
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
              />
              <button
                onClick={() => addSkill(newSkill)}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-300 flex items-center gap-2"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Selected Skills */}
            {data.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400"
                  >
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-cyan-300 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Skills */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500">Popular skills:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills
                  .filter((s) => !data.skills.includes(s))
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-sm hover:bg-slate-600 transition-colors duration-300"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Technologies *</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., React"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTechnology(newTech);
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
              />
              <button
                onClick={() => addTechnology(newTech)}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-300 flex items-center gap-2"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Selected Technologies */}
            {data.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-400"
                  >
                    <span className="text-sm">{tech}</span>
                    <button
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-blue-300 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Technologies */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500">Popular technologies:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTechnologies
                  .filter((t) => !data.technologies.includes(t))
                  .map((tech) => (
                    <button
                      key={tech}
                      onClick={() => addTechnology(tech)}
                      className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-sm hover:bg-slate-600 transition-colors duration-300"
                    >
                      + {tech}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
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
