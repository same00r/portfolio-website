import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUp, Instagram, Facebook } from 'lucide-react';
import { editorProfile } from '../data/mock';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative bg-black border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="font-display text-xl tracking-tight text-white">
                SAMER<span className="text-amber-400">.</span>
              </span>
            </motion.a>
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              {editorProfile.tagline}. Transforming raw footage into compelling visual narratives that captivate audiences worldwide.
            </p>
            <div className="flex gap-4">
              {Object.entries(editorProfile.social).map(([platform, url]) => {
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300"
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li>{editorProfile.email}</li>
              <li>{editorProfile.phone}</li>
              <li>{editorProfile.location}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Samer Hanna. All rights reserved.
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300"
            >
              Back to Top
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
