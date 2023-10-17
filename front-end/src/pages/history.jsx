import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import TableHistory from '../components/TableHistory';

function createData(Date, PredictionType, UploadedImage, Result) {
  return { Date, PredictionType, UploadedImage, Result };
}

const rows = [
  createData('2023/10/12', 'Brain Tumor', 'image1', 'predictionimage1'),
 
];
// Define the PropTypes for the data prop


export default function History() {
  return (
   <TableHistory data={rows}/>
  );
}
