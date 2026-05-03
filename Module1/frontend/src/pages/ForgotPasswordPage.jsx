import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
      addToast('Reset link sent to your email! ✅', 'success');
    } catch (err) {
      addToast('Failed to send reset link ❌', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
      
      <div className="w-full max-w-[420px] z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <span className="material-symbols-outlined text-4xl text-accent mb-4">lock_reset</span>
            <h1 className="text-2xl text-white font-black tracking-tighter uppercase">Reset Password</h1>
            <p className="text-slate-400 text-xs font-medium mt-2">Enter your email to receive a recovery link</p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="section-label text-white/50 block ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="input-field bg-white/5 border-white/10 text-white focus:border-accent/50"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary py-4">
                {loading ? 'Sending link...' : 'Send Recovery Link'}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="text-white font-bold mb-4">Check your inbox!</p>
              <p className="text-slate-400 text-sm mb-6">If an account exists for {email}, you will receive instructions shortly.</p>
              <button onClick={() => setSent(false)} className="btn-ghost">Try another email</button>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <Link to="/login" className="text-accent font-bold text-xs uppercase tracking-widest hover:underline">Return to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
