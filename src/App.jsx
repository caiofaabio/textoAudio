import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const fetchVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    };
    setTimeout(fetchVoices, 100);

    return () => {
      window.speechSynthesis.removeEventListener("voicesChanged", fetchVoices);
    };
  }, []);

  function handleBtn() {
    if (text !== "" && selectedVoice) {
      let ut = new SpeechSynthesisUtterance(text);
      ut.voice = selectedVoice;
      window.speechSynthesis.speak(ut);
    }
  }

  function handleVoiceChange(e) {
    const voiceIndex = e.target.value;
    const selectedVoice = voices[voiceIndex];
    setSelectedVoice(selectedVoice);
  }
  return (
    <>
      <header>
        <h1>Convertendo Texto em Audio</h1>
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
