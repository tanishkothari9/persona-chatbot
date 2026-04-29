import './TypingIndicator.css';

export default function TypingIndicator({ personaName }) {
  return (
    <div className="typing-indicator" id="typing-indicator">
      <div className="typing-bubble">
        <span className="typing-name">{personaName}</span>
        <span className="typing-text"> is thinking</span>
        <span className="typing-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
      </div>
    </div>
  );
}
