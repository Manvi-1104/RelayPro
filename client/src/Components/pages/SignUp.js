// import React, { useState } from 'react';
// import axios from 'axios';

// import '../../App.css';
// import './SignUp.css';
// function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [location, setLocation] = useState('');
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Perform form validation
//     if (!username || !password || !location) {
//       alert('Please fill out all fields.');
//       return;
//     }

//     // Handle login logic here (e.g., send request to server)
//     console.log('Signing up with the username:', username, 'and password:', password);

    
//     // Clear form fields after submission
//     setUsername('');
//     setPassword('');
//     setLocation('');
//   };

//   return (
//     <div className='login-container'>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit} className='login-form'>
//         <div className='form-group'>
//           <label htmlFor='username'>Username:</label>
//           <input
//             type='username'
//             id='username'
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label htmlFor='password'>Password:</label>
//           <input
//             type='password'
//             id='password'
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label htmlFor='location'>Location:</label>
//           <input
//             type='location'
//             id='location'
//             value={location}
//             onChange={(event) => setLocation(event.target.value)}
//             required
//           >
//             {/* <option value="">Select State</option>
//             <option value="Andhra Pradesh">Andhra Pradesh</option>
//             <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//             <option value="Madhya Pradesh">Madhya Pradesh</option>
//             <option value="Maharashtra">Maharashtra</option>
//             <option value="Karnataka">Karnataka</option>
//             <option value="Uttar Pradesh">Uttar Pradesh</option>
//             <option value="Himachal Pradesh">Himachal Pradesh</option>
//             <option value="Tamil Nadu">Tamil Nadu</option>
//             <option value="Kerala">Kerala</option> */}

            
//           </input>
//         </div>
//         <button type='submit' className='btn btn-primary'>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;

// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../App.css';
// import './SignUp.css';

// function Signup() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [location, setLocation] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Perform form validation
//         if (!username || !password || !location) {
//             alert('Please fill out all fields.');
//             return;
//         }

//         // Handle signup logic here
//         try {
//             const response = await axios.post('http://localhost:3001/sign-up', {
//                 username,
//                 password,
//                 location
//             });
//             console.log('Signup success:', response.data);
//             alert('Signup successful!');
//             // Clear form fields after successful submission
//             setUsername('');
//             setPassword('');
//             setLocation('');
//         } catch (err) {
//             console.error('Signup error:', err);
//             setError(err.response?.data?.error || 'Signup failed');
//         }
//     };

//     return (
//         <div className='login-container'>
//             <h1>Sign Up</h1>
//             {error && <p className="error">{error}</p>}
//             <form onSubmit={handleSubmit} className='login-form'>
//                 <div className='form-group'>
//                     <label htmlFor='username'>Username:</label>
//                     <input
//                         type='text'
//                         id='username'
//                         value={username}
//                         onChange={(event) => setUsername(event.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='password'>Password:</label>
//                     <input
//                         type='password'
//                         id='password'
//                         value={password}
//                         onChange={(event) => setPassword(event.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='location'>Location:</label>
//                     <input
//                         type='text'
//                         id='location'
//                         value={location}
//                         onChange={(event) => setLocation(event.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type='submit' className='btn btn-primary'>Submit</button>
//             </form>
//         </div>
//     );
// }

// export default Signup;


import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import './SignUp.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password || !location) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/sign-up', {
                username,
                password,
                location
            });
            alert('Signup successful!');
            setUsername('');
            setPassword('');
            setLocation('');
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
          <div className='login-container'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className='login-form'>
              <div className='form-group'>
                <label htmlFor='username'>Username:</label>
                <input
                  type='username'
                  id='username'
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='location'>Location:</label>
                <input
                  type='location'
                  id='location'
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                >
                  {/* <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerala">Kerala</option> */}
      
                  
                </input>
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
          </div>
        );
}

export default Signup;
