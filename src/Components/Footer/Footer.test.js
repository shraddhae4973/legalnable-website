import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // 👈 important
import Footer from './Footer'; // adjust path
import Aos from 'aos';

jest.mock('aos', () => ({
  init: jest.fn(),
}));

describe('Footer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes AOS and renders logo', () => {
    render(<Footer />);
    expect(Aos.init).toHaveBeenCalledWith({ duration: 2000 });
    expect(Aos.init).toHaveBeenCalledTimes(1);
  
    // Check that at least one element with "Legalnable" text is rendered
    const logoElements = screen.getAllByText(/Legalnable/i);
    expect(logoElements.length).toBeGreaterThan(0);
  });
  

  test('renders social media icons as SVGs', () => {
    const { container } = render(<Footer />);
    const svgIcons = container.querySelectorAll('svg');
    expect(svgIcons.length).toBeGreaterThanOrEqual(3);
  });

  test('renders all link sections and content', () => {
    render(<Footer />);
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('Helpful Links')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();

    expect(screen.getAllByText('About Us').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Support').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Resources').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Legal Aid').length).toBeGreaterThanOrEqual(1);

    expect(screen.getAllByText('+32 32323222').length).toBe(3);
    expect(screen.getAllByText('legalnable@gmail.com').length).toBe(3);
  });
});

