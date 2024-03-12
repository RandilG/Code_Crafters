import React, { useState } from 'react';
import LoginPage from './../src/Components/Assests/LoginSignup/Login/LoginPage';
import SignUpPage from './../src/Components/Assests/LoginSignup/SignUp/SignUpPage';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (email) => {
    // Here you would typically set the logged in user state
    // For simplicity, let's just log the email for now
    console.log(`Logged in as ${email}`);
    setLoggedInUser(email);
  };

  const handleSignUp = (username, email, password) => {
    // Here you would typically add the user to your database
    // For simplicity, let's just log the user information for now
    console.log(`Signed up as ${username} with email ${email} and password ${password}`);
    // You might want to setLoggedInUser with the new user here if you want to automatically log them in after sign up
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <h1>Welcome, {loggedInUser}!</h1>
          <button onClick={() => setLoggedInUser(null)}>Logout</button>
        </div>
      ) : (
        <div>
          <LoginPage onLogin={handleLogin} />
          <SignUpPage onSignUp={handleSignUp} />
        </div>
      )}
    </div>
  );
};

export default App;
