import React from 'react'
import './register.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {firebaseApp} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import ErrorPopup from './errorPopup';
/*import { IconArrowDown } from "./IconArrowDown";
import { IconArrowDownWrapper } from "./IconArrowDownWrapper";*/

function Register() {
  //========================handle data======================================================================
  /*const [formData, setFormData] = useState({
    contactno:'',
    firstname:'',lastname:'',medicals:'',title:'',confirm:''
  });*/
  const [formData, setFormData] = useState({
    contactno:'',experience:'',specialization:'',
    firstname:'',lastname:'',medicals:'',hospital:'',country:''
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentError, setCurrentError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateContact = () => {
    // Define your contact number validation logic here (e.g., using regular expressions)
    const regex = /^\d{10}$/; // Assumes a 10-digit number

    if (!regex.test(formData.contactno)) {
      setCurrentError('contact no');
    } else if (currentError === 'contactno') {
      setCurrentError(''); // Clear the error message when the input is valid
    }
  };

  const validateEmail = () => {
    // Regular expression to match a valid email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(formData.email)) {
      setCurrentError('email');
      // Email is in correct format
      // No alert here as requested
    } else if (currentError === 'email') {
      // Email is not in correct format, show the error popup
      setCurrentError('');
    }
  };
  const validatePasswordMatch = () => {
    if (formData.password !== formData.confirm) {
      setCurrentError('password');
    } else if (currentError === 'password') {
      setCurrentError('');
    }
  }

  
   //==========================================hande firebase=================================================================

   // Initialize Firebase
  
   const auth = getAuth(firebaseApp);
 
 
   const db = getDatabase(firebaseApp);
   const fire_db = getFirestore(firebaseApp);
   const dataRef = ref(db, 'users');
 
   const handleRegister = async (e) => {
     e.preventDefault();
     // Check contact number validity before proceeding
     validateContact();
     validateEmail();
     validatePasswordMatch();
     /*firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      console.log(u);
     }).catch((err) //here I stopped
     )*/
     
     if (currentError) {
      setShowError(true);
      return;
    }
    
       try {
         const newData = {
           Email: formData.email,
            password: password,
           Firstname: formData.firstname,
           Lastname : formData.lastname,
           Contact_no: formData.contactno,
           Medicals : formData.medicals,
           Title : formData.title, 
           country : formData.country,
           hospital:formData.hospital,
           experience:formData.experience,

           
         };
         
         const FiredataRef = collection(fire_db, 'registration');

         // Create a user account
         const userCredential = await createUserWithEmailAndPassword(
           auth,
           formData.email,
           formData.password
         );
     
         // User is registered, and you can access the user's UID from userCredential
     
         // Write user data to Firestore with the user's UID as the document ID
         await addDoc(FiredataRef, {
           ...newData,
           userId: userCredential.user.uid,
         });
     
         console.log('User logged in:', userCredential.user);
         navigate('/login', { replace: true });

      // User is registered. Now sign them in.
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
       console.log('User logged in:', user);
       navigate('/login', { replace: true });
       
 
     } catch (error) {
       console.error('Register:', error.message);
       setShowError(true);  // Display the error popup
       //alert('registeration successful');
     }
   };
 
  //==========================================================================================================================
  
  return (
    <div className="registeration">
      
      <div onSubmit={handleRegister} className="form" >
      <div className="Regrectangle"/>
        <div className="Regoverlap-group">
          <div className="Regrectangle-1" /*white rectangle*//>
          <select className="Reginput-11" type="text" name="title" placeholder="Title"  value={formData.title} onChange={handleChange}>
              <option value="" disabled selected>Title</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss">Miss.</option>
              <option value="Miss">Not willing to say</option>
            </select> 
          <input className="Reginput-1" type="text" name="firstname" placeholder="First Name" 
          value={formData.firstname} onChange={handleChange} required  />
          <input className="Reginput-2" type="text" name="lastname" placeholder="Last Name" 
          value={formData.lastname} onChange={handleChange} required  />
          <select className="Reginput-7" type="text" name="medicals" placeholder="Medical specializations" 
            value={formData.medicals} onChange={handleChange} >
              <option value="" disabled selected>Medical specializations</option>
              <option value="Pathologist">Pathologist</option>
              <option value="Radiologist">Radiologist</option>
              <option value="Medical Oncologist">Medical Oncologist</option>
              <option value="Surgical Oncologist">Surgical Oncologist</option>
              <option value="Hematologist">Hematologist</option>
              <option value="Clinical Research Coordinator">Clinical Research Coordinator</option>
              <option value="Laboratory Technician">Laboratory Technician</option>
          </select>

          <input className="Reginput-6" type="text" name="contactno" placeholder="Contact Number" 
          value={formData.contactno} onChange={handleChange} onBlur={validateContact} required  />
          {/*showError && (
              <ErrorPopup
                message={
                  currentError=='contact no'
                    ? 'Please correct the contact number.'
                    : 'An error occurred during registration.'
                }
                onClose={() => setShowError(false)} // Close the popup when the "Close" button is clicked
              />
              )*/}
          <input className="Reginput-4" type="text" name="email" placeholder="Email" value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} onBlur={validateEmail}required  />
            {/*
             <input className="input-4" type="text" name="email" placeholder="Email" value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} onBlur={validateEmail}required  />
          showError && (
              <ErrorPopup
                message={currentError=='email'
                ? 'Please correct the email address'
                : 'An error occurred during registration.'}
                onClose={() => setShowError(false)}
              />
            )*/}
          <input className={`Reginput-9 ${currentError === 'password' ? 'error' : ''}`} 
            type="password" name="pass" placeholder="Password" value={formData.password} 
            onChange={(e) =>  setFormData({ ...formData, password: e.target.value })}required  />
          <input className={`Reginput-10 ${currentError === 'password' ? 'error' : ''}`}
            type="password" name="confirm" placeholder="Confirm Password" 
            value={formData.confirm} onChange={handleChange} onBlur={validatePasswordMatch} required  />
            {/*showError && (
              <ErrorPopup
                message={currentError=='password'
                ? 'password confirmation does not match'
                : 'An error occurred during registration.'}
                onClose={() => setShowError(false)}
              />
            )*/}
            <input onClick={handleRegister} type="submit" className="btn-Reg" value="Register" />
 
        </div>
      </div> 
      {showError && (
          <ErrorPopup
            message={
              currentError === 'email'
                ? 'Please Enter a valied email address'
                : currentError === 'contact no'
                ? 'Please Enter a valied contact number'
                : currentError === 'password'
                ? 'Password confirmation does not match'
                : 'Password is not unique.'
            }
            onClose={() => setShowError(false)}
          />
        )} 
    </div>
  );
}

export default Register;


















































