import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ComplaintsContext } from '../context/ComplaintsContext';
import StatusBadge from '../components/StatusBadge';
import SlaBadge from '../components/SlaBadge';
import ImageModal from '../components/ImageModal';
import { INITIAL_MENU } from '../data/mockData';
import { 
  PlusCircle, Utensils, ClipboardList, Calendar, Star, 
  Upload, CheckCircle, ThumbsUp, ThumbsDown, 
  RotateCcw, MessageSquare 
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const { complaints, addComplaint, rateResolution } = useContext(ComplaintsContext);

  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' | 'new-complaint' | 'mess-feedback' | 'mess-menu'
  const [selectedImage, setSelectedImage] = useState(null);

  // Form states
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    category: 'electricity',
    urgency: 'medium',
    description: '',
    block: user?.hostelBlock && user?.hostelBlock !== 'N/A' ? user?.hostelBlock : 'BH-1',
    roomNo: user?.roomNo || '102',
    photoUrl: ''
  });

  const [messForm, setMessForm] = useState({
    mealType: 'Lunch',
    rating: 5,
    category: 'food quality',
    comment: '',
    photoUrl: ''
  });

  // Mess Menu state pre-populated with full 7-day menu data!
  const [messMenu] = useState(INITIAL_MENU);
  const [selectedDay, setSelectedDay] = useState('Monday');

  // Rating Modal state
  const [ratingModalTicket, setRatingModalTicket] = useState(null);
  const [satisfactionInput, setSatisfactionInput] = useState({
    satisfied: true,
    rating: 5,
    comment: ''
  });

  // Handle Photo Upload to Base64
  const handlePhotoUpload = (e, formSetter) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      formSetter(prev => ({ ...prev, photoUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    const isFood = complaintForm.category === 'food quality' || complaintForm.category === 'mess hygiene' || complaintForm.category === 'mess';
    const newTicket = {
      _id: `ticket_${Date.now()}`,
      ticketId: `CMP-2026-${(complaints.length + 1).toString().padStart(4, '0')}`,
      type: isFood ? 'mess' : 'hostel',
      studentName: user?.name || 'Aarav Patel',
      studentEmail: user?.email || 'student1@lpu.in',
      block: isFood ? 'Mess Alpha' : complaintForm.block,
      roomNo: complaintForm.roomNo || '102',
      category: complaintForm.category,
      urgency: complaintForm.urgency,
      title: complaintForm.title,
      description: complaintForm.description,
      photoUrl: complaintForm.photoUrl,
      status: 'Raised',
      isSlaBreached: false,
      reopenedCount: 0,
      remarks: [],
      satisfaction: { rated: false },
      createdAt: new Date().toISOString()
    };

    addComplaint(newTicket);

    try {
      await axios.post('/api/complaints', complaintForm);
    } catch (err) {
      console.warn('API sync fallback for complaint');
    }

    setComplaintForm({
      title: '',
      category: 'electricity',
      urgency: 'medium',
      description: '',
      block: user?.hostelBlock && user?.hostelBlock !== 'N/A' ? user?.hostelBlock : 'BH-1',
      roomNo: user?.roomNo || '102',
      photoUrl: ''
    });

    setActiveTab('tickets');
  };

  const handleSubmitMessFeedback = async (e) => {
    e.preventDefault();
    
    // Automatically generate a mess complaint ticket so mess staff receives it
    const newMessTicket = {
      _id: `ticket_mess_${Date.now()}`,
      ticketId: `CMP-2026-${(complaints.length + 1).toString().padStart(4, '0')}`,
      type: 'mess',
      studentName: user?.name || 'Aarav Patel',
      studentEmail: user?.email || 'student1@lpu.in',
      block: 'Mess Alpha',
      roomNo: user?.roomNo || '102',
      category: 'food quality',
      urgency: messForm.rating <= 2 ? 'high' : 'medium',
      title: `[Mess Feedback - ${messForm.mealType}] ${messForm.category} (${messForm.rating} Stars)`,
      description: messForm.comment || `Submitted per-meal feedback for ${messForm.mealType}: ${messForm.rating}/5 stars in ${messForm.category}.`,
      photoUrl: messForm.photoUrl,
      status: 'Raised',
      isSlaBreached: false,
      reopenedCount: 0,
      remarks: [],
      satisfaction: { rated: false },
      createdAt: new Date().toISOString()
    };

    addComplaint(newMessTicket);

    try {
      await axios.post('/api/mess/feedback', messForm);
    } catch (err) {
      console.warn('Mess feedback saved locally');
    }
    alert('Mess feedback submitted! An official Mess Complaint ticket has been generated for Mess Operations Staff.');
    setMessForm({
      mealType: 'Lunch',
      rating: 5,
      category: 'food quality',
      comment: '',
      photoUrl: ''
    });
    setActiveTab('tickets');
  };

  const handleRateResolution = async (e) => {
    e.preventDefault();
    if (!ratingModalTicket) return;

    rateResolution(
      ratingModalTicket._id,
      satisfactionInput.satisfied,
      satisfactionInput.rating,
      satisfactionInput.comment
    );

    try {
      await axios.put(`/api/complaints/${ratingModalTicket._id}/satisfaction`, satisfactionInput);
    } catch (err) {
      console.warn('Resolution rating updated locally');
    }

    setRatingModalTicket(null);
  };

  const handleDishRating = async (menuId, dishId, rating) => {
    setMessMenu(prev => prev.map(menu => {
      if (menu._id === menuId) {
        return {
          ...menu,
          dishes: menu.dishes.map(d => {
            if (d._id === dishId) {
              const newTotal = (d.totalRating || 50) + rating;
              const newCount = (d.ratingCount || 10) + 1;
              return { ...d, totalRating: newTotal, ratingCount: newCount, avgRating: Number((newTotal / newCount).toFixed(1)) };
            }
            return d;
          })
        };
      }
      return menu;
    }));

    try {
      await axios.post('/api/mess/rate-dish', { menuId, dishId, rating });
    } catch (err) {
      console.warn('Dish rating updated locally');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Student Portal <span className="text-neutral-400 font-normal">({user?.name || 'Aarav Patel'})</span>
          </h1>
          <p className="mt-1 text-xs md:text-sm text-neutral-400">
            Submit complaints, monitor SLA action timeline, and rate mess dining.
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'tickets' ? 'bg-white text-black font-semibold shadow-lg' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <ClipboardList className="w-4 h-4" /> My Submissions ({complaints.length})
          </button>

          <button
            onClick={() => setActiveTab('new-complaint')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'new-complaint' ? 'bg-white text-black font-semibold shadow-lg' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-red-500" /> New Hostel Ticket
          </button>

          <button
            onClick={() => setActiveTab('mess-feedback')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'mess-feedback' ? 'bg-white text-black font-semibold shadow-lg' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <Utensils className="w-4 h-4 text-emerald-500" /> Rate Mess Meal
          </button>

          <button
            onClick={() => setActiveTab('mess-menu')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'mess-menu' ? 'bg-white text-black font-semibold shadow-lg' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-500" /> Weekly Menu
          </button>
        </div>
      </div>

      {/* TAB 1: MY TICKETS LIST */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {complaints.length === 0 ? (
            <div className="p-12 text-center bg-neutral-950 border border-neutral-800 rounded-2xl">
              <ClipboardList className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-base text-white font-medium">No complaints submitted yet</p>
              <p className="text-xs text-neutral-400 mt-1">Have an issue in your room or hostel block? Click "New Hostel Ticket" above.</p>
            </div>
          ) : (
            complaints.map((ticket) => (
              <div
                key={ticket._id}
                className={`bg-neutral-950 border rounded-2xl p-5 transition-all ${
                  ticket.status === 'Reopened'
                    ? 'border-purple-800/80 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                    : ticket.isSlaBreached
                    ? 'border-red-900/80'
                    : 'border-neutral-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-900">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-400">{ticket.ticketId}</span>
                    <StatusBadge status={ticket.status} />
                    <SlaBadge isBreached={ticket.isSlaBreached} slaDeadline={ticket.slaResolveDeadline} status={ticket.status} />
                  </div>
                  <span className="text-xs text-neutral-500">
                    Raised: {new Date(ticket.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="mt-3 flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">{ticket.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{ticket.description}</p>
                    
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                      <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 capitalize">
                        📁 {ticket.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 capitalize">
                        🏢 {ticket.block} (Room {ticket.roomNo})
                      </span>
                      <span className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold ${
                        ticket.urgency === 'critical' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-neutral-900 text-neutral-300'
                      }`}>
                        ⚡ {ticket.urgency} priority
                      </span>
                    </div>
                  </div>

                  {ticket.photoUrl && (
                    <button
                      onClick={() => setSelectedImage(ticket.photoUrl)}
                      className="self-start relative group rounded-lg overflow-hidden border border-neutral-800 shrink-0"
                    >
                      <img src={ticket.photoUrl} alt="Attachment" className="w-24 h-20 object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-semibold text-white transition-opacity">
                        View Photo
                      </div>
                    </button>
                  )}
                </div>

                {/* Remarks & Action Notes History */}
                {ticket.remarks && ticket.remarks.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-neutral-900 bg-neutral-900/40 rounded-xl p-3">
                    <h4 className="text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> Action & Resolution Log ({ticket.remarks.length})
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

                {/* Satisfaction Rating Action Box */}
                {ticket.status === 'Resolved' && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-300">Resolution Verification</h4>
                      <p className="text-[11px] text-neutral-400">
                        {ticket.satisfaction && ticket.satisfaction.rated
                          ? `You rated this resolution: ${ticket.satisfaction.satisfied ? '✅ Satisfied' : '❌ Unsatisfied'}`
                          : 'Are you satisfied with the action taken by warden/staff?'}
                      </p>
                    </div>

                    {(!ticket.satisfaction || !ticket.satisfaction.rated) && (
                      <button
                        onClick={() => {
                          setRatingModalTicket(ticket);
                          setSatisfactionInput({ satisfied: true, rating: 5, comment: '' });
                        }}
                        className="btn-vesper-solid text-xs py-1.5 px-3 shrink-0"
                      >
                        Rate Resolution
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: NEW HOSTEL COMPLAINT FORM */}
      {activeTab === 'new-complaint' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-1">Submit Hostel Complaint</h2>
          <p className="text-xs text-neutral-400 mb-6">Every ticket is assigned a 24h ack & 72h resolution SLA with automated warden escalation.</p>

          <form onSubmit={handleSubmitComplaint} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Issue Title</label>
              <input
                type="text"
                required
                value={complaintForm.title}
                onChange={(e) => setComplaintForm({ ...complaintForm, title: e.target.value })}
                placeholder="e.g. Geyser trip switch sparking in 3rd floor bath"
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
                <select
                  value={complaintForm.category}
                  onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-neutral-600"
                >
                  <option value="electricity">Electricity</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="food quality">Mess & Food Quality</option>
                  <option value="cleanliness">Cleanliness</option>
                  <option value="wifi">Wi-Fi & Internet</option>
                  <option value="furniture">Furniture</option>
                  <option value="security">Security</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Hostel Block</label>
                <select
                  value={complaintForm.block}
                  onChange={(e) => setComplaintForm({ ...complaintForm, block: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-neutral-600"
                >
                  <option value="BH-1">BH-1 (Boys Block 1)</option>
                  <option value="BH-2">BH-2 (Boys Block 2)</option>
                  <option value="GH-1">GH-1 (Girls Block 1)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Room Number</label>
                <input
                  type="text"
                  required
                  value={complaintForm.roomNo}
                  onChange={(e) => setComplaintForm({ ...complaintForm, roomNo: e.target.value })}
                  placeholder="e.g. 204"
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-neutral-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Urgency Priority Level</label>
              <div className="grid grid-cols-4 gap-2">
                {['low', 'medium', 'high', 'critical'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setComplaintForm({ ...complaintForm, urgency: level })}
                    className={`py-2 rounded-lg text-xs font-semibold capitalize border transition-all ${
                      complaintForm.urgency === level
                        ? level === 'critical' ? 'bg-red-900 text-white border-red-500' : 'bg-white text-black border-white'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Detailed Description</label>
              <textarea
                rows="4"
                required
                value={complaintForm.description}
                onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                placeholder="Explain the problem in detail (when did it start, exact location inside room/corridor)..."
                className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-600"
              />
            </div>

            {/* Photo Upload with Preview */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Attach Photo Evidence (Optional)</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center gap-2 transition-colors">
                  <Upload className="w-4 h-4" /> Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, setComplaintForm)}
                    className="hidden"
                  />
                </label>

                {complaintForm.photoUrl && (
                  <div className="flex items-center gap-2">
                    <img src={complaintForm.photoUrl} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-neutral-700" />
                    <span className="text-xs text-emerald-400 font-medium">Image attached</span>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="w-full mt-4 btn-vesper-solid flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Submit Ticket to Warden Office
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: MESS / DINING FEEDBACK FORM */}
      {activeTab === 'mess-feedback' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-1">Submit Mess & Dining Feedback</h2>
          <p className="text-xs text-neutral-400 mb-6">Rate your per-meal experience (Mess Alpha). Feedback directly powers mess staff accountability metrics.</p>

          <form onSubmit={handleSubmitMessFeedback} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Meal Type</label>
                <select
                  value={messForm.mealType}
                  onChange={(e) => setMessForm({ ...messForm, mealType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-neutral-600"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
                <select
                  value={messForm.category}
                  onChange={(e) => setMessForm({ ...messForm, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-neutral-600"
                >
                  <option value="food quality">Food Quality</option>
                  <option value="hygiene">Hygiene & Cleanliness</option>
                  <option value="variety">Menu Variety</option>
                  <option value="quantity">Food Quantity</option>
                  <option value="staff behavior">Staff Behavior</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">Per-Meal Rating (1 - 5 Stars)</label>
              <div className="flex items-center gap-2 bg-neutral-900 p-3 rounded-lg border border-neutral-800 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setMessForm({ ...messForm, rating: star })}
                    className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= messForm.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-sm font-bold text-amber-400">{messForm.rating} / 5 Stars</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Comments & Specific Dish Feedback</label>
              <textarea
                rows="3"
                value={messForm.comment}
                onChange={(e) => setMessForm({ ...messForm, comment: e.target.value })}
                placeholder="Mention specific items (e.g., Dal Makhani was excellent, rotis were soft)..."
                className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-600"
              />
            </div>

            <button type="submit" className="w-full mt-2 btn-vesper-solid flex items-center justify-center gap-2">
              <Utensils className="w-4 h-4" /> Submit Dining Feedback
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: WEEKLY MESS MENU */}
      {activeTab === 'mess-menu' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Weekly Campus Mess Menu & Live Dish Ratings</h2>
              <p className="text-xs text-neutral-400">Mess Alpha 7-day dish ratings. Rate any dish below to power live food quality scores.</p>
            </div>

            {/* Day Selector */}
            <div className="flex flex-wrap gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedDay === day ? 'bg-white text-black font-bold shadow-lg' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((mealType) => {
              const menuEntry = messMenu.find(m => m.dayOfWeek === selectedDay && m.mealType === mealType);
              return (
                <div key={mealType} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800 mb-3">
                    <h3 className="text-sm font-semibold text-emerald-400">{mealType}</h3>
                    {menuEntry?.specialItem && (
                      <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800 font-semibold">
                        {menuEntry.specialItem}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {menuEntry?.dishes?.map((dish) => (
                      <div key={dish._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-black/50 p-3 rounded-lg border border-neutral-800/80">
                        <div>
                          <span className="font-semibold text-white text-sm">{dish.name}</span>
                          <span className="ml-2 text-[10px] text-neutral-400 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 uppercase">{dish.category}</span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-950/60 px-2 py-1 rounded border border-amber-800">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{dish.avgRating || '4.5'}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                title={`Rate ${s} stars`}
                                onClick={() => handleDishRating(menuEntry._id, dish._id, s)}
                                className="text-neutral-600 hover:text-amber-400 text-sm transition-colors"
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RESOLUTION SATISFACTION MODAL */}
      {ratingModalTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-1">Rate Ticket Resolution</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Ticket <strong className="text-white">#{ratingModalTicket.ticketId}</strong>: {ratingModalTicket.title}
            </p>

            <form onSubmit={handleRateResolution} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">Were you satisfied with the fix?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSatisfactionInput({ ...satisfactionInput, satisfied: true, rating: 5 })}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      satisfactionInput.satisfied
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4 text-emerald-400" /> Satisfied (Close)
                  </button>

                  <button
                    type="button"
                    onClick={() => setSatisfactionInput({ ...satisfactionInput, satisfied: false, rating: 1 })}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      !satisfactionInput.satisfied
                        ? 'bg-red-950 text-red-300 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4 text-red-400" /> Not Satisfied (Reopen!)
                  </button>
                </div>
              </div>

              {!satisfactionInput.satisfied && (
                <div className="p-3 rounded-lg bg-purple-950/60 border border-purple-800/80 text-xs text-purple-300 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 shrink-0 text-purple-400" />
                  <span>Selecting "Not Satisfied" will automatically REOPEN this ticket and alert the Warden.</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Remarks / Reason</label>
                <textarea
                  rows="3"
                  required={!satisfactionInput.satisfied}
                  value={satisfactionInput.comment}
                  onChange={(e) => setSatisfactionInput({ ...satisfactionInput, comment: e.target.value })}
                  placeholder={satisfactionInput.satisfied ? "Optional feedback..." : "Explain why the issue was not properly fixed..."}
                  className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setRatingModalTicket(null)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-neutral-400 text-xs hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-vesper-solid text-xs py-2 px-4">
                  Submit Verification
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

export default StudentDashboard;
