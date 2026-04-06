import { MapPin, Navigation, Clock, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';

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

export default function Location() {
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
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
        ></motion.div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl font-black mb-6 tracking-tight font-heading">Our Location</motion.h1>
          <motion.p variants={fadeIn} className="text-xl text-gray-300 max-w-2xl mx-auto font-light">Visit our state-of-the-art training facility in the heart of Chicago.</motion.p>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20"
          >
            
            {/* Address Card */}
            <motion.div variants={fadeIn} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center group hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#ff4f01] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-[#ff4f01]/10 text-[#ff4f01] rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#ff4f01] group-hover:text-white transition-colors duration-500 rotate-3 group-hover:-rotate-3">
                <MapPin size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase text-[#131d3b] mb-4 font-heading">Main Campus</h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                303, Sarah Building, 43 2nd Street<br/>
                Near GGICO Metro Station<br/>
                Al Garhoud, Dubai, UAE
              </p>
              <a 
                href="https://maps.google.com/?q=303+Sarah+Building,+43+2nd+Street,+Near+GGICO+Metro+Station,+Al+Garhoud,+Dubai,+United+Arab+Emirates" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-gray-50 hover:bg-[#ff4f01] text-[#131d3b] hover:text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 group-hover:shadow-md"
              >
                Get Directions <Navigation size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>

            {/* Contact Card */}
            <motion.div variants={fadeIn} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center group hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#ff4f01] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-[#ff4f01]/10 text-[#ff4f01] rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#ff4f01] group-hover:text-white transition-colors duration-500 -rotate-3 group-hover:rotate-3">
                <Phone size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase text-[#131d3b] mb-4 font-heading">Contact Info</h3>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <a href="tel:+97143547997" className="flex items-center justify-center hover:text-[#ff4f01] transition-colors"><Phone size={18} className="mr-3 text-[#ff4f01]" /> +971 4 354 7997</a>
                <a href="tel:+971502459498" className="flex items-center justify-center hover:text-[#ff4f01] transition-colors"><Phone size={18} className="mr-3 text-[#ff4f01]" /> +971 50 245 9498</a>
                <a href="mailto:info@chicagomti.com" className="flex items-center justify-center mt-6 hover:text-[#ff4f01] transition-colors"><Mail size={18} className="mr-3 text-[#ff4f01]" /> info@chicagomti.com</a>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div variants={fadeIn} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center group hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#ff4f01] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-[#ff4f01]/10 text-[#ff4f01] rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#ff4f01] group-hover:text-white transition-colors duration-500 rotate-3 group-hover:-rotate-3">
                <Clock size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase text-[#131d3b] mb-4 font-heading">Opening Hours</h3>
              <ul className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <li className="flex justify-between border-b border-gray-100 pb-3">
                  <span>Mon - Sat</span>
                  <span className="font-semibold text-[#131d3b]">09:00 AM - 09:00 PM</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span>Sunday</span>
                  <span className="font-semibold text-[#ff4f01]">Closed</span>
                </li>
              </ul>
            </motion.div>

          </motion.div>

          {/* Large Map */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 h-[600px] relative group"
          >
            <div className="absolute inset-0 bg-[#131d3b]/10 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none"></div>
            <iframe 
              src="https://maps.google.com/maps?q=303%20Sarah%20Building%20Al%20Garhoud%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
              className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
