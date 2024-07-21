/*import React, { useState, useEffect } from 'react';
import './Transcription.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

function Transcribe() {
    const [sentence, setSentence] = useState('');
    const [correctedSentence, setCorrectedSentence] = useState('');
    const [complexWords, setComplexWords] = useState([]);
    const [listening, setListening] = useState(false);

    useEffect(() => {
        recognition.onstart = () => setListening(true);
        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setSentence(transcript);
            analyzeSentence(transcript);
            const corrected = correctGrammar(transcript);
            setCorrectedSentence(corrected);
            speakSentence(transcript);
        };
        recognition.onend = () => {
            if (listening) {
                recognition.start();
            }
        };

        return () => {
            recognition.stop();
        };
    }, [listening]);

    const analyzeSentence = (sentence) => {
        const words = sentence.split(' ');
        const complexWords = words.filter(word => syllableCount(word) >= 3);
        setComplexWords(complexWords);
    };

    const correctGrammar = (sentence) => {
        const corrections = {
            "goed": "went",
            "don't want no": "doesn't want any",
            "I seen": "I have seen",
            "They was": "They were",
            "Me and my friend likes": "My friend and I like",
            "He do": "He does",
            "She have": "She has",
            "We was": "We were",
            "You eats": "You eat",
            "She don't like you" : "She doesn't like you"
        };

        for (const [incorrect, correct] of Object.entries(corrections)) {
            if (sentence.includes(incorrect)) {
                return sentence.replace(incorrect, correct);
            }
        }
        return sentence;
    };

    const syllableCount = (word) => {
        return Math.max(1, word.replace(/[^aeiouy]/gi, '').length);
    };

    const speakSentence = (sentence) => {
        const speech = new SpeechSynthesisUtterance(sentence);
        speech.rate = 0.3;
        window.speechSynthesis.speak(speech);
    };

    const pronounceWord = (word) => {
        const speech = new SpeechSynthesisUtterance(word);
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    };

    const handleSpeech = () => {
        if (!listening) {
            recognition.start();
        } else {
            recognition.stop();
            setListening(false);
        }
    };

    return (
        <div className="transcribe-container">
            <button
                className={`transcribe-button ${listening ? 'stop' : ''}`}
                onClick={handleSpeech}
            >
                {listening ? 'Stop Speaking' : 'Start Speaking'}
            </button>

            {sentence && (
                <>
                    <h3>Transcript:</h3>
                    <p className="transcribe-transcript">{sentence}</p>
                    <h3>Corrected Transcript:</h3>
                    <p className="transcribe-transcript">{correctedSentence}</p>
                </>
            )}

            {complexWords.length > 0 && (
                <>
                    <h3>Complex words in the sentence:</h3>
                    <div>
                        {complexWords.map((word, index) => (
                            <div key={index} className="transcribe-complex-word-container">
                                <span className="transcribe-complex-word">
                                    {word}
                                </span>
                                <button
                                    className="transcribe-pronounce-button"
                                    onClick={() => pronounceWord(word)}
                                >
                                    Pronounce
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {complexWords.length === 0 && sentence && <p>No complex words found in the sentence.</p>}
        </div>
    );
}

export default Transcribe;
*/

import React, { useState, useEffect } from 'react';
import './Transcription.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

function Transcribe() {
    const [sentence, setSentence] = useState('');
    const [correctedSentence, setCorrectedSentence] = useState('');
    const [complexWords, setComplexWords] = useState([]);
    const [listening, setListening] = useState(false);
    const webcamRef = React.useRef(null);


    useEffect(() => {
        recognition.onstart = () => setListening(true);
        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setSentence(transcript);
            analyzeSentence(transcript);
            const corrected = correctGrammar(transcript);
            setCorrectedSentence(corrected);
            speakSentence(transcript);
        };
        recognition.onend = () => {
            setListening(false); // Update listening state when recognition ends
        };

        return () => {
            recognition.stop();
        };
    }, []);

    const analyzeSentence = (sentence) => {
        const words = sentence.split(' ');
        const complexWords = words.filter(word => syllableCount(word) >= 3);
        setComplexWords(complexWords);
    };

    const correctGrammar = (sentence) => {
        // Grammar correction logic here
        const corrections = {
            'goed': 'went',
            'don\'t': 'doesn\'t',
            'no': 'any',
            'I seen': 'I have seen',
            'was': 'were',
            "goed": "went",
            "don't want no": "doesn't want any",
            "I seen": "I have seen",
            "They was": "They were",
            "Me and my friend likes": "My friend and I like",
            "He do": "he does",
            "She have": "She has",
            "We was": "We were",
            "You eats": "You eat",
            "She don't like you" : "She doesn't like you"
        };
        let corrected = sentence;
        for (const [wrong, right] of Object.entries(corrections)) {
            corrected = corrected.replace(new RegExp(wrong, 'gi'), right);
        }
        return corrected;
    };

    const syllableCount = (word) => {
        return Math.max(1, word.replace(/[^aeiouy]/gi, '').length);
    };

    const speakSentence = (sentence) => {
        const speech = new SpeechSynthesisUtterance(sentence);
        speech.rate = 0.3;
        window.speechSynthesis.speak(speech);
    };

    const pronounceWord = (word) => {
        const speech = new SpeechSynthesisUtterance(word);
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    };

    const handleSpeech = () => {
        if (!listening) {
            recognition.start();
            setListening(true); // Update listening state
        } else {
            recognition.stop();
            setListening(false); // Update listening state
        }
    };
    fetch('http://localhost:5000/classify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data (e.g., update state with classification result)
            console.log(data);
        })
        .catch(error => {
            // Handle any errors from the API request
            console.error('Error:', error);
        });

    return (
        <div>
            <div className="transcribe-container">
                <button
                    className={`transcribe-button ${listening ? 'stop' : ''}`}
                    onClick={handleSpeech}
                >
                    {listening ? 'Stop Speaking' : 'Start Speaking'}
                </button>
    
                {sentence && (
                    <>
                        <h3>Transcript:</h3>
                        <p className="transcribe-transcript">{sentence}</p>
                        <h3>Corrected Transcript:</h3>
                        <p className="transcribe-transcript">{correctedSentence}</p>
                    </>
                )}
    
                {complexWords.length > 0 && (
                    <>
                        <h3>Complex words in the sentence:</h3>
                        <div>
                            {complexWords.map((word, index) => (
                                <div key={index} className="transcribe-complex-word-container">
                                    <span className="transcribe-complex-word">{word}</span>
                                    <button
                                        className="transcribe-pronounce-button"
                                        onClick={() => pronounceWord(word)}
                                    >
                                        Pronounce
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
    
                {complexWords.length === 0 && sentence && <p>No complex words found in the sentence.</p>}
            </div>
            
            
        </div>
    );
    
                            }
export default Transcribe;
