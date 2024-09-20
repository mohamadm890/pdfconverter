"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [data_store, setData_store] = useState([])
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  console.log("This is data" + data_store);
  
  const Post_Data = async () => {
    try {
      const response = await fetch('https://pdfconverter-3.onrender.com/register', {
        method: "POST",
        credentials: 'include',
        body:  JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }

      const data = await response.json(); // Parse the JSON response
      console.log(data);
      router.push('/FileUploader');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };


  
       

    async function logout() {
      try {
        const response = await fetch('https://5000-idx-pdfconverter-1726061683649.cluster-y34ecccqenfhcuavp7vbnxv7zk.cloudworkstations.dev/logout', {
          method: 'POST',
          credentials: 'include',  // Ensure cookies (like session cookies) are included in the request
        });
    
        if (response.ok) {
          console.log('Logged out successfully');
          alert("you are logout! BY!")
          // Optionally redirect the user to the login page or homepage
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const data = await Post_Data();
      // Handle successful login
      setError('');
      alert('Login successful!');
      console.log('Success data:', data); // You can handle the successful login data here
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh', 
    
      justifyContent: 'center',
      
    }}>
      <div style={{padding: "24px", marginTop: "10%", backgroundColor: "white", width: 380, height:436, borderRadius: 32, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)"}}>
      <h2 style={{fontSize:"32px" , fontWeight:"600", marginBottom: 12}}>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px', marginTop:"40px"}}>
          <label htmlFor="username" style={{fontSize: 16, fontWeight:"500", color: "#667185"}}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box',border: '1px solid #F0F2F5', borderRadius: '8px', height:"52px", marginTop: 8  }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{fontSize: "16px", fontWeight:"500",  color: "#667185"}} >Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #F0F2F5', borderRadius: '8px', height:"52px" , marginTop: 8  }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#CB1A14', color: '#fff', border: 'none', borderRadius: '8px', width: "100%", marginTop: 12, height: 60 }}>
Sign up        </button>
      </form>
      </div>
    </div>
  );
};

export default SignUp;
