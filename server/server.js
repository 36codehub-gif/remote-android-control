const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

const devices = new Map();
const dashboards = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'REGISTER_DEVICE') {
        devices.set(data.deviceId, ws);
        ws.deviceId = data.deviceId;
        console.log(`Device Connected: ${data.deviceId}`);
      } else if (data.type === 'COMMAND') {
        const target = devices.get(data.deviceId);
        if (target && target.readyState === WebSocket.OPEN) {
          target.send(JSON.stringify(data.payload));
        }
      }
    } catch (e) {
      console.error(e);
    }
  });

  ws.on('close', () => {
    if (ws.deviceId) devices.delete(ws.deviceId);
  });
});

console.log(`Server running on port ${PORT}`);
