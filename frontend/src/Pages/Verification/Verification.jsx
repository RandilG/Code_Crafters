import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setInterval(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendCountdown]);

  const handleChange = (element, index) => {
    if (/[^0-9]/.test(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = JSON.parse(localStorage.getItem('formData'));

    try {
      const response = await axios.post('http://localhost:8000/verifyEmail', {
        email: formData.email,
        otp: otp.join(''),
      });

      if (response.status === 200) {
        // If OTP verification is successful, save user data to the database
        const saveResponse = await axios.post('http://localhost:8000/saveUser', formData);

        if (saveResponse.status === 200) {
          localStorage.removeItem('formData');
          navigate('/dashboard');
        } else {
          setError(saveResponse.data.error || 'Failed to save user data');
        }
      } else {
        setError(response.data.error || 'Invalid OTP');
      }
    } catch (error) {
      setError(error.response.data.error || 'An unexpected error occurred');
    }
  };

  const resendCode = async () => {
    setResendCountdown(60);
    const formData = JSON.parse(localStorage.getItem('formData'));

    try {
      await axios.post('http://localhost:8000/resendOtp', {
        email: formData.email,
      });
    } catch (error) {
      setError(error.response.data.error || 'An unexpected error occurred');
    }
  };

  const handleBack = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">OTP Verification</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className="w-10 h-10 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-1 text-center">{error}</p>}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-white border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
            >
              Go Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Verify
            </button>
          </div>
          <div className="text-center mt-4">
            {resendCountdown > 0 ? (
              <p className="text-sm text-gray-500">Resend code in {resendCountdown}s</p>
            ) : (
              <button
                type="button"
                onClick={resendCode}
                className="text-sm text-orange-500 hover:underline"
              >
                Resend Code
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
