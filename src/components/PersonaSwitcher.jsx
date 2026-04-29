import './PersonaSwitcher.css';

const personas = [
  {
    id: 'anshuman',
    name: 'Anshuman Singh',
    title: 'Co-founder, Scaler',
    shortName: 'Anshuman',
    emoji: '🚀',
  },
  {
    id: 'abhimanyu',
    name: 'Abhimanyu Saxena',
    title: 'Co-founder, Scaler',
    shortName: 'Abhimanyu',
    emoji: '💡',
  },
  {
    id: 'kshitij',
    name: 'Kshitij Mishra',
    title: 'Head of Instructors',
    shortName: 'Kshitij',
    emoji: '🎯',
  },
];

export default function PersonaSwitcher({ activePersona, onSwitch }) {
  return (
    <div className="persona-switcher" role="tablist" aria-label="Select persona">
      {personas.map((p) => (
        <button
          key={p.id}
          id={`persona-tab-${p.id}`}
          className={`persona-tab ${activePersona === p.id ? 'active' : ''}`}
          data-persona={p.id}
          onClick={() => onSwitch(p.id)}
          role="tab"
          aria-selected={activePersona === p.id}
          aria-controls="chat-panel"
        >
          <span className="persona-emoji">{p.emoji}</span>
          <span className="persona-info">
            <span className="persona-name">{p.shortName}</span>
            <span className="persona-title">{p.title}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export { personas };
