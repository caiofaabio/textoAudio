import "./App.css";
import UseVoice from "./hook/useVoice";

function App() {
  const { voices, handleBtn, handleVoiceChange, setText } = UseVoice();
  return (
    <>
      <header>
        <h1>Convertendo Texto em Áudio</h1>
      </header>
      <main>
        <textarea
          onChange={(e) => setText(e.target.value)}
          name="text"
          id="textarea"
          cols="30"
          rows="10"
        ></textarea>
        <select onChange={handleVoiceChange}>
          <option value="">Selecione uma voz</option>
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {voice.name}
            </option>
          ))}
        </select>
        <button onClick={handleBtn}>Falar</button>
      </main>
    </>
  );
}

export default App;
