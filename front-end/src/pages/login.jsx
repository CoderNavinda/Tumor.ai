import React, { useState } from 'react';
import './login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {firebaseApp} from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Use Firebase Auth

function Login() {
  //======================handle data==========================================================================
  
  const navigate = useNavigate();

  
  // Initialize Firebase
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const auth = getAuth(firebaseApp);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login error:', error.message);
      alert('invalid credentials');
    }
  };

  //===============================================================================================================
  return (
    <div className="login-1">
      <div onSubmit={handleLogin} className="form" >
        
          <img className="rectangle" alt="Rectangle" src="https://static.vecteezy.com/system/resources/previews/000/570/719/original/set-of-doctor-and-nurse-cartoon-characters-medical-staff-team-concept-in-hospital-vector.jpg" />
          <div className="overlap">
            <div className="text-wrapper">Username</div>
            
              <input type="email" className='txt-2-ama' name="username" placeholder="Enter username or Email" 
            onChange={(e) => setEmail(e.target.value)} required  />
          </div>
          <div className="overlap-group">
            <div className="text-wrapper-2">Password</div>
            <input type="password" className='ps-ama' name="password" placeholder="Enter Passward"
            onChange={(e) => setPassword(e.target.value)} required  />
            
          </div>
          <div className="text-wrapper-4">Forget your Password?</div>
          
          <div className="overlap-2">
            <div className="button-container">
            <button onClick={handleLogin} className='sb-ama'>Sign In</button>
            </div>
          </div>
        
        <p className="p">Your Gateway to Brain Tumor Analysis</p>
      </div>
    </div>
  );
}

export default Login;