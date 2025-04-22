import React from 'react';
import { useAuth } from '../services/auth';

interface ToolbarProps {
  onMenuClick: () => void;
}

export default function Toolbar({ onMenuClick }: ToolbarProps) {
  const { user } = useAuth();

  return (
    <div className="bg-[#673ab7] fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-white hover:bg-white/20 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <span className="ml-2 text-white font-semibold text-lg select-none">Pedidos</span>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-2">
          <button className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <button className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full text-white relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">6</span>
            </div>
          </button>

          <button className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
