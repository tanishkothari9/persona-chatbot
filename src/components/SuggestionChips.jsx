import './SuggestionChips.css';

const suggestions = {
  anshuman: [
    "What's your advice for engineers in the age of AI?",
    "What was the hardest lesson you learned building Scaler?",
    "How do you hire great engineers?",
  ],
  abhimanyu: [
    "What drove you to build Scaler?",
    "How is AI changing the education landscape?",
    "What advice would you give first-time founders?",
  ],
  kshitij: [
    "How should I start preparing for FAANG interviews?",
    "What's the best way to learn dynamic programming?",
    "How do I stop forgetting DSA concepts?",
  ],
};

export default function SuggestionChips({ persona, onSelect, visible }) {
  if (!visible) return null;

  const chips = suggestions[persona] || [];

  return (
    <div className="suggestion-chips" id="suggestion-chips">
      <p className="chips-label">Try asking:</p>
      <div className="chips-container">
        {chips.map((text, i) => (
          <button
            key={i}
            className="chip"
            id={`chip-${persona}-${i}`}
            onClick={() => onSelect(text)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
