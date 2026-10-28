import React from 'react';
import { Building2, Shield, Heart } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setAdminTab } = useHotel();

  return (
    <footer className="no-print bg-slate-950 text-slate-400 text-xs border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>HotelPro · The Azure Grand Hotel & Spa</span>
            </div>
            <p className="mt-1 text-slate-400 text-xs max-w-md">
              Comprehensive hotel reservation engine and property management system designed for independent luxury resorts and hospitality groups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <button
              onClick={() => {
                setCurrentView('guest');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Guest Booking Portal
            </button>
            <span className="text-slate-800">/</span>
            <button
              onClick={() => {
                setCurrentView('admin');
                setAdminTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Staff PMS Roster
            </button>
            <span className="text-slate-800">/</span>
            <button
              onClick={() => {
                setCurrentView('admin');
                setAdminTab('rooms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Room Rack
            </button>
            <span className="text-slate-800">/</span>
            <button
              onClick={() => {
                setCurrentView('admin');
                setAdminTab('analytics');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Revenue Analytics
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} The Azure Grand Hotel & Spa. HotelPro Hospitality Management System.
          </div>
          <div className="flex items-center gap-4">
            <span>PCI-DSS Level 1 Encrypted</span>
            <span>·</span>
            <span>GDPR Compliant</span>
            <span>·</span>
            <span>ISO 27001 Certified Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
