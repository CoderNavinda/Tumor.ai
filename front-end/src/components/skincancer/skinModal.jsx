import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import './ResultModal.css';
import jsPDF from 'jspdf';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ResultModal({ open, resultSRC, onClose, imageSrc }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    setImageLoaded(false); // Reset the state when the image source changes
  }, [resultSRC]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDownload = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();
    
    // Add the image to the PDF
    pdf.addImage(imageSrc, 'JPEG', 10, 10, 180, 120); // You may need to adjust the dimensions
    
    // Save the PDF with a name
    pdf.save('segmentation_result.pdf');
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button onClick={onClose} className="closeButton">
            Close
          </button>

          <p className="modal-modal-title-custom">SEGMENTATION RESULT</p>

          <div style={{ position: 'relative', width: '100%', height: '80%' }}>
            {/* Conditionally display CircularProgress while loading */}
            {!imageLoaded && (
              <CircularProgress
                size={60}
                style={{
                  color: '#3f51b5',
                  position: 'absolute',
                  top: '35%',
                  left: '43%',
                }}
              />
            )}

            <div  style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',  // Center horizontally // Center vertically
  width: '100%',
  height: '80%',
}}>
              {/* Conditionally display img element when image is loaded */}
              <img
  src={imageSrc}
  alt="Loading..."
  style={{
    width: '200px', // Set a fixed width in pixels
    height: '200px', // Set a fixed height in pixels
    border: '1px solid #000',
    display: imageLoaded ? 'block' : 'none',
  }}
  onLoad={handleImageLoad}
/>
              <p style={{ color: 'black', width: 'max-content', display: 'flex', alignSelf: 'center', justifySelf: 'self' }}>{resultSRC}</p> {/* Display the resultSRC text below the image */}
            </div>
          </div>

          <button onClick={handleDownload} className="downloadButton">
            Download
          </button>
        </Box>
      </Modal>
    </div>
  );
}
