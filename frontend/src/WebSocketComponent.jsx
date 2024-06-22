// src/WebSocketComponent.jsx
import React, { useState, useEffect } from 'react';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('wss://api.hume.ai/v0/evi/chat');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    // Clean up the WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage) {
      socket.send(JSON.stringify({ text: inputMessage }));
      setInputMessage(''); // Clear input field after sending
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>WebSocket Chat</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message"
          style={{ width: '80%', padding: '8px', marginRight: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '8px 16px' }}>
          Send
        </button>
      </div>
      <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        <h4>Messages:</h4>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {messages.map((message, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              {JSON.stringify(message)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;
