import express from 'express';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new socketIo(server,{cors: {origin: '*',   methods: ['GET', 'POST'],   credentials: true}});

// Enable CORS for the frontend (you can specify the exact frontend URL if needed)
app.use(cors({
  origin: 'http://localhost:5173',  // Allow your frontend to make requests
  methods: ['GET', 'POST'],        // Allow only GET and POST requests
  allowedHeaders: ['Content-Type'], // Allow content-type header
}));

// Middleware to parse JSON bodies for the POST request
app.use(express.json());

// Handle POST requests to /api/message
app.post('/api/message', (req, res) => {
  const { message } = req.body;
  console.log('Received message from client:', message);

  // Emit the message to all connected clients via WebSocket
  io.emit('message', message);

  // Respond back to the client
  res.json({ status: 'Message received' });
});

// Socket.io connection for real-time communication
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle message event from client
  socket.on('message', (data) => {
    console.log('Message from client:', data);
    // Emit a message back to the client
    socket.emit('message', 'Hello from server!');
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
