import { useEffect, useState } from "react";

export default function UseVoice() {
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

  return {
    text,
    setText,
    voices,
    handleBtn,
    handleVoiceChange,
  };
}
