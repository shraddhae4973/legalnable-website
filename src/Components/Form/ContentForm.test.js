jest.mock('axios');

// src/Components/Form/ContentForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ContentForm from './ContentForm';

// Mocks
const mockNavigate = jest.fn();
const mockParams = { eventId: undefined };

// 1) Top-level mock of react-router-dom:
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...actual,
    useNavigate: () => mockNavigate,
    useParams:    () => mockParams,
  };
});

// 2) Mock axios
jest.mock('axios');

describe('ContentForm — Create Mode', () => {
  beforeEach(() => {
    mockParams.eventId = undefined;
    mockNavigate.mockReset();
    axios.post.mockReset();
  });

  it('validates missing image', async () => {
    render(<ContentForm />);
    fireEvent.click(screen.getByRole('button', { name: /create event/i }));
    expect(await screen.findByText(/please select an image/i)).toBeInTheDocument();
  });

  it('submits create successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Created!' }});
    const { container } = render(<ContentForm />);
  
    fireEvent.change(screen.getByPlaceholderText(/enter event name/i), {
      target: { value: 'My Event' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter event location/i), {
      target: { value: 'London' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), {
      target: { value: 'Nice event' },
    });
  
    // ← Grab the file input by type instead of by label
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).not.toBeNull();
  
    const file = new File(['dummy'], 'photo.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);
  
    fireEvent.click(screen.getByRole('button', { name: /create event/i }));
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/events/createevent',
        expect.any(FormData)
      );
      expect(screen.getByText(/created!/i)).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/eventPage');
    });
  });
  
});

describe('ContentForm — Edit Mode', () => {
  const EVENT_ID = '42';
  const existing = {
    eventTitle: 'Old Title',
    location: 'Paris',
    eventDescription: 'Old desc',
    img: 'url.jpg',
  };

  beforeEach(() => {
    mockParams.eventId = EVENT_ID;
    mockNavigate.mockReset();
    axios.get.mockResolvedValueOnce({ data: existing });
    axios.post.mockResolvedValueOnce({ data: { message: 'Updated!' }});
  });

  it('loads and populates existing event', async () => {
    render(<ContentForm />);
  
    // 1) Wait for the GET call
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/events/getSingleEvent/${EVENT_ID}`
      );
    });
  
    // 2) Now wait for the inputs to receive their values
    const titleInput       = await screen.findByDisplayValue(existing.eventTitle);
    const locationInput    = await screen.findByDisplayValue(existing.location);
    const descriptionInput = await screen.findByDisplayValue(existing.eventDescription);
  
    // 3) Assert they’re in the document
    expect(titleInput).toBeInTheDocument();
    expect(locationInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });
  

  it('submits update successfully', async () => {
    const { container } = render(<ContentForm />);
    await waitFor(() => screen.getByDisplayValue(existing.eventTitle));
  
    fireEvent.change(screen.getByDisplayValue(existing.eventTitle), {
      target: { value: 'New Title' },
    });
  
    // ← Same replacement here
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).not.toBeNull();
  
    const file = new File(['img'], 'new.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);
  
    fireEvent.click(screen.getByRole('button', { name: /update event/i }));
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `http://localhost:8080/events/updateEvent/${EVENT_ID}`,
        expect.any(FormData)
      );
      expect(screen.getByText(/updated!/i)).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/eventPage');
    });
  });
  
  
});
