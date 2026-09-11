import Complaint from '../models/Complaint.js';
import Notification from '../models/Notification.js';

export const checkSlaBreaches = async (io) => {
  try {
    const now = new Date();

    // 1. Unacknowledged tickets past 24h ack deadline
    const unackBreaches = await Complaint.find({
      status: 'Raised',
      isSlaBreached: false,
      slaAckDeadline: { $lt: now }
    });

    for (const ticket of unackBreaches) {
      ticket.isSlaBreached = true;
      ticket.slaBreachedReason = 'Acknowledge SLA Breached (>24h without acknowledgment)';
      await ticket.save();

      // Notify Student
      await Notification.create({
        recipient: ticket.student,
        title: 'SLA Escalation Alert',
        message: `Your ticket #${ticket.ticketId} exceeded 24h response SLA and has been auto-escalated to Central Administration.`,
        ticketId: ticket.ticketId,
        type: 'escalation'
      });

      if (io) {
        io.emit('ticket_updated', { ticketId: ticket.ticketId, status: ticket.status, isSlaBreached: true });
        io.emit('notification_new', { recipient: ticket.student.toString() });
      }
    }

    // 2. Unresolved tickets past 72h resolve deadline
    const unresolvedBreaches = await Complaint.find({
      status: { $in: ['Acknowledged', 'In Progress'] },
      isSlaBreached: false,
      slaResolveDeadline: { $lt: now }
    });

    for (const ticket of unresolvedBreaches) {
      ticket.isSlaBreached = true;
      ticket.slaBreachedReason = 'Resolution SLA Breached (>72h without final resolution)';
      await ticket.save();

      // Notify Student
      await Notification.create({
        recipient: ticket.student,
        title: 'Resolution SLA Breached',
        message: `Ticket #${ticket.ticketId} resolution exceeded 72h SLA. Auto-escalated to Campus Chief Warden & Admin.`,
        ticketId: ticket.ticketId,
        type: 'escalation'
      });

      if (io) {
        io.emit('ticket_updated', { ticketId: ticket.ticketId, status: ticket.status, isSlaBreached: true });
        io.emit('notification_new', { recipient: ticket.student.toString() });
      }
    }
  } catch (err) {
    console.error('Error running SLA checker:', err.message);
  }
};
