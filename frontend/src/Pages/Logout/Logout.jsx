import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Clear Axios default headers or any other configuration if needed
        axios.defaults.headers.common['Authorization'] = null;

        // Clear local storage
        localStorage.clear();

        // Redirect to the login page or home page
        history.push('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
