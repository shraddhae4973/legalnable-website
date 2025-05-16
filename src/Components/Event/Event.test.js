import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Event from './Event';
import axios from 'axios';
import '@testing-library/jest-dom';

// Mock the AOS library
jest.mock('aos', () => ({
  init: jest.fn(),
}));

// Mock axios
jest.mock('axios');

describe('Event Component', () => {

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    console.error.mockRestore();
  })
  const mockEvents = [
    {
      id: 1,
      img: 'event1.jpg',
      eventDescription: 'Law Workshop',
      location: 'London',
      eventTitle: 'Empowering Students',
    },
    {
      id: 2,
      img: 'event2.jpg',
      eventDescription: 'Disability Rights Talk',
      location: 'Manchester',
      eventTitle: 'Know Your Rights',
    },
  ];
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockEvents });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //render static title and description 
  test('renders static section title and description', () => {
    render(<Event />);
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText(/Stay connected with Legalnable through our upcoming workshops, awareness campaigns, and community meetups. Our events aim to educate, empower, and advocate for the rights of people with disabilities./i)).toBeInTheDocument();
  });

  // fetch and display events content
  test('fetches and displays event cards', async () => {
    render(<Event />);

    await waitFor(() => {
      expect(screen.getByText('Empowering Students')).toBeInTheDocument();
      expect(screen.getByText('Know Your Rights')).toBeInTheDocument();
    });
  });

  // render event image 
  test('renders event images correctly', async () => {
    render(<Event />);

    await waitFor(() => {
      const images = screen.getAllByAltText('Event');
      expect(images.length).toBe(2);
      expect(images[0].src).toContain('/uploads/event1.jpg');
      expect(images[1].src).toContain('/uploads/event2.jpg');
    });
  });
});


