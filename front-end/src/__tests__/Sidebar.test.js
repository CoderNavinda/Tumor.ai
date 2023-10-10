import {render,screen} from '@testing-library/react';
import Sidebar from '../components/Sideba/Sidebar';
// import '@testing-library/jest-dom/extend-expect'; 
// import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

describe("Sidebar", () => {

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
    
});});
