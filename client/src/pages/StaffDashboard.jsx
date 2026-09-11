import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ComplaintsContext } from '../context/ComplaintsContext';
import StatusBadge from '../components/StatusBadge';
import SlaBadge from '../components/SlaBadge';
import ImageModal from '../components/ImageModal';
import { 
  CheckSquare, AlertTriangle, MessageSquare, Search, RefreshCw 
} from 'lucide-react';

export const StaffDashboard = () => {
  const { user } = useContext(AuthContext);
  const { complaints, updateComplaintStatus } = useContext(ComplaintsContext);

  const [selectedImage, setSelectedImage] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    block: user?.hostelBlock || 'All',
    status: 'All',
    category: 'All',
    urgency: 'All',
    breached: 'false',
    search: ''
  });

  // Action Update Modal state
  const [updateModalTicket, setUpdateModalTicket] = useState(null);
  const [targetStatus, setTargetStatus] = useState('Acknowledged');
  const [actionNote, setActionNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!actionNote.trim()) {
      alert('A mandatory action note is required explaining what action was taken.');
      return;
    }

    setUpdating(true);
    const updatedTicketId = updateModalTicket._id;

    updateComplaintStatus(
      updatedTicketId,
      targetStatus,
      actionNote,
      user?.name || 'Assigned Staff',
      user?.role || 'staff'
    );

    try {
      await axios.put(`/api/complaints/${updatedTicketId}/status`, {
        status: targetStatus,
        note: actionNote
      });
    } catch (err) {
      console.warn('Status updated locally');
    }

    setUpdateModalTicket(null);
    setActionNote('');
    setUpdating(false);
  };

  // Determine if logged-in user is Mess Staff vs Hostel Warden
  const isMessStaff = (user?.email === 'mess.alpha@lpu.in') || 
                      (user?.hostelBlock === 'Mess Alpha') || 
                      (user?.email || '').toLowerCase().includes('mess') || 
                      (user?.hostelBlock || '').toLowerCase().includes('mess');

  // Filter complaints list specifically for user role
  const filteredComplaints = complaints.filter(ticket => {
    // 1. Mess staff role filter: ONLY food / mess related complaints!
    if (isMessStaff) {
      const cat = (ticket.category || '').toLowerCase();
      const title = (ticket.title || '').toLowerCase();
      const desc = (ticket.description || '').toLowerCase();
      const isFood = ticket.type === 'mess' || 
                     ticket.block === 'Mess Alpha' ||
                     cat.includes('food') || 
                     cat.includes('mess') || 
                     cat.includes('dining') || 
                     title.includes('food') || 
                     title.includes('mess') || 
                     desc.includes('food') || 
                     desc.includes('mess');
      if (!isFood) return false;
    }

    // 2. User manual UI filters
    if (filters.block !== 'All' && ticket.block !== filters.block) return false;
    if (filters.status !== 'All' && ticket.status !== filters.status) return false;
    if (filters.urgency !== 'All' && ticket.urgency !== filters.urgency) return false;
    if (filters.breached === 'true' && !ticket.isSlaBreached) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match = ticket.ticketId?.toLowerCase().includes(q) ||
                    ticket.title?.toLowerCase().includes(q) ||
                    ticket.studentName?.toLowerCase().includes(q) ||
                    ticket.roomNo?.toLowerCase().includes(q) ||
                    ticket.category?.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 max-w-7xl mx-auto">
      {/* Role Notice Banner */}
      <div className={`mb-4 px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-2 ${
        isMessStaff 
          ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300' 
          : 'bg-amber-950/80 border-amber-800 text-amber-300'
      }`}>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-current animate-ping inline-block" />
          {isMessStaff 
            ? '🍽️ Mess Operations Portal — Displaying Food & Dining Complaints Only' 
            : `🏢 Hostel Operations Portal — ${user?.hostelBlock || 'Hostel'} Warden View`}
        </span>
        <span className="font-mono text-[10px] opacity-80">Live Synced with Student Submissions</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white flex items-center gap-2">
            {isMessStaff ? 'Mess Operations & Dining Portal' : 'Staff & Warden Action Portal'}{' '}
            <span className="text-xs px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800 font-mono">{user?.hostelBlock || 'BH-1'}</span>
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 mt-1">
            Logged in as <strong className="text-white">{user?.name || 'Assigned Staff'}</strong> ({user?.staffUnit || 'Operations Unit'}). Respond within SLA.
          </p>
        </div>

        <button
          onClick={() => setFilters({ ...filters })}
          className="self-start md:self-auto px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white flex items-center gap-2 text-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Live Tickets
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
          <input
            type="text"
            placeholder="Search Ticket ID, title, student, room..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Raised">Raised (Pending)</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Reopened">Reopened (High Priority)</option>
          </select>
        </div>

        {/* Urgency Filter */}
        <div>
          <select
            value={filters.urgency}
            onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none"
          >
            <option value="All">All Urgency Levels</option>
            <option value="critical">Critical Only</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* SLA Breached Toggle */}
        <div>
          <button
            onClick={() => setFilters({ ...filters, breached: filters.breached === 'true' ? 'false' : 'true' })}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              filters.breached === 'true'
                ? 'bg-red-950 text-red-300 border-red-800 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            {filters.breached === 'true' ? 'Showing Breached Only' : 'Filter SLA Breached'}
          </button>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="p-12 text-center bg-neutral-950 border border-neutral-800 rounded-2xl">
            <CheckSquare className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <p className="text-base text-white font-medium">
              {isMessStaff ? 'No food/dining complaints match current filters' : 'No hostel complaints match current filters'}
            </p>
          </div>
        ) : (
          filteredComplaints.map((ticket) => (
            <div
              key={ticket._id}
              className={`bg-neutral-950 border rounded-2xl p-5 transition-all ${
                ticket.status === 'Reopened'
                  ? 'border-purple-800/90 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                  : ticket.isSlaBreached
                  ? 'border-red-900/90 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                  : 'border-neutral-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-900">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-400">{ticket.ticketId}</span>
                  <StatusBadge status={ticket.status} />
                  <SlaBadge isBreached={ticket.isSlaBreached} slaDeadline={ticket.slaResolveDeadline} status={ticket.status} />
                </div>

                <div className="flex items-center gap-2">
                  {ticket.status !== 'Resolved' && (
                    <button
                      onClick={() => {
                        setUpdateModalTicket(ticket);
                        setTargetStatus(
                          ticket.status === 'Raised' ? 'Acknowledged' : ticket.status === 'Acknowledged' ? 'In Progress' : 'Resolved'
                        );
                        setActionNote('');
                      }}
                      className="btn-vesper-solid text-xs py-1.5 px-3"
                    >
                      Update Status / Note
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-white">{ticket.title}</h3>
                    <span className="text-xs text-neutral-400 font-medium">
                      — Reported by <strong className="text-white">{ticket.studentName}</strong> (Room {ticket.roomNo})
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{ticket.description}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 capitalize">
                      📁 {ticket.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                      🏢 {ticket.block}
                    </span>
                    <span className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold ${
                      ticket.urgency === 'critical' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-neutral-900 text-neutral-300'
                    }`}>
                      ⚡ {ticket.urgency} priority
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Created: {new Date(ticket.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {ticket.photoUrl && (
                  <button
                    onClick={() => setSelectedImage(ticket.photoUrl)}
                    className="self-start relative group rounded-lg overflow-hidden border border-neutral-800 shrink-0"
                  >
                    <img src={ticket.photoUrl} alt="Evidence" className="w-24 h-20 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-semibold text-white transition-opacity">
                      Inspect Image
                    </div>
                  </button>
                )}
              </div>

              {/* Action Log History */}
              {ticket.remarks && ticket.remarks.length > 0 && (
                <div className="mt-4 pt-3 border-t border-neutral-900 bg-neutral-900/40 rounded-xl p-3">
                  <h4 className="text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Action Taken Log ({ticket.remarks.length})
                  </h4>
                  <div className="space-y-2">
                    {ticket.remarks.map((r, idx) => (
                      <div key={idx} className="text-xs bg-black/60 p-2.5 rounded-lg border border-neutral-800/80">
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                          <span className="font-semibold text-white">{r.authorName} <span className="text-neutral-500">({r.authorRole})</span></span>
                          <span>{new Date(r.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-neutral-300">{r.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* UPDATE STATUS MODAL */}
      {updateModalTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-1">Update Ticket Status & Action</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Ticket <strong className="text-white">#{updateModalTicket.ticketId}</strong> ({updateModalTicket.block} Room {updateModalTicket.roomNo})
            </p>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Target Status</label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none"
                >
                  <option value="Acknowledged">Acknowledged (Technician Assigned)</option>
                  <option value="In Progress">In Progress (Work Underway)</option>
                  <option value="Resolved">Resolved (Work Completed)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Mandatory Action / Work-Taken Note <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows="4"
                  required
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  placeholder="Explain specific action taken (e.g. Electrician Sharma replaced fuse box in Room 204)..."
                  className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setUpdateModalTicket(null)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-neutral-400 text-xs hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" disabled={updating} className="btn-vesper-solid text-xs py-2 px-4">
                  {updating ? 'Saving Action...' : 'Save & Notify Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal Lightbox */}
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
};

export default StaffDashboard;
