import { useState, useEffect } from 'react';

const VoiceSearch = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('आपका ब्राउज़र वॉइस सर्च सपोर्ट नहीं करता। कृपया Chrome या Edge इस्तेमाल करें।');
      return;
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Hindi
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      if (onSearch) onSearch(spokenText);
    };

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className={`p-2 rounded-full transition ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-200 hover:bg-gray-300'}`}
      title="Hindi voice search"
    >
      {isListening ? '🎤 सुन रहा हूँ...' : '🎤'}
    </button>
  );
};

export default VoiceSearch;