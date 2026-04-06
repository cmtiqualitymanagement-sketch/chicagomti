import React, { useState, useEffect, useRef } from 'react';
import { Clock, Calendar, ArrowRight, CheckCircle2, X, Award, BookOpen, Users, GraduationCap, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

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

const CourseCard: React.FC<{ course: any; layout?: 'list' | 'grid' }> = ({ course, layout = 'list' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  return (
    <>
      <motion.div variants={fadeIn} className={`bg-white rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full hover:-translate-y-2 ${layout === 'list' ? 'md:flex-row' : ''} relative`}>
        <div className={`${layout === 'list' ? 'md:w-2/5 md:h-auto' : ''} h-[240px] overflow-hidden relative shrink-0 m-4 rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]`}>
          <div className="absolute inset-0 bg-[#131d3b]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <img 
            src={course.image} 
            alt={`${course.title} - Professional Certification and Training Course`} 
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 bg-[#ff4f01] text-white text-xs font-bold px-4 py-1.5 rounded-full z-20 uppercase tracking-widest shadow-lg font-sans">
            Featured
          </div>
        </div>
        <div className={`px-8 pb-8 pt-2 flex-grow flex flex-col ${layout === 'list' ? 'md:w-3/5 md:pt-8 md:pl-4' : ''}`}>
          <h4 className="text-2xl font-black uppercase text-[#0B3D91] mb-4 group-hover:text-[#ff4f01] transition-colors font-heading">{course.title}</h4>
          <p className="text-[#000000] mb-6 text-base leading-relaxed flex-grow font-sans">
            {course.shortDescription || (typeof course.description === 'string' ? course.description : '')}
          </p>

          <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 pt-6 mb-8 text-sm text-gray-500 font-medium font-sans">
            <div className="flex items-center">
              <Clock size={18} className="text-[#ff4f01] mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="text-[#ff4f01] mr-2" />
              <span>Online / Campus</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-auto font-sans">
            <button 
              onClick={() => setIsExpanded(true)}
              className="relative overflow-hidden text-center bg-transparent border-2 border-[#131d3b] text-[#131d3b] px-4 py-2 rounded-lg font-bold uppercase text-xs tracking-widest transition-all group/btn"
            >
              <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
                View Details
              </span>
              <div className="absolute inset-0 h-full w-0 bg-[#131d3b] transition-all duration-300 ease-out group-hover/btn:w-full z-0"></div>
            </button>
            <Link 
              to={`/contact?course=${encodeURIComponent(course.title)}`} 
              className="relative overflow-hidden text-center bg-[#ff4f01] text-white px-4 py-2 rounded-lg font-bold uppercase text-xs tracking-widest transition-all hover:shadow-[0_0_15px_rgba(255,79,1,0.4)] flex items-center justify-center group/enroll"
            >
              <span className="relative z-10 flex items-center">
                Enroll Now <ArrowRight size={16} className="ml-1.5 group-hover/enroll:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover/enroll:w-full z-0"></div>
            </Link>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsExpanded(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full md:w-[70%] max-h-[90vh] bg-white rounded-[10px] shadow-2xl flex flex-col overflow-hidden z-10"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0 bg-white">
                <h3 className="text-2xl font-black text-[#0B3D91] pr-4 font-heading uppercase">{course.title}</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-[#ff4f01] rounded-full transition-colors shrink-0"
                  aria-label="Close details"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto flex-grow custom-scrollbar bg-[#f9fafc] text-[#222] leading-[1.6] text-left [&_strong]:!text-[#0b3c5d] [&_strong]:!font-semibold [&_p]:!text-[#222] [&_li]:!text-[#222] [&_span]:!text-[#222]">
                {course.description}
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-white shrink-0 flex flex-wrap gap-4 justify-end items-center">
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="px-6 py-2.5 rounded-lg font-bold uppercase text-sm tracking-widest transition-all border-2 border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  Close
                </button>
                <Link 
                  to={`/contact?course=${encodeURIComponent(course.title)}`} 
                  onClick={() => setIsExpanded(false)}
                  className="relative overflow-hidden text-center bg-[#131d3b] text-white px-8 py-3 rounded-lg font-bold uppercase text-sm tracking-widest transition-all hover:shadow-[0_0_15px_rgba(19,29,59,0.4)] flex items-center justify-center group/enroll"
                >
                  <span className="relative z-10 flex items-center">
                    Enroll Now <ArrowRight size={18} className="ml-2 group-hover/enroll:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 h-full w-0 bg-[#ff4f01] transition-all duration-300 ease-out group-hover/enroll:w-full z-0"></div>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export const facilityCourses = [
    {
      title: 'CFM® - Certified Facility Manager',
      shortDescription: 'Globally recognized certification for facility management professionals covering operations, maintenance, leadership, sustainability, and strategic planning.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Certification Body
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              International Facility Management Association (IFMA)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Manage Facility Operations Efficiently",
                  "Implement Strategic Planning and Leadership",
                  "Promote Sustainability and Risk Management",
                  "Enhance Safety and Compliance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility managers, directors, and supervisors",
                  "Operations and maintenance managers",
                  "Sustainability and energy managers",
                  "Project managers",
                  "Facility management professionals"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <GraduationCap size={18} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                {[
                  "Bachelor's Degree + 3 years' experience",
                  "Diploma + 4 years experience",
                  "High School + 7 years experience"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Clock size={18} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Format:</span> Computer-based</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 4 Hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Questions:</span> 120 MCQs</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 3 Years</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: 'Varies',
      image: 'https://image2url.com/r2/default/images/1774942010724-d2b6236e-5c2e-4bf9-915c-17f7afedbb2f.webp'
    },
    {
      title: 'Certificate in Asset Management',
      shortDescription: 'Internationally recognized aligned with ISO 55000 standards designed to build foundational knowledge in asset management principles, risk management, and lifecycle planning.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> About the Program
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              This supports professionals working across infrastructure, utilities, manufacturing, transportation, and government sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              
              <div className="space-y-4">
                <div>
                  <strong className="text-[#131d3b] block text-sm mb-1">Understand Asset Management Principles</strong>
                  <ul className="space-y-1 text-[#000000] text-sm md:text-base">
                    <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Asset management concepts aligned with ISO 55000</span></li>
                    <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Asset management systems and lifecycle approach</span></li>
                    <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Organizational value through asset management</span></li>
                  </ul>
                </div>
                
                <div>
                  <strong className="text-[#131d3b] block text-sm mb-1">Support Asset Strategy Development</strong>
                  <ul className="space-y-1 text-[#000000] text-sm md:text-base">
                    <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Asset management policy and planning</span></li>
                    <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Performance, cost and risk balancing</span></li>
                    <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Strategic decision-making</span></li>
                  </ul>
                </div>

                <div>
                  <strong className="text-[#131d3b] block text-sm mb-1">Risk-Based Asset Management</strong>
                  <ul className="space-y-1 text-[#000000] text-sm md:text-base">
                    <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Asset-related risk identification</span></li>
                    <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Risk assessment and prioritization</span></li>
                    <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Risk mitigation strategies</span></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="mt-8">
                <strong className="text-[#131d3b] block text-sm mb-1">Asset Information and Decision Making</strong>
                <ul className="space-y-1 text-[#000000] text-sm md:text-base">
                  <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Data-driven asset management</span></li>
                  <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Performance indicators and monitoring</span></li>
                  <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Asset lifecycle decision support</span></li>
                </ul>
              </div>

              <div>
                <strong className="text-[#131d3b] block text-sm mb-1">Governance and Organizational Alignment</strong>
                <ul className="space-y-1 text-[#000000] text-sm md:text-base">
                  <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Leadership and accountability</span></li>
                  <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Stakeholder communication</span></li>
                  <li className="flex items-start"><CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} /><span>Organizational culture and governance</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                {[
                  "Maintenance Engineers",
                  "Reliability Engineers",
                  "Facility Managers",
                  "Project Managers",
                  "Risk & Finance Professionals",
                  "Asset Management Professionals"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Curriculum Overview
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                {[
                  "M1 – Principles of Asset Management",
                  "M2 – Asset Management Policy & Strategy",
                  "M3 – Asset Life Cycle Management",
                  "M4 – Asset Risk Management",
                  "M5 – Finance and Business Impact"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <GraduationCap size={18} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                {[
                  "No prior experience required",
                  "Entry-level certification",
                  "Suitable for beginners in asset management"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Clock size={18} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Format:</span> Multiple Choice</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Questions:</span> 60</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 2 Hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Exam Fee:</span> $325</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Delivery:</span> Online / Test Center</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: 'Varies',
      image: 'https://image2url.com/r2/default/images/1774942885365-5ad900ae-8712-45c4-bc2a-c4332fb9ac33.jpg'
    },
    {
      title: 'BCXP® – Building Commissioning Professional',
      shortDescription: 'Professional certification validating expertise in building commissioning, energy efficiency, and system performance optimization for new and existing buildings.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base mb-2">
              The Building Commissioning Professional (BCxP) certification validates expertise in ensuring building systems are designed, installed, tested, and operated according to operational requirements and industry standards.
            </p>
            <p className="text-[#000000] text-sm md:text-base">
              This certification is offered by ASHRAE (American Society of Heating, Refrigerating, and Air-Conditioning Engineers) and focuses on optimizing building performance, improving energy efficiency, and ensuring occupant comfort and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand building system interactions",
                  "Identify system deficiencies",
                  "Prepare commissioning documentation",
                  "Develop commissioning reports",
                  "Apply energy efficiency principles",
                  "Ensure sustainability compliance",
                  "Apply quality control practices",
                  "Risk identification and mitigation",
                  "Commissioning vs. re-commissioning knowledge",
                  "Improve building operational performance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div>
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <GraduationCap size={18} className="mr-2 text-[#131d3b]" /> Eligibility Requirements
                </strong>
                <div className="space-y-4">
                  <div>
                    <strong className="text-[#131d3b] block text-sm mb-1">Education & Experience</strong>
                    <ul className="space-y-1 text-[#000000] text-sm">
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Licensed Architect / Professional Engineer — 3 Years Experience</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Bachelor's Degree — 5 Years Experience</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Diploma / Technical Degree — 8 Years Experience</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>High School — 10 Years Experience</span></li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-[#131d3b] block text-sm mb-1">Commissioning Projects</strong>
                    <ul className="space-y-1 text-[#000000] text-sm">
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Minimum 3 commissioning projects required</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Must include commissioning activities</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Includes documentation and testing</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Exam Contents
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                {[
                  "Managing Commissioning Projects",
                  "Preparing Commissioning Documentation",
                  "Conducting Commissioning Activities",
                  "Training Activities",
                  "Warranty Phase Activities",
                  "Existing Building Commissioning",
                  "Ongoing Commissioning"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Clock size={18} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Format:</span> Multiple Choice</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 2.5 Hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Questions:</span> 130 Questions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Passing Score:</span> 83/120</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Type:</span> Closed Book Exam</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Award size={18} className="mr-2 text-[#ff4f01]" /> Recertification
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 3 Years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Requirement:</span> 50 Professional Development Hours</li>
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Training Information
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 32 Hours Training</li>
                <li className="flex flex-col mt-2"><span className="font-bold text-[#131d3b]">Training Mode:</span>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>Online Training</li>
                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>Classroom Training</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '32 Hours',
      image: 'https://image2url.com/r2/default/images/1775124010604-e8758fde-54b8-4ac4-b6c9-8a6c5453e2a6.png'
    },
    {
      title: 'Business & Finance Management Skills for Facility Managers',
      shortDescription: 'Develop financial, budgeting, procurement, and contract management skills to improve facility management performance and cost optimization.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Program Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base mb-2">
              This program equips facility managers with financial, business, and operational management skills required to optimize budgets, implement cost-containment strategies, manage chargebacks, and make data-driven decisions.
            </p>
            <p className="text-[#000000] text-sm md:text-base">
              The course integrates accounting, budgeting, procurement, contracts, and reporting to strengthen strategic and operational performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand financial principles and accounting",
                  "Prepare and manage budgets effectively",
                  "Apply cost containment strategies",
                  "Develop business cases and reports",
                  "Manage procurement and vendor relationships",
                  "Analyze financial and operational risks"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div>
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                  {[
                    "Facility Managers and Supervisors",
                    "Operations and Asset Managers",
                    "Procurement Professionals",
                    "Maintenance and Engineering Managers",
                    "Finance and Vendor Management Professionals"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Clock size={18} className="mr-2 text-[#ff4f01]" /> Program Duration
                </strong>
                <ul className="space-y-1 text-[#000000] text-sm md:text-base">
                  <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div><span>3–5 Days</span></li>
                  <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div><span>Instructor-led / Virtual / Blended Learning</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <div className="space-y-4">
                <div>
                  <strong className="text-[#131d3b] block text-sm mb-1">Module 1: Finance & Business in FM</strong>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Financial terminology</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Accounting principles</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Management accounting</span></li>
                  </ul>
                </div>
                <div>
                  <strong className="text-[#131d3b] block text-sm mb-1">Module 2: Financial Management</strong>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Budget preparation</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Financial statements</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Capital vs operational expenses</span></li>
                  </ul>
                </div>
                <div>
                  <strong className="text-[#131d3b] block text-sm mb-1">Module 3: Cost Containment & Chargebacks</strong>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Cost classification</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Cost containment strategies</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Chargeback systems</span></li>
                  </ul>
                </div>
                <div>
                  <strong className="text-[#131d3b] block text-sm mb-1">Module 4: Business Case Development</strong>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Financial decision-making</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Cost benefit analysis</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Risk mitigation</span></li>
                  </ul>
                </div>
                <div>
                  <strong className="text-[#131d3b] block text-sm mb-1">Module 5: Procurement Management</strong>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Procurement processes</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Outsourcing strategies</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Vendor management</span></li>
                  </ul>
                </div>
                <div>
                  <strong className="text-[#131d3b] block text-sm mb-1">Module 6: Contract Management</strong>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Contract development</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Contract administration</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Risk and dispute management</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#ff4f01]" /> Learning Outcomes
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Manage budgets and financial reports",
                    "Implement cost containment strategies",
                    "Prepare business cases",
                    "Manage vendors and contracts",
                    "Reduce financial risks"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <GraduationCap size={18} className="mr-2 text-[#ff4f01]" /> Assessment & Certification
                </strong>
                <div className="space-y-4">
                  <div>
                    <strong className="text-[#131d3b] block text-sm mb-1">Assessment Methods</strong>
                    <ul className="space-y-1 text-[#000000] text-sm">
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Case studies</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Group projects</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Business case exercises</span></li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-[#131d3b] block text-sm mb-1">Certification Awarded</strong>
                    <p className="text-[#000000] text-sm">Certificate in Business & Finance Management for Facility Managers</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <BookOpen size={18} className="mr-2 text-[#131d3b]" /> Training Methodology
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Instructor-led sessions",
                    "Case studies",
                    "Hands-on budgeting exercises",
                    "Workshops and group discussions",
                    "Real-world facility management examples"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '3–5 Days',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800' // Finance/Business meeting
    },
    {
      title: 'CSP® - Certified Sustainability Professional',
      shortDescription: 'Equip yourself with knowledge, tools, and practical skills to integrate sustainability principles into organizational strategy, operations, and projects.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base mb-2">
              The Certified Sustainability Professional (CSP) program is designed to equip professionals with the knowledge, tools, and practical skills required to integrate sustainability principles into organizational strategy, operations, and projects.
            </p>
            <p className="text-[#000000] text-sm md:text-base">
              The certification focuses on environmental stewardship, social responsibility, economic sustainability, regulatory compliance, and ESG performance, enabling participants to support long-term organizational value and responsible growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand sustainability principles and global frameworks",
                  "Integrate sustainability into organizational strategy",
                  "Apply environmental, social, and economic sustainability practices",
                  "Implement ESG initiatives",
                  "Measure and report sustainability performance",
                  "Ensure compliance with sustainability regulations"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div>
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                  {[
                    "Sustainability Managers and Officers",
                    "Facility and Asset Managers",
                    "Project and Operations Managers",
                    "HSE and Quality Professionals",
                    "Engineers and Architects",
                    "Supply Chain Professionals",
                    "Corporate Leaders and Decision-Makers"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <GraduationCap size={18} className="mr-2 text-[#ff4f01]" /> Eligibility
                </strong>
                <ul className="space-y-1 text-[#000000] text-sm md:text-base">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Bachelor’s degree or equivalent preferred</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Relevant work experience is an advantage</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Professionals with sustainability responsibilities</span></li>
                </ul>
              </div>

              <div>
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Clock size={18} className="mr-2 text-[#ff4f01]" /> Duration
                </strong>
                <ul className="space-y-1 text-[#000000] text-sm md:text-base">
                  <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div><span>5 Days (Instructor-led / Virtual / Blended)</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Fundamentals of Sustainability",
                  "Sustainability Frameworks & Standards",
                  "Environmental Sustainability",
                  "Social Sustainability",
                  "Economic & Business Sustainability",
                  "ESG, Governance & Compliance",
                  "Sustainability Measurement & Reporting",
                  "Sustainability in Projects & Operations",
                  "Technology & Innovation for Sustainability",
                  "Implementation & Action Planning"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#ff4f01]" /> Learning Outcomes
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Apply sustainability principles",
                    "Support ESG initiatives",
                    "Improve environmental performance",
                    "Align sustainability with business goals",
                    "Enhance organizational resilience"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <GraduationCap size={18} className="mr-2 text-[#ff4f01]" /> Assessment & Certification
                </strong>
                <div className="space-y-4">
                  <div>
                    <strong className="text-[#131d3b] block text-sm mb-1">Assessment Includes:</strong>
                    <ul className="space-y-1 text-[#000000] text-sm">
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Multiple Choice Exam</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Case Study</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Sustainability Project</span></li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-[#131d3b] block text-sm mb-1">Certification:</strong>
                    <p className="text-[#000000] text-sm">Certified Sustainability Professional (CSP)</p>
                  </div>
                  <div>
                    <strong className="text-[#131d3b] block text-sm mb-1">Recertification:</strong>
                    <p className="text-[#000000] text-sm">Validity: 3 Years</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <BookOpen size={18} className="mr-2 text-[#131d3b]" /> Training Methodology
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Instructor-led sessions",
                    "Case studies",
                    "Group discussions",
                    "Workshops",
                    "Practical tools and frameworks"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '5 Days',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=800' // Sustainability related image
    },
    {
      title: 'HFDP® - Healthcare Facility Design Professional',
      shortDescription: 'Recognizes professionals who demonstrate specialized knowledge in the planning, design, construction, and operation of healthcare facilities.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base mb-2">
              The Healthcare Facility Design Professional (HFDP) credential recognizes professionals who demonstrate specialized knowledge in the planning, design, construction, and operation of healthcare facilities. The certification focuses on creating safe, efficient, compliant, and patient-centered healthcare environments aligned with regulatory, clinical, and operational requirements.
            </p>
            <p className="text-[#000000] text-sm md:text-base">
              The Healthcare Facility Design Professional (HFDP) credential is offered by the American Society for Health Care Engineering (ASHE), a professional membership group of the American Hospital Association (AHA).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand healthcare facility planning and design principles",
                  "Apply patient safety and infection control strategies",
                  "Interpret healthcare codes and regulatory requirements",
                  "Integrate clinical workflows into facility design",
                  "Support sustainable healthcare environments",
                  "Collaborate with clinical and design stakeholders"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div>
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                  {[
                    "Healthcare Facility Managers",
                    "Architects and Engineers",
                    "Healthcare Project Managers",
                    "Clinical Engineering Professionals",
                    "Facility Directors",
                    "Construction Professionals in Healthcare"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <GraduationCap size={18} className="mr-2 text-[#ff4f01]" /> Eligibility
                </strong>
                <ul className="space-y-1 text-[#000000] text-sm md:text-base">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Experience in healthcare facility design or operations</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Background in engineering, architecture, facilities, or construction</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Exposure to healthcare facility environments</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Exam Content Areas
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Healthcare Environment of Care",
                  "Facility Planning and Design",
                  "Construction and Renovation in Healthcare",
                  "Codes and Regulatory Compliance",
                  "Patient Safety and Infection Prevention",
                  "Facility Operations and Maintenance"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Exam Information
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Exam Format:</span> Multiple Choice</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 3 Hours</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Questions:</span> 115-140 Questions</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Delivery:</span> Testing Center / Online Proctored</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Language:</span> English</li>
                </ul>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Recertification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Certification Validity:</span> 3 Years</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Continuing Education:</span> Credits Required</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Active Engagement:</span> Professional Engagement Required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: 'Self-Paced / Exam Prep',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' // Hospital/Healthcare facility
    },
    {
      title: 'HPBDP® - High Performance Building Design Professional',
      shortDescription: 'Recognizes expertise in designing high-performance buildings focused on energy efficiency, sustainability, occupant comfort, and integrated design.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              The High-Performance Building Design Professional (HPBDP) certification recognizes expertise in designing high-performance buildings focused on energy efficiency, sustainability, occupant comfort, and integrated design. This certification demonstrates the ability to apply advanced building science principles to real-world projects and improve overall building performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand high-performance building concepts",
                  "Apply integrated design strategies",
                  "Optimize energy efficiency and building systems",
                  "Improve indoor environmental quality (IEQ)",
                  "Reduce environmental impact and lifecycle costs",
                  "Interpret codes, standards, and best practices",
                  "Evaluate building performance metrics"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Architects",
                  "MEP Engineers",
                  "Energy Modelers",
                  "Sustainability Consultants",
                  "Facility Managers",
                  "Project Managers",
                  "Green Building Professionals",
                  "Construction Professionals"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Exam Content Areas
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "High-Performance Building Fundamentals",
                  "Integrated Design Process",
                  "Energy Efficiency Strategies",
                  "HVAC Systems and Controls",
                  "Building Envelope Design",
                  "Lighting and Daylighting",
                  "Indoor Environmental Quality",
                  "Renewable Energy Systems",
                  "Water Efficiency",
                  "Codes and Standards",
                  "Commissioning and Performance Verification"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Exam Information
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Computer-based exam",
                    "Multiple-choice questions",
                    "Closed book",
                    "Testing at authorized centers",
                    "Passing score based on psychometric analysis",
                    "Eligibility based on education and experience"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Recertification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Recertification required periodically",
                    "Professional Development Hours (PDHs) required",
                    "Continuing education credits accepted",
                    "Participation in conferences or seminars",
                    "Teaching or publishing technical papers"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: 'Self-Paced / Exam Prep',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800' // High performance building / office
    },
    {
      title: 'Certificate in Essentials for Facility Managers',
      shortDescription: 'Equips professionals with core leadership, operational, financial, and strategic competencies required to manage facilities effectively.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              The Certificate in Essentials for Facility Managers is designed to equip professionals with the core leadership, operational, financial, and strategic competencies required to manage facilities effectively. The program focuses on improving performance, productivity, compliance, and sustainability while aligning facility operations with organizational objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Demonstrate leadership and stakeholder management skills",
                  "Manage facility operations and maintenance effectively",
                  "Apply financial management and life cycle costing techniques",
                  "Implement sustainability and energy management practices",
                  "Utilize technology and data for facility performance",
                  "Identify and mitigate operational risks",
                  "Ensure regulatory and compliance requirements"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Assistant Facility Managers",
                  "Property Managers",
                  "Operations Supervisors",
                  "Engineers and Technical Supervisors",
                  "Professionals entering facility management"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Leadership and Communication", items: ["Team Management", "Stakeholder Communication", "Conflict Resolution"] },
                  { title: "Module 2: Strategic Planning and Decision-Making", items: ["Facility Operations Management", "Resource Allocation", "Business Continuity Planning"] },
                  { title: "Module 3: Financial Management", items: ["Budgeting and Cost Control", "Life Cycle Cost Analysis", "Contract Management"] },
                  { title: "Module 4: Operations and Maintenance", items: ["Preventive Maintenance", "Energy Management", "Safety Compliance"] },
                  { title: "Module 5: Sustainability and Environmental Management", items: ["Green Building Standards", "Waste Management", "Sustainable Practices"] },
                  { title: "Module 6: Technology and Data Management", items: ["Facility Management Software", "Building Automation Systems", "Data Analysis"] },
                  { title: "Module 7: Risk and Crisis Management", items: ["Emergency Preparedness", "Risk Assessment", "Insurance and Liability"] },
                  { title: "Module 8: Compliance and Legal Knowledge", items: ["Lease Agreements", "Occupational Safety", "Accessibility Requirements"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Information
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Delivery Mode:</span> Classroom / Virtual / Corporate</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 3–5 Days</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Methodology:</span> Instructor-led, Case Studies, Practical Exercises</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Certification:</span> Certificate of Completion</li>
                </ul>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Assessment
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Knowledge-based quizzes",
                    "Case studies",
                    "Practical assignments",
                    "Participation evaluation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '3-5 Days',
      image: 'https://image2url.com/r2/default/images/1775026063961-a3f361d9-b810-4ac7-8061-f15f4328ca41.jfif' // Corporate meeting/training
    },
    {
      title: 'Building Standards, Codes and Regulations Training',
      shortDescription: 'Equips professionals with the knowledge to comply with national and international building standards, codes, and regulations.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Program Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              This program equips construction professionals, facility managers, and project managers with the knowledge to comply with national and international building standards, codes, and regulations. Participants learn to interpret codes, apply regulations in design and construction, and ensure legal and safety compliance for projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand building standards and codes",
                  "Interpret national and international regulations",
                  "Apply structural, safety, and environmental codes",
                  "Ensure compliance in design and construction",
                  "Integrate sustainability and accessibility standards",
                  "Mitigate non-compliance risks",
                  "Maintain audit and inspection documentation"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Architects",
                  "Civil Engineers",
                  "Construction Managers",
                  "Facility Managers",
                  "Project Managers",
                  "Safety and Compliance Officers",
                  "Urban Planners",
                  "Building Consultants"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Introduction to Building Standards", items: ["Overview of codes and regulations", "National vs international standards", "Importance of compliance"] },
                  { title: "Module 2: Structural and Safety Codes", items: ["Structural integrity requirements", "Fire safety systems", "Safety audits"] },
                  { title: "Module 3: Electrical, Mechanical and Plumbing Codes", items: ["Electrical compliance", "HVAC standards", "Plumbing regulations"] },
                  { title: "Module 4: Accessibility Standards", items: ["Accessibility compliance", "Universal design", "Compliance audits"] },
                  { title: "Module 5: Environmental Regulations", items: ["Energy efficiency codes", "Environmental impact assessment", "Green building certifications"] },
                  { title: "Module 6: Legal Framework and Documentation", items: ["Permits and approvals", "Contract compliance", "Audit documentation"] },
                  { title: "Module 7: Risk Management and Compliance", items: ["Regulatory risk identification", "Non-compliance prevention", "Monitoring and reporting"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Information
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 2–3 Days</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Delivery Mode:</span> Instructor-led / Virtual / Blended</li>
                </ul>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Learning Outcomes
                </strong>
                <p className="text-[#000000] text-sm mb-2 font-medium">Participants will:</p>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Apply building codes effectively",
                    "Ensure regulatory compliance",
                    "Interpret codes for project decisions",
                    "Prepare audit documentation",
                    "Reduce legal and compliance risks"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '2-3 Days',
      image: 'https://image2url.com/r2/default/images/1775023201269-34a8d19d-8ca0-48f5-89f3-9286b52ebced.jpg' // Architecture/Blueprint
    },
    {
      title: 'CHFM® - Certified Healthcare Facility Manager',
      shortDescription: 'Validates expertise in operations, safety, compliance, and facility management within healthcare environments.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base mb-4">
              The Certified Healthcare Facility Manager (CHFM) certification is a globally recognized credential designed for professionals responsible for managing healthcare facilities. It validates expertise in operations, safety, compliance, and facility management within healthcare environments.
            </p>
            <p className="text-[#000000] text-sm md:text-base font-medium mb-2">This certification demonstrates the ability to:</p>
            <ul className="space-y-1 text-[#000000] text-sm md:text-base">
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>Ensure safe and efficient healthcare environments</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>Manage facility systems and infrastructure</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>Align facility operations with healthcare regulations</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>Support patient care delivery through facility performance</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Apply facility management principles in healthcare settings",
                  "Ensure compliance with healthcare codes and regulations",
                  "Manage risk, safety, and emergency preparedness",
                  "Oversee maintenance and operations",
                  "Support healthcare service delivery",
                  "Lead strategic planning and resource management"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Healthcare Facility Managers",
                  "Facility Engineers",
                  "Hospital Operations Managers",
                  "Safety and Compliance Officers",
                  "Healthcare Project Managers",
                  "Biomedical / Clinical Engineers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Exam Content Areas
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Compliance", items: ["Codes and standards", "Regulatory requirements", "Accreditation requirements"] },
                  { title: "Planning, Design & Construction", items: ["Facility planning", "Construction project management", "Infection control"] },
                  { title: "Maintenance & Operations", items: ["Preventive maintenance", "Utilities management", "Asset management"] },
                  { title: "Finance", items: ["Budgeting", "Capital planning", "Financial decision-making"] },
                  { title: "Administration", items: ["Leadership and communication", "Policy development", "HR and training"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Exam Information
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Format:</span> Computer-Based Exam</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Questions:</span> ~110 Multiple Choice</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 2 Hours</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Scoring:</span> Pass / Fail</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Eligibility:</span> Education + Experience Required</li>
                </ul>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Information
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 40 Hours</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Mode:</span> Online / Classroom</li>
                  <li className="flex items-start mt-2"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Instructor-led training</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Practice exams</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Study materials</span></li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Recertification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 3 Years</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">45 CEUs Required</span></li>
                  <li className="flex items-start mt-2"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Professional engagement required</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Continuing education programs</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '40 Hours',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800' // Healthcare facility
    },
    {
      title: 'ISO 41001:2018 – Internal & Lead Auditor Training',
      shortDescription: 'Provides knowledge and practical skills to plan, conduct, report, and follow up audits of a Facility Management System (FMS).',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base mb-4">
              The ISO 41001:2018 Auditor Training course provides knowledge and practical skills to plan, conduct, report, and follow up audits of a Facility Management System (FMS). The course is based on ISO 41001 Facility Management System requirements and ISO 19011 auditing guidelines.
            </p>
            <p className="text-[#000000] text-sm md:text-base">
              This training focuses on auditing principles, techniques, and compliance evaluation to ensure effective Facility Management system implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base mb-4">
                {[
                  "Understand ISO 41001 requirements",
                  "Interpret ISO clauses in audit context",
                  "Plan and conduct internal audits",
                  "Identify non-conformities and risks",
                  "Prepare audit reports",
                  "Implement corrective actions",
                  "Apply risk-based auditing",
                  "Lead audit teams"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will also gain capability to perform:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "First-party audits",
                  "Second-party audits",
                  "Third-party audits"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Facility Engineers",
                  "Quality Professionals",
                  "Compliance Officers",
                  "Internal Auditors",
                  "ISO Consultants",
                  "Individuals seeking Lead Auditor certification"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Contents
              </strong>
              <ul className="space-y-4 text-[#000000] text-sm md:text-base">
                <li className="flex flex-col">
                  <span className="font-bold text-[#131d3b] flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                    Internal Auditor (2 Days)
                  </span>
                  <ul className="ml-5 mt-2 space-y-1 text-sm text-gray-700">
                    {[
                      "Introduction to ISO 41001",
                      "Facility Management System overview",
                      "Audit principles and types",
                      "Audit planning and checklists",
                      "Conducting internal audits",
                      "Reporting findings",
                      "Corrective actions and follow-up",
                      "Internal auditor examination"
                    ].map((item, j) => (
                      <li key={j} className="flex items-center">
                        <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-[#131d3b] flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                    Lead Auditor (5 Days)
                  </span>
                  <ul className="ml-5 mt-2 space-y-1 text-sm text-gray-700">
                    {[
                      "ISO 41001 clause interpretation",
                      "ISO 19011 auditing principles",
                      "Audit lifecycle management",
                      "Risk-based auditing",
                      "Managing audit teams",
                      "Communication and conflict handling",
                      "Audit documentation",
                      "Mock audits and case studies"
                    ].map((item, j) => (
                      <li key={j} className="flex items-center">
                        <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Exam Information
                </strong>
                <div className="space-y-4">
                  <div>
                    <span className="font-bold text-[#131d3b] text-sm">Internal Auditor</span>
                    <ul className="mt-1 space-y-1 text-[#000000] text-sm">
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Short test / assessment</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Certificate issued upon completion</span></li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-[#131d3b] text-sm">Lead Auditor</span>
                    <ul className="mt-1 space-y-1 text-[#000000] text-sm">
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Written exam (1.5–2 hours)</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Continuous assessment</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Practical audit evaluation</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Duration
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Internal Auditor:</span> 2 Days</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Lead Auditor:</span> 5 Days (40 Hours + Exam)</li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Recertification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Certification validity:</span> 3 years</li>
                  <li className="flex items-start mt-2"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Maintain audit experience</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>CPD hours required</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Participation in audits</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '2-5 Days',
      image: 'https://image2url.com/r2/default/images/1775108384919-bccba40b-ad73-4ee8-aef2-65e982cca67b.webp' // Audit/Consulting
    },
    {
      title: 'FM Technology Training Programs',
      shortDescription: 'Focuses on the use of digital tools and smart systems to manage facilities efficiently, covering CAFM, IWMS, BAS, and EMS.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              FM technology training programs focus on the use of digital tools and smart systems to manage facilities efficiently. These programs cover technologies such as CAFM, IWMS, BAS, EMS, and smart building technologies. The training helps professionals transition from traditional facility management to technology-driven smart facility management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand FM software platforms (CAFM, IWMS, CMMS)",
                  "Use digital tools for asset and maintenance management",
                  "Analyze data for decision-making",
                  "Implement building automation systems",
                  "Optimize energy and operational efficiency",
                  "Integrate FM systems with business processes",
                  "Select appropriate FM technology solutions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Facility Engineers",
                  "Maintenance Managers",
                  "CAFM / IWMS Users",
                  "Smart Building Professionals",
                  "IT & Digital Transformation Teams",
                  "Project Managers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Core Technology Modules", items: ["Introduction to FM Technology", "Digital Transformation in Facility Management", "Smart Buildings and IoT"] },
                  { title: "CAFM / IWMS Systems", items: ["Space Management", "Asset Lifecycle Management", "Work Order Management", "Preventive Maintenance Planning", "KPI Dashboards and Reporting"] },
                  { title: "Building Systems Technology", items: ["Building Automation Systems (BAS)", "Energy Management Systems (EMS)", "HVAC Control Systems", "Building Services Integration"] },
                  { title: "Data & Analytics", items: ["FM Dashboards", "Data-driven Decision Making", "KPI Monitoring", "SLA Performance Tracking"] },
                  { title: "Implementation & Integration", items: ["Selecting FM Software", "System Implementation Strategy", "ERP / BIM Integration", "Change Management"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Information
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Short Courses:</span> 2–5 Days</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Programs:</span> 1–2 Weeks</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Example:</span> CAFM Training (5 Days)</li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Methodology
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Instructor-led sessions",
                    "Hands-on software training",
                    "Case studies and simulations",
                    "Vendor demonstrations",
                    "Real-life facility scenarios"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Assessment
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Module-based quizzes",
                    "Practical exercises",
                    "Case studies",
                    "Final evaluation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Recertification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 2–3 Years (varies)</li>
                  <li className="flex items-start mt-2"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Continuous Professional Development</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Technology update training</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: 'Varies (2 Days - 2 Weeks)',
      image: 'https://image2url.com/r2/default/images/1775109060572-88202472-3baa-4c78-bd3a-9792f77ee388.jpg' // Data / Dashboard / Tech
    },
    {
      title: 'FM Emergency & Business Continuity Master Class',
      shortDescription: 'Equips facility management professionals with the knowledge and skills required to prepare for, respond to, and recover from emergencies and disruptions.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              The FM Emergency & Business Continuity Master Class is designed to equip facility management professionals with the knowledge and skills required to prepare for, respond to, and recover from emergencies and disruptions. The course focuses on business continuity planning, emergency preparedness, risk mitigation, and operational resilience in facility management environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Develop emergency response plans",
                  "Implement business continuity strategies",
                  "Conduct risk and impact assessments",
                  "Manage crisis situations effectively",
                  "Ensure operational resilience",
                  "Coordinate emergency response teams",
                  "Improve disaster recovery planning"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Operations Managers",
                  "Risk Managers",
                  "Safety Professionals",
                  "Business Continuity Professionals",
                  "Maintenance Managers",
                  "Security Managers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Emergency Management Fundamentals", items: ["Types of facility emergencies", "Risk identification", "Emergency planning framework"] },
                  { title: "Module 2: Business Continuity Planning", items: ["Business impact analysis", "Continuity strategies", "Recovery planning"] },
                  { title: "Module 3: Risk Assessment & Mitigation", items: ["Risk identification", "Risk evaluation", "Mitigation planning"] },
                  { title: "Module 4: Crisis Management", items: ["Crisis communication", "Incident command structure", "Emergency response coordination"] },
                  { title: "Module 5: Disaster Recovery Planning", items: ["Recovery strategies", "Infrastructure recovery", "Operational restoration"] },
                  { title: "Module 6: Testing & Implementation", items: ["Emergency drills", "Scenario planning", "Continuous improvement"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Information
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Duration:</span> 3–5 Days</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Delivery Mode:</span> Instructor-led / Virtual / Corporate</li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Methodology
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Instructor-led sessions",
                    "Case studies",
                    "Emergency simulations",
                    "Group exercises",
                    "Practical planning workshops"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '3-5 Days',
      image: 'https://image2url.com/r2/default/images/1775109644450-f081a614-659f-4d03-ac49-e842ecabc175.webp' // Emergency/Planning/Safety
    },
    {
      title: 'FM Operation and Maintenance Master Class',
      shortDescription: 'Focuses on the effective operation, maintenance, and management of facility systems and assets to ensure reliability, safety, and efficiency.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              This training program focuses on the effective operation, maintenance, and management of facility systems and assets to ensure reliability, safety, and efficiency. The course covers daily facility operations, preventive and corrective maintenance, asset lifecycle management, and utilities management to ensure continuous, safe, and cost-effective facility performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand facility operations and maintenance principles",
                  "Plan preventive maintenance programs",
                  "Manage corrective and reactive maintenance",
                  "Optimize building systems' performance",
                  "Improve asset lifecycle management",
                  "Apply safety and compliance requirements",
                  "Use KPIs for performance monitoring"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Maintenance Managers",
                  "Engineers (Mechanical, Electrical, Civil)",
                  "Technicians and FM Staff",
                  "Operations Managers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Introduction to FM Operations", items: ["Role of operations in facility management", "Hard FM vs. soft FM services", "Service delivery models"] },
                  { title: "Module 2: Maintenance Management", items: ["Preventive maintenance", "Corrective maintenance", "Predictive maintenance", "Reactive maintenance", "Maintenance scheduling"] },
                  { title: "Module 3: Asset Management", items: ["Asset lifecycle management", "Asset registers", "Reliability-centered maintenance"] },
                  { title: "Module 4: Building Systems & Utilities", items: ["HVAC systems", "Electrical systems", "Plumbing systems", "Fire protection systems", "Elevators & vertical transport"] },
                  { title: "Module 5: Work Order & Maintenance Systems", items: ["Work order management", "CAFM systems", "Maintenance tracking"] },
                  { title: "Module 6: Health, Safety & Compliance", items: ["Safety procedures", "Risk assessment", "Regulatory compliance", "Permit-to-work systems"] },
                  { title: "Module 7: Performance Measurement", items: ["KPI monitoring", "SLA management", "Benchmarking"] },
                  { title: "Module 8: Cost & Resource Management", items: ["Maintenance budgeting", "Cost control", "Resource planning"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Assessment
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Multiple-choice questions",
                    "Case studies",
                    "Maintenance planning exercises",
                    "Final assessment"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Duration
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Short Course:</span> 2–3 Days</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Program:</span> 3–5 Days</li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Certification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Certificate of Completion</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Technical FM Training Certificate</span></li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Recertification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 2–3 Years (If Applicable)</li>
                  <li className="flex items-start mt-2"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Continuous Professional Development</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '2-5 Days',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' // Engineering/Maintenance
    },
    {
      title: 'FM Building Systems Master Class',
      shortDescription: 'Provides in-depth knowledge of building systems, including MEP, fire safety, automation, and utilities, along with their operation, maintenance, and compliance.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              This program provides in-depth knowledge of building systems, including MEP, fire safety, automation, and utilities, along with their operation, maintenance, and compliance within facility management. The course integrates technical facility management knowledge with international standards and regulations to ensure safe, efficient, and compliant building operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand major building systems and operations",
                  "Operate and maintain MEP systems effectively",
                  "Apply international standards and codes",
                  "Ensure safety and compliance",
                  "Diagnose system faults",
                  "Optimize building performance",
                  "Integrate systems using BMS and EMS platforms"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "MEP Engineers",
                  "Maintenance Supervisors",
                  "Building Operators",
                  "FM Consultants",
                  "Technical FM Staff"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: HVAC Systems", items: ["Chillers, AHU, FCU", "Ventilation & Indoor Air Quality", "HVAC maintenance"] },
                  { title: "Module 2: Electrical Systems", items: ["Power distribution", "Switchgear and transformers", "Emergency power systems"] },
                  { title: "Module 3: Plumbing & Water Systems", items: ["Water supply and drainage", "Pump systems", "Water conservation"] },
                  { title: "Module 4: Fire Protection Systems", items: ["Fire detection", "Sprinkler systems", "Emergency evacuation"] },
                  { title: "Module 5: Vertical Transportation", items: ["Elevators", "Escalators", "Safety inspections"] },
                  { title: "Module 6: Building Automation Systems", items: ["BMS & BAS", "Integrated control systems", "Energy optimization"] },
                  { title: "Module 7: Energy Management Systems", items: ["Energy monitoring", "Sustainability strategies", "Efficiency optimization"] },
                  { title: "Module 8: Maintenance & Asset Management", items: ["Preventive maintenance", "Asset lifecycle management", "CMMS / CAFM systems"] },
                  { title: "Module 9: Health, Safety & Risk", items: ["Risk assessment", "Permit-to-work", "Safety compliance"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Applicable Standards Covered
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "ASHRAE Standards",
                    "NFPA Codes",
                    "ISO 41001",
                    "ISO 50001",
                    "ISO 55000",
                    "IEC Standards",
                    "OSHA Guidelines",
                    "Local Civil Defence Regulations"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Assessment
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Technical MCQs",
                    "Case studies",
                    "Scenario-based troubleshooting",
                    "Practical application questions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Duration
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Standard Course:</span> 3–5 Days</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Program:</span> 5–7 Days</li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Certification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Certificate of Completion</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Technical Building Systems Certification</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '3-7 Days',
      image: 'https://image2url.com/r2/default/images/1775125495461-c717facf-7459-4cea-b425-fb95d7d9515b.webp'
    },
    {
      title: 'Decision-Making Skills for Facility Managers',
      shortDescription: 'Develops the ability of facility managers to make effective, timely, and data-driven decisions in complex facility environments.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              This training program develops the ability of facility managers to make effective, timely, and data-driven decisions in complex facility environments. The course focuses on improving decision-making in operations, maintenance, risk management, budgeting, emergencies, and stakeholder management to enhance overall facility performance and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Apply structured decision-making models",
                  "Analyze operational data for decision-making",
                  "Evaluate risks and alternatives",
                  "Make decisions under pressure",
                  "Balance cost, quality, risk, and time",
                  "Improve problem-solving skills",
                  "Align decisions with organizational strategy"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Assistant Facility Managers",
                  "Maintenance Managers",
                  "Operations Managers",
                  "Engineers and Technical Leads",
                  "FM Project Managers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Fundamentals of Decision Making", items: ["Strategic decisions", "Tactical decisions", "Operational decisions", "Decision challenges"] },
                  { title: "Module 2: Decision-Making Models & Tools", items: ["Rational decision model", "PDCA cycle", "SWOT analysis", "Cost-benefit analysis", "Risk-based decision-making"] },
                  { title: "Module 3: Data-Driven Decision Making", items: ["FM data analysis", "KPI dashboards", "CAFM / CMMS reporting", "Predictive trend analysis"] },
                  { title: "Module 4: Risk-Based Decision Making", items: ["Risk identification", "Impact vs probability", "Mitigation strategies"] },
                  { title: "Module 5: Financial Decision Making", items: ["Budget prioritization", "Lifecycle costing", "CAPEX vs OPEX decisions"] },
                  { title: "Module 6: Operational Decision Making", items: ["Maintenance prioritization", "Resource allocation", "SLA decision-making"] },
                  { title: "Module 7: Emergency & Crisis Decision-Making", items: ["Rapid decision-making", "Incident command basics", "Emergency communication"] },
                  { title: "Module 8: Stakeholder & Leadership Decisions", items: ["Stakeholder conflict resolution", "Customer-focused decisions", "Ethical decision-making"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Assessment
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  {[
                    "Scenario-based MCQs",
                    "Case studies",
                    "Group exercises",
                    "Decision simulations",
                    "Short assessments"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Duration
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Short Course:</span> 2–3 Days</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Program:</span> 3–5 Days</li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Certification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Certificate of Completion</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Professional Decision-Making Certificate</span></li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Recertification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 2–3 Years (If Applicable)</li>
                  <li className="flex items-start mt-2"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>CPD Requirements</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Refresher training</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '2-5 Days',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800' // Business/Decision making
    },
    {
      title: 'Human Comfort & Occupancy Factor Training',
      shortDescription: 'Focuses on the principles of human comfort and space occupancy management within facility management environments.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              This training program focuses on the principles of human comfort and space occupancy management within facility management environments. The course explains how indoor environmental conditions and occupancy levels affect health, productivity, energy consumption, and space utilization efficiency, helping facility managers create comfortable, safe, and efficient workplaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand human comfort factors in buildings",
                  "Apply thermal, visual, acoustic, and air quality standards",
                  "Analyze occupancy levels and utilization",
                  "Improve workplace efficiency",
                  "Balance comfort with energy efficiency",
                  "Optimize occupant experience"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Space Planning Specialists",
                  "Building Operators",
                  "MEP Engineers",
                  "Corporate Real Estate Managers",
                  "HSE Professionals",
                  "FM Consultants"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Introduction to Human Comfort", items: ["Comfort definitions", "Productivity and comfort", "Indoor environmental quality"] },
                  { title: "Module 2: Thermal Comfort", items: ["Temperature control", "Humidity management", "Air velocity", "ASHRAE 55 standards"] },
                  { title: "Module 3: Indoor Air Quality", items: ["Ventilation rates", "CO₂ levels", "Air filtration", "ASHRAE 62.1 standards"] },
                  { title: "Module 4: Visual Comfort", items: ["Lighting levels", "Daylight integration", "Glare control", "EN 12464-1 standards"] },
                  { title: "Module 5: Acoustic Comfort", items: ["Noise control", "Sound insulation", "Acoustic workplace design", "ISO 3382 standards"] },
                  { title: "Module 6: Occupancy Factor & Space Utilization", items: ["Occupancy density", "Space planning", "Workplace efficiency", "NFPA 101 standards"] },
                  { title: "Module 7: Comfort vs Energy Efficiency", items: ["HVAC load optimization", "Smart building systems", "Energy efficiency strategies"] },
                  { title: "Module 8: Space Planning & Optimization", items: ["Occupancy calculations", "Hybrid workspace planning", "Workplace design strategies"] },
                  { title: "Module 9: FM Performance Indicators", items: ["Occupancy rate", "Space utilization", "Comfort index", "Energy per occupant", "User satisfaction"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Training Duration
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Short Course:</span> 2–3 Days</li>
                  <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Program:</span> 3–5 Days</li>
                </ul>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Certification
                </strong>
                <ul className="space-y-2 text-[#000000] text-sm">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Certificate of Completion</span></li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>FM Professional Development Certificate</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '2-5 Days',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'SAM® - Strategic Asset Management Training',
      shortDescription: 'Focuses on managing physical assets in alignment with an organization’s long-term strategic objectives, performance goals, and risk tolerance.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              The Strategic Asset Management Training Program focuses on managing physical assets in alignment with an organization’s long-term strategic objectives, performance goals, and risk tolerance. This course helps facility professionals move from reactive maintenance to strategic, lifecycle-based asset optimization based on international asset management standards and best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand strategic asset management principles",
                  "Align asset decisions with organizational strategy",
                  "Apply lifecycle costing techniques",
                  "Optimize asset performance and risk",
                  "Develop asset management strategies",
                  "Improve asset reliability and sustainability",
                  "Apply risk-based asset prioritization",
                  "Use asset data for decision-making"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Asset Managers",
                  "Maintenance Managers",
                  "Engineers (MEP / Civil / Electrical)",
                  "Corporate Real Estate Professionals",
                  "Project Managers",
                  "Sustainability Managers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Introduction to Strategic Asset Management", items: ["Asset management concepts", "Strategic vs operational management", "Value-based asset management"] },
                  { title: "Module 2: Asset Lifecycle Management", items: ["Planning and acquisition", "Operations and maintenance", "Renewal and disposal", "Lifecycle decision-making"] },
                  { title: "Module 3: Asset Management Framework", items: ["Asset management policy", "Strategic planning", "Asset management plans", "ISO 55000 framework"] },
                  { title: "Module 4: Risk-Based Asset Management", items: ["Risk identification", "Criticality assessment", "Risk mitigation", "Failure mode analysis"] },
                  { title: "Module 5: Life Cycle Costing", items: ["Capital vs operational cost", "Total cost of ownership", "Replacement vs repair decisions"] },
                  { title: "Module 6: Asset Performance Management", items: ["KPI monitoring", "Reliability management", "Predictive maintenance", "Condition monitoring"] },
                  { title: "Module 7: Asset Information Systems", items: ["CAFM / CMMS systems", "Asset registers", "Digital twin concepts", "Data governance"] },
                  { title: "Module 8: Strategic Planning & Decision Making", items: ["Asset investment planning", "CAPEX planning", "Scenario analysis", "Long-term strategies"] },
                  { title: "Module 9: Sustainability & Resilience", items: ["Energy efficiency", "Environmental impact", "Resilient infrastructure", "ESG considerations"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Assessment & Training Duration
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Assessment:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Multiple-choice questions</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Case studies</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Lifecycle costing exercises</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Strategic planning simulations</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Training Duration:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Standard Course:</span> 3–5 Days</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Program:</span> 5 Days</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Certification & Recertification
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Certification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Certificate of Completion</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Strategic Asset Management Certificate</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Recertification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 3 Years (Typical)</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">CPD Requirements:</span> Practical Asset Management Experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '3-5 Days',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'FM Strategic Sourcing Training Program',
      shortDescription: 'Focuses on how facility management organizations plan, manage, and optimize procurement and outsourcing strategies to achieve cost efficiency, service quality, and long-term value.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              The FM Strategic Sourcing Training Program focuses on how facility management organizations plan, manage, and optimize procurement and outsourcing strategies to achieve cost efficiency, service quality, and long-term value. This course transforms FM procurement from transactional purchasing into strategic value-driven sourcing aligned with business objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand strategic sourcing principles in FM",
                  "Develop sourcing strategies aligned with business goals",
                  "Evaluate make-or-buy decisions",
                  "Design outsourcing models",
                  "Improve vendor performance management",
                  "Reduce operational costs",
                  "Apply procurement risk management",
                  "Structure FM contracts effectively"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Procurement & Supply Chain Professionals",
                  "Contract Managers",
                  "Asset Managers",
                  "Corporate Real Estate Managers",
                  "FM Consultants",
                  "Project Managers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Introduction to FM Strategic Sourcing", items: ["Strategic sourcing fundamentals", "Procurement vs sourcing", "FM outsourcing landscape"] },
                  { title: "Module 2: Sourcing Strategy Development", items: ["Business needs analysis", "Category management", "Make-vs.-buy decisions", "Multi-service contracts"] },
                  { title: "Module 3: Supplier Selection & Evaluation", items: ["Prequalification", "Tendering process", "Supplier scoring", "Vendor risk assessment"] },
                  { title: "Module 4: Contracting in FM", items: ["Lump sum contracts", "Cost-plus contracts", "KPI-based contracts", "SLA development", "ISO 41012 guidelines"] },
                  { title: "Module 5: Outsourcing Models", items: ["Single service outsourcing", "Integrated FM (IFM)", "Total FM (TFM)", "Hybrid outsourcing"] },
                  { title: "Module 6: Supplier Relationship Management", items: ["Vendor performance monitoring", "Governance structure", "Contractor communication", "Continuous improvement"] },
                  { title: "Module 7: Cost Management & Value Engineering", items: ["Total cost of ownership", "Cost benchmarking", "Value engineering", "Cost vs quality"] },
                  { title: "Module 8: Risk Management in Sourcing", items: ["Contract risks", "Operational risks", "Vendor dependency", "Business continuity risks"] },
                  { title: "Module 9: Sustainability in FM Sourcing", items: ["Green procurement", "ESG requirements", "Sustainable suppliers", "Energy-efficient services"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Assessment & Training Duration
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Assessment:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Multiple-choice questions</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Case studies</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Contract drafting exercises</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Scenario-based problems</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Group discussions</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Training Duration:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Short Course:</span> 2–3 Days</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Program:</span> 3–5 Days</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Certification & Recertification
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Certification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Certificate of Completion</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>FM Strategic Sourcing Certification</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>CPD Credits (Where Applicable)</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Recertification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 2–3 Years</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">CPD Credits:</span> Practical FM Procurement Experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '2-5 Days',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'ISO 41012:2017 Implementation Training (Facility Management Procurement Guidance)',
      shortDescription: 'Focuses on applying international best practices for strategic procurement and outsourcing in facility management.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              The ISO 41012:2017 Implementation Training focuses on applying international best practices for strategic procurement and outsourcing in facility management. This training helps organizations plan procurement strategies, define service requirements, select sourcing models, and manage FM service providers effectively while aligning procurement with organizational objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand ISO 41012:2017 structure and purpose",
                  "Apply FM procurement principles",
                  "Develop outsourcing strategies",
                  "Define service scope clearly",
                  "Evaluate suppliers effectively",
                  "Align procurement with business strategy",
                  "Improve governance and contract management",
                  "Reduce procurement risks"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Procurement Managers",
                  "Contract Managers",
                  "Asset Managers",
                  "FM Consultants",
                  "Corporate Real Estate Managers",
                  "Project Managers",
                  "Government FM Authorities",
                  "Tendering Professionals"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Introduction to ISO 41012:2017", items: ["Purpose and scope", "ISO 41000 series overview", "Key definitions", "FM procurement guidance"] },
                  { title: "Module 2: FM Procurement Principles", items: ["Value-driven procurement", "Transparency and fairness", "Risk-based sourcing", "Strategy alignment"] },
                  { title: "Module 3: Demand Analysis & Requirement Definition", items: ["Service needs analysis", "Scope definition", "Stakeholder requirements", "Performance expectations"] },
                  { title: "Module 4: Procurement Strategy Development", items: ["Make-vs.-buy decisions", "Single service contracts", "Bundled services", "Total Facility Management", "Integrated Facility Management"] },
                  { title: "Module 5: Supplier Selection & Evaluation", items: ["Prequalification", "Tendering process", "Technical evaluation", "Commercial evaluation", "Supplier risk assessment"] },
                  { title: "Module 6: Contract Types in FM Procurement", items: ["Lump sum contracts", "Cost-plus contracts", "Performance-based contracts", "KPI/SLA-based contracts"] },
                  { title: "Module 7: Governance & Contract Management", items: ["Contract administration", "Performance monitoring", "KPI tracking", "Governance structure"] },
                  { title: "Module 8: Risk Management in Procurement", items: ["Operational risks", "Financial risks", "Vendor dependency", "Business continuity"] },
                  { title: "Module 9: Sustainability in FM Procurement", items: ["Green procurement", "ESG alignment", "Sustainable suppliers", "Energy-efficient services"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Assessment & Training Duration
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Assessment:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Multiple-choice questions</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Case studies</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Procurement strategy exercises</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Contract evaluation</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Group discussions</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Training Duration:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Standard Course:</span> 2–3 Days</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Workshop:</span> 3–5 Days</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Certification & Recertification
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Certification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>ISO 41012 Implementation Certificate</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>FM Procurement Professional Certificate</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>CPD Credits</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Recertification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 2–3 Years</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">CPD Credits:</span> FM Procurement Experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '2-5 Days',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'ISO 41019:2024 Sustainability & Resilience in Facility Management',
      shortDescription: 'Focuses on integrating sustainability, environmental responsibility, and organizational resilience into facility management systems.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              The ISO 41019:2024 Sustainability and Resilience Training focuses on integrating sustainability, environmental responsibility, and organizational resilience into facility management systems. This program helps organizations reduce environmental impact, improve resource efficiency, strengthen resilience against disruptions, and align FM operations with ESG and sustainability goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand ISO 41019:2024 framework",
                  "Integrate sustainability into FM operations",
                  "Improve energy, water, and waste efficiency",
                  "Develop resilience strategies",
                  "Support business continuity planning",
                  "Align FM with ESG goals",
                  "Manage environmental risks",
                  "Improve facility performance during disruptions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Facility Managers",
                  "Sustainability Managers",
                  "HSE Professionals",
                  "Asset Managers",
                  "Risk & Compliance Managers",
                  "Corporate Real Estate Professionals",
                  "FM Consultants",
                  "Business Continuity Professionals"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Introduction to ISO 41019:2024", items: ["Scope and purpose", "ISO 41000 framework", "Sustainability in FM", "Resilience concepts"] },
                  { title: "Module 2: Sustainability Principles in FM", items: ["Environmental impact reduction", "Resource efficiency", "Circular economy", "Green building operations"] },
                  { title: "Module 3: Energy Management", items: ["Energy efficiency strategies", "HVAC optimization", "Renewable energy integration", "Carbon footprint reduction"] },
                  { title: "Module 4: Water & Waste Management", items: ["Water conservation", "Waste management", "Recycling strategies", "Sustainable procurement"] },
                  { title: "Module 5: Resilience in Facility Management", items: ["Risk identification", "Critical asset protection", "Impact analysis", "Recovery planning"] },
                  { title: "Module 6: Business Continuity & Emergency Preparedness", items: ["Business continuity planning", "Disaster recovery", "Emergency response", "Crisis management"] },
                  { title: "Module 7: Climate Change & Risk Adaptation", items: ["Climate risk assessment", "Extreme weather planning", "Infrastructure adaptation", "Long-term resilience"] },
                  { title: "Module 8: ESG & Sustainability Reporting", items: ["ESG integration", "Sustainability KPIs", "Reporting frameworks", "Stakeholder communication"] },
                  { title: "Module 9: Sustainable FM Strategy Development", items: ["Strategic alignment", "Green procurement", "Sustainability policies", "Performance monitoring"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Assessment & Training Details
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Assessment:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Multiple-choice questions</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Sustainability case studies</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Resilience planning exercises</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Business continuity scenarios</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Group presentations</span></li>
                  </ul>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Training Duration:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Standard Course:</span> 2–3 Days</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Program:</span> 3–5 Days</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Training Methodology:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Case studies</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Risk simulations</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Group workshops</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>ESG exercises</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Scenario-based learning</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Mode of Delivery:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Classroom Training</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Online Training</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Corporate In-House Programs</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Certification & Recertification
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Certification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>ISO 41019 Sustainability & Resilience Certificate</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>FM Sustainability Professional Certificate</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>CPD Credits</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Recertification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 2–3 Years</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">CPD Credits:</span> FM Sustainability Experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '2-5 Days',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'ISO 55001:2014 Asset Management Systems Implementation Training',
      shortDescription: 'Provides a structured approach to managing physical assets across their lifecycle to maximize value, performance, and risk control.',
      description: (
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-2 text-lg flex items-center">
              <Award size={18} className="mr-2 text-[#ff4f01]" /> Course Overview
            </strong>
            <p className="text-[#000000] text-sm md:text-base">
              The ISO 55001:2014 Asset Management Systems Training provides a structured approach to managing physical assets across their lifecycle to maximize value, performance, and risk control. This training helps organizations transition from reactive maintenance to strategic, value-based asset management aligned with international best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <p className="text-[#000000] text-sm mb-2 font-medium">Participants will be able to:</p>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Understand ISO 55001:2014 structure",
                  "Implement Asset Management System (AMS)",
                  "Align asset strategy with business objectives",
                  "Manage asset lifecycle effectively",
                  "Apply risk-based decision-making",
                  "Improve asset performance and reliability",
                  "Optimize cost, risk, and performance",
                  "Develop asset management plans and policies"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <Users size={18} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-[#000000] text-sm md:text-base">
                {[
                  "Asset Managers",
                  "Facility Managers",
                  "Maintenance Managers",
                  "Engineers (Mechanical, Electrical, Civil, MEP)",
                  "Operations Managers",
                  "Corporate Real Estate Professionals",
                  "Risk & Compliance Managers",
                  "FM Consultants"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
              <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                <FileText size={18} className="mr-2 text-[#131d3b]" /> Course Modules
              </strong>
              <ul className="space-y-3 text-[#000000] text-sm md:text-base">
                {[
                  { title: "Module 1: Introduction to ISO 55001", items: ["ISO 55000 family overview", "Asset management principles", "Benefits of Asset Management System", "ISO 55001 requirements"] },
                  { title: "Module 2: Asset Management Framework", items: ["Asset management policy", "Strategy and objectives", "Asset management plans", "Organizational alignment"] },
                  { title: "Module 3: Asset Lifecycle Management", items: ["Asset planning and acquisition", "Operation and maintenance", "Renewal and replacement", "Disposal and decommissioning"] },
                  { title: "Module 4: Risk-Based Asset Management", items: ["Risk identification", "Criticality analysis", "Failure impact analysis", "Risk mitigation strategies"] },
                  { title: "Module 5: Life Cycle Costing (LCC)", items: ["Total cost of ownership", "CAPEX vs OPEX", "Cost optimization", "Replacement planning"] },
                  { title: "Module 6: Asset Performance Management", items: ["Performance KPIs", "Reliability and availability", "Condition monitoring", "Predictive maintenance"] },
                  { title: "Module 7: Asset Information Systems", items: ["Asset registers", "CMMS / CAFM systems", "Data governance", "Digital asset tools"] },
                  { title: "Module 8: Leadership & Governance", items: ["Roles and responsibilities", "Governance structure", "Decision frameworks", "Audit and compliance"] },
                  { title: "Module 9: Continuous Improvement", items: ["Performance evaluation", "Internal audits", "Corrective actions", "PDCA cycle"] }
                ].map((mod, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-bold text-[#131d3b] flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f01] mr-2 shrink-0"></div>
                      {mod.title}
                    </span>
                    <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <FileText size={18} className="mr-2 text-[#ff4f01]" /> Assessment & Training Details
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Assessment:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Multiple-choice questions</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Case studies</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Lifecycle costing exercises</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Risk analysis scenarios</span></li>
                    <li className="flex items-start"><div className="w-1 h-1 rounded-full bg-gray-400 mr-2 mt-2 shrink-0"></div><span>Written assessments</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Training Duration:</span>
                  <ul className="space-y-1 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Foundation Course:</span> 3 Days</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Advanced Implementation:</span> 4–5 Days</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow-sm p-5 rounded-xl border border-gray-100">
                <strong className="text-[#131d3b] block mb-3 text-lg flex items-center">
                  <Award size={18} className="mr-2 text-[#131d3b]" /> Certification & Recertification
                </strong>
                <div className="mb-4">
                  <span className="font-bold text-[#131d3b] block mb-2">Certification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>ISO 55001 Asset Management Certificate</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>CPD Accredited Certificate</span></li>
                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div><span>Advanced AMS Practitioner Certification</span></li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-2">Recertification:</span>
                  <ul className="space-y-2 text-[#000000] text-sm">
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">Validity:</span> 3 Years</li>
                    <li className="flex flex-col"><span className="font-bold text-[#131d3b]">CPD Credits:</span> Asset Management Experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      duration: '3-5 Days',
      image: 'https://image2url.com/r2/default/images/1775125741679-0ee576fb-e418-4cd2-bf8b-be9f86a8a044.jpg'
    }
  ];

export const constructionCourses = [
    {
      title: 'CCM® - Certified Construction Manager',
      shortDescription: 'Validates advanced knowledge, skills, and experience in construction management, preparing professionals to effectively manage projects.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Certified Construction Manager (CCM) program is a globally recognized professional certification that validates advanced knowledge, skills, and experience in construction management. This course prepares professionals to effectively manage the planning, design, execution, control, and closeout of construction projects while ensuring compliance with safety, quality, cost, and schedule requirements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Apply construction management best practices across the project lifecycle",
                  "Manage cost, schedule, quality, and risk effectively",
                  "Understand contract administration and procurement strategies",
                  "Implement safety, sustainability, and ethical standards",
                  "Improve decision-making using industry-recognized tools",
                  "Prepare confidently for the CCM certification exam"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Construction Managers",
                  "Project Managers & Engineers",
                  "Site Managers & Supervisors",
                  "Construction Consultants",
                  "Owners’ Representatives"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
              <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility Requirements
            </strong>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[#131d3b]">
                    <th className="p-4 border-b border-gray-200 font-bold uppercase tracking-wider text-sm">Education Level</th>
                    <th className="p-4 border-b border-gray-200 font-bold uppercase tracking-wider text-sm">Required Experience</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm md:text-base">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b border-gray-100 font-medium">4-year AEC degree</td>
                    <td className="p-4 border-b border-gray-100">4 years responsible experience</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b border-gray-100 font-medium">2-year AEC degree</td>
                    <td className="p-4 border-b border-gray-100">4 years field + 4 years RIC</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b border-gray-100 font-medium">No degree</td>
                    <td className="p-4 border-b border-gray-100">8 years in the field + 4 years RIC (or equivalent)</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">CACM credential</td>
                    <td className="p-4">4 years RIC</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Exam Content
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Program & Project Management",
                  "Cost Management",
                  "Time Management",
                  "Quality Management",
                  "Contract Administration",
                  "Risk Management",
                  "Safety Management",
                  "Sustainability",
                  "Ethics & Professional Practice"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Info
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 4 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Computer-based</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Questions:</span> 120 multiple-choice</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Focus:</span> Real-world application</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Recertification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Valid for:</span> 3 years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requires:</span> 25 CPD/PDUs</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Training, seminars, teaching, and industry contributions</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '40 Hours (Online & In-person)',
      image: 'https://image2url.com/r2/default/images/1775124847158-063a4568-e27f-484b-8a75-79441c8ca072.webp'
    },
    {
      title: 'BIM® - Certified Building Information Modelling',
      shortDescription: 'Equips professionals with the skills to utilize BIM technology for planning, design, construction, and facility management.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Certified BIM (Building Information Modeling) program equips professionals with the skills to utilize BIM technology for planning, design, construction, and facility management. This certification focuses on collaboration, 3D modeling, digital workflows, and project coordination to improve efficiency, reduce errors, and enhance project delivery in the AEC industry.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Understand BIM fundamentals and applications in AEC projects",
                  "Create and manage 3D models and digital building representations",
                  "Collaborate using BIM workflows across teams",
                  "Apply BIM standards and best practices",
                  "Perform clash detection and project coordination",
                  "Use BIM for cost estimation and lifecycle analysis",
                  "Integrate BIM with project management software"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Architects, engineers, and construction professionals",
                  "Project managers and planners",
                  "BIM coordinators and managers",
                  "Facility management professionals",
                  "Quantity surveyors and cost estimators"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Course Contents
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Introduction to BIM (concepts, lifecycle, levels of maturity)",
                  "BIM tools and software (Revit, Navisworks, AutoCAD, ArchiCAD)",
                  "3D modelling and visualization",
                  "Collaboration and coordination (clash detection, version control)",
                  "BIM applications (planning, cost estimation, facility management)",
                  "BIM implementation and standards (ISO 19650)",
                  "Quality assurance and project execution"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Course Benefits
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Improves digital collaboration and project efficiency",
                  "Reduces errors and rework in projects",
                  "Enhances career opportunities in AEC industry",
                  "Provides globally recognized BIM skills"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '24 Hours (Online & In-person)',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800' // Construction site, crane
    },
    {
      title: 'PMI-CP™ - Certified Construction Professional',
      shortDescription: 'Demonstrate essential skills to lead complex construction and built environment projects globally with the PMI-CP™ credential.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            PMI-CP™ credential holders demonstrate the essential skills and knowledge required to lead complex construction and built environment projects globally. This certification focuses on contracts management, stakeholder engagement, strategy and scope management, and project governance, enabling professionals to successfully deliver large-scale projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Understand contract management principles in construction",
                  "Develop stakeholder communication strategies",
                  "Define and manage project scope effectively",
                  "Establish project controls and reporting systems",
                  "Implement quality assurance and quality control processes"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Project Managers / Aspiring Project Managers",
                  "Construction Managers",
                  "Civil Engineers",
                  "Construction Engineers",
                  "Project Engineers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Micro-Credentials
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Built Environment Project Communication Pro",
                  "Built Environment Technology and Innovation Pro",
                  "Built Environment Performance and Materials Management Pro"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> E-Learning Modules
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Interface Management in the Built Environment",
                  "Scope and Change Order Management",
                  "Contract and Risk Management",
                  "Execution Planning in the Built Environment"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Experience:</span> Minimum 3+ years in construction</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requirements:</span> Completion of 7 courses and 3 micro-credentials</li>
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Questions:</span> 170 MCQs</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 230 minutes</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Fee:</span> USD 450</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Recertification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Cycle:</span> 3 years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requires:</span> 30 PDUs</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
              <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Materials
            </strong>
            <ul className="space-y-2 text-gray-700 text-sm md:text-base flex flex-col md:flex-row md:gap-6 md:space-y-0">
              {[
                "PMBOK 6th & 7th Edition",
                "PMI-CP E-learning Courses",
                "Exam Questions and Answers"
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
      duration: 'Self-paced / Varies',
      image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&q=80&w=800' // Construction worker on roof
    },
    {
      title: 'CRM® - Certified Construction Risk Management Professional',
      shortDescription: 'Equips professionals with the knowledge and tools to identify, analyze, mitigate, and control risks throughout the construction project lifecycle.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Construction Risk Management (CRM) Certification equips professionals with the knowledge and tools to identify, analyze, mitigate, and control risks throughout the construction project lifecycle. The program focuses on improving safety, cost efficiency, schedule performance, quality, and contractual compliance using proactive risk management approaches aligned with global best practices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Identify risks across all construction phases",
                  "Apply qualitative and quantitative risk analysis techniques",
                  "Develop and manage a risk register",
                  "Implement risk mitigation and response strategies",
                  "Manage contractual and claims-related risks",
                  "Integrate risk with cost, schedule, safety, and quality controls",
                  "Build a risk-aware project culture"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Construction Project Managers",
                  "Construction & Site Managers",
                  "Planning & Project Control Engineers",
                  "Risk & Claims Engineers",
                  "Quantity Surveyors & Cost Engineers",
                  "Contract & Commercial Managers",
                  "PMO Professionals & Owner Representatives"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Curriculum Modules
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Fundamentals of Construction Risk Management",
                  "Risk Identification in Construction Projects",
                  "Risk Assessment and Analysis",
                  "Risk Response Planning",
                  "Contractual, Legal, and Claims Risk",
                  "Health, Safety, and Environmental (HSE) Risks",
                  "Risk Monitoring, Control, and Reporting",
                  "Case Studies and Practical Applications"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility Criteria
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Degree/Diploma in Engineering, Construction, Architecture OR",
                  "Minimum 3 years of construction/project experience",
                  "No prior risk certification required"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Methodology
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Instructor-led sessions (classroom / live virtual)</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Content:</span> Real project case studies</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Activities:</span> Group discussions & workshops</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Resources:</span> Practical templates and tools</li>
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Questions:</span> 100 Questions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 3 Hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Passing Score:</span> 70%</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Closed book</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Assessment & Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Exam Type:</span> Multiple-choice exam + case-based questions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Certification:</span> Certified Construction Risk Management Professional (CRM)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: 'Varies (Classroom / Live Virtual)',
      image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800' // Engineer with tablet checking site
    },
    {
      title: 'CCA® - Certified Construction Contract Administrator',
      shortDescription: 'Build expertise in construction contract administration, contractual risk management, claims prevention, and dispute avoidance.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Certified Construction Contracts (CCC) program is designed to build expertise in construction contract administration, contractual risk management, claims prevention, and dispute avoidance. It equips professionals with practical knowledge to manage contracts across the full project lifecycle—from procurement and award to execution and closeout—following industry best practices in modern construction projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Interpret and manage different construction contract types",
                  "Administer contractual obligations, rights, and responsibilities",
                  "Apply best practices in contract drafting and review",
                  "Manage variations, changes, and claims effectively",
                  "Prevent disputes through proactive contract strategies",
                  "Integrate contract management with cost, schedule, and risk controls",
                  "Ensure proper contract closeout and compliance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Contract & Commercial Managers",
                  "Project Managers & Construction Managers",
                  "Quantity Surveyors & Cost Engineers",
                  "Planning & Project Control Engineers",
                  "Claims & Dispute Professionals",
                  "Consultants & Owner Representatives"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Curriculum Modules
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Fundamentals of Construction Contracts",
                  "Types of Construction Contracts",
                  "Contract Formation and Procurement",
                  "Contract Administration",
                  "Change Management and Variations",
                  "Delay, Disruption, and Claims",
                  "Risk, Insurance, and Bonds",
                  "Dispute Resolution and Contract Closeout"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility Criteria
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Degree/Diploma in Engineering, Construction, Architecture, Law OR",
                  "Minimum 3 years of experience in contracts/construction roles",
                  "No prior certification required"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Methodology
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Instructor-led classroom / live virtual sessions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Content:</span> Real contract case studies</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Activities:</span> Scenario-based workshops</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Resources:</span> Practical templates and checklists</li>
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Questions:</span> 100 Questions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 3 Hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Passing Score:</span> 70%</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Closed book</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Assessment & Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Exam Type:</span> Multiple-choice + scenario-based exam</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Certification:</span> Certified Construction Contract Administrator (CCA)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: 'Varies (Classroom / Live Virtual)',
      image: 'https://image2url.com/r2/default/images/1775126081288-936045f4-6df1-4ba7-bcc4-5c930d1df44a.webp'
    },
    {
      title: 'LEED® AP - Interior Design + Construction Program',
      shortDescription: 'Provides in-depth knowledge of sustainable interior design, focusing on creating high-performance indoor spaces.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The LEED AP ID+C course provides in-depth knowledge of sustainable interior design, focusing on creating high-performance indoor spaces. It equips professionals with the expertise to apply LEED strategies in commercial interiors, emphasizing energy efficiency, water conservation, material selection, and indoor environmental quality in alignment with U.S. Green Building Council standards.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Understand LEED rating systems and certification process",
                  "Apply sustainable design strategies for interior spaces",
                  "Optimize energy and water efficiency in interiors",
                  "Select sustainable materials and resources",
                  "Improve indoor environmental quality (IEQ)",
                  "Interpret LEED credits specific to ID+C projects",
                  "Prepare effectively for the LEED AP ID+C exam"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Interior designers and architects",
                  "Facility managers and project managers",
                  "Sustainability consultants",
                  "Engineers (MEP)",
                  "Real estate professionals",
                  "Students pursuing green building careers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Training Modules
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Introduction to LEED & Green Building Concepts",
                  "Integrative Process",
                  "Location & Transportation (LT)",
                  "Sustainable Sites (SS)",
                  "Water Efficiency (WE)",
                  "Energy & Atmosphere (EA)",
                  "Materials & Resources (MR)",
                  "Indoor Environmental Quality (EQ)",
                  "Innovation (IN)",
                  "Regional Priority (RP)",
                  "LEED Documentation & Certification Process",
                  "Practice Questions & Exam Strategies"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Exam Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "No mandatory prerequisites",
                  "Recommended to pass LEED Green Associate exam first",
                  "Experience in interior design or green building projects is beneficial",
                  "Familiarity with LEED concepts and documentation is helpful"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Conducted by:</span> Green Business Certification Inc.</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Computer-based (100 MCQs)</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 2 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Passing score:</span> 170/200</li>
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Recertification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Valid for:</span> 2 years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requires:</span> 30 CE hours (Min 6 hours LEED-specific)</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Renewal via:</span> Green Business Certification Inc.</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> ~30 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Hybrid</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Instructor-led sessions, study materials, mock exams</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '~30 Hours (Classroom / Online / Hybrid)',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800' // Modern interior design
    },
    {
      title: 'LEED® GA - LEED Green Associate Training',
      shortDescription: 'Provides a comprehensive overview of sustainable building strategies, environmental design concepts, and the LEED certification process.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The LEED Green Associate credential demonstrates a strong understanding of green building principles and the Leadership in Energy and Environmental Design (LEED) rating system. This course provides participants with a comprehensive overview of sustainable building strategies, environmental design concepts, and the LEED certification process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Understand principles of sustainable and green building design",
                  "Explain the LEED rating system structure and purpose",
                  "Identify key LEED categories (LT, WE, EA, MR, EQ)",
                  "Understand certification process and documentation",
                  "Apply integrative design approaches",
                  "Recognize energy, water, and environmental strategies",
                  "Prepare for the LEED Green Associate exam"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Architects and Urban Planners",
                  "Civil, Mechanical, and Electrical Engineers",
                  "Sustainability and Environmental Professionals",
                  "Construction and Project Management Professionals",
                  "Facility Managers and Building Operators",
                  "Interior Designers",
                  "Students and graduates interested in green building",
                  "Professionals in sustainable development"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Exam Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "No strict prerequisites",
                  "Basic knowledge of green building recommended",
                  "Experience in sustainable projects is beneficial",
                  "Completion of preparation course recommended"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Computer-based</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 2 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Questions:</span> 100 multiple-choice questions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Language:</span> English (region-based options possible)</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Availability:</span> Available at test centers or online</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Conducted by:</span> Green Business Certification Inc.</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Recertification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Valid for:</span> 2 years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requires:</span> 15 CE hours (Min 3 hours LEED-specific)</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Training, webinars, and professional development</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: 'Varies (Classroom / Online)',
      image: 'https://image2url.com/r2/default/images/1775126434965-bd97ccdf-2c4c-47f3-8533-4a9e534a0a53.png'
    },
    {
      title: 'LEED® AP BD+C - Building Design and Construction',
      shortDescription: 'Provides advanced knowledge of green building design and construction practices, focusing on developing sustainable, high-performance buildings.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The LEED AP BD+C (New Construction) course provides advanced knowledge of green building design and construction practices. It focuses on developing sustainable, high-performance buildings by applying LEED strategies across the project lifecycle in alignment with U.S. Green Building Council standards.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Understand LEED rating systems and certification processes",
                  "Apply sustainable design strategies for new construction projects",
                  "Optimize energy performance and water efficiency",
                  "Select environmentally responsible materials",
                  "Enhance indoor environmental quality (IEQ)",
                  "Interpret LEED BD+C credits and prerequisites",
                  "Prepare effectively for the LEED AP BD+C exam"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Architects and design consultants",
                  "Civil and structural engineers",
                  "MEP engineers",
                  "Project managers and contractors",
                  "Sustainability and LEED consultants",
                  "Facility planners and developers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Conducted by:</span> Green Business Certification Inc.</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Computer-based</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Questions:</span> 100 multiple-choice questions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 2 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Passing score:</span> 170/200</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Scenario-based questions</li>
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Recertification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Valid for:</span> 2 years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requires:</span> 30 CE hours (Min 6 hours LEED-specific)</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Renewal via:</span> Green Business Certification Inc.</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 30–40 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Hybrid</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Expert-led sessions, study materials, mock exams, and case studies</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Focus:</span> Exam preparation and real-world application</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '30–40 Hours (Classroom / Online / Hybrid)',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800' // Sustainable building / green architecture
    },
    {
      title: 'CCQM® - Certified Construction Quality Manager',
      shortDescription: 'Designed for professionals responsible for planning, implementing, and managing quality assurance and quality control (QA/QC) systems in construction projects.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Certified Construction Quality Manager (CCQM) certification is designed for professionals responsible for planning, implementing, and managing quality assurance and quality control (QA/QC) systems in construction projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Develop and implement Construction Quality Management Plans (CQMP)",
                  "Interpret construction drawings, specifications, and contract documents",
                  "Establish QA/QC procedures for civil, mechanical, and electrical works",
                  "Conduct inspections and material testing",
                  "Manage non-conformance reports (NCRs) and corrective actions",
                  "Implement risk-based quality control measures",
                  "Coordinate with stakeholders and project teams",
                  "Ensure compliance with ISO and international standards"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Construction Quality Managers",
                  "QA/QC Engineers and Inspectors",
                  "Site Engineers and Project Engineers",
                  "Project Managers",
                  "Contractors and Consultants",
                  "Civil, Mechanical, and Electrical Engineers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <div className="space-y-4 text-gray-600 text-sm">
                <div>
                  <span className="font-bold text-[#131d3b] block mb-1">Option 1 – With Engineering Degree:</span>
                  <ul className="space-y-1 ml-4 list-disc marker:text-[#ff4f01]">
                    <li>Bachelor’s degree in Civil, Mechanical, Electrical, or related field</li>
                    <li>3–5 years of construction experience with QA/QC exposure</li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-[#131d3b] block mb-1">Option 2 – Without Engineering Degree:</span>
                  <ul className="space-y-1 ml-4 list-disc marker:text-[#ff4f01]">
                    <li>Diploma in engineering or construction-related field</li>
                    <li>5–8 years of construction experience in quality roles</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Multiple-choice</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Questions:</span> 100–120 questions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 3–4 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Computer-based or paper-based</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Passing score:</span> ~70%</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> May include case-based questions</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Validity & Renewal
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Valid for:</span> 3 years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requires:</span> CPD hours (30–60 hours), OR re-examination</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: 'Varies',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800' // Engineer with laptop
    },
    {
      title: 'CPC® - Certified Professional Constructor',
      shortDescription: 'A globally recognized credential validating advanced knowledge, leadership, and professional competence in construction management.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Certified Professional Constructor (CPC) is a globally recognized credential that validates advanced knowledge, leadership, and professional competence in construction management. Offered by the American Institute of Constructors, the program emphasizes ethics, project execution, cost control, safety, and construction leadership across the project lifecycle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Apply advanced construction management principles",
                  "Manage project scope, cost, schedule, and quality",
                  "Demonstrate leadership and decision-making skills",
                  "Understand construction law, contracts, and ethics",
                  "Implement safety and risk management practices",
                  "Improve productivity and resource management",
                  "Prepare effectively for the CPC examination"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Senior construction professionals",
                  "Project managers and construction managers",
                  "Site engineers and supervisors",
                  "Contractors and consultants",
                  "Professionals aiming for leadership roles"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Exam Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Must pass the Associate Constructor (AC) exam first",
                  "Minimum 7+ years of construction experience OR equivalent education + experience",
                  "Must agree to AIC Code of Ethics"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> ~8 hours total</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Focus:</span> Real-world application and decision-making</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Recertification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Valid for:</span> 2 years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requires:</span> Continuing Professional Development (CPD)</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Renewal via:</span> American Institute of Constructors</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 40–60 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Hybrid</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Expert sessions, study materials, case studies, and practice exams</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '40–60 Hours (Classroom / Online / Hybrid)',
      image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=800' // Engineer with tablet
    },
    {
      title: 'HPBDP® - High Performance Building Design Professional',
      shortDescription: 'Validates expertise in designing energy-efficient, sustainable, and high-performance buildings, focusing on optimizing energy performance and IEQ.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The High Performance Building Design Professional (HPBDP) certification validates expertise in designing energy-efficient, sustainable, and high-performance buildings. Offered by ASHRAE, this program focuses on integrating building systems to optimize energy performance, indoor environmental quality, and overall building sustainability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Apply integrated design principles for high-performance buildings",
                  "Optimize HVAC systems for energy efficiency",
                  "Analyze building energy performance and loads",
                  "Improve indoor environmental quality (IEQ)",
                  "Implement sustainable design strategies and standards",
                  "Understand commissioning and system performance validation",
                  "Prepare effectively for the HPBDP certification exam"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Mechanical and HVAC engineers",
                  "Building design consultants",
                  "Energy engineers and modelers",
                  "Architects and sustainability professionals",
                  "Commissioning authorities",
                  "Facility and operations managers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Exam Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Engineering/architecture degree + relevant experience OR",
                  "Non-degree with higher experience in HVAC/design",
                  "A strong understanding of HVAC systems and building design recommended"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Conducted by:</span> ASHRAE</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Computer-based</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Questions:</span> ~115 multiple-choice questions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 2.5 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Focus:</span> Real-world applications</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Recertification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Valid for:</span> 3 years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requires:</span> 45 Professional Development Hours (PDHs)</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Renewal via:</span> ASHRAE</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 30–45 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Hybrid</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Expert sessions, study materials, case studies, and mock exams</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '30–45 Hours (Classroom / Online / Hybrid)',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'OSHA 30-Hour Construction Safety Training',
      shortDescription: 'An advanced safety training designed for supervisors and workers with safety responsibilities in the construction industry.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The OSHA 30-Hour Construction program is an advanced safety training designed for supervisors and workers with safety responsibilities in the construction industry. It provides comprehensive knowledge of workplace hazards, safety standards, and regulatory compliance based on guidelines from the Occupational Safety and Health Administration.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Identify and prevent common construction hazards",
                  "Understand OSHA standards and compliance requirements",
                  "Implement effective safety and health programs",
                  "Manage site safety and worker responsibilities",
                  "Reduce workplace accidents and incidents",
                  "Promote a strong safety culture on construction sites"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Construction supervisors and foremen",
                  "Site engineers and project managers",
                  "Safety officers and HSE professionals",
                  "Contractors and subcontractors"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Training Duration
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "30 hours (typically 4–5 days or flexible schedule)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Credential:</span> Official OSHA 30-Hour completion card</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Recognition:</span> Widely recognized across the construction industry</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Assessment
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Method:</span> Continuous assessment through quizzes</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Final Exam:</span> No single final exam (varies by provider)</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requirement:</span> Active participation required</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Hybrid</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Instructor-led sessions, case studies, and practical safety examples</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '30 Hours',
      image: 'https://image2url.com/r2/default/images/1775126858455-dc615d07-d638-49f2-b960-3b90122d90f2.jpg' // Construction safety gear
    },
    {
      title: 'Construction Site Supervisory Skills Training',
      shortDescription: 'Develop the essential leadership, coordination, and technical skills required to effectively manage construction site activities.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Construction Site Supervisory Skills Training program is designed to develop the essential leadership, coordination, and technical skills required to effectively manage construction site activities. It focuses on improving productivity, safety, communication, and quality control to ensure successful project execution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Supervise daily construction site operations effectively",
                  "Plan and coordinate workforce, materials, and equipment",
                  "Ensure compliance with safety standards and regulations",
                  "Monitor quality and project progress",
                  "Improve communication with teams and stakeholders",
                  "Resolve on-site issues and conflicts efficiently",
                  "Enhance productivity and resource utilization"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Site supervisors and foremen",
                  "Site engineers and junior engineers",
                  "Construction coordinators",
                  "Contractors and subcontractors",
                  "Professionals aspiring to supervisory roles"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "No formal prerequisites",
                  "Basic construction knowledge or experience recommended",
                  "Suitable for both new and experienced supervisors"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Training Duration
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 16–30 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Timeline:</span> 2–5 days depending on depth</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / On-site</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Instructor-led sessions, case studies, practical tools, and interactive activities</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '16–30 Hours',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800' // Construction site planning
    },
    {
      title: 'UAE Construction Regulations and Compliances Training',
      shortDescription: 'Equips construction professionals with a comprehensive understanding of local laws, regulations, and compliance standards in the UAE.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The UAE Construction Regulations and Compliance Training is designed to equip construction professionals with a comprehensive understanding of local laws, regulations, and compliance standards. The program focuses on ensuring safe, legal, and efficient project execution in alignment with UAE federal and emirate-level construction regulations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Understand UAE construction laws, codes, and regulations",
                  "Ensure compliance with building permits and approvals",
                  "Apply safety and environmental regulations on-site",
                  "Navigate local labor and contract laws relevant to construction",
                  "Avoid legal and regulatory risks in construction projects",
                  "Implement compliance systems for project management"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Project managers and site engineers",
                  "Construction supervisors and coordinators",
                  "Contractors and subcontractors",
                  "Safety and compliance officers",
                  "Architects and consultants working in UAE projects"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "No formal prerequisites",
                  "Knowledge of construction processes recommended",
                  "Suitable for both new and experienced professionals"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Training Duration
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 16–24 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Timeline:</span> 2–3 days, customizable</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Assessment
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Method:</span> Continuous evaluation through quizzes, case studies, and practical exercises</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / On-site</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Expert-led sessions, real case studies, compliance templates, and interactive learning</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '16–24 Hours',
      image: 'https://image2url.com/r2/default/images/1775023944214-597c6adf-5679-4874-9b3d-35443d51af5c.webp'
    },
    {
      title: 'CHC® - Certified Healthcare Constructor',
      shortDescription: 'Designed for construction professionals involved in healthcare facility projects, ensuring compliance with regulatory, safety, and operational standards.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Certified Healthcare Constructor (CHC) credential, offered by the American Hospital Association, is designed for construction professionals involved in healthcare facility projects. It focuses on the specialized knowledge required to plan, design, and manage construction in healthcare settings, ensuring compliance with regulatory, safety, and operational standards.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Understand healthcare facility construction regulations and standards",
                  "Manage construction projects in hospitals and medical facilities",
                  "Ensure compliance with infection control and patient safety requirements",
                  "Apply design and construction best practices for healthcare environments",
                  "Oversee facility operations during construction without disrupting services",
                  "Integrate sustainability and energy efficiency strategies in healthcare projects"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Construction managers and project managers in healthcare projects",
                  "Architects and engineers specializing in healthcare facilities",
                  "Facility managers and planners",
                  "Contractors and subcontractors working in hospitals or clinics",
                  "Professionals aiming to specialize in healthcare construction"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Exam Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Experience in healthcare construction or facility projects",
                  "Completion of prerequisite education or training (varies by provider)",
                  "Commitment to AHA Code of Ethics and professional standards"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Exam Information
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Conducted by:</span> American Hospital Association</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Format:</span> Computer-based with multiple-choice and scenario-based questions</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 2–3 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Focus:</span> Practical application</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Recertification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Valid for:</span> Approximately 3 years</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Requires:</span> Continuing education/professional development</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Renewal via:</span> American Hospital Association</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 30–40 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Expert-led sessions, case studies, and practice exams</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '30–40 Hours',
      image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'First Aid & Emergency Response for Construction Sites',
      shortDescription: 'Equips construction professionals with essential life-saving skills to handle workplace emergencies, focusing on immediate response and injury management.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The First Aid & Emergency Response for Construction Sites training equips construction professionals with essential life-saving skills to handle workplace emergencies. The program focuses on immediate response techniques, injury management, and emergency preparedness to reduce the impact of accidents on construction sites.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Provide basic first aid for common construction injuries",
                  "Respond effectively to workplace emergencies",
                  "Perform CPR and use AED (Automated External Defibrillator)",
                  "Manage bleeding, fractures, burns, and shock",
                  "Handle medical emergencies until professional help arrives",
                  "Improve overall site emergency preparedness"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Construction workers and supervisors",
                  "Site engineers and project managers",
                  "Safety officers and HSE professionals",
                  "Contractors and subcontractors"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "No formal prerequisites",
                  "Suitable for all levels of construction personnel"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / On-site practical training</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Includes:</span> Hands-on practice, real-life scenarios, and safety guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '1–2 Days',
      image: 'https://image2url.com/r2/default/images/1775024287120-024e6502-abbf-45bc-a0b1-eb3745fdcc5e.webp' // Industrial safety / emergency response
    },
    {
      title: 'Confined Space, Fall Protection, and Scaffolding Safety Training',
      shortDescription: 'Equips construction professionals with essential knowledge and practical skills to safely work in high-risk environments like confined spaces and heights.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            This integrated safety training program equips construction professionals with essential knowledge and practical skills to safely work in high-risk environments. The course focuses on hazard identification, prevention, and compliance related to confined spaces, working at heights, and scaffolding operations, aligned with international safety standards.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Identify hazards in confined spaces, heights, and scaffolding",
                  "Apply safe work practices and preventive measures",
                  "Use personal protective equipment (PPE) correctly",
                  "Implement fall protection systems and rescue procedures",
                  "Ensure safe erection, inspection, and use of scaffolds",
                  "Comply with safety regulations and standards",
                  "Respond effectively to emergencies"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Construction workers and technicians",
                  "Site supervisors and foremen",
                  "Safety officers and HSE professionals",
                  "Scaffolders and riggers",
                  "Engineers and project managers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "No formal prerequisites",
                  "Basic construction site knowledge recommended"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Training Duration
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 16–24 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Timeline:</span> 2–3 days</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Assessment
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Methods:</span> Practical demonstrations, safety drills, case studies, quizzes and evaluations</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Credential:</span> Safety training certificate aligned with international standards</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / On-site practical training</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '16–24 Hours',
      image: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&q=80&w=800' // Confined space / Industrial pipes
    },
    {
      title: 'Sustainable Construction Materials & Resources Management Training',
      shortDescription: 'Focuses on selecting, managing, and optimizing construction materials to reduce environmental impact and enhance project sustainability.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            This training focuses on selecting, managing, and optimizing construction materials to reduce environmental impact and enhance project sustainability. The program aligns with global green building practices and promotes efficient resource utilization throughout the project lifecycle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Identify sustainable and eco-friendly construction materials",
                  "Apply Life Cycle Assessment (LCA) principles",
                  "Optimize material usage and reduce waste",
                  "Understand LEED Materials & Resources (MR) credits",
                  "Implement responsible sourcing and procurement practices",
                  "Improve overall sustainability performance in construction"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Architects and designers",
                  "Construction managers and engineers",
                  "Procurement and supply chain professionals",
                  "Sustainability and LEED consultants",
                  "Contractors and project planners"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "No formal prerequisites",
                  "Basic knowledge of construction or sustainability concepts recommended"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Training Duration
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 16–24 hours</li>
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Timeline:</span> 2–3 days</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Assessment
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Methods:</span> Case studies and practical exercises, quizzes and discussions, application-based evaluations</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Credential:</span> Certificate of completion aligned with global green building standards</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Hybrid</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '16–24 Hours',
      image: 'https://image2url.com/r2/default/images/1775024533773-8514353d-d271-492a-8f6e-bd5aa3a9df23.jpg' // Sustainable timber / wood materials
    },
    {
      title: 'HVAC, MEP & Systems Integration Training',
      shortDescription: 'Provides comprehensive knowledge of building mechanical, electrical, and plumbing (MEP) systems with a focus on design, coordination, and integration.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            This training program provides comprehensive knowledge of building mechanical, electrical, and plumbing (MEP) systems with a strong focus on design, coordination, and integration. It equips professionals to optimize system performance, improve energy efficiency, and enhance constructability in modern buildings.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Understand HVAC, electrical, and plumbing system fundamentals",
                  "Design and coordinate MEP systems effectively",
                  "Integrate building systems for optimal performance",
                  "Improve energy efficiency and sustainability",
                  "Identify and resolve system clashes and coordination issues",
                  "Apply industry codes, standards, and best practices"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "MEP engineers (mechanical, electrical, plumbing)",
                  "HVAC engineers and technicians",
                  "Project managers and construction engineers",
                  "BIM coordinators and design consultants",
                  "Facility and maintenance professionals"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Engineering background or relevant experience recommended",
                  "A basic understanding of building systems is beneficial"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Training Duration
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 30–50 hours (flexible based on depth)</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Assessment
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Methods:</span> Practical exercises and design tasks, case study evaluations, quizzes and discussions</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Credential:</span> Certificate of completion supporting advanced HVAC and MEP-related certifications</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Hybrid</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '30–50 Hours',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800' // HVAC / Mechanical systems
    },
    {
      title: 'Concrete, Steel & Structural Engineering Workshops',
      shortDescription: 'Provides practical and technical knowledge on the design, analysis, and construction of structural systems, focusing on reinforced concrete and structural steel.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Concrete, Steel & Structural Engineering workshops provide practical and technical knowledge on the design, analysis, and construction of structural systems. The program focuses on reinforced concrete, structural steel, and real-world applications, aligned with international standards such as the American Concrete Institute (ACI) and the American Institute of Steel Construction (AISC).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Understand structural behavior of concrete and steel systems",
                  "Apply design principles for reinforced concrete and steel structures",
                  "Interpret structural drawings and specifications",
                  "Ensure quality control in structural works",
                  "Identify common construction defects and solutions",
                  "Apply relevant codes and standards in design and execution"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Civil and structural engineers",
                  "Site engineers and construction supervisors",
                  "Design engineers and consultants",
                  "Contractors and project managers",
                  "Engineering students and fresh graduates"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "A background in civil or structural engineering recommended",
                  "Basic knowledge of construction and materials is beneficial"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Credential:</span> Certificate of Completion from training provider</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Workshop-based</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Includes
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Expert-led technical sessions",
                  "Hands-on problem-solving",
                  "Real-world case studies",
                  "Practical design insights"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: 'Varies (Workshop-based)',
      image: 'https://image2url.com/r2/default/images/1775024747504-34c9721b-9973-4297-9a8e-514dd7bd08f2.jpeg' // Concrete building structure
    },
    {
      title: 'Construction Claims & Dispute Resolution Training',
      shortDescription: 'Equips professionals with the knowledge and skills to manage, analyze, and resolve claims in construction projects in line with international standards.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Construction Claims & Dispute Resolution Training equips professionals with the knowledge and skills to manage, analyze, and resolve claims in construction projects. It focuses on identifying causes of disputes, preparing claims, and applying effective resolution techniques in line with international contract standards such as FIDIC.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Identify common causes of construction claims and disputes",
                  "Prepare and evaluate claims related to time, cost, and scope",
                  "Understand contract provisions and legal implications",
                  "Apply delay analysis techniques (EOT claims)",
                  "Use dispute resolution methods such as negotiation, mediation, and arbitration",
                  "Minimize risks and avoid disputes through proactive management"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Project managers and construction managers",
                  "Contracts engineers and contract administrators",
                  "Quantity surveyors and cost engineers",
                  "Claims consultants and planners",
                  "Contractors, subcontractors, and consultants"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Basic understanding of construction contracts recommended",
                  "Experience in construction or project management is beneficial"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Training Duration
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 24–40 hours (3–5 days)</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Assessment
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Case study evaluations",
                  "Practical claim preparation exercises",
                  "Quizzes and discussions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Credential:</span> Certificate of Completion from Training Provider</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Hybrid</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Includes
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Expert-led sessions",
                  "Real-world case studies",
                  "Practical templates and tools",
                  "Interactive discussions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '24–40 Hours',
      image: 'https://image2url.com/r2/default/images/1775025247839-966d675b-0b02-4ab5-82ea-c39786459e1d.jpg' // Hard hat on blueprints / construction contracts
    },
    {
      title: 'Construction Waste Management Training',
      shortDescription: 'Focuses on effective strategies to minimize, manage, and recycle construction waste, improving resource efficiency and sustainability compliance.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The construction waste management training program focuses on effective strategies to minimize, manage, and recycle construction waste. It equips professionals with practical tools to reduce environmental impact, improve resource efficiency, and comply with sustainability standards aligned with the U.S. Green Building Council and green building practices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Identify different types of construction waste",
                  "Implement waste reduction and recycling strategies",
                  "Develop construction waste management plans",
                  "Apply LEED requirements for waste management",
                  "Improve material efficiency and cost savings",
                  "Ensure compliance with environmental regulations"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Construction managers and site engineers",
                  "Contractors and subcontractors",
                  "Environmental and sustainability professionals",
                  "Project planners and consultants",
                  "Facility and operations managers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "No formal prerequisites",
                  "Basic construction knowledge recommended"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Training Duration
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 12–20 hours (1–3 days)</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Assessment
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Case studies and practical exercises",
                  "Quizzes and discussions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Credential:</span> Certificate of Completion from Training Provider</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / On-site</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Includes
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Expert-led sessions",
                  "Real-world case studies",
                  "Practical tools and waste management templates",
                  "Interactive discussions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '12–20 Hours',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800' // Excavator moving rubble/debris
    },
    {
      title: 'Understanding Construction Drawings Training',
      shortDescription: 'Equips participants with the skills to read, interpret, and apply architectural, structural, and MEP construction drawings effectively.',
      description: (
        <div className="flex flex-col gap-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            The Understanding Construction Drawings training program equips participants with the skills to read, interpret, and apply construction drawings effectively. It covers architectural, structural, and MEP drawings, enabling professionals to translate design information into accurate site execution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Learning Objectives
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Read and interpret different types of construction drawings",
                  "Understand symbols, scales, and notations",
                  "Identify architectural, structural, and MEP components",
                  "Coordinate drawings across disciplines",
                  "Detect errors, discrepancies, and clashes",
                  "Improve communication between design and site teams"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-2 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Users size={20} className="mr-2 text-[#131d3b]" /> Target Audience
              </strong>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {[
                  "Site engineers and supervisors",
                  "Civil and MEP engineers",
                  "Draftsmen and CAD technicians",
                  "Project coordinators",
                  "Fresh graduates entering construction field"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <GraduationCap size={20} className="mr-2 text-[#ff4f01]" /> Eligibility
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "No formal prerequisites",
                  "Basic construction knowledge is beneficial"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Clock size={20} className="mr-2 text-[#ff4f01]" /> Training Duration
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Duration:</span> 16–24 hours (2–3 days)</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Assessment
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Practical drawing interpretation exercises",
                  "Case studies",
                  "Quizzes and discussions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <Award size={20} className="mr-2 text-[#ff4f01]" /> Certification
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Credential:</span> Certificate of Completion from Training Provider</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <BookOpen size={20} className="mr-2 text-[#ff4f01]" /> Training Details
              </strong>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex flex-col"><span className="font-bold text-[#131d3b] mb-0.5">Mode:</span> Classroom / Online / Workshop-based</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <strong className="text-[#131d3b] block mb-4 text-lg flex items-center">
                <FileText size={20} className="mr-2 text-[#ff4f01]" /> Includes
              </strong>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Real drawing sets for practice",
                  "Hands-on exercises",
                  "Expert guidance",
                  "Interactive sessions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#131d3b] mr-2.5 mt-1.5 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
      duration: '16–24 Hours',
      image: 'https://image2url.com/r2/default/images/1775025422734-cc5f9c16-165b-4170-8b5d-97b4b3100944.jpg' // Building under construction
    }
  ];

export default function Courses() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      {/* Professional Course Header */}
      <section className="bg-[#131d3b] text-white pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#131d3b]">
          <video
            ref={videoRef}
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            poster="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          >
            <source src="https://videos.pexels.com/video-files/3209211/3209211-hd_1920_1080_25fps.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2019/04/24/23011-332483089_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#131d3b]/60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-[#ff4f01] text-sm font-semibold tracking-wider uppercase">CMTI Training Programs</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading"
          >
            Facility Management Courses
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-gray-300 max-w-2xl mx-auto font-sans"
          >
            Discover our comprehensive range of professional certification programs designed to accelerate your career in the built environment.
          </motion.p>
        </div>
      </section>

      {/* Facility Management Section */}
      <section id="facility-management" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center mb-16"
          >
            <div className="w-16 h-1.5 bg-[#ff4f01] mr-6 rounded-full"></div>
            <h2 className="text-4xl font-black uppercase text-[#131d3b] tracking-tight font-heading">Facility Management Courses</h2>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {facilityCourses.map((course, index) => (
              <CourseCard key={index} course={course} layout="grid" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Construction Management Section */}
      <section id="construction-management" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#131d3b]/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center mb-16"
          >
            <div className="w-16 h-1.5 bg-[#ff4f01] mr-6 rounded-full"></div>
            <h2 className="text-4xl font-black uppercase text-[#131d3b] tracking-tight font-heading">Construction Management Courses</h2>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {constructionCourses.map((course, index) => (
              <CourseCard key={index} course={course} layout="grid" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}


      {/* Why Choose Us */}
      <section className="py-24 bg-[#131d3b] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeIn} className="text-sm font-black uppercase text-[#ff4f01] tracking-widest mb-3 font-sans">Why Choose CMTI</motion.h2>
              <motion.h3 variants={fadeIn} className="text-5xl font-black uppercase mb-8 tracking-tight font-heading">The Easy Pass Program Advantage</motion.h3>
              <motion.p variants={fadeIn} className="text-gray-300 mb-10 leading-relaxed text-xl font-light font-sans">
                Our unique approach ensures you not only learn the material but are fully prepared to pass your certification exams on the first try.
              </motion.p>
              <ul className="space-y-8">
                <motion.li variants={fadeIn} className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-[#ff4f01]/20 flex items-center justify-center mr-6 shrink-0 group-hover:bg-[#ff4f01] transition-colors duration-300">
                    <CheckCircle2 className="text-[#ff4f01] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-xl mb-2 font-heading">Comprehensive Study Materials</h4>
                    <p className="text-gray-400 leading-relaxed font-sans">Access to exclusive guides, practice tests, and video lectures.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-[#ff4f01]/20 flex items-center justify-center mr-6 shrink-0 group-hover:bg-[#ff4f01] transition-colors duration-300">
                    <CheckCircle2 className="text-[#ff4f01] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-xl mb-2 font-heading">Expert Mentorship</h4>
                    <p className="text-gray-400 leading-relaxed font-sans">1-on-1 guidance from certified professionals in your field.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-[#ff4f01]/20 flex items-center justify-center mr-6 shrink-0 group-hover:bg-[#ff4f01] transition-colors duration-300">
                    <CheckCircle2 className="text-[#ff4f01] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-xl mb-2 font-heading">Exam Simulation</h4>
                    <p className="text-gray-400 leading-relaxed font-sans">Realistic mock exams to build confidence and identify weak areas.</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#ff4f01] rounded-3xl transform translate-x-6 translate-y-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                alt="Students studying" 
                className="relative z-10 rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Help Choosing Banner */}
      <section className="py-16 bg-[#ff4f01] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12">
            <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black uppercase font-heading mb-4">Not sure which course is right for you?</h3>
              <p className="text-white/90 font-sans text-lg max-w-2xl">Our academic advisors are here to help you map out your career path and select the perfect certification program.</p>
            </div>
            <Link 
              to="/contact" 
              className="shrink-0 bg-white text-[#ff4f01] px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 flex items-center group"
            >
              Speak to an Advisor
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
