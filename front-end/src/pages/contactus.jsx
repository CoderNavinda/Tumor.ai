import React, { useState } from 'react';
import './ContactUs.css';
import rectangle1190 from '../assets/Rectangle 1190.png';
import { Navbar } from '../components/Navbar/navbar';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';

export const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

const [messageError, setMessageError] = useState('');
  
  const handleContactusBackend = async (email, name,message) => {
    try {
      const response = await axios.post('http://127.0.0.1:12000/api/contactus', {
        email: email,
        name: name,
        message:message,
      });
      // Handle the response (e.g., store session data on success)
    } catch (error) {
      // Handle login error (e.g., display an error message)
    }
  };
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email address !');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let valid = true; // Create a variable to track overall form validity
  
    if (!name) {
      setNameError('Name is required');
      valid = false; // Set valid to false if name is empty
    }
  
    if (!email) {
      setEmailError('Email is required');
      valid = false; // Set valid to false if email is empty
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false; // Set valid to false if email format is invalid
    }
  
    if (!message) {
      setMessageError('Message is required');
      valid = false; // Set valid to false if message is empty
    }
  
    if (valid) {
      // Only if all fields are valid, proceed with form submission
      handleContactusBackend(email, name, message);
      setSuccessMessage('Form submitted successfully!');
      setEmailError('');
      setEmail('');
    }
  };
  

  return (
    <>
    {/* <Navbar/> */}
    <div className='contact-us'>
      <img src={rectangle1190} alt='Contact Us' className='image-container' />
      <div className='forum-1'>
        <h1>Contact Us</h1>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div>
          <label>Name</label>
          <input type='text'data-testid="name-input" name='name' className='txt-contactus' onChange={(e)=>{
            setName(e.target.value);
            setNameError('');
          }} />
        {nameError && <Alert severity="error">{nameError}</Alert>}
          <br />
          <label>Email</label>
          <input
            type='email'
            data-testid="email-input" 
            name='user-email'

            className='email-contactus'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur} // Add onBlur event handler
          />
           {emailError && <Alert severity="error">{emailError}</Alert>}
          <br />
          <label>Message</label>
          <textarea name='message' data-testid="msg-input"  rows='4' className='txt-area' onChange={(e)=>{setMessage(e.target.value);
          setMessageError('')}} />
          {messageError && <Alert severity="error">{messageError}</Alert>}
          <div>
          <input type='submit' value='Send' className='sub-11' />
          </div>
          </div>
          
        </form>
      </div>
    </div>
    </>
  );
};
export default ContactUs;