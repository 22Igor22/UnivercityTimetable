const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  outputMessage(message);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();
  console.log(msg)

  fetch('https://UniversityTimetable:5000/chat/addToHistory', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(
      {
        mess: msg,
        room: room
      })
  })
    .then(response => response.json())
    .then(data => {
      para.innerText = data;
      // Обработка полученных данных
    })
    .catch(error => {
      // Обработка ошибки
      console.error('Ошибка:', error);
    });

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});

const div = document.createElement('div');
  div.classList.add('message');
  const para = document.createElement('p');
  para.classList.add('text');
  fetch('https://UniversityTimetable:5000/chat/messages', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(
      {
        room: room
      })
  })
    .then(response => response.json())
    .then(data => {
      para.innerText = data.replace(/,/g, '\n');
      // Обработка полученных данных
    })
    .catch(error => {
      // Обработка ошибки
      console.error('Ошибка:', error);
    });
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);