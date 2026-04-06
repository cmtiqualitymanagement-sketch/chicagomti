import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MessageCircle, BookOpen, DollarSign, Phone, MessageSquare, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GreetingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const defaultMessage = `Hello 👋\nWelcome to CMTI Training Institute\n\nHow can we help you today?\n• Looking for a course?\n• Need course details?\n• Want to speak with our team?`;
  
  const [message, setMessage] = useState(defaultMessage);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('greetingDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;
    
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      if (isOpen && message === defaultMessage) {
        idleTimer = setTimeout(() => {
          setMessage("Need help choosing the right course? We're here to assist you 😊");
        }, 10000);
      }
    };

    if (isOpen) {
      resetIdleTimer();
      window.addEventListener('mousemove', resetIdleTimer);
      window.addEventListener('keypress', resetIdleTimer);
      window.addEventListener('scroll', resetIdleTimer);
      window.addEventListener('click', resetIdleTimer);
    }

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keypress', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
    };
  }, [isOpen, message, defaultMessage]);

  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
    sessionStorage.setItem('greetingDismissed', 'true');
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'courses':
        navigate('/courses');
        handleClose();
        break;
      case 'contact':
        navigate('/contact');
        handleClose();
        break;
      case 'fees':
        setMessage("Please select the course to view fees");
        break;
      case 'advisor':
        navigate('/contact');
        handleClose();
        break;
      case 'whatsapp':
        window.open('https://wa.me/971502459498', '_blank');
        handleClose();
        break;
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 z-50 w-[320px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#131d3b] text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#ff4f01] rounded-full flex items-center justify-center shadow-inner">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[15px] leading-tight">CMTI Assistant</h3>
                <div className="flex items-center mt-0.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                  <p className="text-xs text-gray-300">Online</p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="text-gray-300 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-gray-50 flex-grow max-h-[60vh] overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={message}
              className="bg-white p-3.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 mb-4 text-[14px] text-gray-700 whitespace-pre-line leading-relaxed"
            >
              {message}
            </motion.div>

            {/* Actions */}
            <div className="space-y-2">
              <button 
                onClick={() => handleAction('courses')}
                className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#131d3b] hover:border-[#ff4f01] hover:text-[#ff4f01] hover:shadow-sm transition-all flex items-center group"
              >
                <BookOpen size={18} className="mr-3 text-gray-400 group-hover:text-[#ff4f01] transition-colors" /> View Courses
              </button>
              <button 
                onClick={() => handleAction('contact')}
                className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#131d3b] hover:border-[#ff4f01] hover:text-[#ff4f01] hover:shadow-sm transition-all flex items-center group"
              >
                <Mail size={18} className="mr-3 text-gray-400 group-hover:text-[#ff4f01] transition-colors" /> Contact Us
              </button>
              <button 
                onClick={() => handleAction('fees')}
                className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#131d3b] hover:border-[#ff4f01] hover:text-[#ff4f01] hover:shadow-sm transition-all flex items-center group"
              >
                <DollarSign size={18} className="mr-3 text-gray-400 group-hover:text-[#ff4f01] transition-colors" /> Course Fees
              </button>
              <button 
                onClick={() => handleAction('advisor')}
                className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#131d3b] hover:border-[#ff4f01] hover:text-[#ff4f01] hover:shadow-sm transition-all flex items-center group"
              >
                <Phone size={18} className="mr-3 text-gray-400 group-hover:text-[#ff4f01] transition-colors" /> Talk to Advisor
              </button>
              <button 
                onClick={() => handleAction('whatsapp')}
                className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#131d3b] hover:border-[#25D366] hover:text-[#25D366] hover:shadow-sm transition-all flex items-center group"
              >
                <MessageSquare size={18} className="mr-3 text-gray-400 group-hover:text-[#25D366] transition-colors" /> WhatsApp Us
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
