import React, { useState } from 'react';
import { LogIn, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: (token: string, userRole: string) => void;
}

const LoginModal: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    
    console.log('🔐 Login attempt:', { 
      username: trimmedUsername, 
      password: trimmedPassword,
      usernameLen: trimmedUsername.length, 
      passwordLen: trimmedPassword.length 
    });
    
    try {
      console.log('📡 Sending POST request to http://127.0.0.1:8000/api/auth/login');
      
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/login',
        {},
        {
          params: { 
            username: trimmedUsername, 
            password: trimmedPassword 
          }
        }
      );
      
      console.log('✅ Login successful:', response.data);
      
      localStorage.setItem('auth_token', response.data.access_token);
      localStorage.setItem('user_role', response.data.user.role);
      
      onLoginSuccess(response.data.access_token, response.data.user.role);
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || err.message || 'Login failed';
      const status = err.response?.status;
      console.error('❌ Login error:', { status, detail: errorMsg, fullError: err });
      console.error('Response:', err.response);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e17]">
      <div className="max-w-md w-full p-8 bg-[#11161d] rounded-2xl border border-slate-800 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <LogIn className="text-blue-500" size={32} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">TradeModel AI</h1>
        <p className="text-slate-400 text-center text-sm mb-6">Live Alpha Analysis Platform</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-2 bg-slate-900 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              className="w-full px-4 py-2 bg-slate-900 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold rounded-lg transition-colors mt-6"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="w-full mt-4 text-xs text-blue-400 hover:text-blue-300 text-center"
        >
          {showHelp ? '✕ Hide Demo Credentials' : '? Need Help?'}
        </button>
        
        {showHelp && (
          <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg text-xs text-slate-300">
            <p className="font-bold text-blue-400 mb-2">Demo Credentials:</p>
            <p className="mb-1"><span className="text-slate-400">Admin User:</span> admin / admin123</p>
            <p><span className="text-slate-400">Regular User:</span> trader / trader123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
