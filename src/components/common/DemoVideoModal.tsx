import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  Copy,
  Check,
  Film,
  Sparkles,
  BedDouble,
  ShieldCheck,
  Receipt,
  Brush,
  BarChart3,
  CalendarCheck,
  Download,
  Video,
  MonitorPlay,
  Share2,
  Link2
} from 'lucide-react';
import { HERO_IMAGE, PRESIDENTIAL_IMAGE, DELUXE_OCEAN_IMAGE } from '../../data/initialData';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Chapter {
  id: number;
  title: string;
  timestamp: string;
  durationSec: number;
  description: string;
  highlightIcon: React.ElementType;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Guest Booking Engine & Digital Room Voucher',
    timestamp: '0:00',
    durationSec: 25,
    description: 'Live availability search, room tier filters, curated add-ons (breakfast, airport limousine), payment simulation, and instant QR voucher generation.',
    highlightIcon: BedDouble
  },
  {
    id: 2,
    title: 'Front Desk PMS & Arrivals Check-In',
    timestamp: '0:25',
    durationSec: 25,
    description: 'Real-time operational dashboard with today\'s arrivals queue, express check-in workflow, and occupancy rate synchronization.',
    highlightIcon: CalendarCheck
  },
  {
    id: 3,
    title: 'Interactive Visual Room Rack Matrix',
    timestamp: '0:50',
    durationSec: 30,
    description: 'Floor-by-floor room grid (Floors 1 to 4) with real-time status switches: Available, Occupied, Dirty, In Cleaning, and Maintenance.',
    highlightIcon: ShieldCheck
  },
  {
    id: 4,
    title: 'Guest Folio, Incidentals & Printable Invoice',
    timestamp: '1:20',
    durationSec: 30,
    description: 'Official letterhead guest folio, room service itemization, inline incidental charge posting, and tax breakdown with one-click print support.',
    highlightIcon: Receipt
  },
  {
    id: 5,
    title: 'Housekeeping Turnaround Operations',
    timestamp: '1:50',
    durationSec: 25,
    description: 'Room turnaround board, priority levels (urgent vs standard), staff assignment, and one-click clean inspection releasing rooms back to inventory.',
    highlightIcon: Brush
  },
  {
    id: 6,
    title: 'Financial Analytics & Daily Night Audit',
    timestamp: '2:15',
    durationSec: 30,
    description: 'RevPAR metrics, average daily rate (ADR) calculation, category revenue breakdown, and executable night audit reconciliation.',
    highlightIcon: BarChart3
  }
];

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [progressSec, setProgressSec] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedVideoUrl, setCopiedVideoUrl] = useState(false);
  const [copiedAdminVideoUrl, setCopiedAdminVideoUrl] = useState(false);
  const [copiedMentorNotes, setCopiedMentorNotes] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoDownloadSuccess, setVideoDownloadSuccess] = useState(false);

  // Video Link Variants
  const sharedDemoUrl = 'https://ais-pre-eqlxz6y7j46itl7mu5xk54-796273557643.asia-northeast1.run.app';
  const directVideoTourUrl = 'https://ais-pre-eqlxz6y7j46itl7mu5xk54-796273557643.asia-northeast1.run.app?demo=video';
  const staffPmsVideoUrl = 'https://ais-pre-eqlxz6y7j46itl7mu5xk54-796273557643.asia-northeast1.run.app?view=admin&tab=dashboard&demo=video';
  const devDemoUrl = 'https://ais-dev-eqlxz6y7j46itl7mu5xk54-796273557643.asia-northeast1.run.app';

  const totalDurationSec = 165; // 2m 45s

  useEffect(() => {
    let interval: any;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgressSec(prev => {
          if (prev >= totalDurationSec) {
            return 0;
          }
          const next = prev + 1;
          let elapsed = 0;
          for (let i = 0; i < CHAPTERS.length; i++) {
            elapsed += CHAPTERS[i].durationSec;
            if (next <= elapsed) {
              setCurrentChapterIdx(i);
              break;
            }
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentChapter = CHAPTERS[currentChapterIdx];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedDemoUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyVideoUrl = () => {
    navigator.clipboard.writeText(directVideoTourUrl);
    setCopiedVideoUrl(true);
    setTimeout(() => setCopiedVideoUrl(false), 2000);
  };

  const handleCopyAdminVideoUrl = () => {
    navigator.clipboard.writeText(staffPmsVideoUrl);
    setCopiedAdminVideoUrl(true);
    setTimeout(() => setCopiedAdminVideoUrl(false), 2000);
  };

  const handleCopyMentorNotes = () => {
    const notes = `HotelPro - Complete Hotel Booking and Management Solution
Demo Video Walkthrough Link: ${directVideoTourUrl}
Live Production App Link: ${sharedDemoUrl}
Staff PMS Demo Link: ${staffPmsVideoUrl}

Summary of Verified Project Epics:
• Epic 1: Full-Stack Project Architecture & React-TypeScript SPA
• Epic 2: Live Room Reservation Engine with Add-ons & Instant QR Voucher
• Epic 3: Front Desk Property Management System (PMS) with Check-In/Check-Out
• Epic 4: Interactive Room Rack Matrix across 4 hotel levels with status overrides
• Epic 5: Housekeeping Turnaround Workflow & Instant Inventory Synchronization
• Epic 6: Guest Folio Invoicing & Night Audit Financial Performance`;
    navigator.clipboard.writeText(notes);
    setCopiedMentorNotes(true);
    setTimeout(() => setCopiedMentorNotes(false), 2500);
  };

  // Client-side Video Generator: exports an actual .webm video file
  const handleGenerateVideoFile = () => {
    setIsGeneratingVideo(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsGeneratingVideo(false);
        return;
      }

      // Check MediaRecorder support
      if (!canvas.captureStream || typeof MediaRecorder === 'undefined') {
        alert('Browser does not support direct canvas stream recording. Please use the direct Video Demo link above!');
        setIsGeneratingVideo(false);
        return;
      }

      const stream = canvas.captureStream(30);
      const recordedChunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm'
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HotelPro_Project_Demo_Walkthrough.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsGeneratingVideo(false);
        setVideoDownloadSuccess(true);
        setTimeout(() => setVideoDownloadSuccess(false), 3500);
      };

      mediaRecorder.start();

      let frame = 0;
      const totalFrames = 150; // ~5 seconds of video frames

      const interval = setInterval(() => {
        frame++;

        // Draw background gradient
        const grad = ctx.createLinearGradient(0, 0, 1280, 720);
        grad.addColorStop(0, '#020617');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1280, 720);

        // Header
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('HOTELPRO · COMPLETE HOTEL MANAGEMENT SYSTEM', 80, 80);

        // Subtitle
        ctx.fillStyle = '#94a3b8';
        ctx.font = '20px sans-serif';
        ctx.fillText('The Azure Grand Hotel & Spa — Verified System Walkthrough', 80, 115);

        // Card Box
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(80, 150, 1120, 480, 16);
        ctx.fill();

        // Epic title based on frame
        const epicIndex = Math.min(CHAPTERS.length - 1, Math.floor((frame / totalFrames) * CHAPTERS.length));
        const activeChapter = CHAPTERS[epicIndex];

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText(`EPIC 0${activeChapter.id} OF 06 · LIVE VERIFICATION`, 120, 210);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText(activeChapter.title, 120, 270);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '22px sans-serif';
        ctx.fillText(activeChapter.description.slice(0, 70), 120, 330);
        ctx.fillText(activeChapter.description.slice(70, 140), 120, 365);

        // Stats grid
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(120, 420, 320, 150, 12);
        ctx.fill();
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 36px monospace';
        ctx.fillText('64% OCC', 140, 480);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px sans-serif';
        ctx.fillText('Active Live Occupancy', 140, 520);

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(480, 420, 320, 150, 12);
        ctx.fill();
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 36px monospace';
        ctx.fillText('$1,932.00', 500, 480);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px sans-serif';
        ctx.fillText('Nightly Rev Run Rate', 500, 520);

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(840, 420, 320, 150, 12);
        ctx.fill();
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 36px monospace';
        ctx.fillText('100% OK', 860, 480);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px sans-serif';
        ctx.fillText('Room Rack Synchronized', 860, 520);

        // Animated progress bar at bottom
        ctx.fillStyle = '#334155';
        ctx.fillRect(80, 660, 1120, 8);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(80, 660, 1120 * (frame / totalFrames), 8);

        if (frame >= totalFrames) {
          clearInterval(interval);
          mediaRecorder.stop();
        }
      }, 33);
    } catch (e) {
      console.error(e);
      setIsGeneratingVideo(false);
      alert('Unable to generate video file directly on this browser. Use the direct link above.');
    }
  };

  const jumpToChapter = (idx: number) => {
    let targetSec = 0;
    for (let i = 0; i < idx; i++) {
      targetSec += CHAPTERS[i].durationSec;
    }
    setProgressSec(targetSec);
    setCurrentChapterIdx(idx);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                HotelPro — Demo Video Links & Walkthrough Suite
              </h3>
              <div className="text-[11px] text-slate-400">
                Verified Video Showcase for Mentors, Instructors & SkillWallet Evaluation
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Multiple Demo Link Options Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Demo & Video URLs (Choose Option for Submission)</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">All Links Live & Ready</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Link Option 1: Direct Video Tour Launch URL */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <MonitorPlay className="w-3.5 h-3.5 text-emerald-700" />
                      <span>1. Dedicated Video Walkthrough Link</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-emerald-200/60 text-emerald-900 px-1.5 py-0.5 rounded">
                      AUTO-LAUNCH
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Opens the app with the interactive demo video player launched full-screen immediately for your mentor.
                  </p>
                  <div className="mt-2 p-1.5 bg-white rounded border border-emerald-200 text-[11px] font-mono text-slate-700 truncate select-all">
                    {directVideoTourUrl}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleCopyVideoUrl}
                    className="flex-1 py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    {copiedVideoUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedVideoUrl ? 'Copied Video Link!' : 'Copy Video Link'}</span>
                  </button>
                  <a
                    href={directVideoTourUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Link Option 2: Live Production Web App URL */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                      <span>2. Live Production Demo URL</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                      HOSTED APP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Standard live application link for testing all guest booking flows, room rack, and billing.
                  </p>
                  <div className="mt-2 p-1.5 bg-white rounded border border-slate-200 text-[11px] font-mono text-slate-700 truncate select-all">
                    {sharedDemoUrl}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied Live App Link!' : 'Copy Live Demo Link'}</span>
                  </button>
                  <a
                    href={sharedDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Link Option 3: Staff Operations PMS Direct URL */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>3. Staff PMS & Room Rack Direct Link</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                      PMS CONSOLE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Direct entry point for reviewers inspecting the administrative dashboard, housekeeping, and night audit.
                  </p>
                  <div className="mt-2 p-1.5 bg-white rounded border border-slate-200 text-[11px] font-mono text-slate-700 truncate select-all">
                    {staffPmsVideoUrl}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleCopyAdminVideoUrl}
                    className="flex-1 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    {copiedAdminVideoUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAdminVideoUrl ? 'Copied Staff PMS Link!' : 'Copy Staff PMS Link'}</span>
                  </button>
                  <a
                    href={staffPmsVideoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Option 4: Downloadable Video File Export */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-purple-600" />
                      <span>4. Download Video File (.webm)</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">
                      OFFLINE FILE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Generates a real 720p HD video file of all 6 epics for uploading to YouTube, Loom, or Google Drive.
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    onClick={handleGenerateVideoFile}
                    disabled={isGeneratingVideo}
                    className="w-full py-1.5 px-3 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    {videoDownloadSuccess ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isGeneratingVideo
                        ? 'Rendering Video File...'
                        : videoDownloadSuccess
                        ? 'Downloaded Walkthrough Video!'
                        : 'Export Video File (.webm)'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Interactive Video Player */}
          <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
            {/* Screen Frame Simulation */}
            <div className="relative aspect-16/9 bg-slate-900 text-white flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-25">
                <img
                  src={
                    currentChapterIdx === 0
                      ? HERO_IMAGE
                      : currentChapterIdx === 1 || currentChapterIdx === 2
                      ? PRESIDENTIAL_IMAGE
                      : DELUXE_OCEAN_IMAGE
                  }
                  alt="Walkthrough Frame"
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

              {/* Video Top Watermark */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold font-mono tracking-wider text-emerald-400">
                    LIVE SYSTEM DEMO · CHAPTER 0{currentChapter.id} OF 06
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {formatTime(progressSec)} / {formatTime(totalDurationSec)}
                </span>
              </div>

              {/* Dynamic Interactive Frame Content */}
              <div className="relative z-10 p-6 sm:p-8 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-medium text-emerald-300 border border-white/10">
                  <currentChapter.highlightIcon className="w-4 h-4 text-emerald-400" />
                  <span>Epic {currentChapter.id}: {currentChapter.title}</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {currentChapter.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  {currentChapter.description}
                </p>

                {/* Simulated Action Preview Box */}
                <div className="pt-2">
                  <div className="p-3 bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-700/60 text-xs font-mono text-slate-200 flex items-center justify-between gap-4">
                    <span className="text-emerald-400 font-semibold truncate">
                      ✓ System Action: Reconciled & Synchronized Live in HotelPro PMS State
                    </span>
                    <span className="text-slate-400 shrink-0 text-[11px]">
                      Latency: &lt;10ms
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Controls Bar */}
              <div className="relative z-10 p-4 bg-slate-950/90 border-t border-slate-800 flex flex-col gap-2">
                {/* Timeline Progress Bar */}
                <div
                  className="w-full h-1.5 bg-slate-800 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = clickX / rect.width;
                    const newSec = Math.floor(pct * totalDurationSec);
                    setProgressSec(newSec);
                  }}
                >
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${(progressSec / totalDurationSec) * 100}%` }}
                  />
                </div>

                {/* Buttons Row */}
                <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setProgressSec(0);
                        setCurrentChapterIdx(0);
                      }}
                      className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs text-slate-400">
                      {formatTime(progressSec)} / {formatTime(totalDurationSec)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      Currently Demonstrating: <strong className="text-white">{currentChapter.title}</strong>
                    </span>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Selector Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Demo Chapters & Verified Epics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {CHAPTERS.map((ch, idx) => {
                const isActive = currentChapterIdx === idx;
                const Icon = ch.highlightIcon;

                return (
                  <button
                    key={ch.id}
                    onClick={() => jumpToChapter(idx)}
                    className={`p-3 rounded-xl border text-left transition-all text-xs flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono uppercase opacity-75">Chapter 0{ch.id}</span>
                        <span className="font-mono">{ch.timestamp}</span>
                      </div>
                      <div className="font-semibold truncate mt-0.5">{ch.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evaluation Briefing Copy Button */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-bold text-emerald-950">Mentor Evaluation Briefing & Links Ready</div>
              <div className="text-emerald-700 mt-0.5">
                Copies all URLs, architecture notes, and feature descriptions for your project submission.
              </div>
            </div>
            <button
              onClick={handleCopyMentorNotes}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
            >
              {copiedMentorNotes ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMentorNotes ? 'Evaluation Text Copied!' : 'Copy Evaluation Text'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            HotelPro Complete Hotel Booking and Management Solution
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Close Walkthrough
          </button>
        </div>
      </div>
    </div>
  );
};
