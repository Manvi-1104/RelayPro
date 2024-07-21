// // Virago backend
// // Home page. Chatbot page. news. community. auth
// // Read and write using json file. User.json and Post.json
// const express = require('express')
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const axios = require('axios');
// // const NewsAPI = require('newsapi');
// // const newsapi = new NewsAPI('a08de840be814a6381e3685799107bbe');
// const app = express()
// const port = 3001
// const secretKey = 'KALPANA';
// const { Configuration, OpenAIApi } = require("openai");
// const mysql = require('mysql');
// app.use(cors());
// const { google } = require('googleapis');
// const YOUTUBE_API_KEY = 'AIzaSyBgiPPNXITHf8q1AUxgvJf0ImoWPVbUYOk';
// //const openaiApiKey = '';

// const date = new Date(); // or whatever your date source is
// const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
// // Initialize the YouTube API client
// const youtube = google.youtube({
//   version: 'v3',
//   auth: YOUTUBE_API_KEY
// });

// const{ AssemblyAI } = require('assemblyai');

// const client = new AssemblyAI({
//   apiKey: "b4713e8745dd46b3a704fd05f302113d"
// })

// const audioUrl =
//   'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'

// const config = {
//   audio_url: audioUrl
// }

// // Assuming you've set up express and other configurations
// app.get('/transcribe', async (req, res) => {
//     const audioUrl = 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'; // Sample audio file
//     const config = { audio_url: audioUrl };

//     try {
//         const transcriptResult = await client.transcripts.create(config);
//         // Wait for the transcription to complete and then fetch the result
//         // You might need to poll the API to get the completed transcription
//         res.json({ transcription: transcriptResult.text });
//     } catch (error) {
//         console.error('Error in transcription:', error);
//         res.status(500).json({ error: 'Error processing transcription' });
//     }
// });

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'root',
//   password: 'mom081274',
//   database: 'relaypro'
// });

// app.get('/check-db-connection', (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error("Error connecting to MySQL database:", err);
//             return res.status(500).json({ status: 'error', message: 'Failed to connect to the database', error: err.message });
//         }

//         connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
//             if (error) {
//                 console.error("Error querying the database:", error);
//                 connection.release();
//                 return res.status(500).json({ status: 'error', message: 'Failed to query the database', error: error.message });
//             }

//             connection.query('desc users', (err, tableResults) => {
//                 connection.release(); // Make sure to release the connection back to the pool

//                 if (err) {
//                     console.error("Error fetching tables from the database:", err);
//                     return res.status(500).json({ error: 'Failed to fetch tables', details: err.message });
//                 }

//                 const tables = tableResults.map(row => Object.values(row)[0]);
//                 res.json({ status: 'success', message: 'Successfully connected to the database', result: results[0].solution, tables });
//             });
//         });
//     });
// });


// // const {verifyToken} = require('./middleware.js');
// const verifyToken = (req, res, next) => {
//     // Get the token from the request header
//     const token = req.headers['authorization'];

//     // Check if token is provided
//     if (!token) {
//         return res.status(401).json({ error: 'Access denied. Token is required' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token.split(' ')[1], secretKey);
//         req.user = decoded;
//         next(); // Move to the next middleware or route handler
//     } catch (error) {
//         console.error('Token verification error:', error);
//         return res.status(403).json({ error: 'Invalid token' });
//     }
// };



// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })



// // app.get('/news', (req, res) => {   
// //     newsapi.v2.everything({
// //     q: 'financial+literacy+women+india',
// //     language: 'en'
// //     }).then(response => {
// //         const articles = response.articles.map(article => {
// //             return {
// //                 title: article.title,
// //                 author: article.author,
// //                 description: article.description,
// //                 url: article.url
// //             };
// //         });
// //         res.json(articles);
// //     }).catch(error => {
// //         console.error('Error fetching news:', error);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     });
// // });

// app.get('/youtube-data', async (req, res) => {
//     try {
//       const searchQuery = req.query.q || 'improving communication skills'; // You can pass the search query as a query parameter
//       const response = await youtube.search.list({
//         part: 'snippet',
//         q: searchQuery,
//         maxResults: 10,
//         type: 'video', // if you want to search for videos only
//     });
  
//     const videos = response.data.items.map(item => ({
//         title: item.snippet.title,
//         description: item.snippet.description,
//         videoId: item.id.videoId,
//         thumbnail: item.snippet.thumbnails.default.url
//       }));
  
//       res.json(videos);
//     } catch (error) {
//       console.error('Error fetching YouTube data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
  
//   // ... other routes like POST '/post', GET '/posts', etc.
  
// //   app.listen(port, () => {
// //     console.log(`Server listening on port ${port}`);
// //   });




// //
// app.post('/post', verifyToken, (req, res) => {
//     const { text, datePosted, opUsername } = req.body;

//     // Insert the new post into the database
//     pool.query('INSERT INTO posts (text, datePosted, opUsername) VALUES (?, ?, ?)', [text, formattedDate, opUsername], (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         res.json({ message: 'Post created successfully' });
//     });
// });

// app.get('/posts', verifyToken, (req, res) => {
//     // Retrieve all posts from the database
//     pool.query('SELECT * FROM posts', (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         res.json(results);
//     });
// });


// app.delete('/posts/:id', verifyToken, (req, res) => {
//     const postId = req.params.id;

//     // Delete the post from the database
//     pool.query('DELETE FROM posts WHERE id = ?', postId, (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         // Check if any rows were affected (post deleted)
//         if (results.affectedRows === 0) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         res.json({ message: 'Post deleted successfully' });
//     });
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Query the database to find the user with matching username and password
//   pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     if (results.length > 0) {
//       const user = results[0];
//       // Successful login
//       const token = jwt.sign({ username: user.username }, secretKey);
//       res.json({ message: 'Login successful', user: user, token: token });
//     } else {
//       // Invalid credentials
//       res.status(401).json({ error: 'Invalid username or password' });
//     }
//   });
// });

// // app.post('/signup', (req, res) => {
// //   const { username, password, location } = req.body;

// //   // Check if the username already exists
// //   pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
// //     if (err) {
// //       console.error(err);
// //       return res.status(500).json({ error: 'Internal Server Error' });
// //     }

// //     if (results.length > 0) {
// //       return res.status(400).json({ error: 'Username already exists' });
// //     }

// //     // Insert the new user into the database
// //     pool.query('INSERT INTO users (username, password, location) VALUES (?, ?, ?)', [username, password, location], (err) => {
// //       if (err) {
// //         console.error(err);
// //         return res.status(500).json({ error: 'Internal Server Error' });
// //       }
// //       // Successful signup
// //       const token = jwt.sign({ username: username }, secretKey);
// //       res.json({ message: 'Signup successful', token: token });
// //     });
// //   });
// // });

// app.post('/sign-up', (req, res) => {
//     const { username, password, location } = req.body;
//     console.log('Signup attempt:', { username, password, location });
//     pool.query('USE relaypro');
//     pool.query('INSERT INTO users (username, password, location) VALUES (?, ?, ?)', [username, password, location], (err) => {
//         if (err) {
//             console.error('Database error on user insertion:', err);
//             return res.status(500).json({ error: 'Internal Server Error', details: err.message });
//         }

//         const token = jwt.sign({ username: username }, secretKey);
//         console.log('Signup successful for:', username);
//         res.json({ message: 'Signup successful', token: token });
//     });
//     pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
//         if (err) {
//             console.error('Database error on username check:', err);
//             return res.status(500).json({ error: 'Internal Server Error', details: err.message });
//         }

//         if (results.length > 0) {
//             console.log('Username already exists:', username);
//             return res.status(400).json({ error: 'Username already exists' });
//         }

        
//     });
// });

// let answer = ""

// app.post('/chat', async(req, res) => {
//     let content = "These are sample conversations which u need to take as your context. Dont use these in your answers. use this as a reference. Answer accordingly."
//     content += `{
//         "Question": "How can individuals improve their public speaking skills effectively?",
//         "Answer": "Effective ways to improve public speaking skills include practicing regularly, joining public speaking clubs like Toastmasters, studying and emulating successful speakers, seeking constructive feedback, focusing on body language and vocal variety, and gradually increasing the complexity of speaking engagements."
//     }`;

//     content += `{
//         "Question": "What are some essential tips for delivering a memorable speech?",
//         "Answer": "To deliver a memorable speech, speakers should start with a strong opening, tailor the content to the audience, maintain eye contact, use storytelling techniques, incorporate visuals if appropriate, speak with confidence and passion, keep the message concise and focused, engage the audience through interaction or questions, and end with a powerful conclusion that reinforces key points."
//     }, {
//         "Question": "How can AI assist in speech generation and enhancement?",
//         "Answer": "AI-powered tools can generate speech by converting text to speech using natural language processing models like GPT. These tools can also assist in speech enhancement by providing real-time feedback on factors such as pacing, tone, clarity, and word choice, helping speakers refine their delivery and communication skills."
//     }, {
//         "Question": "What are some common mistakes to avoid when delivering a speech, and how can individuals overcome them?",
//         "Answer": "Common mistakes to avoid when delivering a speech include speaking too fast or too softly, relying too heavily on notes or slides, using filler words such as 'um' and 'uh', failing to engage the audience, and lacking confidence. To overcome these mistakes, individuals can practice pacing and projection, familiarize themselves with the content to reduce reliance on notes, consciously eliminate filler words through practice, actively involve the audience through questions or interactive elements, and build confidence through rehearsal and positive visualization. "
//     }`;
 
//     Uinput = req.body.message;
   
//     const keywords = [
//         "address",
//          "orate",
//           "oration",
//            "discourse", 
//            "lecture", "talk",
//             "presentation",
//              "sermon",
//               "monologue", 
//               "dialogue",
//                "communication",
//                 "speech",
//                 "tell",
//                 "speaking"
//     ];
//     const containsKeyword = keywords.some(keyword => Uinput.includes(keyword));
//     if(!containsKeyword){
//         return res.json({answer: "Out of syllabus"})
//     }
//     content += Uinput;
//     // few shot approach
   
//         // console.log(content);
//     const configuration = new Configuration({
//     // apiKey: process.env.OPENAI_API_KEY,
//     apiKey: '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',
//     });
//     const openai = new OpenAIApi(configuration);

//     const chatCompletion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{role: "user", content: JSON.stringify(content)}],

// });

// console.log(chatCompletion.data.choices[0].message.content);
// answer = chatCompletion.data.choices[0].message.content;
// res.json({answer: answer});
// })

// /*app.post('/chat', async(req, res) => {
//     async function generateEssay(prompt) {
//         const addressingWords = ["address", "orate", "oration", "discourse", "lecture", "talk", "presentation", "sermon", "monologue", "dialogue", "communication", "speech", "essay"];
//         const addressingWordsSet = new Set(addressingWords.map(word => word.toLowerCase())); // Convert all words to lowercase for case-insensitive matching
        
//         if (addressingWords.some(word => prompt.toLowerCase().includes(word))) {
//             const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
//                 prompt: "Prompt: " + prompt,
//                 max_tokens: 500,
//                 temperature: 0.7,
//                 frequency_penalty: 0.5,
//                 presence_penalty: 0.5
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ${openaiApiKey}'
//                 }
//             });
    
//             return response.data.choices[0].text.trim();
//         } else {
//             return "Please give a relevant topic.";
//         }
//     }
    
//     // Example usage:
//     const prompt = prompt("Enter the topic: ");
//     generateEssay(prompt).then(essay => {
//         console.log(essay);
//     }).catch(error => {
//         console.error('Error:', error);
//     });
// });
// */
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const flask = require('flask');
const app = express();
const port = 3001;
const secretKey = 'KALPANA';
const apiBaseUrl = 'https://api.example.com/check-content';

// Your API key (Make sure to keep it secure and not expose it unnecessarily)
const apiKey = 'AIzaSyBtpcLmq_PtKhhEKXXkWEMAD_qtJu5PqL0';


app.use(cors());
app.use(bodyParser.json());
const { Configuration, OpenAIApi } = require("openai");

app.use(cors());
const { google } = require('googleapis');
const YOUTUBE_API_KEY = 'AIzaSyBgiPPNXITHf8q1AUxgvJf0ImoWPVbUYOk';
//const openaiApiKey = '';

const date = new Date(); // or whatever your date source is
const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
// Initialize the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY
});

const{ AssemblyAI } = require('assemblyai');

const client = new AssemblyAI({
  apiKey: "b4713e8745dd46b3a704fd05f302113d"
})

const audioUrl =
  'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'

const config = {
  audio_url: audioUrl
}

// Assuming you've set up express and other configurations
app.get('/transcribe', async (req, res) => {
    const audioUrl = 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'; // Sample audio file
    const config = { audio_url: audioUrl };

    try {
        const transcriptResult = await client.transcripts.create(config);
        console.log('hi');
        // Wait for the transcription to complete and then fetch the result
        // You might need to poll the API to get the completed transcription
        res.json({ transcription: transcriptResult.text });
    } catch (error) {
        console.error('Error in transcription:', error);
        res.status(500).json({ error: 'Error processing transcription' });
    }
});
// MySQL pool setup
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'mom081274',
  database: 'relaypro'
});

// Middleware for token verification
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token is required' });
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

app.get('/youtube-data', async (req, res) => {
    try {
      const searchQuery = req.query.q || 'improving communication skills'; // You can pass the search query as a query parameter
      const response = await youtube.search.list({
        part: 'snippet',
        q: searchQuery,
        maxResults: 10,
        type: 'video', // if you want to search for videos only
    });
  
    const videos = response.data.items.map(item => ({
        title: item.snippet.title,
        description: item.snippet.description,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.default.url
      }));
  
      res.json(videos);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
  // ... other routes like POST '/post', GET '/posts', etc.
  
//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });


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

//
app.post('/post', verifyToken, (req, res) => {
    const { text, datePosted, opUsername } = req.body;

    // Insert the new post into the database
    pool.query('INSERT INTO posts (text, datePosted, opUsername) VALUES (?, ?, ?)', [text, formattedDate, opUsername], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Post created successfully' });
    });
});

app.get('/posts', verifyToken, (req, res) => {
    // Retrieve all posts from the database
    pool.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(results);
    });
});


app.delete('/posts/:id', verifyToken, (req, res) => {
    const postId = req.params.id;

    // Delete the post from the database
    pool.query('DELETE FROM posts WHERE id = ?', postId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected (post deleted)
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully' });
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to find the user with matching username and password
  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      const user = results[0];
      // Successful login
      const token = jwt.sign({ username: user.username }, secretKey);
      res.json({ message: 'Login successful', user: user, token: token });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// Signup route
app.post('/sign-up', (req, res) => {
    const { username, password, location } = req.body;

    // Check if the username already exists
    pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Insert the new user
        pool.query('INSERT INTO users (username, password, location) VALUES (?, ?, ?)', [username, password, location], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error', details: err.message });
            }

            const userId = result.insertId;
            const token = jwt.sign({ userId: userId }, secretKey);
            res.json({ message: 'Signup successful', token: token });
        });
    });
});

app.post('/classify', (req, res) => {
    const { sentence } = req.body;
    if (!sentence) {
        return res.status(400).json({ error: 'No sentence provided' });
    }

    try {
        const result = classifyText(sentence);
        res.json(result);
    } catch (error) {
        console.error('Classification error:', error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});


let answer = ""

app.post('/chat', async(req, res) => {
    let content = "These are sample conversations which u need to take as your context. Dont use these in your answers. use this as a reference. Answer accordingly."
    content += `{
        "Question": "How can individuals improve their public speaking skills effectively?",
        "Answer": "Effective ways to improve public speaking skills include practicing regularly, joining public speaking clubs like Toastmasters, studying and emulating successful speakers, seeking constructive feedback, focusing on body language and vocal variety, and gradually increasing the complexity of speaking engagements."
    }`;

    content += `{
        "Question": "What are some essential tips for delivering a memorable speech?",
        "Answer": "To deliver a memorable speech, speakers should start with a strong opening, tailor the content to the audience, maintain eye contact, use storytelling techniques, incorporate visuals if appropriate, speak with confidence and passion, keep the message concise and focused, engage the audience through interaction or questions, and end with a powerful conclusion that reinforces key points."
    }, {
        "Question": "How can AI assist in speech generation and enhancement?",
        "Answer": "AI-powered tools can generate speech by converting text to speech using natural language processing models like GPT. These tools can also assist in speech enhancement by providing real-time feedback on factors such as pacing, tone, clarity, and word choice, helping speakers refine their delivery and communication skills."
    }, {
        "Question": "What are some common mistakes to avoid when delivering a speech, and how can individuals overcome them?",
        "Answer": "Common mistakes to avoid when delivering a speech include speaking too fast or too softly, relying too heavily on notes or slides, using filler words such as 'um' and 'uh', failing to engage the audience, and lacking confidence. To overcome these mistakes, individuals can practice pacing and projection, familiarize themselves with the content to reduce reliance on notes, consciously eliminate filler words through practice, actively involve the audience through questions or interactive elements, and build confidence through rehearsal and positive visualization. "
    }`;
 
    Uinput = req.body.message;
   
    const keywords = [
        "address",
         "orate",
          "oration",
           "discourse", 
           "lecture", "talk",
            "presentation",
             "sermon",
              "monologue", 
              "dialogue",
               "communication",
                "speech",
                "tell",
                "speaking"
    ];
    const containsKeyword = keywords.some(keyword => Uinput.includes(keyword));
    if(!containsKeyword){
        return res.json({answer: "Out of syllabus"})
    }
    content += Uinput;
    // few shot approach
   
        // console.log(content);
    const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: JSON.stringify(content)}],

});

console.log(chatCompletion.data.choices[0].message.content);
answer = chatCompletion.data.choices[0].message.content;
res.json({answer: answer});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
