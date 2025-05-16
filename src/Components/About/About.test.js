import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Add this import
import About from './About';

// Mock AOS  
jest.mock('aos', () => ({
  init: jest.fn(),
}));

// Mock static assets
jest.mock('../../Assets/3.jpg', () => 'mock-image-path');
jest.mock('../../Assets/video.mp4', () => 'mock-video-path');

describe('About Page', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('renders the main title', () => {
    const titleElement = screen.getByText(/Why Legalnable\?\?/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('title');
  });

  test('renders three feature items with correct content', () => {
    const featureItems = screen.getAllByText(/Accessible Legal Support/i);
    expect(featureItems).toHaveLength(1);
    
    const descriptions = screen.getAllByText(/We make law easy to understand and navigate./i);
    expect(descriptions).toHaveLength(1);
    
    const images = screen.getAllByAltText('Image Name');
    expect(images).toHaveLength(3);
    images.forEach(img => {
      expect(img).toHaveAttribute('src', 'mock-image-path');
    });
  });

  test('renders video card section with correct content', () => {
    const cardTitle = screen.getByText(/Wonderful experience/i);
    expect(cardTitle).toBeInTheDocument();
    
    const cardText = screen.getByText(/Hello, I'm sharing a clean and responsive react Travel and Stay Website/i);
    expect(cardText).toBeInTheDocument();
    
    // Get the video element
    const videoElement = document.querySelector('video');
    expect(videoElement).toBeInTheDocument();
    
    // Check video attributes
    expect(videoElement).toHaveAttribute('src', 'mock-video-path');
    expect(videoElement.autoplay).toBeTruthy();  
    expect(videoElement.loop).toBeTruthy();     
    expect(videoElement.muted).toBeTruthy();    
  });

  test('has correct data-aos attributes for animations', () => {
    const title = screen.getByText(/Why Legalnable\?\?/i);
    expect(title).toHaveAttribute('data-aos', 'fade-up');
    expect(title).toHaveAttribute('data-aos-duration', '2000');
    
    // Alternative query if test IDs aren't available:
    const featureItems = document.querySelectorAll('[data-aos="fade-up"]');
    expect(featureItems.length).toBeGreaterThanOrEqual(3);
    
    featureItems.forEach(item => {
      expect(item).toHaveAttribute('data-aos', 'fade-up');
      expect(item).toHaveAttribute('data-aos-duration', '2000');
    });
    
    // For video card (if test ID isn't available)
    const videoCards = document.querySelectorAll('[data-aos="fade-up"]');
    expect(videoCards.length).toBeGreaterThanOrEqual(1);
  });

  test('initializes AOS on component mount', () => {
    const { init } = require('aos');
    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith({ duration: 2000 });
  });
});