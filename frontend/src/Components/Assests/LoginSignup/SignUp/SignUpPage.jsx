import React, { useState } from 'react';
import './SignUpPage.css';

const SignUpPage = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Here you would typically perform user registration logic
    // For simplicity, let's assume all fields are required
    if (username && email && password) {
      onSignUp(username, email, password);
    } else {
      alert('Please provide all required information.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpPage;
