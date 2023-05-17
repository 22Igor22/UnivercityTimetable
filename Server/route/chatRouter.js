// chatRouter.js

const express = require('express');
const expressWs = require('express-ws');
const WebSocket = require('ws');

const router = express.Router();
expressWs(router);

// Создаем WebSocket сервер на основе Express сервера
const wss = new WebSocket.Server({ noServer: true });

// Обработчик соединения WebSocket
wss.on('connection', function (ws) {
  // Обработка нового соединения
  console.log('WebSocket connection established');

  // Обработка входящих сообщений от клиента
  ws.on('message', function (message) {
    console.log('Received message:', message);

    // Отправка сообщения всем подключенным клиентам
    wss.clients.forEach(function (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Обработка закрытия соединения клиентом
  ws.on('close', function () {
    console.log('WebSocket connection closed');
  });
});

// Роут для обработки запроса на установление WebSocket соединения
router.ws('/chat', function (ws, req) {
  // Устанавливаем соединение WebSocket
  ws.on('message', function (message) {
    console.log('Received message from client:', message);

    // Отправляем ответное сообщение клиенту
    ws.send('Server says: ' + message);
  });
});

module.exports = router;
