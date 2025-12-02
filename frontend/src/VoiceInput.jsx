import React, { useState } from "react";

const VoiceInput = ({ onTextDetected }) => {
  const [listening, setListening] = useState(false);
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const startListening = () => {
    if (!recognition) return alert("Speech recognition not supported!");
    const recog = new recognition();
    recog.lang = "ta-IN"; // Tamil
    recog.interimResults = false;
    recog.onstart = () => setListening(true);
    recog.onend = () => setListening(false);
    recog.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onTextDetected(text);
    };
    recog.start();
  };

  return (
    <div className="my-4">
      <button onClick={startListening} className="bg-purple-600 text-white px-4 py-2 rounded">
        🎤 Speak (Tamil)
      </button>
      {listening && <p>🎧 Listening...</p>}
    </div>
  );
};

export default VoiceInput;
 

 