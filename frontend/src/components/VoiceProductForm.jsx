import { useState, useEffect } from 'react';
import { addProduct } from '../services/productService';

const VoiceProductForm = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(0);
  const [productData, setProductData] = useState({ name: '', price: '', quantity: '' });
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const speakHindi = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('आपका ब्राउज़र वॉइस इनपुट सपोर्ट नहीं करता। कृपया Chrome या Edge इस्तेमाल करें।');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
      setStatusMessage('सुनने में समस्या, फिर से कोशिश करें।');
      speakHindi('सुनने में समस्या, फिर से कोशिश करें।');
    };
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      handleVoiceInput(text);
    };
    recognition.start();
  };

  const handleVoiceInput = (text) => {
    if (step === 0) {
      const name = text.trim();
      if (name) {
        setProductData({ ...productData, name });
        speakHindi(`उत्पाद का नाम ${name} रखा गया। अब कीमत प्रति किलो बोलें।`);
        setStep(1);
      } else {
        speakHindi('कृपया उत्पाद का नाम बोलें।');
      }
    } 
    else if (step === 1) {
      const match = text.match(/\d+/);
      const price = match ? parseInt(match[0]) : null;
      if (price && price > 0) {
        setProductData({ ...productData, price });
        speakHindi(`कीमत ${price} रुपये प्रति किलो लगाई गई। अब मात्रा किलो में बोलें।`);
        setStep(2);
      } else {
        speakHindi('कृपया सही कीमत बोलें, जैसे 30 रुपये।');
      }
    }
    else if (step === 2) {
      const match = text.match(/\d+/);
      const qty = match ? parseInt(match[0]) : null;
      if (qty && qty > 0) {
        setProductData({ ...productData, quantity: qty });
        speakHindi(`मात्रा ${qty} किलो लगाई गई। कृपया पुष्टि करें: ${productData.name}, ${productData.price} रुपये प्रति किलो, ${qty} किलो. हाँ या नहीं बोलें।`);
        setStep(3);
      } else {
        speakHindi('कृपया सही मात्रा बोलें, जैसे 50 किलो।');
      }
    }
    else if (step === 3) {
      if (text.includes('हाँ') || text.includes('haan') || text.includes('yes')) {
        saveProduct();
      } else {
        speakHindi('उत्पाद सूचीबद्ध नहीं किया गया। आप फिर से कोशिश कर सकते हैं।');
        onClose();
      }
    }
  };

  const saveProduct = async () => {
    try {
      const newProduct = await addProduct({
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
        category: 'vegetable'
      });
      setStatusMessage('उत्पाद सफलतापूर्वक सूचीबद्ध हो गया!');
      speakHindi('उत्पाद सफलतापूर्वक सूचीबद्ध हो गया!');
      onSuccess(newProduct);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error('Save error:', err);
      speakHindi('उत्पाद सूचीबद्ध करने में त्रुटि हुई।');
    }
  };

  useEffect(() => {
    speakHindi('उत्पाद जोड़ने के लिए वॉइस असिस्टेंट शुरू हो रहा है। उत्पाद का नाम बोलें।');
    startListening();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 text-center">
        <h3 className="text-xl font-bold mb-4">🎤 वॉइस असिस्टेंट</h3>
        <div className="mb-4">
          <div className={`w-16 h-16 mx-auto rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'} flex items-center justify-center text-3xl`}>
            🎤
          </div>
          <p className="mt-2 text-gray-600">{isListening ? 'सुन रहा हूँ...' : 'प्रोसेसिंग...'}</p>
          {statusMessage && <p className="mt-2 text-sm text-green-600">{statusMessage}</p>}
        </div>
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">बंद करें</button>
      </div>
    </div>
  );
};

export default VoiceProductForm;