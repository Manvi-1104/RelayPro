import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

//import jwt_decode from 'jwt-decode';
import { jwtDecode as jwt_decode } from 'jwt-decode';
//const [opUsername, setOpUsername] = useState('');

// useEffect(() => {
//   const token = Cookies.get('token');

//   if (token) {
//     // Decode the token to get user information
//     const decodedToken = jwt_decode(token);
//    const { username } = decodedToken;
//     setOpUsername(username);
//   }
// }, []);


// function CreatePosts() {
//   const [text, setText] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const badWords = ['badword1', 'badword2', 'badword3']; // Add your list of bad words

//   function containsBadWords(text) {
//     return badWords.some(badWord => text.toLowerCase().includes(badWord));
//   }
//   const handleCreatePost = () => {
//     setLoading(true);
//     const token = Cookies.get('token');

//     if (!token) {
//       console.error('No token found');
//       return;
//     }

//    if (containsBadWords(text)) {
//    alert('Your post contains inappropriate content.');
//    setLoading(false);
//    return;
// }
//     const tokenPayload = token.split('.')[1];
//     const decodedToken = JSON.parse(atob(tokenPayload));
//     const datePosted = new Date().toISOString(); // Get current date and time
//     const opUsername = decodedToken.username;// Replace with the actual username of the logged-in user

//     const postData = {
//       text,
//       imageUrl,
//       datePosted,
//       opUsername
//     };

//     axios.post('http://localhost:3001/post', postData, {
      
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
    
//     .then(response => {
//       console.log('Post created successfully:', response.data);
//       // Handle any UI updates or notifications indicating successful post creation
//       setLoading(false);
//       setText('');
//       setImageUrl('');
//     })
//     .catch(error => {
//       console.error('Error creating post:', error);
//       // Handle any UI updates or notifications indicating post creation failure
//       setLoading(false);
//     });
//   };

//   return (
//     <div>
//       <h2>Create Post</h2>
//       <div>
//         <label>What's on your mind? Share your Thoughts with others:</label>
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </div>
//       {/* <div>
//         <label>Image URL:</label>
//         <input
//           type="text"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//         />
//       </div> */}
//       <button onClick={handleCreatePost} disabled={loading}>Create Post</button>
//     </div>
//   );
// }

// export default CreatePosts;

// function CreatePosts() {
//   const [text, setText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const badWords = ['badword1', 'badword2', 'badword3']; // Add your list of bad words
//   const opUsername = decodedToken.username;// Replace with the actual username of the logged-in user
//   function containsBadWords(text) {
//       return badWords.some(badWord => text.toLowerCase().includes(badWord));
//   }

//   const handleCreatePost = () => {
//       setLoading(true);
//       const token = Cookies.get('token');

//       if (!token) {
//           console.error('No token found');
//           setLoading(false);
//           return;
//       }

//       if (containsBadWords(text)) {
//           alert('Your post contains inappropriate content.');
//           setLoading(false);
//           return;
//       }

//       // Post data preparation
//       const postData = {
//           text,
//           // imageUrl, // if you decide to include images in posts later
//           datePosted: new Date().toISOString(),
//           // opUsername: decodedToken.username // Assumed you will get this from the token or session
//       };

//       axios.post('http://localhost:3001/post', postData, {
//           headers: {
//               Authorization: `Bearer ${token}`
//           }
//       })
//       .then(response => {
//           console.log('Post created successfully:', response.data);
//           setLoading(false);
//           setText('');
//           // setImageUrl(''); // if you decide to include images in posts later
//       })
//       .catch(error => {
//           console.error('Error creating post:', error);
//           setLoading(false);
//       });
//   };

//   return (
//       <div>
//           <h2>Create Post</h2>
//           <div>
//               <label>What's on your mind? Share your Thoughts with others:</label>
//               <input
//                   type="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//               />
//           </div>
//           <button onClick={handleCreatePost} disabled={loading || containsBadWords(text)}>
//               Create Post
//           </button>
//       </div>
//   );
// }

// export default CreatePosts;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import jwt_decode from 'jwt-decode';



function CreatePosts() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [opUsername, setOpUsername] = useState('');
    const badWords = ['badword', 'ass', 'bitch','dumbass','fucker','fuckoff']; // Add your list of bad words

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decoded = jwt_decode(token);
            setOpUsername(decoded.username); // Assuming the decoded token contains a username field
        }
    }, []);

    function containsBadWords(text) {
        return badWords.some(badWord => text.toLowerCase().includes(badWord));
    }

    const handleCreatePost = () => {
        setLoading(true);
        const token = Cookies.get('token');

        if (!token) {
            console.error('No token found');
            setLoading(false);
            return;
        }

        if (containsBadWords(text)) {
            console.log('Bad words detected:', text);
            alert('Your post contains inappropriate content.');
            setLoading(false);
            return;
        }

        const postData = {
            text,
            opUsername, // use the opUsername from state
            datePosted: new Date().toISOString(),
        };

        axios.post('http://localhost:3001/post', postData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Post created successfully:', response.data);
            setLoading(false);
            setText('');
        })
        .catch(error => {
            console.error('Error creating post:', error);
            setLoading(false);
        });
    };

    return (
        <div>
            <h2>Create Post</h2>
            <div>
                <label>What's on your mind? Share your Thoughts with others:</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <button onClick={handleCreatePost} disabled={loading || containsBadWords(text)}>
                Create Post
            </button>
        </div>
    );
}

export default CreatePosts;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import jwt_decode from 'jwt-decode';

// function CreatePosts() {
//     const [text, setText] = useState('');
//     const [loading, setLoading] = useState(false);
//     const badWords = ['badword', 'ass', 'bitch','dumbass','fucker','fuckoff']; // List of bad words

//     useEffect(() => {
//         const token = Cookies.get('token');
//         if (token) {
//             const decoded = jwt_decode(token);
//             // Assuming the decoded token contains a username field
//             const opUsername = decoded.username; 
//             // Set other state or use opUsername as needed
//         }
//     }, []);

//     function containsBadWords(text) {
//         return badWords.some(badWord => text.toLowerCase().includes(badWord));
//     }

//     const handleCreatePost = async () => {
//         setLoading(true);
//         const token = Cookies.get('token');

//         if (!token) {
//             console.error('No token found');
//             setLoading(false);
//             return;
//         }

//         if (containsBadWords(text)) {
//             console.log('Bad words detected:', text);
//             alert('Your post contains inappropriate content.');
//             setLoading(false);
//             return;
//         }

//         try {
//             // Call your backend to create the post and check for abusive content
//             const response = await axios.post('http://localhost:3001/create-posts', { content: text }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             // Check the response from your backend
//             if (response.data && response.data.message) {
//                 console.log('Post created successfully:', response.data);
//                 setText('');
//             } else if (response.data && response.data.error) {
//                 alert(response.data.error);
//             }
//         } catch (error) {
//             console.error('Error creating post:', error);
//             alert('Error creating post.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h2>Create Post</h2>
//             <div>
//                 <label>What's on your mind? Share your Thoughts with others:</label>
//                 <input
//                     type="text"
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                 />
//             </div>
//             <button onClick={handleCreatePost} disabled={loading}>
//                 Create Post
//             </button>
//         </div>
//     );
// }

// export default CreatePosts;

