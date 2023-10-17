import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import History from '../pages/history';



    const sampleData = [
        {
          Date: '2023/10/12',
          PredictionType: 'Brain Tumor',
          UploadedImage: 'image1',
          Result: 'predictionimage1',
        },
        // Add more sample data objects as needed
      ];


test('should render the table properly', () => {
    
   render(<History data={sampleData} />);
   const heading = screen.getByText(/Upload History/i);
  expect(heading).toBeInTheDocument();
   const table= screen.getByRole('table');
   expect(table).toBeInTheDocument();

   sampleData.forEach((row) => {
    expect(screen.getByText(row.Date)).toBeInTheDocument();
    expect(screen.getByText(row.PredictionType)).toBeInTheDocument();
    expect(screen.getByText(row.UploadedImage)).toBeInTheDocument();
    expect(screen.getByText(row.Result)).toBeInTheDocument();
  });
  });
  