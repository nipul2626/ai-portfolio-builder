'use client';

import { useWizard } from '@/contexts/wizard-context';
import { FaBehance } from "react-icons/fa";
import {Mail, Phone, Globe, Github, Linkedin, Twitter, Dribbble, Instagram,} from 'lucide-react';

const socialLinks = [
  {
    key: 'github',
    label: 'GitHub',
    icon: Github,
    placeholder: 'https://github.com/username',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    placeholder: 'https://linkedin.com/in/username',
  },
  {
    key: 'twitter',
    label: 'Twitter',
    icon: Twitter,
    placeholder: 'https://twitter.com/username',
  },
  {
    key: 'dribbble',
    label: 'Dribbble',
    icon: Dribbble,
    placeholder: 'https://dribbble.com/username',
  },

  {
    key: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    placeholder: 'https://instagram.com/username',
  },
];

export default function Step5Contact() {
  const { data, updateData, nextStep, prevStep } = useWizard();

  const handleSocialChange = (key: string, value: string) => {
    updateData({
      social: {
        ...data.social,
        [key]: value,
      },
    });
  };

  const handleContinue = () => {
    if (data.email) {
      nextStep();
    }
  };

  const isValid = data.email;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
        <p className="text-slate-400">Add how people can reach you and your social profiles</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Direct Contact</h3>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-white flex items-center gap-2">
            <Mail size={16} />
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-white flex items-center gap-2">
            <Phone size={16} />
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
          />
        </div>

        {/* Website */}
        <div className="space-y-2">
          <label htmlFor="website" className="block text-sm font-medium text-white flex items-center gap-2">
            <Globe size={16} />
            Personal Website
          </label>
          <input
            id="website"
            type="url"
            placeholder="https://yourwebsite.com"
            value={data.website}
            onChange={(e) => updateData({ website: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Social Profiles</h3>
        <div className="space-y-3">
          {socialLinks.map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key} className="space-y-2">
              <label htmlFor={key} className="block text-sm font-medium text-white flex items-center gap-2">
                <Icon size={16} />
                {label}
              </label>
              <input
                id={key}
                type="url"
                placeholder={placeholder}
                value={data.social[key as keyof typeof data.social]}
                onChange={(e) => handleSocialChange(key, e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
              />
            </div>
          ))}
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
