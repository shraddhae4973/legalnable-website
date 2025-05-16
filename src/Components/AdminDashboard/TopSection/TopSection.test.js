import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import TopSection from './TopSection';

// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock react-icons
jest.mock('react-icons/bi', () => ({
  BiSearchAlt: () => <div data-testid="search-icon">Search Icon</div>,
}));

jest.mock('react-icons/bs', () => ({
  BsArrowRightShort: () => <div>Arrow Icon</div>,
  BsQuestionCircle: () => <div data-testid="question-icon">Question Icon</div>,
}));

jest.mock('react-icons/tb', () => ({
  TbMessageCircle: () => <div data-testid="message-icon">Message Icon</div>,
}));

jest.mock('react-icons/io', () => ({
  IoMdNotificationsOutline: () => <div data-testid="notification-icon">Notification Icon</div>,
}));

// Mock image imports
jest.mock('../../../Assets/1.jpg', () => 'test-admin-image.jpg');
jest.mock('../../../Assets/law.png', () => 'test-law-image.png');
jest.mock('../../../Assets/video.mp4', () => 'test-video.mp4');

describe('TopSection Component', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    render(<TopSection />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders header section correctly', () => {
    expect(screen.getByText('Hello admin')).toBeInTheDocument();
    
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    
    expect(screen.getByTestId('message-icon')).toBeInTheDocument();
    expect(screen.getByTestId('notification-icon')).toBeInTheDocument();
    
    const adminImage = screen.getByAltText('Admin Image');
    expect(adminImage).toHaveAttribute('src', 'test-admin-image.jpg');
  });

  test('renders right card section correctly', () => {
    expect(screen.getByText('Create diverse and inclusive community')).toBeInTheDocument();
    expect(screen.getByText(/Join our mission to support others through outreach, education, and advocacy./)).toBeInTheDocument();
    
    const createEventBtn = screen.getByText('Create Event');
    const topSellersBtn = screen.getByText('Events');
    expect(createEventBtn).toBeInTheDocument();
    expect(topSellersBtn).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: 'Create Event' })).toHaveClass('abtn');
    expect(screen.getByRole('button', { name: 'Events' })).toHaveClass('abtn transparent');
    
    // Updated video element test
    const videoElement = document.querySelector('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', 'test-video.mp4');
    expect(videoElement).toHaveAttribute('autoplay');
    expect(videoElement).toHaveAttribute('loop');
  });

  test('renders left card section correctly', () => {
    expect(screen.getByTestId('question-icon')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText(/Having trouble in Legalnable, please contact us from for more questions/)).toBeInTheDocument();
    expect(screen.getByText('Go to help center')).toBeInTheDocument();
  });

  test('navigation works for Create Event button', () => {
    const createEventBtn = screen.getByText('Create Event');
    fireEvent.click(createEventBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/events/createevent');
  });

  test('search input works correctly', () => {
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput.value).toBe('test search');
  });

  test('does not render commented-out content', () => {
    expect(screen.queryByText('My Stat')).not.toBeInTheDocument();
    expect(screen.queryByText('Today')).not.toBeInTheDocument();
    expect(screen.queryByText('This month')).not.toBeInTheDocument();
    expect(screen.queryByText('Go to members')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Admin Image')).not.toHaveAttribute('src', 'test-law-image.png');
  });
});
