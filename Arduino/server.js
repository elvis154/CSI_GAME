const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const PORT = 3050;
const wsPort = 8081;

const clients = new Set();

app.use(bodyParser.json());
app.use(express.static('site-src'));

app.post('/data', (req, res) => {
  const { inp } = req.body;
  if (inp === undefined) {
    return res.status(400).send('No data provided.');
  }
  console.log(`Received data: ${inp}`);

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ enteredNumber: inp }));
    }
  }
  res.send(`Data ${inp} sent to clients.`);
});

const wss = new WebSocket.Server({ port: wsPort });

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Received message from client:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

app.listen(PORT, () => console.log(`HTTP server listening on port ${PORT}`));
console.log(`WebSocket server listening on port ${wsPort}`);

app.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} in use. Please choose a different port.`);
    process.exit(1);
  }
  throw error;
});
