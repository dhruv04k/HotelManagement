import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Room, RoomType } from '../../types/hotel';
import { RoomCard } from './RoomCard';
import { RoomDetailsModal } from './RoomDetailsModal';
import { Search, SlidersHorizontal, Sparkles, RotateCcw } from 'lucide-react';

interface RoomCollectionProps {
  onSelectBook: (room: Room) => void;
  activeFilterTier?: string;
}

export const RoomCollection: React.FC<RoomCollectionProps> = ({ onSelectBook, activeFilterTier = 'all' }) => {
  const { rooms } = useHotel();
  const [selectedTier, setSelectedTier] = useState<string>(activeFilterTier);
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomDetails, setSelectedRoomDetails] = useState<Room | null>(null);

  // Sync external filter if changed
  React.useEffect(() => {
    if (activeFilterTier) {
      setSelectedTier(activeFilterTier);
    }
  }, [activeFilterTier]);

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Tier filter
      if (selectedTier !== 'all' && room.type !== selectedTier) {
        return false;
      }
      // Floor filter
      if (selectedFloor !== 'all' && room.floor.toString() !== selectedFloor) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = room.name.toLowerCase().includes(query);
        const matchesDesc = room.description.toLowerCase().includes(query);
        const matchesAmenities = room.amenities.some(a => a.toLowerCase().includes(query));
        const matchesNumber = room.number.includes(query);
        if (!matchesName && !matchesDesc && !matchesAmenities && !matchesNumber) {
          return false;
        }
      }
      return true;
    });
  }, [rooms, selectedTier, selectedFloor, searchQuery]);

  return (
    <section id="rooms" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">
              Curated Accommodations
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Rooms, Suites & Oceanfront Sanctuaries
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every room is meticulously appointed with organic Italian linens, bespoke timber joinery, and panoramic coastal or private courtyard views.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Displaying <span className="text-slate-900 font-bold font-mono">{filteredRooms.length}</span> of {rooms.length} Suites
          </div>
        </div>

        {/* Filter Toolbar (Functional Segmented Buttons) */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Tier Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-lg shrink-0">
              <button
                onClick={() => setSelectedTier('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedTier === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Sanctuaries ({rooms.length})
              </button>
              <button
                onClick={() => setSelectedTier('penthouse')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedTier === 'penthouse'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Presidential Penthouse
              </button>
              <button
                onClick={() => setSelectedTier('suite')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedTier === 'suite'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Executive Suites
              </button>
              <button
                onClick={() => setSelectedTier('deluxe')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedTier === 'deluxe'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ocean Deluxe
              </button>
              <button
                onClick={() => setSelectedTier('standard')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedTier === 'standard'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Boutique Queen
              </button>
            </div>

            {/* Search Input & Floor Filter */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search amenities or room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                />
              </div>

              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Floors</option>
                <option value="1">Floor 1 (Gardens)</option>
                <option value="2">Floor 2 (Coastal)</option>
                <option value="3">Floor 3 (High Rise)</option>
                <option value="4">Floor 4 (Penthouses)</option>
              </select>

              {(selectedTier !== 'all' || selectedFloor !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedTier('all');
                    setSelectedFloor('all');
                    setSearchQuery('');
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Reset filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Room Grid */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                onSelectBook={onSelectBook}
                onOpenDetails={setSelectedRoomDetails}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-xl border border-slate-200 space-y-3">
            <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">No rooms match your filter criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your tier, floor, or keyword search to view available luxury accommodations.
            </p>
            <button
              onClick={() => {
                setSelectedTier('all');
                setSelectedFloor('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <RoomDetailsModal
        room={selectedRoomDetails}
        onClose={() => setSelectedRoomDetails(null)}
        onBook={onSelectBook}
      />
    </section>
  );
};
