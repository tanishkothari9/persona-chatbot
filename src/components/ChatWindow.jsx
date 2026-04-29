import { useEffect, useRef } from 'react';
import TypingIndicator from './TypingIndicator';
import './ChatWindow.css';

export default function ChatWindow({ messages, isLoading, personaName }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-window" id="chat-panel" role="tabpanel">
      {messages.length === 0 && !isLoading && (
        <div className="chat-empty">
          <div className="chat-empty-icon">💬</div>
          <h2 className="chat-empty-title">Chat with {personaName}</h2>
          <p className="chat-empty-subtitle">
            Ask a question or tap a suggestion below to get started
          </p>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`message message-${msg.role}`}
          style={{ animationDelay: `${Math.min(idx * 0.05, 0.3)}s` }}
        >
          {msg.role === 'assistant' && (
            <div className="message-avatar">
              <span className="avatar-dot"></span>
            </div>
          )}
          <div className="message-content">
            <p>{msg.content}</p>
          </div>
        </div>
      ))}

      {isLoading && <TypingIndicator personaName={personaName} />}

      <div ref={endRef} />
    </div>
  );
}
