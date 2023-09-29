import React from "react";

import "./aboutus.css";
import { Navbar } from "../components/Navbar/navbar";
import rectangle1195 from '../assets/Rectangle 1195.png';
import img5 from '../assets/img 5.png';
import image2 from '../assets/image 2.png';
import image32 from '../assets/image 32.png';
import image33 from '../assets/image 33.png';

export const  Aboutus = () =>  {
  return (
    <div className="about-us">
      <div className="div">
        
        <div className="overlap-group">
          <div className="text-wrapper-2">Our Goal</div>
          <p className="empowering-medical">
            Empowering Medical Professionals <br />
            Advancing Medical Research <br />
            Promoting Transparency and Explainability <br />
            Data Privacy <br />
            Enhancing Patient Care
          </p>
          <div className="element">
           
              <img className="vector" alt="Vector" src={img5} />
           
          </div>
          <div className="overlap-wrapper">
            
              <img className="vector" alt="Vector" src={img5}  />
            
          </div>
          <div className="overlap-group-wrapper">
            
              <img className="vector" alt="Vector" src={img5}  />
            
          </div>
          <div className="element-2">
            
              <img className="vector" alt="Vector" src={img5}  />
          
          </div>
          <div className="element-3">
            
              <img className="vector" alt="Vector" src={img5}  />
           
          </div>
          <img className="rectangle" alt="Rectangle" src={rectangle1195}/>
        </div>
        <div className="text-wrapper-3">Our Members</div>
        
          <img className="navinda" alt="Rectangle" src={image2}/>
          <div className="text-wrapper-4">Navinda Mansitha</div>
          <div className="text-wrapper-5">navinda.20@cse.mrt.ac.lk</div>
      
        
        <img className="shamindi" alt="Rectangle" src={image32}/>
          <div className="text-wrapper-6">Shamindi Nishara</div>
          <div className="text-wrapper-7">shamindi.20@cse.mrt.ac.lk</div>
      
          <img className="amandi" alt="Rectangle" src={image33}/>
          <div className="text-wrapper-8">Amandi Nimasha</div>
          <div className="text-wrapper-9">amandi.20@cse.mrt.ac.lk</div>
       
        
        
        
      </div>
    </div>
  );
};