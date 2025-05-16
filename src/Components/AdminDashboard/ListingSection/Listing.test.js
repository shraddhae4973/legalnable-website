import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Listing from './Listing';

// Correct mock 
jest.mock('react-icons/bs', () => ({
  BsArrowRightShort: () => <div>BsArrowRightShort Icon</div>,
}));

jest.mock('react-icons/ai', () => ({
  AiFillHeart: () => <div>AiFillHeart Icon</div>,
}));

// Mock the image import
jest.mock('../../../Assets/1.jpg', () => 'test-image-path.jpg');

describe('Listing Component', () => {
  beforeEach(() => {
    render(<Listing />);
  });

  test('renders the main heading', () => {
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });

  test('renders "See All" button with icon', () => {
    const seeAllButton = screen.getByRole('button', { name: /See All/i });
    expect(seeAllButton).toBeInTheDocument();
    expect(within(seeAllButton).getByText('BsArrowRightShort Icon')).toBeInTheDocument();
  });

  test('renders listing items with correct content', () => {
    const listingImages = screen.getAllByAltText('Image Name');
    expect(listingImages).toHaveLength(4);
    
    // Find heart icons by their mocked text
    const heartIcons = screen.getAllByText('AiFillHeart Icon');
    expect(heartIcons).toHaveLength(4);
    
    // Verify listing text content
    expect(screen.getAllByText('Annul Venue')).toHaveLength(2);
    expect(screen.getAllByText('Anniversary Event')).toHaveLength(2);
  });

  test('renders Student User section', () => {
    expect(screen.getByText('Student User')).toBeInTheDocument();
    expect(screen.getByText('12 Users')).toBeInTheDocument();
    expect(screen.getByText('21 Users')).toBeInTheDocument();
    expect(screen.getByText('7 Days')).toBeInTheDocument();
  });

  test('renders Legal Users section', () => {
    expect(screen.getByText('Legal Users')).toBeInTheDocument();
    expect(screen.getByText('1223 Users')).toBeInTheDocument();
    expect(screen.getByText('213 Users')).toBeInTheDocument();
    expect(screen.getByText('30 Days')).toBeInTheDocument();
  });

  test('all images have alt text', () => {
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });

  test('renders correct number of user images', () => {
    const userImages = screen.getAllByAltText('user Image');
    expect(userImages).toHaveLength(8); 
  });

  test('all "See All/Sell All" buttons are rendered', () => {
    const seeAllButtons = screen.getAllByRole('button', { name: /(See|Sell) All/i });
    expect(seeAllButtons).toHaveLength(3);
  });
});






