// src/Components/Offers/Offers.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Aos from 'aos';
import Offers from './Offers';

//  Mock AOS
jest.mock('aos', () => ({
  
  init: jest.fn(),
  
}));

describe('Offers Component', () => {

  test('initializes AOS and renders section header', () => {
    render(<Offers />);
    // Aos.init called once with correct config
    expect(Aos.init).toHaveBeenCalledWith({ duration: 2000 });
    expect(Aos.init).toHaveBeenCalledTimes(1);

    // Title and subtitle
    expect(screen.getByRole('heading', { name: /Our Services/i })).toBeInTheDocument();
    expect(screen.getByText(/Educational Workshops/i)).toBeInTheDocument();
  });

  //render image with offers 
  test('renders exactly four offers with image, grade, and button', () => {
    render(<Offers />);

    // There should be 4 images  
    const images = screen.getAllByAltText('Image Name');
    expect(images).toHaveLength(4);

    // Only check one grade  
    const oneGrade = screen.getByRole('heading', { name: /Educational Workshops/i, level: 4 });
    expect(oneGrade).toBeInTheDocument();

    // There should be 4 "View Details" buttons
    const detailButtons = screen.getAllByRole('button', { name: /view details/i });
    expect(detailButtons).toHaveLength(4);
  });
});

