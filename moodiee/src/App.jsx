import { useState } from 'react';
import './App.css';

const moods = [
  { id: 'happy', emoji: '☀️', name: 'Happy', color: '#FFE69A' },
  { id: 'loved', emoji: '🩷', name: 'Loved', color: '#F8C8DC' },
  { id: 'calm', emoji: '🪷', name: 'Calm', color: '#CDEEDB' },
  { id: 'sad', emoji: '☹️', name: 'Sad', color: '#DCD6FF' },
  { id: 'tired', emoji: '😪', name: 'Tired', color: '#E8DCCF' },
  { id: 'anxious', emoji: '😨', name: 'Anxious', color: '#F7D5C5' },
];

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const activeMood = moods.find(
    (mood) => mood.id === selectedMood
  );

  const moodMessage = {
    happy: "You're glowing today!",
    loved: "You're surrounded by love!",
    calm: "You're at peace today.",
    sad: "It's okay to feel down sometimes.",
    tired: "Rest is important, take care of yourself.",
    anxious: "Take a deep breath, you're doing your best.",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedMood) {
      alert('Choose your mood first!');
      return;
    }

    if (!note.trim()) {
      alert('Write something about your day!');
      return;
    }

    const newMood = {
      mood: selectedMood,
      note: note,
    };

    setMoodHistory((history) => [newMood, ...history]);

    setSelectedMood(null);
    setNote('');
  };

  return (
    <div className="app">
      <header className="header">
        <a href="#" className="logo">
          <span className="logo-icon">♡</span>
          MOODIEE
        </a>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-decoration decoration-one">✦</div>
          <div className="hero-decoration decoration-two">♡</div>

          <div
            className="hero-character"
            style={{
              background: activeMood
                ? activeMood.color
                : undefined,
            }}
          >
            <span className="character-face">
              {activeMood ? activeMood.emoji : '☻'}
            </span>

            <span className="character-sparkle">✦</span>
          </div>

          <h1>
            How are you feeling?
            <br />
            <span>today?</span>
          </h1>

          <p className="hero-description">
            {activeMood
              ? moodMessage[activeMood.id]
              : "Let's find out!"}
          </p>
        </section>

        <section className="mood-section">
          <div className="section-heading">
            <h2>Pick your mood</h2>
          </div>

          <div className="mood-grid">
            {moods.map((mood) => (
              <button
                className={`mood-card ${
                  selectedMood === mood.id ? 'selected' : ''
                }`}
                key={mood.id}
                style={{ '--mood-color': mood.color }}
                type="button"
                onClick={() => setSelectedMood(mood.id)}
              >
                <span className="mood-emoji">
                  {mood.emoji}
                </span>

                <span className="mood-name">
                  {mood.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="journal-section">
          <div className="section-heading">
          </div>

          <form
            className="journal-form"
            onSubmit={handleSubmit}
          >
            <div className="journal-card">
              <label htmlFor="journal-note">
                What's on your mind?
              </label>

              <textarea
                id="journal-note"
                className="journal-input"
                placeholder="Today was...."
                value={note}
                onChange={(event) =>
                  setNote(event.target.value)
                }
              ></textarea>

              <div className="journal-footer">
                {selectedMood && (
                  <p className="selected-mood">
                    You're feeling{' '}
                    <strong>{activeMood.name}</strong> today.
                  </p>
                )}
              </div>
            </div>

            <button
              className="save-button"
              type="submit"
            >
              <span>Save my day</span>
            </button>
          </form>
        </section>

        <section className="history-section">
          <h2>Mood History</h2>

          {moodHistory.length === 0 ? (
            <p className="empty-history">
            </p>
          ) : (
            <div className="history-list">
              {moodHistory.map((entry, index) => {
                const mood = moods.find(
                  (item) => item.id === entry.mood
                );

                return (
                  <div
                    className="history-card"
                    key={index}
                  >
                    <div className="history-mood">
                      <span>{mood.emoji}</span>
                      <strong>{mood.name}</strong>
                    </div>

                    <p>{entry.note}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
      </footer>
    </div>
  );
}

export default App;