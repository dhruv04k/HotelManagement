import React, { useState } from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/guest/HeroSection';
import { RoomCollection } from './components/guest/RoomCollection';
import { ResortAmenities } from './components/guest/ResortAmenities';
import { HotelStory } from './components/guest/HotelStory';
import { BookingModal } from './components/guest/BookingModal';
import { MyReservationModal } from './components/guest/MyReservationModal';
import { DemoVideoModal } from './components/common/DemoVideoModal';
import { AdminConsole } from './components/admin/AdminConsole';
import { Footer } from './components/common/Footer';
import { Room } from './types/hotel';
import { PlayCircle, ExternalLink, Check, Copy } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setAdminTab,
    isBookingModalOpen,
    setIsBookingModalOpen,
    selectedRoomForBooking,
    setSelectedRoomForBooking
  } = useHotel();

  const [filterTier, setFilterTier] = useState<string>('all');
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [isDemoVideoOpen, setIsDemoVideoOpen] = useState(false);
  const [copiedBannerLink, setCopiedBannerLink] = useState(false);

  const sharedDemoUrl = 'https://ais-pre-eqlxz6y7j46itl7mu5xk54-796273557643.asia-northeast1.run.app';

  // Check URL query parameters on load
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('demo') === 'video' || params.get('video') === 'true' || params.get('tour') === 'true') {
        setIsDemoVideoOpen(true);
      }
      if (params.get('view') === 'admin') {
        setCurrentView('admin');
      }
      const tabParam = params.get('tab');
      if (tabParam) {
        setAdminTab(tabParam as any);
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
  }, [setCurrentView, setAdminTab]);

  const handleHeroSearch = (checkIn: string, checkOut: string, guests: number, tier: string) => {
    setFilterTier(tier);
  };

  const handleSelectBook = (room: Room) => {
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  const handleCopyDemoLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sharedDemoUrl);
    setCopiedBannerLink(true);
    setTimeout(() => setCopiedBannerLink(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Mentor & Evaluator Top Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">
              SkillWallet Project Evaluation Ready:
            </span>
            <span className="text-slate-400 hidden md:inline">
              HotelPro Full-Stack Hotel Booking & PMS Solution
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDemoVideoOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Watch Demo Walkthrough</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={handleCopyDemoLink}
              className="text-slate-300 hover:text-white font-mono text-[11px] flex items-center gap-1 transition-colors"
              title="Copy public shared demo link"
            >
              {copiedBannerLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedBannerLink ? 'Link Copied!' : 'Copy Demo URL'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar Navigation */}
      <Navbar
        onOpenBookingModal={() => {
          setSelectedRoomForBooking(null);
          setIsBookingModalOpen(true);
        }}
        onOpenLookupModal={() => setIsLookupModalOpen(true)}
        onOpenDemoVideo={() => setIsDemoVideoOpen(true)}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'guest' ? (
          <main>
            <HeroSection onSearch={handleHeroSearch} />
            <RoomCollection
              onSelectBook={handleSelectBook}
              activeFilterTier={filterTier}
            />
            <ResortAmenities />
            <HotelStory />
          </main>
        ) : (
          <AdminConsole
            onOpenNewBooking={() => {
              setSelectedRoomForBooking(null);
              setIsBookingModalOpen(true);
            }}
          />
        )}
      </div>

      {/* Persistent Global Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedRoomForBooking(null);
        }}
        preselectedRoom={selectedRoomForBooking}
      />

      <MyReservationModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
      />

      <DemoVideoModal
        isOpen={isDemoVideoOpen}
        onClose={() => setIsDemoVideoOpen(false)}
      />

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <HotelProvider>
      <MainLayout />
    </HotelProvider>
  );
}
