import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/signin', { email, password }, { withCredentials: true });
      alert(response.data.msg); // Display the message in an alert

      if (response.status === 200 && response.data.msg === "Login successful") {
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (err) {
      // Handle errors
      console.error('Signin error: ', err.response.data);
      alert('An error occurred during signin.'); // Display an error alert
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4 text-black text-center">Log In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
            <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
            <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button className="px-4 py-2 my-2 text-white bg-green-600 rounded hover:bg-green-700 w-full" type="button" onClick={handleSignin}>Login</button>
        <div className="flex justify-between mt-4">
          <Link to="/forgotpassword" className="text-sm text-gray-400 hover:underline focus:outline-none">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-sm text-gray-400 hover:underline focus:outline-none">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
