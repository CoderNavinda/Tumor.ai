import {render,screen,fireEvent} from '@testing-library/react';
import ContactUs from '../pages/contactus';
// import '@testing-library/jest-dom/extend-expect'; 
// import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';



describe("ContactUs", () => {

    test('render ContactUs component', () => {

        render(<ContactUs />);
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Message')).toBeInTheDocument();
        expect(screen.getByText('Send')).toBeInTheDocument();
      });
      

      test('validates the form submission', () => {
        render(<ContactUs />);
    
        const submitButton = screen.getByText('Send');
        fireEvent.click(submitButton);
    
        // Assertions for validation messages
        const nameError = screen.getByText('Name is required');
        const emailError = screen.getByText('Email is required');
        const messageError = screen.getByText('Message is required');
    
        expect(nameError).toBeInTheDocument();
        expect(emailError).toBeInTheDocument();
        expect(messageError).toBeInTheDocument();
      });
      test('displays success message on correct form submission', () => {
        render(<ContactUs />);
    
        // Fill in valid input values
        const nameInput = screen.getByTestId('name-input');
        const emailInput = screen.getByTestId('email-input');
        const messageInput =screen.getByTestId('msg-input');
        const submitButton = screen.getByText('Send');
    
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });
    
        fireEvent.click(submitButton);
    
        // Assert that the success message is displayed
        const successMessage = screen.getByText('Form submitted successfully!');
        expect(successMessage).toBeInTheDocument();
      });


    });