import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Facebook, Twitter, Linkedin, Instagram, Youtube, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { facilityCourses, constructionCourses } from './Courses';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [courseName, setCourseName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseParam = params.get('course');
    if (courseParam) {
      setCourseName(courseParam);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    
    if (!name || !email || !phone || !message) {
      return;
    }

    setIsSubmitting(true);
    
    const formattedMessage = `New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${courseName || 'General Inquiry'}

Message:
${message}`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/971502459498?text=${encodedMessage}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(whatsappUrl, '_blank');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        // Optional: reset form here if needed, but the user might want to keep it or we can just let it be.
      }, 5000);
    }, 800);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      {/* Page Header */}
      <section className="bg-[#131d3b] text-white py-24 relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
        ></motion.div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl font-black mb-6 tracking-tight font-heading">Contact Us</motion.h1>
          <motion.p variants={fadeIn} className="text-xl text-gray-300 max-w-2xl mx-auto font-light">Get in touch with our team to learn more about our courses and how we can help you achieve your career goals.</motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeIn} className="text-sm font-black uppercase text-[#ff4f01] tracking-widest mb-2 font-sans">Get In Touch</motion.h2>
              <motion.h3 variants={fadeIn} className="text-4xl font-black uppercase text-[#131d3b] mb-8 font-heading">We're Here to Help You Succeed</motion.h3>
              <motion.p variants={fadeIn} className="text-gray-600 mb-12 leading-relaxed text-lg">
                Whether you have questions about our programs, need help choosing the right certification, or want to inquire about corporate training, our team is ready to assist you.
              </motion.p>
              
              <div className="space-y-8">
                <motion.div variants={fadeIn} className="flex items-start group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center text-[#ff4f01] group-hover:bg-[#ff4f01] group-hover:text-white transition-all duration-300 shrink-0 mr-6 group-hover:scale-110 group-hover:rotate-3">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-[#131d3b] mb-2 font-heading">Our Location</h4>
                    <p className="text-gray-600 leading-relaxed">303, Sarah Building, 43 2nd Street<br/>Near GGICO Metro Station<br/>Al Garhoud, Dubai, UAE</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="flex items-start group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center text-[#ff4f01] group-hover:bg-[#ff4f01] group-hover:text-white transition-all duration-300 shrink-0 mr-6 group-hover:scale-110 group-hover:-rotate-3">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-[#131d3b] mb-2 font-heading">Phone Number</h4>
                    <p className="text-gray-600 leading-relaxed flex flex-col space-y-1">
                      <a href="tel:+97143547997" className="hover:text-[#ff4f01] transition-colors cursor-pointer">+971 4 354 7997</a>
                      <a href="tel:+971502459498" className="hover:text-[#ff4f01] transition-colors cursor-pointer">+971 50 245 9498</a>
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="flex items-start group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center text-[#ff4f01] group-hover:bg-[#ff4f01] group-hover:text-white transition-all duration-300 shrink-0 mr-6 group-hover:scale-110 group-hover:rotate-3">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-[#131d3b] mb-2 font-heading">Email Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      <a href="mailto:info@chicagomti.com" className="hover:text-[#ff4f01] transition-colors cursor-pointer">info@chicagomti.com</a>
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="flex items-start group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center text-[#ff4f01] group-hover:bg-[#ff4f01] group-hover:text-white transition-all duration-300 shrink-0 mr-6 group-hover:scale-110 group-hover:-rotate-3">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-[#131d3b] mb-2 font-heading">Working Hours</h4>
                    <p className="text-gray-600 leading-relaxed">Monday - Saturday: 09:00 AM - 09:00 PM<br/>Sunday: Closed</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-start group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center text-[#ff4f01] group-hover:bg-[#ff4f01] group-hover:text-white transition-all duration-300 shrink-0 mr-6 group-hover:scale-110 group-hover:rotate-3">
                    <Share2 size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-[#131d3b] mb-2 font-heading">Follow Us</h4>
                    <div className="flex space-x-3 mt-2">
                      <a href="https://facebook.com/chicagomti" target="_blank" rel="noopener noreferrer" title="Follow us on Facebook" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#131d3b] hover:bg-[#ff4f01] hover:text-white hover:border-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Facebook size={18} /></a>
                      <a href="https://twitter.com/chicagomti" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#131d3b] hover:bg-[#ff4f01] hover:text-white hover:border-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Twitter size={18} /></a>
                      <a href="https://linkedin.com/company/chicagomti" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#131d3b] hover:bg-[#ff4f01] hover:text-white hover:border-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Linkedin size={18} /></a>
                      <a href="https://instagram.com/chicagomti" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#131d3b] hover:bg-[#ff4f01] hover:text-white hover:border-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Instagram size={18} /></a>
                      <a href="https://youtube.com/@chicagomti" target="_blank" rel="noopener noreferrer" title="Subscribe to our YouTube Channel" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#131d3b] hover:bg-[#ff4f01] hover:text-white hover:border-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Youtube size={18} /></a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#ff4f01]/5 rounded-bl-full -z-10"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#131d3b]/5 rounded-tr-full -z-10"></div>
              
              <h3 className="text-3xl font-black uppercase text-[#131d3b] mb-8 font-heading">Send Us a Message</h3>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-black uppercase text-[#131d3b] mb-2 font-heading">Message Sent!</h4>
                  <p className="text-gray-600">Your message is being sent to our team via WhatsApp.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#ff4f01] focus:ring-4 focus:ring-[#ff4f01]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#ff4f01] focus:ring-4 focus:ring-[#ff4f01]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#ff4f01] focus:ring-4 focus:ring-[#ff4f01]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="+971 50 000 0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="courseName" className="block text-sm font-bold text-gray-700 mb-2">Course Name</label>
                      <select 
                        id="courseName" 
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#ff4f01] focus:ring-4 focus:ring-[#ff4f01]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                      >
                        <option value="" disabled>Select Course Name</option>
                        <optgroup label="Construction Management Courses">
                          {constructionCourses.map((course, idx) => (
                            <option key={`cm-${idx}`} value={course.title}>{course.title}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Facility Management Courses">
                          {facilityCourses.map((course, idx) => (
                            <option key={`fm-${idx}`} value={course.title}>{course.title}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#ff4f01] focus:ring-4 focus:ring-[#ff4f01]/10 outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden bg-[#ff4f01] hover:bg-[#e04500] text-white px-8 py-5 rounded-xl font-bold uppercase tracking-widest transition-all hover:shadow-lg flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? 'Sending...' : 'Send Message'} 
                      {!isSubmitting && <Send className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />}
                    </span>
                    {!isSubmitting && <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full z-0"></div>}
                  </button>
                </form>
              )}
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Map Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-[500px] w-full relative"
      >
        <iframe 
          src="https://maps.google.com/maps?q=303%20Sarah%20Building%20Al%20Garhoud%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
          className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-1000"
        ></iframe>
      </motion.section>
    </motion.div>
  );
}
