import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from './Blog';
import { IoMdArrowForward } from 'react-icons/io';

// Mock react-icons
jest.mock('react-icons/io', () => ({
  IoMdArrowForward: () => <div data-testid="arrow-icon">Arrow Icon</div>,
}));

// Mock AOS initialization
jest.mock('aos', () => ({
  init: jest.fn(),
}));

// Mock image import
jest.mock('../../Assets/2.jpg', () => 'test-image-path.jpg');

describe('Blog Component', () => {
  beforeEach(() => {
    render(<Blog />);
  });

  test('renders section title and description', () => {
    expect(screen.getByText('Student Testinomials')).toBeInTheDocument();
    expect(screen.getByText('What our members has to say..')).toBeInTheDocument();
  });

  test('renders all blog posts', () => {
    // Get posts by their class name instead of test ID
    const posts = document.querySelectorAll('.singlePost');
    expect(posts).toHaveLength(4);
  });

  test('each post has correct content structure', () => {
    // Get posts by their class name
    const posts = document.querySelectorAll('.singlePost');
  
    posts.forEach((post, index) => {
      const postElement = post;
      expect(within(postElement).getByRole('img')).toBeInTheDocument();
      expect(within(postElement).getByRole('heading', { level: 3 })).toBeInTheDocument();
      expect(within(postElement).getByText(/Read More/)).toBeInTheDocument();
      expect(within(postElement).getByTestId('arrow-icon')).toBeInTheDocument();
    });
  });

  // render correct image 
  test('images have correct src and alt attributes', () => {
    const image = screen.getByAltText('Sofia M.');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image-path.jpg');
    expect(image).toHaveAttribute('alt', 'Sofia M.');
  });
  // render read more link 

  test('renders "Read More" links with arrows', () => {
    const readMoreLinks = screen.getAllByText(/Read More/);
    expect(readMoreLinks).toHaveLength(4);
    
    readMoreLinks.forEach(link => {
      expect(link).toHaveClass('flex');
      expect(within(link).getByTestId('arrow-icon')).toBeInTheDocument();
    });
  });

  test('initializes AOS library', () => {
    const { init } = require('aos');
    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith({ duration: 2000 });
  });

  test('applies AOS attributes to elements', () => {
    const sectionTitle = screen.getByText('Student Testinomials');
    expect(sectionTitle).toHaveAttribute('data-aos', 'fade-up');
    expect(sectionTitle).toHaveAttribute('data-aos-duration', '2000');
    
    const posts = document.querySelectorAll('.singlePost');
    expect(posts[0]).toHaveAttribute('data-aos', 'fade-up');
    expect(posts[0]).toHaveAttribute('data-aos-duration', '2000');
  });
});
