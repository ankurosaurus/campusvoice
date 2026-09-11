import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { checkSlaBreaches } from './utils/slaChecker.js';

const server = http.createServer(app);

// Enable Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Attach io to Express app for route handlers to access
app.set('io', io);

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`[Socket.io] Socket ${socket.id} joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// SLA Periodic Checker (Runs every 60 seconds)
setInterval(() => {
  checkSlaBreaches(io);
}, 60000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(`🚀 CampusVoice Backend & Socket.io running on port ${PORT}`);
  console.log(`========================================================`);
});
