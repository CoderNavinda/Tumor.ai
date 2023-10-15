import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/login';


// test('renders Login component without errors', () => {
//   render(<Login />);
// });

// test('handleLogin function is called when the button is clicked', () => {
//     // Mock the handleLogin function
//     const handleLoginMock = jest.fn();
  
//     // Render the component with the mock function
//     const { getByText } = render(
//     <Router><Login handleLogin={handleLoginMock} /></Router>);
  
//     // Find the button by its text content and click it
//     const button = getByText('Sign In');
//     fireEvent.click(button);
  
//     // Assert that the handleLogin function was called
//     expect(handleLoginMock).toHaveBeenCalled();
//   });

  

describe('Login Page', () => {
  test('renders login form', () => {
    render(
        <Router>
            <Login />
        </Router>
        );
  
    const usernameInput = screen.getByPlaceholderText('Enter username or Email');
    const passwordInput = screen.getByPlaceholderText('Enter Passward');
    const signInButton = screen.getByText('Sign In');
    
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  
});
