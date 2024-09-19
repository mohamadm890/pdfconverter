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
      const response = await fetch('https://5000-idx-pdfconverter-1726061683649.cluster-y34ecccqenfhcuavp7vbnxv7zk.cloudworkstations.dev/register', {
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      
    }}>
      <div style={{padding: "24px", marginTop: 100, backgroundColor: "white", width: 300, height:324, borderRadius: 32, boxShdow: "rgba(0, 0, 0, 0.04) 0px 3px 5px"}}>
      <h2 style={{fontSize:"28px" , fontWeight:"600", marginBottom: 12}}>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{fontSize: 12, fontWeight:"500", color: "#667185"}}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box',border: '1px solid #F0F2F5', borderRadius: '8px'   }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{fontSize: "12px", fontWeight:"500",  color: "#667185"}} >Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #F0F2F5', borderRadius: '8px'   }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#CB1A14', color: '#fff', border: 'none', borderRadius: '8px', width: "100%", marginTop: 12 }}>login up</button>
  
      </form>
      </div>
    </div>
  );
};

export default SignUp;
