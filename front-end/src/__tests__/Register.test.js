import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Register from '../pages/register';
import { BrowserRouter as Router, Route } from 'react-router-dom';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  }));
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    addDoc: jest.fn(),
  }));
  jest.mock('axios');

  describe('Register', () => {
    beforeEach(() => {
      // Reset all mock implementations for each test
      jest.resetAllMocks();
    });
  

test('renders the registration form', () => {
    render(
        <Router> {/* Wrap your component with Router */}
          <Register />
        </Router>
      );
    
    // Check if form fields are rendered
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contact Number/i)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Medical specializations/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Hospital or Medical institution/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Country/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('registers a user with valid data', async () => {
    const createUserWithEmailAndPasswordMock = jest.fn();
    const addDocMock = jest.fn();

    createUserWithEmailAndPasswordMock.mockResolvedValue({ user: {} });
    addDocMock.mockResolvedValue({ id: 'some-id' });

    require('firebase/auth').createUserWithEmailAndPassword = createUserWithEmailAndPasswordMock;
    require('firebase/firestore').addDoc = addDocMock;

    render(
        <Router> {/* Wrap your component with Router */}
          <Register />
        </Router>
      );

    // Fill out the form fields
    fireEvent.input(screen.getByPlaceholderText(/First Name/i), { target: { value: 'John' } });
    fireEvent.input(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Doe' } });
  

    // Simulate registration button click
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));
    await waitFor(() => expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(addDocMock).toHaveBeenCalledTimes(1));

    // Check if the user was successfully registered
    // expect(screen.getByText(/User logged in/i)).toBeInTheDocument();
  });
})