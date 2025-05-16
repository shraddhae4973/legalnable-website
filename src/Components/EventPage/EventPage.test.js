import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Eventpage from './EventPage';
import axios from 'axios';
import { BrowserRouter, useNavigate } from 'react-router-dom';

// Mock icons
jest.mock('react-icons/bi', () => ({
  BiDotsVertical: () => <div data-testid="dot-icon">...</div>,
  BiSearchAlt: () => <div data-testid="search-icon" />,
}));
jest.mock('react-icons/tb', () => ({
  TbMessageCircle: () => <div data-testid="message-icon" />,
}));
jest.mock('react-icons/io', () => ({
  IoMdNotificationsOutline: () => <div data-testid="notification-icon" />,
}));

// Mock image import
jest.mock('../../Assets/1.jpg', () => 'admin-img.jpg');

// Mock axios
jest.mock('axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Dummy event data
const mockEvents = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  eventTitle: `Event ${i + 1}`,
  eventDescription: `Description ${i + 1}`,
  location: `Location ${i + 1}`,
  img: `img${i + 1}.jpg`,
}));

// Helper to render with router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Eventpage Component', () => {
  beforeEach(async () => {
    axios.get.mockResolvedValueOnce({ data: mockEvents });
    renderWithRouter(<Eventpage />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });

  test('renders static header elements', () => {
    expect(screen.getByPlaceholderText('Search Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('message-icon')).toBeInTheDocument();
    expect(screen.getByTestId('notification-icon')).toBeInTheDocument();
    expect(screen.getByAltText('Admin Image')).toBeInTheDocument();
  });

  test('renders event cards based on pagination (6 per page)', () => {
    const eventTitles = screen.getAllByText(/Event \d+/);
    expect(eventTitles).toHaveLength(6);
  });

  test('pagination works when clicking page buttons', async () => {
    const page2Button = await screen.findByRole('button', { name: '2' });
    fireEvent.click(page2Button);
  
    const eventOnPage2 = await screen.findByText('Event 7');
    expect(eventOnPage2).toBeInTheDocument();
  });
  

  test('dropdown opens and closes on icon click', async () => {
    const buttons = await screen.findAllByRole('button'); // wait for buttons
    fireEvent.click(buttons[0]); // open dropdown
  
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  
    fireEvent.click(document); // click outside to close
    await waitFor(() =>
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    );
  });
  
  test('calls navigate on Edit click', async () => {
    const dotIcons = await screen.findAllByTestId('dot-icon');
    fireEvent.click(dotIcons[0]); // simulate opening dropdown
    
    const editButton = await screen.findByText('Edit');
    fireEvent.click(editButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/events/getSingleEvent/1');
  });
  

  test('calls delete API and removes event from DOM', async () => {
    window.confirm = jest.fn(() => true); // mock confirm popup
  
    // Ensure delete is mocked
    axios.delete = jest.fn();
    axios.delete.mockResolvedValueOnce({ data: { message: 'Deleted successfully' } });
  
    const dotIcons = await screen.findAllByTestId('dot-icon');
    fireEvent.click(dotIcons[0]); // open dropdown
  
    const deleteBtn = await screen.findByText('Delete');
    fireEvent.click(deleteBtn);
  
    await waitFor(() =>
      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:8080/events/deleteEvent/1'
      )
    );
  
    await waitFor(() =>
      expect(screen.queryByText('Event 1')).not.toBeInTheDocument()
    );
  });
  
});
