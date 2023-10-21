import React, { useState ,useEffect} from 'react';
import './login.css';
import { getAuth, signInWithEmailAndPassword ,onAuthStateChanged,setPersistence,browserSessionPersistence} from 'firebase/auth';
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
  // setPersistence(auth, browserSessionPersistence);
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  // }, []);
  const handleLoginBackend = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:12000/login', {
        email: email,
        password: password,
      });
      // Handle the response (e.g., store session data on success)
    } catch (error) {
      // Handle login error (e.g., display an error message)
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // window.localStorage.setItem("isLogedIn",true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      window.localStorage.setItem("isLogedIn",true)
      console.log("isLogedIn")
      handleLoginBackend(email, password);
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