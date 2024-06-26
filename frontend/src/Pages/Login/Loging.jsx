// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const response = await fetch('http://localhost:8000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ Email: email, Password: password }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         // Save user data to local storage
//         localStorage.setItem('userData', JSON.stringify(data.user));
//         setSuccess(data.message);
//         navigate('/Dashboard'); // Navigate to Dashboard
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again later.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
//         <h1 className="mb-6 text-2xl font-semibold text-center">Admin Login</h1>
//         {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
//         {success && <p className="mb-4 text-sm text-green-500">{success}</p>}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex justify-end">
//             <a href="#" className="text-sm text-orange-500 hover:underline">Forgot Password?</a>
//           </div>
//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="px-4 py-2 text-orange-500 transition bg-white border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="absolute top-4 right-4">
//         <button
//           className="px-4 py-2 text-orange-500 transition bg-white border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white"
//         >
//           <Link to='/signup'>
//             Sign Up
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
