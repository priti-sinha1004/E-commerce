import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ prevents page reload
    if (currentState === 'Login') {
      console.log('Logging in...');
    } else {
      console.log('Signing up...');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4"
    >
      {/* Header */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* If Sign Up show Name field */}
      {currentState === 'Sign Up' && (
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-3 py-2 border border-gray-800"
        />
      )}

      {/* Email field */}
      <input
        type="email"
        placeholder="Email Address"
        className="w-full px-3 py-2 border border-gray-800"
      />

      {/* Password field */}
      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-800"
      />

      {/* Forgot Password link (only in Login mode) */}
      {currentState === 'Login' && (
        <div className="w-full flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot your password?
          </button>
        </div>
      )}

      {/* Submit button */}
      <button type="submit" className="w-full bg-gray-800 text-white py-2">
        {currentState === 'Login' ? 'Login' : 'Create Account'}
      </button>

      {/* Switch option */}
      <p className="mt-4 text-sm">
        {currentState === 'Login'
          ? "Don't have an account?"
          : 'Already have an account?'}{' '}
        <span
          onClick={() =>
            setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
          }
          className="text-blue-600 cursor-pointer hover:underline"
        >
          {currentState === 'Login' ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </form>
  );
};

export default Login;
