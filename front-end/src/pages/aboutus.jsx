import React from 'react';
import './aboutus.css'; // Import your CSS file here
import image2 from '../assets/image 2.png';
import image32 from '../assets/image 32.png';
import image33 from '../assets/image 33.png';
import { FaCheck } from 'react-icons/fa';
import { Navbar } from '../components/Navbar/navbar';
export const Aboutus = () => {
  return (
    <>
    {/* <Navbar/> */}
    <div className="about-us-container">
      <h1 className='aboutush1'>Our Goal</h1>
      <ul className='aboutusul'>
        <li className='aboutusli'><FaCheck style={{ marginRight: '8px' }}/>Empowering Medical Professionals</li>
        <li className='aboutusli'><FaCheck style={{ marginRight: '8px' }}/>Advancing Medical Research</li>
        <li className='aboutusli'><FaCheck style={{ marginRight: '8px' }}/>Promoting Transparency and Explainability</li>
        <li className='aboutusli'><FaCheck style={{ marginRight: '8px' }}/>Data Privacy</li>
        <li className='aboutusli'><FaCheck style={{ marginRight: '8px' }}/>Enhancing Patient Care</li>
      </ul>

      <h1 className='aboutush1'>Our Members</h1>
      <div className="members-container">
        <div className="member">
          <img src={image2} alt="Navinda" />
          <p>Navinda</p>
          <p>navinda.20@cse.mrt.ac.lk</p>
          
          
        </div>
        <div className="member">
          <img src={image32} alt="Shamindi" />
          <p>Shamindi</p>
          <p>shamindi.20@cse.mrt.ac.lk</p>
        </div>
        <div className="member">
          <img src={image33} alt="Amandi" />
          <p>Amandi</p>
          <p>amandi.20@cse.mrt.ac.lk</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Aboutus;