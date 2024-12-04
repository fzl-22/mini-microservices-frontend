import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token =  localStorage.getItem('token');
      if  (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data!');
        }

        const body = await response.json();
        setUsername(body.data.username);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate])


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {username ? ( // Check if username is set to display the welcome message
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {username}!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Login
          </button>
        </div>
      )}
    </div>
  ); 
}

export default Home;

