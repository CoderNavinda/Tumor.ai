import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format, fromUnixTime } from 'date-fns';
import { collection, getDocs,query,where } from 'firebase/firestore';

import {firebaseApp} from '../firebase';
import { getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

// Define the PropTypes for the data prop


export default function History() {
  const [history, setHistory] = useState([]);
  const auth= getAuth(firebaseApp);
  const user = auth.currentUser;
  
  const db=getFirestore(firebaseApp);
  const headingStyles = {
    fontSize: '2rem',
    color: '#007bff',
    fontFamily: '"Montserrat-ExtraBold", Helvetica',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    letterSpacing: '2px',
  };
  useEffect(() => {
    const fetchData = async () => {
      const historyRef = collection(db, 'history');
      const q = query(historyRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      console.log(user.uid)
      const historyData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(historyData);
      console.log('History data:', historyData)
    };
    fetchData();
  }, []);
  // function createData(Date, PredictionType, UploadedImage, Result) {
  //   return { Date, PredictionType, UploadedImage, Result };
  // }
  
  // const rows = history.map((item) => createData(item.uploadDate, item.PredictionType, item.imageUrl, item.segmentedUrl));
  return (
    <div style={{marginLeft:50,marginRight:50,marginTop:50,marginBottom:50}}>
        <span style={headingStyles}>Upload History</span>
      <TableContainer component={Paper} style={{marginTop:50}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
    <TableRow>
      <TableCell style={{ fontWeight: 'bold' }}>Uploaded date</TableCell>
      <TableCell align="center" style={{ fontWeight: 'bold' }}>Prediction type</TableCell>
     
      <TableCell align="center" style={{ fontWeight: 'bold' }}>Result</TableCell>
    </TableRow>
  </TableHead>
  
          <TableBody>
            {history.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                {format(fromUnixTime(row.uploadDate.seconds), 'yyyy/MM/dd')}
                </TableCell>
                <TableCell align="center"style={{ fontSize: '1rem' }}>{row.predictionType}</TableCell>
                <TableCell align="center"><img src={`http://127.0.0.1:12000/${row.segmentedUrl}`} alt={row.segmentedUrl} width='400' height='300'/></TableCell>
                
                {/* <TableCell align="right">{row.Result}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  );
}
