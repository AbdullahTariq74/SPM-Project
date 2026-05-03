import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function TopNavBar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-primary dark:bg-surface-container-dark text-white z-50 flex items-center px-6 border-b border-white/5">
      <div className="flex items-center gap-4 w-64">
        <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-xl font-bold">bolt</span>
        </div>
        <div>
          <h1 className="text-sm font-black tracking-tighter leading-none">NEXUS PRO</h1>
          <p className="text-[9px] font-bold text-accent uppercase tracking-widest leading-none mt-1">Professional</p>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-auto px-4 hidden md:block">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors">search</span>
          <input 
            type="text" 
            placeholder="Search platform resources..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button onClick={toggleTheme} className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all">
          <span className="material-symbols-outlined text-xl">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center relative transition-all">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-primary"></span>
        </button>
        
        <div className="h-8 w-px bg-white/10 mx-2"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] font-black uppercase tracking-tight">
              {user ? `${user.first_name || ''} ${user.last_name || ''}` : 'User Profile'}
            </p>
            <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest">{user?.role || 'Freelancer'}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-700 border border-white/10 overflow-hidden">
            <img src={`https://ui-avatars.com/api/?name=${user?.first_name || 'U'}&background=random`} alt="avatar" />
          </div>
        </div>
      </div>
    </header>
  );
}
