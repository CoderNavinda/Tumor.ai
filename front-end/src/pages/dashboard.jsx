import React from "react";
import "./dashboard.css";
import { Link } from 'react-router-dom'

import { Viewpast } from "../assets/dashboard";
import { Breast } from "../assets/dashboard";
import { Pp3 } from "../assets/dashboard";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./Dashboard.css";
import Sidebar from "../components/Sideba/Sidebar";



function Dashboard() {
  return (
    <div className="container2">
      <div className="sidebar2">
     <Sidebar/>
      </div>
      <div className="child2">
        <div className="contentn">
          <h2>Choose your health service</h2>
        </div>
        <div className="content-child1" style={{ marginLeft: 230, padding: 10, marginRight: 70 }}>
          <Card sx={{ marginLeft: 2, maxWidth: 345, marginRight:5,marginBottom:3 }}>
            <CardMedia sx={{ height: 400 }} image={Breast} title="green iguana" />
            <CardContent>
              <Link to='/braintumor'>
            <Typography gutterBottom variant="h5" component="div" className="green-button">
                      Brain-Tumor Detection
                      </Typography>
                      </Link>

              <Typography variant="body2" color="text.secondary" fontFamily={"Montserrat"}>
              Our Brain Tumor Detection service employs cutting-edge deep learning technology to analyze MRI images and accurately identify the presence of brain tumors. 
              </Typography>
            </CardContent>
            <CardActions>
              
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345, marginRight: 5, marginBottom:3,marginLeft:2 }}>
            <CardMedia sx={{ height: 400 }} image={Pp3} title="green iguana" />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div" className="green-button">
                       Breast-Cancer Detection
                      </Typography>


              <Typography variant="body2" color="text.secondary" fontFamily={"Montserrat"}>
              Our Breast Cancer Detection system is designed to assist medical professionals in the early detection of breast cancer
              </Typography>
            </CardContent>
            <CardActions>
              
            </CardActions>
          </Card>
          <Card className='lastcrd' sx={{ maxWidth: 345 ,marginLeft:2, maxHeight:590}}>
            <CardMedia sx={{ height: 400 }} image={Viewpast} title="green iguana" />
            <CardContent>
              <Link to ='/history'>
            <Typography gutterBottom variant="h5" component="div" className="green-button">
                       View Past Reports
                      </Typography>
                      </Link>

              <Typography variant="body2" color="text.secondary" fontFamily={"Montserrat"}>
              The View Past Reports feature allows you to access and review your historical diagnostic reports with ease.
              </Typography>
            </CardContent>
            <CardActions>
              
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
