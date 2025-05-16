import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Activity from './Activity';
import { BsArrowRightShort } from 'react-icons/bs';

// Mock the image and icon
jest.mock('../../../Assets/1.jpg', () => 'mock-image-path');
jest.mock('react-icons/bs', () => ({
  BsArrowRightShort: () => <span>MockRightArrowIcon</span>,
}));

describe('Activity Component', () => {
  beforeEach(() => {
    render(<Activity />);
  });

  test('renders the heading and "See All" button', () => {
    // Check main heading
    const heading = screen.getByRole('heading', { name: /User Activity/i });
    expect(heading).toBeInTheDocument();
    
    // Check "See All" button
    const seeAllButton = screen.getByRole('button', { name: /See All/i });
    expect(seeAllButton).toBeInTheDocument();
    expect(seeAllButton).toHaveClass('abtn', 'flex');
    
    // Check icon in button
    expect(screen.getByText('MockRightArrowIcon')).toBeInTheDocument();
  });

  test('renders multiple customer activity items', () => {
    // Check all customer items are rendered
    const customerItems = screen.getAllByText(/User one/i);
    expect(customerItems.length).toBeGreaterThanOrEqual(2);
        
    // Check one item has the correct structure
    const activity = document.querySelector('.singleCustomer');
    expect(activity).toHaveClass('singleCustomer', 'flex');

    // Check image
    const img = activity.querySelector('img');
    expect(img).toHaveAttribute('src', 'mock-image-path');
    expect(img).toHaveAttribute('alt', 'Customer Right');

    // Check details
    expect(activity).toHaveTextContent('User oneRegistered new user6 hours ago');

  });

  test('has correct CSS classes applied', () => {
    // Check main section classes
    const activitySection = document.querySelector('.activitySection');
    expect(activitySection).toBeInTheDocument();
    
    // Check container classes
    const adminContainer = document.querySelector('.adminContainer');
    expect(adminContainer).toHaveClass('adminContainer', 'grid');
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Activity />);
    expect(asFragment()).toMatchSnapshot();
  });
});




