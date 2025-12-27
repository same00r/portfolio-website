import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, CheckCircle2 } from 'lucide-react';
import { editorProfile } from '../data/mock';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import backend from '~backend/client';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await backend.contact.submit({
        name: formData.name,
        email: formData.email,
        project: formData.project,
        message: formData.message
      });
      
      setSubmitted(true);
      setFormData({ name: '', email: '', project: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: editorProfile.email },
    { icon: Phone, label: 'Phone', value: editorProfile.phone },
    { icon: MapPin, label: 'Location', value: editorProfile.location }
  ];

  return (
    <section id="contact" className="relative bg-black py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            Let's Create Together
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a project in mind? Let's discuss how we can bring your vision to life through powerful visual storytelling.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-white text-base font-normal">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-transparent border-2 border-gray-700 text-gray-400 placeholder:text-gray-600 focus:border-gray-600 focus:ring-0 h-14 rounded-2xl px-6 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-white text-base font-normal">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="bg-transparent border-2 border-gray-700 text-gray-400 placeholder:text-gray-600 focus:border-gray-600 focus:ring-0 h-14 rounded-2xl px-6 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="project" className="text-white text-base font-normal">Project Type</Label>
                <Input
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="e.g., Commercial, Music Video, Documentary"
                  className="bg-transparent border-2 border-gray-700 text-gray-400 placeholder:text-gray-600 focus:border-gray-600 focus:ring-0 h-14 rounded-2xl px-6 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-white text-base font-normal">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={6}
                  className="bg-transparent border-2 border-gray-700 text-gray-400 placeholder:text-gray-600 focus:border-gray-600 focus:ring-0 resize-none rounded-2xl px-6 py-4 text-base"
                />
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Message sent successfully!</span>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base flex flex-col items-center justify-center gap-1"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                  />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm hover:border-amber-400/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">{info.label}</h4>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm">
              <h3 className="text-xl font-display font-bold text-white mb-6">Follow Me</h3>
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
                      className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/10 transition-all duration-300"
                    >
                      {IconComponent && <IconComponent className="w-6 h-6" />}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
