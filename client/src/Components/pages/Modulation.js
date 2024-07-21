// Function to convert text to speech using Web Speech API
function TextToSpeech(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// Function to generate response based on input text
async function generateResponse(inputText) {
    if (typeof inputText !== 'string' || !inputText.trim()) {
        console.error('Input text is null or not a string');
        alert('Null not allowed');
        return;
    let prompt;

    // Statement based on emotion
    if (inputText.includes("happy")) {
        prompt = 'Yayyyy, WOW. ${inputText};'
    } else if (inputText.includes("sad")) {
        prompt = 'Oh no, no. ${inputText};'
    } else if (inputText.includes("angry")) {
        prompt = 'What the heck. ${inputText};'
    } else if (inputText.includes("surprise")) {
        prompt = 'Oh my Godd, yayy. ${inputText};'
    } else {
        prompt = inputText;
    }
}
    try {
        const response = await fetch('http://localhost:3001/modulation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // If your backend requires an Authorization token, add it here
            },
            body: JSON.stringify({ text: prompt }) // Send the prompt as part of the request body
        });

        const data = await response.json();
        const generatedText = data.generatedText; // Assuming the backend sends back an object with a 'generatedText' field

        // Convert generated text to speech
        TextToSpeech(generatedText);
    } catch (error) {
        console.error('Error calling modulation endpoint:', error);
        // Handle the error accordingly
    }
    // Call OpenAI API to generate response based on input text
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 30,  // Limiting to one sentence
            temperature: 0.7,  // Adjust the temperature as needed for creativity
            stop: '\n'
        })
    });

    const data = await response.json();
    const generatedText = data.choices[0].text.trim();

    // Convert generated text to speech
    TextToSpeech(generatedText);
}

// Example usage
const inputText = prompt("Enter your statement: ");
generateResponse(inputText);

// const express = require('express');
// const fetch = require('node-fetch'); // You need to install this package if using Node.js
// const app = express();
// const port = 3001;

// app.use(express.json());

// app.post('/modulation', async (req, res) => {
//     const inputText = req.body.text; // assuming the text is sent in the request body
//     let prompt;

//     // Generate the prompt based on emotion
//     if (inputText.includes("happy")) {
//         prompt = `Yayyyy, WOW. ${inputText}`;
//     } else if (inputText.includes("sad")) {
//         prompt = `Oh no, no. ${inputText}`;
//     } else if (inputText.includes("angry")) {
//         prompt = `What the heck. ${inputText}`;
//     } else if (inputText.includes("surprise")) {
//         prompt = `Oh my Godd, yayy. ${inputText}`;
//     } else {
//         prompt = inputText;
//     }

//     try {
//         const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer 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'
//             },
//             body: JSON.stringify({
//                 prompt: prompt,
//                 max_tokens: 30,
//                 temperature: 0.7,
//                 stop: '\n'
//             })
//         });

//         const data = await response.json();
//         // Send the generated text back to the client
//         res.json({ generatedText: data.choices[0].text.trim() });
//     } catch (error) {
//         console.error('Error generating response:', error);
//         res.status(500).send('Error generating response');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });
