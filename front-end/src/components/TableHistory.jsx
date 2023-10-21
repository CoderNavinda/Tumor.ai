import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

TableHistory.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        Date: PropTypes.string.isRequired,
        PredictionType: PropTypes.string.isRequired,
        UploadedImage: PropTypes.string.isRequired,
        Result: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  const headingStyles = {
    fontSize: '2rem',
    color: '#007bff',
    fontFamily: '"Montserrat-ExtraBold", Helvetica',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    letterSpacing: '2px',
  };
  export default function TableHistory({data}) {
    return (
      <div style={{marginLeft:50,marginRight:50,marginTop:50,marginBottom:50}}>
        <span style={headingStyles}>Upload History</span>
      <TableContainer component={Paper} style={{marginTop:50}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
    <TableRow>
      <TableCell style={{ fontWeight: 'bold' }}>Uploaded date</TableCell>
      <TableCell align="center" style={{ fontWeight: 'bold' }}>Prediction type</TableCell>
      <TableCell align="center" style={{ fontWeight: 'bold' }}>Uploaded Image</TableCell>
      <TableCell align="center" style={{ fontWeight: 'bold' }}>Result</TableCell>
    </TableRow>
  </TableHead>
  
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                {row.Date}
                </TableCell>
                <TableCell align="center">{row.PredictionType}</TableCell>
                <TableCell align="center"><img src={''} alt="Uploaded Image" width="100" height="100" /></TableCell>
                <TableCell align="center"><img src={''} alt="Result" width="100" height="100" />
                </TableCell>
                {/* <TableCell align="right">{row.Result}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  }
  