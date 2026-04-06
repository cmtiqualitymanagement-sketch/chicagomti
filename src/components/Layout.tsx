import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Linkedin, Instagram, Youtube, MapPin, Phone, Mail, Search, User, ChevronDown, BookOpen } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import GreetingAssistant from './GreetingAssistant';
import { facilityCourses, constructionCourses } from '../pages/Courses';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allCourses = [
    ...facilityCourses.map(c => ({ ...c, category: 'Facility Management', path: '/courses#facility-management' })),
    ...constructionCourses.map(c => ({ ...c, category: 'Construction Management', path: '/courses#construction-management' }))
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCoursesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileCoursesOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
    { name: 'Location', path: '/location' },
  ];

  const courseCategories = [
    { name: 'Facility Management Courses', path: '/courses#facility-management' },
    { name: 'Construction Management Courses', path: '/courses#construction-management' },
  ];

  const filteredCategories = courseCategories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCourses = searchQuery.trim() !== '' 
    ? allCourses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleCategoryClick = (path: string) => {
    setIsCoursesDropdownOpen(false);
    setIsMobileCoursesOpen(false);
    setIsMenuOpen(false);
    setSearchQuery('');
    
    // If it's a hash link, navigate to courses then scroll
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (location.pathname !== route) {
        navigate(path);
      } else {
        // Already on courses page, just scroll
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate(path);
        }
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Top Bar */}
      <div className="bg-[#131d3b] text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={14} className="text-[#ff4f01]" />
              <a href="tel:+97143547997" className="hover:text-[#ff4f01] transition-colors cursor-pointer">+971 4 354 7997</a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-[#ff4f01]" />
              <a href="mailto:info@chicagomti.com" className="hover:text-[#ff4f01] transition-colors cursor-pointer">info@chicagomti.com</a>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com/chicagomti" target="_blank" rel="noopener noreferrer" title="Follow us on Facebook" className="hover:text-[#ff4f01] transition-colors cursor-pointer hover:scale-110 transform inline-block"><Facebook size={16} /></a>
            <a href="https://twitter.com/chicagomti" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter" className="hover:text-[#ff4f01] transition-colors cursor-pointer hover:scale-110 transform inline-block"><Twitter size={16} /></a>
            <a href="https://linkedin.com/company/chicagomti" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn" className="hover:text-[#ff4f01] transition-colors cursor-pointer hover:scale-110 transform inline-block"><Linkedin size={16} /></a>
            <a href="https://instagram.com/chicagomti" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram" className="hover:text-[#ff4f01] transition-colors cursor-pointer hover:scale-110 transform inline-block"><Instagram size={16} /></a>
            <a href="https://youtube.com/@chicagomti" target="_blank" rel="noopener noreferrer" title="Subscribe to our YouTube Channel" className="hover:text-[#ff4f01] transition-colors cursor-pointer hover:scale-110 transform inline-block"><Youtube size={16} /></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-3' : 'bg-white py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="https://image2url.com/r2/default/images/1773216404373-8cac231a-5de8-41e4-859b-a1834bcc222b.jpg" 
              alt="CMTI Logo" 
              className="h-20 md:h-28 w-auto object-contain rounded-md group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-bold text-[15px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#ff4f01] ${
                location.pathname === '/' ? 'text-[#ff4f01]' : 'text-[#131d3b]'
              }`}
            >
              Home
            </Link>

            {/* Courses Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setIsCoursesDropdownOpen(true)}
              onMouseLeave={() => setIsCoursesDropdownOpen(false)}
            >
              <button 
                className={`flex items-center font-bold text-[15px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#ff4f01] ${
                  location.pathname.startsWith('/courses') ? 'text-[#ff4f01]' : 'text-[#131d3b]'
                }`}
                onClick={() => navigate('/courses')}
              >
                Courses <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${isCoursesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden transition-all duration-300 origin-top-left ${
                  isCoursesDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search Courses..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4f01]/20 focus:border-[#ff4f01] transition-all"
                    />
                  </div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto py-2">
                  {searchQuery.trim() === '' ? (
                    // Show categories when no search query
                    courseCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategoryClick(category.path)}
                        className="w-full text-left px-5 py-3 text-sm font-medium text-gray-700 hover:bg-[#ff4f01]/5 hover:text-[#ff4f01] transition-colors flex items-center justify-between group"
                      >
                        {category.name}
                      </button>
                    ))
                  ) : (
                    // Show search results
                    <>
                      {filteredCategories.length > 0 && (
                        <div className="mb-2">
                          <div className="px-5 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</div>
                          {filteredCategories.map((category, index) => (
                            <button
                              key={`cat-${index}`}
                              onClick={() => handleCategoryClick(category.path)}
                              className="w-full text-left px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#ff4f01]/5 hover:text-[#ff4f01] transition-colors"
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {filteredCourses.length > 0 && (
                        <div>
                          <div className="px-5 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Courses</div>
                          {filteredCourses.map((course, index) => (
                            <button
                              key={`course-${index}`}
                              onClick={() => handleCategoryClick(course.path)}
                              className="w-full text-left px-5 py-3 text-sm font-medium text-gray-700 hover:bg-[#ff4f01]/5 hover:text-[#ff4f01] transition-colors flex flex-col"
                            >
                              <span className="font-bold text-[#131d3b] group-hover:text-[#ff4f01] mb-1 leading-tight">{course.title}</span>
                              <span className="text-xs text-gray-500 flex items-center"><BookOpen size={12} className="mr-1" /> {course.category}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {filteredCategories.length === 0 && filteredCourses.length === 0 && (
                        <div className="px-5 py-6 text-sm text-gray-500 text-center">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {navLinks.filter(link => link.name !== 'Home').map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-bold text-[15px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#ff4f01] ${
                  location.pathname === link.path ? 'text-[#ff4f01]' : 'text-[#131d3b]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-5 border-l border-gray-200 pl-8">
              <button className="text-[#131d3b] hover:text-[#ff4f01] transition-colors">
                <Search size={20} />
              </button>
              <Link to="/login" className="text-[#131d3b] hover:text-[#ff4f01] transition-colors flex items-center font-bold text-[13px] uppercase tracking-[0.1em]">
                <User size={18} className="mr-1.5" /> Login
              </Link>
              <Link 
                to="/contact" 
                className="bg-[#131d3b] text-white px-8 py-3 rounded-full font-black font-heading uppercase text-xs tracking-widest hover:bg-[#ff4f01] hover:shadow-[0_0_20px_rgba(255,79,1,0.3)] transition-all duration-300 hover:-translate-y-0.5 ml-2"
              >
                Enroll Now
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#131d3b] hover:text-[#ff4f01] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col px-6 py-4">
              <Link
                to="/"
                className={`py-4 border-b border-gray-100/50 font-bold uppercase text-base tracking-widest transition-colors ${
                  location.pathname === '/' ? 'text-[#ff4f01]' : 'text-[#131d3b]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Courses Dropdown */}
              <div className="border-b border-gray-100/50">
                <button
                  className={`w-full py-4 flex items-center justify-between font-bold uppercase text-base tracking-widest transition-colors ${
                    location.pathname.startsWith('/courses') ? 'text-[#ff4f01]' : 'text-[#131d3b]'
                  }`}
                  onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                >
                  Courses
                  <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileCoursesOpen ? 'rotate-180 text-[#ff4f01]' : ''}`} />
                </button>
                
                {/* Expandable Mobile Menu */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isMobileCoursesOpen ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="bg-gray-50 rounded-xl p-3 mb-2">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search Courses..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4f01]/20 focus:border-[#ff4f01] transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 pl-2 border-l-2 border-[#ff4f01]/20 ml-2 max-h-[50vh] overflow-y-auto">
                    {searchQuery.trim() === '' ? (
                      // Show categories when no search query
                      courseCategories.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => handleCategoryClick(category.path)}
                          className="text-left py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-[#ff4f01] hover:bg-[#ff4f01]/5 rounded-lg transition-colors"
                        >
                          {category.name}
                        </button>
                      ))
                    ) : (
                      // Show search results
                      <>
                        {filteredCategories.length > 0 && (
                          <div className="mb-2">
                            <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</div>
                            {filteredCategories.map((category, index) => (
                              <button
                                key={`mobile-cat-${index}`}
                                onClick={() => handleCategoryClick(category.path)}
                                className="w-full text-left py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-[#ff4f01] hover:bg-[#ff4f01]/5 rounded-lg transition-colors"
                              >
                                {category.name}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {filteredCourses.length > 0 && (
                          <div>
                            <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Courses</div>
                            {filteredCourses.map((course, index) => (
                              <button
                                key={`mobile-course-${index}`}
                                onClick={() => handleCategoryClick(course.path)}
                                className="w-full text-left py-3 px-3 text-sm font-medium text-gray-600 hover:text-[#ff4f01] hover:bg-[#ff4f01]/5 rounded-lg transition-colors flex flex-col"
                              >
                                <span className="font-bold text-[#131d3b] mb-1 leading-tight">{course.title}</span>
                                <span className="text-xs text-gray-500 flex items-center"><BookOpen size={12} className="mr-1" /> {course.category}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {filteredCategories.length === 0 && filteredCourses.length === 0 && (
                          <div className="py-4 px-3 text-sm text-gray-500 text-center">
                            No results found for "{searchQuery}"
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {navLinks.filter(link => link.name !== 'Home').map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-4 border-b border-gray-100/50 font-bold uppercase text-base tracking-widest transition-colors ${
                    location.pathname === link.path ? 'text-[#ff4f01]' : 'text-[#131d3b]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-6 pb-2 flex flex-col gap-4">
                <Link
                  to="/login"
                  className="flex items-center justify-center py-3 bg-gray-100 text-[#131d3b] rounded-xl font-bold uppercase text-sm tracking-widest transition-colors hover:bg-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" /> Login
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center py-3 bg-[#ff4f01] text-white rounded-xl font-bold uppercase text-sm tracking-widest transition-colors hover:bg-[#e64600]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#131d3b] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="https://image2url.com/r2/default/images/1773216404373-8cac231a-5de8-41e4-859b-a1834bcc222b.jpg" 
                  alt="CMTI Logo" 
                  className="h-20 md:h-28 w-auto object-contain rounded-md bg-white p-1"
                />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Chicago Institute for Management Training provides world-class professional certification courses to help you advance your career.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/chicagomti" target="_blank" rel="noopener noreferrer" title="Follow us on Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Facebook size={18} /></a>
                <a href="https://twitter.com/chicagomti" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Twitter size={18} /></a>
                <a href="https://linkedin.com/company/chicagomti" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Linkedin size={18} /></a>
                <a href="https://instagram.com/chicagomti" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Instagram size={18} /></a>
                <a href="https://youtube.com/@chicagomti" target="_blank" rel="noopener noreferrer" title="Subscribe to our YouTube Channel" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff4f01] transition-all cursor-pointer hover:scale-110"><Youtube size={18} /></a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-black uppercase mb-6 relative inline-block font-heading">
                Quick Links
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#ff4f01] -mb-2"></span>
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/" className="hover:text-[#ff4f01] transition-colors flex items-center"><span className="text-[#ff4f01] mr-2">›</span> Home</Link></li>
                <li><Link to="/courses" className="hover:text-[#ff4f01] transition-colors flex items-center"><span className="text-[#ff4f01] mr-2">›</span> Courses</Link></li>
                <li><Link to="/contact" className="hover:text-[#ff4f01] transition-colors flex items-center"><span className="text-[#ff4f01] mr-2">›</span> Contact Us</Link></li>
                <li><Link to="/location" className="hover:text-[#ff4f01] transition-colors flex items-center"><span className="text-[#ff4f01] mr-2">›</span> Location</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-black uppercase mb-6 relative inline-block font-heading">
                Our Courses
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#ff4f01] -mb-2"></span>
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/courses#facility-management" className="hover:text-[#ff4f01] transition-colors flex items-center"><span className="text-[#ff4f01] mr-2">›</span> Facility Management</Link></li>
                <li><Link to="/courses#construction-management" className="hover:text-[#ff4f01] transition-colors flex items-center"><span className="text-[#ff4f01] mr-2">›</span> Construction Management</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-black uppercase mb-6 relative inline-block font-heading">
                Contact Info
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#ff4f01] -mb-2"></span>
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <MapPin className="text-[#ff4f01] mt-1 mr-3 shrink-0" size={20} />
                  <span>303, Sarah Building, 43 2nd Street<br/>Al Garhoud, Dubai, UAE</span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-[#ff4f01] mr-3 shrink-0" size={20} />
                  <a href="tel:+97143547997" className="hover:text-[#ff4f01] transition-colors cursor-pointer">+971 4 354 7997</a>
                </li>
                <li className="flex items-center">
                  <Mail className="text-[#ff4f01] mr-3 shrink-0" size={20} />
                  <a href="mailto:info@chicagomti.com" className="hover:text-[#ff4f01] transition-colors cursor-pointer">info@chicagomti.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Chicago Institute for Management Training. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/971502459498"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white px-5 py-3.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center space-x-3 hover:bg-[#20bd5a] hover:-translate-y-1 hover:scale-105 transition-all duration-300 group cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="font-bold tracking-wide text-sm uppercase">Speak with us</span>
      </a>

      {/* Greeting Assistant */}
      <GreetingAssistant />
    </div>
  );
}
