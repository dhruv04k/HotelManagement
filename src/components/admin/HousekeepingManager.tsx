import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { HousekeepingTask } from '../../types/hotel';
import {
  Brush,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  User,
  Wrench,
  Search,
  Filter
} from 'lucide-react';

export const HousekeepingManager: React.FC = () => {
  const { housekeepingTasks, updateHousekeepingStatus, createHousekeepingTask, rooms } = useHotel();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  // New task form state
  const [newRoomId, setNewRoomId] = useState(rooms[0]?.id || '');
  const [newPriority, setNewPriority] = useState<HousekeepingTask['priority']>('normal');
  const [newAssigned, setNewAssigned] = useState('Maria Santos');
  const [newNotes, setNewNotes] = useState('');

  const filteredTasks = housekeepingTasks.filter(task => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (floorFilter !== 'all' && task.floor.toString() !== floorFilter) return false;
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoom = rooms.find(r => r.id === newRoomId);
    if (!targetRoom) return;

    createHousekeepingTask({
      roomId: targetRoom.id,
      roomNumber: targetRoom.number,
      floor: targetRoom.floor,
      status: 'dirty',
      priority: newPriority,
      assignedTo: newAssigned,
      notes: newNotes
    });

    setNewNotes('');
    setShowNewTaskModal(false);
  };

  const getPriorityBadge = (p: HousekeepingTask['priority']) => {
    switch (p) {
      case 'urgent':
        return <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded uppercase">Urgent Turnaround</span>;
      case 'high':
        return <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase">High Priority</span>;
      default:
        return <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase">Normal Routine</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Housekeeping & Room Turnaround Roster</h2>
          <p className="text-xs text-slate-500">
            Real-time cleanliness workflow. Marking a room clean immediately updates room availability across the hotel.
          </p>
        </div>

        <button
          onClick={() => setShowNewTaskModal(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Assign Turnaround Task</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Status Filters */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-lg">
          {['all', 'dirty', 'in_progress', 'clean', 'maintenance'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors whitespace-nowrap ${
                statusFilter === st ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Floor Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Floor:</span>
          {['all', '1', '2', '3', '4'].map(fl => (
            <button
              key={fl}
              onClick={() => setFloorFilter(fl)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                floorFilter === fl ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {fl === 'all' ? 'All' : `F${fl}`}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => {
            const isClean = task.status === 'clean';
            const isInProgress = task.status === 'in_progress';

            return (
              <div
                key={task.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold font-mono text-slate-900">
                      Room {task.roomNumber}
                    </span>
                    {getPriorityBadge(task.priority)}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>Floor {task.floor}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <User className="w-3 h-3 text-slate-400" />
                      {task.assignedTo}
                    </span>
                  </div>

                  {task.notes && (
                    <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700">
                      {task.notes}
                    </div>
                  )}
                </div>

                {/* Status Switcher Action Bar */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">
                    Update Task Status
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    <button
                      onClick={() => updateHousekeepingStatus(task.id, 'dirty')}
                      className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all ${
                        task.status === 'dirty'
                          ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Dirty
                    </button>
                    <button
                      onClick={() => updateHousekeepingStatus(task.id, 'in_progress')}
                      className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all ${
                        task.status === 'in_progress'
                          ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      In Cleaning
                    </button>
                    <button
                      onClick={() => updateHousekeepingStatus(task.id, 'clean')}
                      className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all ${
                        task.status === 'clean'
                          ? 'bg-emerald-700 text-white border-emerald-700 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      Ready / Clean
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
            No housekeeping tasks match the selected filters.
          </div>
        )}
      </div>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Assign Housekeeping Task</h3>
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Select Room</label>
                <select
                  value={newRoomId}
                  onChange={(e) => setNewRoomId(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-medium focus:outline-none"
                >
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      Room {room.number} · {room.name} (Floor {room.floor})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-medium focus:outline-none"
                >
                  <option value="normal">Normal Routine</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent Turnaround (Immediate Check-In)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Assigned Staff</label>
                <select
                  value={newAssigned}
                  onChange={(e) => setNewAssigned(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-medium focus:outline-none"
                >
                  <option value="Maria Santos">Maria Santos (Floor 1 Lead)</option>
                  <option value="Carlos Mendes">Carlos Mendes (Floor 2 Lead)</option>
                  <option value="Aisha Khan">Aisha Khan (Suites Specialist)</option>
                  <option value="Kevin Liu (Facilities)">Kevin Liu (Maintenance Lead)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Instructions / Notes</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Deep steam carpet, replenish Malin+Goetz toiletries, set temperature to 68F."
                  className="w-full p-2 border border-slate-300 rounded-lg font-medium focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
