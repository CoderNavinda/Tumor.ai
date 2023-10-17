import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/login';

  
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));
jest.mock('axios');

describe('Login', () => {
  beforeEach(() => {
    // Reset all mock implementations for each test
    jest.resetAllMocks();
  });

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


  test('logs in a user with valid credentials', async () => {
    const signInWithEmailAndPasswordMock = jest.fn();

    signInWithEmailAndPasswordMock.mockResolvedValue({ user: {} });
    require('firebase/auth').signInWithEmailAndPassword = signInWithEmailAndPasswordMock;
    render(
      <Router>
          <Login />
      </Router>
      );

  // Fill out the email and password fields
  fireEvent.input(screen.getByPlaceholderText(/Enter username or Email/i), { target: { value: 'user@example.com' } });
  fireEvent.input(screen.getByPlaceholderText(/Enter Passward/i), { target: { value: 'password' } });

  // Simulate the Sign In button click
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  // Wait for the login process to complete
  await waitFor(() => expect(signInWithEmailAndPasswordMock).toHaveBeenCalledTimes(1));

  // Check if the user was successfully logged in
  // expect(screen.getByText(/User logged in/i)).toBeInTheDocument();
});
});
