import React,{ useState } from 'react';
import "./profile.css";
import ErrorPopup from './errorPopup';

function Profile() {
  //===================change image or remove image=========================================================
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageUrl, setImageUrl] = useState('/avatar.jpeg'); // Initial image URL
  const [currentError, setCurrentError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Function to handle image changes
  const handleImageChange = (newImageUrl) => {
    setImageUrl(newImageUrl);
  };
  // Function to reset the image to the initial state
  const resetImage = () => {
    setImageUrl(null);
  }
  
  //====================handle data in the form==============================================================================
  const [formData, setFormData] = useState({
    email: '',contactno:'',experience:'',specialization:'',
    firstname:'',lastname:'',medical:'',hospital:'',country:''
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateContact = () => {

    const regex = /^\d{10}$/; // Assumes a 10-digit number

    if (!regex.test(formData.contactno)) {
      setCurrentError('contact no');
    }  else if (currentError === 'contactno') {
      setCurrentError(''); 
    }
  };
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(formData.email)) {
      setCurrentError('email');
    }  else if (currentError === 'email') {
      setCurrentError('');
    }
  };
  const handleProfile = (e) => {
    e.preventDefault();
      validateContact();
      validateEmail();
      
      if (currentError) {
      setShowError(true);
      setShowSuccess(false); // Hide success message if there's an error
      return;
    }
    // Add authentication logic 
    console.log('Submitted data:', formData);
    //setIsEditMode(false); // Exit edit mode after saving
    // Simulate a successful save for demonstration purposes
    // In a real application, you would send the data to your server and handle the response
    // Here, we'll just show a success message after a brief delay
    setTimeout(() => {
      setShowSuccess(true);
      setIsEditMode(false); // Exit edit mode after saving
    }, 1000); // Delay for 1 second

    // Clear success message after a few seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000); // Hide success message after 5 seconds
  
    
    
  };
  
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  //=============================================================================================================================
  return (
    <div className="profile">
      <div onSubmit={handleProfile} className="form" >
    
        <div className="text-wrapper">My Profile</div>

        <div className="overlap-group">
        <div className="text-wrapper-1">First Name</div>
          <div className="text-wrapper-2">Last Name</div>
          <div className="text-wrapper-3">Country</div>
          <div className="text-wrapper-4">Contact Number</div>
          <div className="text-wrapper-5">Email Address</div>
          <div className="text-wrapper-6">Personal Information</div>
          <div className="text-wrapper-7">Working Experience</div>

          <div className="text-wrapper-8">Experiences</div>
          <div className="text-wrapper-9">Specialization</div>
          <div className="text-wrapper-10">Hospital or Clinic Affiliation</div>
        {isEditMode ? (
          <>
          <input className="input-1" type="text" name="firstname"  value={formData.firstname} onChange={handleChange} readOnly={!isEditMode}required  />
          <input className="input-2" type="text" name="lastname" value={formData.lastname} onChange={handleChange}readOnly={!isEditMode}required/>
          <select className="input-3" type="text" name="country"  value={formData.country} onChange={handleChange} readOnly={!isEditMode}required  >
            <option value="" disabled hidden>Select the  Country</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Spain">Spain</option>
            <option value="Italy">Italy</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Japan">Japan</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="Brazil">Brazil</option>
            <option value="Mexico">Mexico</option> 
            <option value="South Africa">South Africa</option>
            <option value="Other">Other</option>
          </select>
          <input className="input-4" type="tel" name="contactno"  pattern="[0-9]{10}" value={formData.contactno} onChange={handleChange}onBlur={validateContact}readOnly={!isEditMode} required  />
          <input className="input-5" type="email" name="email"  value={formData.email} onChange={handleChange}onBlur={validateEmail}readOnly={!isEditMode}required/>
          <input className="input-10" type="text" name="hospital"  value={formData.hospital} onChange={handleChange}readOnly={!isEditMode} />
          <input className="input-11" type="text" name="experience"  defaultValue=''value={formData.experience} onChange={handleChange}readOnly={!isEditMode}required/>
          <select className="input-12" type="text" name="specialization"  value={formData.specialization} onChange={handleChange}readOnly={!isEditMode} >
            <option value="" disabled selected color='#d9d9d93b'>Select a Medical specialization</option>
            <option value="Pathologist">Pathologist</option>
            <option value="Radiologist">Radiologist</option>
            <option value="Medical Oncologist">Medical Oncologist</option>
            <option value="Surgical Oncologist">Surgical Oncologist</option>
            <option value="Hematologist">Hematologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Clinical Research Coordinator">Clinical Research Coordinator</option>
            <option value="Laboratory Technician">Laboratory Technician</option>
          </select>

          </>
          ) : (
            <>
          <div className="input-1">{formData.firstname}</div>
          <div className="input-2">{formData.lastname}</div>
          <div className="input-3">{formData.country}</div>
          <div className="input-4">{formData.contactno}</div>
          <div className="input-5">{formData.email}</div>
          <div className="input-11">{formData.experience}</div>
          <div className="input-12">{formData.specialization}</div>
          <div className="input-10">{formData.hospital}</div>
          </>
          )}
          {isEditMode ? (
          <input className='submit-profile' type="submit" value="Save changes" onClick={handleProfile}/>
          ) : (
         <input className='edit-profile' type="submit" value="Edit Profile" onClick={toggleEditMode}/>
         )}
        </div>
        <div className="overlap-profile">
          
          <img className="avatar-image" src="/avatar.jpg" alt="Avatar" />
          
          <div>
          {imageUrl ? (
          // Display the selected image
          <div>
            <img src={imageUrl} alt="Avatar" className="avatar-image" />
            <input onClick={resetImage} className='changeImage' type="submit" value="Edit Image" />
           
          </div>
        ) : (
          // Display the file input when no image is selected
          <div>
            <input
              
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  handleImageChange(imageUrl);
                }
              }}
              style={{ display: 'block', marginTop: '286px',left:'100px',position:'relative',height:'30px'}}
            />
        </div>
      )}
          </div>
          
         
        </div>
      
         
         
      
        
        
      </div>
      {showError && (
          <ErrorPopup
            message={
              currentError === 'email'
                ? 'Please correct the email address'
                : currentError === 'contact no'
                ? 'Please correct the contact number'
                : 'An error occurred during registration.'
            }
            onClose={() => setShowError(false)}
          />
        )}
        {showSuccess && (
        <div className="success-message">
          Changes saved successfully!
        </div>
      )}
    
    </div>
  );
};
export default Profile;