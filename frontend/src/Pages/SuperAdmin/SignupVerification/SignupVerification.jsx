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
        const saveResponse = await axios.post('http://localhost:8000/saveUser', formData);

        if (saveResponse.status === 200) {
          localStorage.removeItem('formData');
          navigate('/SuperAdmin/SuperAdminDashboard');
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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-center text-orange-600 mb-12">OTP Verification</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 text-center text-2xl font-semibold border-2 border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          <div className="flex justify-center space-x-6 mt-8">
            <button
              type="button"
              onClick={handleBack}
              className="px-8 py-3 bg-white text-orange-500 border-2 border-orange-500 rounded-full hover:bg-orange-50 transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Go Back
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Verify
            </button>
          </div>
          <div className="text-center mt-6">
            {resendCountdown > 0 ? (
              <p className="text-lg text-gray-600">Resend code in {resendCountdown}s</p>
            ) : (
              <button
                type="button"
                onClick={resendCode}
                className="text-lg text-orange-500 hover:underline font-semibold"
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