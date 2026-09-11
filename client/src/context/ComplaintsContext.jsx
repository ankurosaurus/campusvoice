import React, { createContext, useState, useEffect } from 'react';
import { INITIAL_COMPLAINTS } from '../data/mockData';

export const ComplaintsContext = createContext();

export const ComplaintsProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem('campusvoice_complaints');
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading stored complaints:', e);
    }
    return INITIAL_COMPLAINTS;
  });

  // Keep localStorage in sync whenever complaints state changes
  useEffect(() => {
    try {
      localStorage.setItem('campusvoice_complaints', JSON.stringify(complaints));
    } catch (e) {
      console.warn('Error saving complaints to localStorage:', e);
    }
  }, [complaints]);

  const addComplaint = (newTicket) => {
    setComplaints(prev => [newTicket, ...prev]);
  };

  const updateComplaintStatus = (ticketId, targetStatus, actionNote, authorName, authorRole) => {
    const newNote = {
      authorName: authorName || 'Assigned Staff',
      authorRole: authorRole || 'staff',
      note: actionNote,
      statusAfter: targetStatus,
      createdAt: new Date().toISOString()
    };

    setComplaints(prev => prev.map(t => {
      if (t._id === ticketId || t.ticketId === ticketId) {
        return {
          ...t,
          status: targetStatus,
          remarks: [...(t.remarks || []), newNote]
        };
      }
      return t;
    }));
  };

  const rateResolution = (ticketId, satisfied, rating, comment) => {
    setComplaints(prev => prev.map(t => {
      if (t._id === ticketId || t.ticketId === ticketId) {
        const isSatisfied = Boolean(satisfied);
        const newStatus = isSatisfied ? 'Resolved' : 'Reopened';
        const updatedCount = isSatisfied ? (t.reopenedCount || 0) : ((t.reopenedCount || 0) + 1);

        const remarks = [...(t.remarks || [])];
        if (!isSatisfied) {
          remarks.push({
            authorName: t.studentName || 'Student',
            authorRole: 'student',
            note: `Student rated resolution as Unsatisfied: "${comment || 'Fix was incomplete'}" — Ticket Reopened automatically.`,
            createdAt: new Date().toISOString()
          });
        }

        return {
          ...t,
          status: newStatus,
          reopenedCount: updatedCount,
          isSlaBreached: !isSatisfied ? true : t.isSlaBreached,
          remarks,
          satisfaction: {
            rated: true,
            satisfied: isSatisfied,
            rating: rating || (isSatisfied ? 5 : 1),
            comment: comment || ''
          }
        };
      }
      return t;
    }));
  };

  const resetComplaints = () => {
    setComplaints(INITIAL_COMPLAINTS);
    try {
      localStorage.setItem('campusvoice_complaints', JSON.stringify(INITIAL_COMPLAINTS));
    } catch (e) {}
  };

  return (
    <ComplaintsContext.Provider value={{
      complaints,
      addComplaint,
      updateComplaintStatus,
      rateResolution,
      resetComplaints
    }}>
      {children}
    </ComplaintsContext.Provider>
  );
};
