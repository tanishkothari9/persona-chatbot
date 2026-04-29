import { useState, useCallback } from 'react';
import PersonaSwitcher, { personas } from './components/PersonaSwitcher';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import SuggestionChips from './components/SuggestionChips';
import anshumanPrompt from './prompts/anshuman';
import abhimanyuPrompt from './prompts/abhimanyu';
import kshitijPrompt from './prompts/kshitij';
import './App.css';

const systemPrompts = {
  anshuman: anshumanPrompt,
  abhimanyu: abhimanyuPrompt,
  kshitij: kshitijPrompt,
};

const personaNames = {
  anshuman: 'Anshuman',
  abhimanyu: 'Abhimanyu',
  kshitij: 'Kshitij',
};

export default function App() {
  const [activePersona, setActivePersona] = useState('anshuman');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update CSS accent variables when persona changes
  const updateAccent = useCallback((personaId) => {
    const root = document.documentElement;
    root.style.setProperty('--accent', `var(--accent-${personaId})`);
    root.style.setProperty('--accent-glow', `var(--accent-${personaId}-glow)`);
    root.style.setProperty('--accent-soft', `var(--accent-${personaId}-soft)`);
  }, []);

  const handlePersonaSwitch = useCallback((personaId) => {
    if (personaId === activePersona) return;
    setActivePersona(personaId);
    setMessages([]);
    setIsLoading(false);
    updateAccent(personaId);
  }, [activePersona, updateAccent]);

  const sendMessage = useCallback(async (text) => {
    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Build conversation history for the API
      const conversationHistory = updatedMessages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: systemPrompts[activePersona],
          history: conversationHistory,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed (${response.status})`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (err) {
      console.error('Chat API error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, something went wrong — ${err.message || 'please try again in a moment.'}`,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, activePersona]);

  const showSuggestions = messages.length === 0 && !isLoading;

  return (
    <div className="app" data-persona={activePersona}>
      <header className="app-header">
        <div className="header-brand">
          <h1 className="header-title">Scaler Persona Chat</h1>
          <p className="header-subtitle">Conversations with Scaler's leaders</p>
        </div>
        <PersonaSwitcher
          activePersona={activePersona}
          onSwitch={handlePersonaSwitch}
        />
      </header>

      <main className="app-main">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          personaName={personaNames[activePersona]}
        />

        <SuggestionChips
          persona={activePersona}
          onSelect={sendMessage}
          visible={showSuggestions}
        />

        <MessageInput onSend={sendMessage} disabled={isLoading} />
      </main>
    </div>
  );
}
