import {render,screen,fireEvent,act} from '@testing-library/react';
import Sidebar from '../components/Sideba/Sidebar';
// import '@testing-library/jest-dom/extend-expect'; 
// import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom'; 
import React from 'react';

describe("Sidebar", () => {
    // Mock the necessary functions and objects
    const mockUserSignOut = jest.fn();

jest.mock('../components/Sideba/Sidebar', () => {
  return {
    __esModule: true,
    namedExport: jest.fn(),
    default: jest.fn().mockImplementation(() => {
      return {
        userSignOut: mockUserSignOut,
      };
    }),
  };
});

    
  
    
    test('render sidebar component', () => {

        render(
            <Router> {/* Wrap your component with Router */}
              <Sidebar />
            </Router>
          );
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Log out')).toBeInTheDocument();
        //check the element is present or not
    
});

test('Clicking the link navigates to the correct route', () => {

 render(
            <Router> {/* Wrap your component with Router */}
              <Sidebar />
            </Router>
          );

          

          const linkElement=screen.getByText('Home');
          fireEvent.click(linkElement);
          expect(window.location.pathname).toBe('/');

          // const linkElement2=screen.getByText('Dashboard');
          // fireEvent.click(linkElement2);
          // expect(window.location.pathname).toBe('/dashboard');

          const linkElement3=screen.getByText('Log out');
          fireEvent.click(linkElement3);
          expect(window.location.pathname).toBe('/');


 });




});
