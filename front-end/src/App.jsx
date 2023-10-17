import React, { useEffect, useState } from 'react';
import Braintumor from './pages/braintumor';
import './App.css';
import { Landingpage } from './pages/landingpage';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navbar} from './components/Navbar/navbar';
import { AboutUs } from './pages/aboutus';
import  ContactUs  from './pages/contactus';
import  NoPage  from './pages/nopage';
import Login from './pages/login';
import {Uploadmri}   from './pages/uploadmri';
import { fetchData } from './utils/get';
import Register from './pages/register';
import Dashboard from './pages/Dashboard';
import { getAuth, setPersistence,browserSessionPersistence} from 'firebase/auth';
import {firebaseApp} from '../src/firebase';
import Forum from './pages/forum';
import axios from 'axios';
import Results from './pages/results';
import Question from './pages/question';
import History from './pages/history';
import {BreastCancer} from './pages/uploadimage';
import Profile from './pages/profile';

import PrivateRoute from './components/PrivateRoute';
function App() {
  const login=window.localStorage.getItem('isLogedIn');
  const LayoutWithNavbar = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  );

  

  const [data, setData] = useState([]);
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  // }, []);
  // setPersistence(auth, browserSessionPersistence);
  useEffect(() => {
    fetchData()
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  
  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* Routes with Navbar */}
      <Route
        element={<LayoutWithNavbar />}
      >
        {/* <Route element={login ?  <Dashboard/> : <Landingpage />} /> */}
        <Route index element={login ?  <Dashboard/> : <Landingpage />} />
        <Route index element={<Landingpage />} />
        <Route path='/landingpage' element={<Landingpage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Route>

      {/* Routes without Navbar */}
      {/* <Route path="/uploadmri" element={<Uploadmri />} /> */}
      {/* <Route path="/braintumor" element={<Braintumor />} /> */}
      {/* <Route index element={login ? <Dashboard/> : <Landingpage />} /> */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<NoPage />} />
      <Route exact path='/dashboard' element={<PrivateRoute/>}>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
          </Route>
          {/* <Route exact path='/dashboard' element={login ? <Dashboard/> : <Landingpage />}/>
           */}

          <Route exact path='/braintumor' element={<PrivateRoute/>}>
            <Route exact path='/braintumor' element={<Braintumor/>}/>
          </Route>
      <Route path="/forum" element={<Forum />} />
      <Route path="/results" element={<Results />} />
      <Route path="/question" element={<Question />} />

      {/* <Route path="/history" element={login ? <History /> : <Landingpage/>} /> */}
      <Route exact path='/history' element={<PrivateRoute/>}>
            <Route exact path='/history' element={<History/>}/>
          </Route>
      <Route path="/uploadimage" element={<BreastCancer />} />
      <Route path="/profile" element={<Profile />} />
     
    </Routes>
    </BrowserRouter>


    </>

  );
}

export default App;
