const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });

let messages = [];

wss.on('connection', (ws) => {
  console.log('A new client connected');
  ws.send(JSON.stringify({ type: 'history', messages }));
  ws.on('message', (message) => {
    const { username, text } = JSON.parse(message);
    messages.push({ username, text });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'message', username, text }));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    res.status(405).json({ error: 'Use WebSocket for communication' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

module.exports.ws = wss;
