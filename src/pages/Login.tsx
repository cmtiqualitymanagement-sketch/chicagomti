import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f9fafc] pt-32 pb-20 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
      >
        {isLoggedIn ? (
          <div className="text-center py-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 size={40} className="text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-black text-[#131d3b] font-heading uppercase mb-2">Login Successful</h2>
            <p className="text-gray-600">Redirecting to your dashboard...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-[#131d3b] font-heading uppercase tracking-tight mb-2">Student Login</h1>
              <p className="text-gray-500 text-sm">Access your course materials and dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-bold text-[#131d3b] uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff4f01] focus:border-transparent transition-all outline-none text-gray-700"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-[#131d3b] uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-bold text-[#ff4f01] hover:text-[#131d3b] transition-colors">Forgot Password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="password" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff4f01] focus:border-transparent transition-all outline-none text-gray-700"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-[#131d3b] text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#ff4f01] hover:shadow-[0_0_20px_rgba(255,79,1,0.3)] transition-all duration-300 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? 'Logging in...' : 'Login to Portal'}
                {!isLoggingIn && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <Link to="/contact" className="font-bold text-[#ff4f01] hover:text-[#131d3b] transition-colors">
                  Contact us to enroll
                </Link>
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
