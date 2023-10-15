import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from '../pages/aboutus';

describe('AboutUs', () => {
  test('displays the goal heading', () => {
    const { getByText } = render(<AboutUs />);
    const heading = getByText('Our Goal');
    expect(heading).toBeInTheDocument();
  });
  test('displays goal list items', () => {
    const { getByText } = render(<AboutUs />);
    const item1 = getByText('Empowering Medical Professionals');
    const item2 = getByText('Advancing Medical Research');
    const item3 = getByText('Promoting Transparency and Explainability');
    const item4 = getByText('Data Privacy');
    const item5 = getByText('Enhancing Patient Care');
  
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
    expect(item4).toBeInTheDocument();
    expect(item5).toBeInTheDocument();
  });
  test('displays members email', () => {
    const { getByText } = render(<AboutUs />);
    const navindaEmail = getByText('navinda.20@cse.mrt.ac.lk');
    const shamindiEmail = getByText('shamindi.20@cse.mrt.ac.lk');
    const amandiEmail = getByText('amandi.20@cse.mrt.ac.lk');
  
    expect(navindaEmail).toBeInTheDocument();
    expect(shamindiEmail).toBeInTheDocument();
    expect(amandiEmail).toBeInTheDocument();
  });
  
  
  
});
