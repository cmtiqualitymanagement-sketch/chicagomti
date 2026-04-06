import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, BookOpen, Users, Award, Briefcase, RefreshCw, UserCheck, Lightbulb, Headset, FileText, Globe, Laptop, TrendingUp, GraduationCap, Library, MapPin, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import HeroSlider from '../components/HeroSlider';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const whyChooseUs = [
  { icon: Briefcase, title: "Industry Expertise Since 2006", desc: "Developing skilled professionals with years of training excellence." },
  { icon: RefreshCw, title: "Free Retraining Support", desc: "Continue improving your skills with complimentary retraining access." },
  { icon: UserCheck, title: "Certified Experience Trainer", desc: "Learn from experienced industry professionals and certified instructors." },
  { icon: Lightbulb, title: "Training Need Analysis", desc: "Innovative training approaches designed for practical knowledge." },
  { icon: Headset, title: "Unlimited Stimulation", desc: "Guidance from enrollment to certification and career development." },
  { icon: FileText, title: "Exam & Certification Assistance", desc: "Support for international certification exam registration." },
  { icon: BookOpen, title: "Comprehensive Study Resources", desc: "Access detailed course materials and learning tools." },
  { icon: Globe, title: "Learning Management System (LMS) Access", desc: "Internationally recognized courses designed for career growth." },
  { icon: Laptop, title: "Popular Online Training Programs", desc: "Flexible learning through live and recorded online classes." },
  { icon: TrendingUp, title: "Career Growth Focus", desc: "Programs designed to improve job opportunities and professional security." },
  { icon: GraduationCap, title: "Experienced Faculty", desc: "Qualified trainers with real industry knowledge." },
  { icon: Library, title: "Library & Learning Materials", desc: "Access books, digital resources, and study guides." },
  { icon: MapPin, title: "Flexible Learning Anywhere", desc: "Study anytime from anywhere with accessible training systems." },
  { icon: CreditCard, title: "Flexible Fees & Payment Plans", desc: "Convenient payment options for all learners." },
];

export default function Home() {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      exit={{ opacity: 0 }}
    >
      {/* Premium Professional Hero Slider */}
      <HeroSlider />

      {/* Categories Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-sm font-bold uppercase text-[#ff4f01] tracking-widest mb-3 font-sans">Our Programs</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#131d3b] mb-6 font-heading">Explore Our Main Categories</h3>
            <div className="h-1 w-24 bg-[#ff4f01] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Facility Management */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#131d3b]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src="https://image2url.com/r2/default/images/1775125495461-c717facf-7459-4cea-b425-fb95d7d9515b.webp" 
                  alt="Facility Management" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 right-6 z-20 bg-white p-3 rounded-xl shadow-md">
                  <Briefcase className="text-[#ff4f01]" size={28} />
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold text-[#ff4f01] mb-4 font-heading group-hover:text-[#131d3b] transition-colors">Facility Management Courses</h4>
                <p className="text-black font-medium mb-6 leading-relaxed text-lg font-sans">
                  Master the skills needed to ensure the functionality, comfort, safety, and efficiency of the built environment by integrating people, place, process, and technology.
                </p>
                
                {/* Inside Courses List One by One */}
                <div className="flex flex-col gap-3 mb-8 flex-grow">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-3 mt-0.5" size={20} />
                    <span className="text-black font-medium">Real estate and property management</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-3 mt-0.5" size={20} />
                    <span className="text-black font-medium">Business and finance management</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-3 mt-0.5" size={20} />
                    <span className="text-black font-medium">Sustainability and risk management</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-3 mt-0.5" size={20} />
                    <span className="text-black font-medium">Leadership skills</span>
                  </div>
                </div>

                <Link 
                  to="/courses" 
                  className="inline-flex items-center justify-center w-full bg-[#131d3b] text-white px-6 py-4 rounded-xl font-black font-heading uppercase tracking-wide hover:bg-[#ff4f01] transition-colors group/link mt-auto"
                >
                  View Courses <ArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Construction Management */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#131d3b]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src="https://image2url.com/r2/default/images/1775126858455-dc615d07-d638-49f2-b960-3b90122d90f2.jpg" 
                  alt="Construction Management" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 right-6 z-20 bg-white p-3 rounded-xl shadow-md">
                  <Laptop className="text-[#ff4f01]" size={28} />
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold text-[#ff4f01] mb-4 font-heading group-hover:text-[#131d3b] transition-colors">Construction Management Courses</h4>
                <p className="text-black font-medium mb-6 leading-relaxed text-lg font-sans">
                  Develop the expertise to oversee construction projects from conception to completion, managing time, cost, quality, safety, and scope effectively.
                </p>
                
                {/* Inside Courses List One by One */}
                <div className="flex flex-col gap-3 mb-8 flex-grow">
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-3 mt-0.5" size={20} />
                    <span className="text-black font-medium">Construction practices</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-3 mt-0.5" size={20} />
                    <span className="text-black font-medium">Green construction</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="text-[#ff4f01] shrink-0 mr-3 mt-0.5" size={20} />
                    <span className="text-black font-medium">Project report</span>
                  </div>
                </div>

                <Link 
                  to="/courses" 
                  className="inline-flex items-center justify-center w-full bg-[#131d3b] text-white px-6 py-4 rounded-xl font-black font-heading uppercase tracking-wide hover:bg-[#ff4f01] transition-colors group/link mt-auto"
                >
                  View Courses <ArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose CMTI Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#131d3b] mb-6 font-heading tracking-tight">
              Why Choose CMTI
            </h2>
            <p className="text-xl text-black font-medium font-sans">
              Elevate Your Professional Journey with Industry-Focused Training
            </p>
            <div className="h-1 w-24 bg-[#ff4f01] mx-auto rounded-full mt-8"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseUs.slice(0, 8).map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#ff4f01] text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#131d3b] mb-3 font-heading leading-tight">{feature.title}</h3>
                <p className="text-black font-medium text-sm leading-relaxed font-sans">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 text-center border-t border-gray-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight font-heading text-[#131d3b]">Ready to Validate Your Skills and Competency</h2>
            <p className="text-xl md:text-2xl mb-10 font-medium text-black">Join thousands of professionals who have transformed their careers with our certification programs.</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center bg-[#ff4f01] text-white px-10 py-4 rounded-xl font-black font-heading uppercase tracking-wide transition-all hover:shadow-xl hover:-translate-y-1 text-lg hover:bg-[#131d3b]"
            >
              Contact Us <ArrowRight className="ml-2" size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
