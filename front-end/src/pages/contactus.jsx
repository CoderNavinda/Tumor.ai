import React, { Component } from 'react';
import './ContactUs.css';
import rectangle1190 from '../assets/Rectangle 1190.png'
import { Navbar } from '../components/Navbar/navbar';
import { Link } from "react-router-dom";


export const ContactUs = () => {
  return (
    <div className='contact-us'>
       <img src={rectangle1190} alt="Contact Us" className='image-container'/>
    <div className='forum-1'>
        <h1>Contact Us</h1>
        <form>
            <label>Name</label>
            <input type='text' name='name' className='txt-contactus'/>
            <br/>
            <label>Email</label>
            <input type='email' name='user-email' className='email-contactus'/>
            <br/>
            <label>Message</label>
            <textarea name='message' rows='4'  className='txt-area'/>
            <input type ='submit' value='Send' className='sub-11'/>
        </form>
        </div>  
        </div>
  );
};

export default ContactUs;