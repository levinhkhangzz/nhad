const chatContainer = document.querySelector('.chat-container');
const inputBox = document.querySelector('.input-box');
const sendBtn = document.querySelector('.send-btn');

const baseUrl = 'http://localhost:3001';

let messages = [];

// Tạo ra một tin nhắn mới và hiển thị trên giao diện
const addNewMessage = (role, content) => {
  const messageElem = document.createElement('div');
  messageElem.classList.add('message', role);
  messageElem.textContent = content;
  chatContainer.appendChild(messageElem);
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

// Gửi yêu cầu đến server và nhận kết quả trả về
const sendMessage = async (message) => {
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
    });

    const data = await response.json();
    messages.push({ role: 'chatbot', content: data });
    addNewMessage('chatbot', data);
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn:', error);
  }
};

// Xử lý sự kiện khi người dùng nhấn nút gửi tin nhắn
sendBtn.addEventListener('click', () => {
  const message = inputBox.value.trim();
  if (message) {
    messages.push({ role: 'user', content: message });
    addNewMessage('user', message);
    sendMessage(message);
    inputBox.value = '';
  }
});

// Xử lý sự kiện khi người dùng nhấn Enter
inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendBtn.click();
  }
});

// Hiển thị thông tin giới thiệu khi trang được load
addNewMessage('system', 'Chào bạn! Đây là chatbot được tạo bởi AI Insight Channel. Nếu bạn muốn biết thêm thông tin, vui lòng ghé thăm trang web https://vietaiacademy.com/');

