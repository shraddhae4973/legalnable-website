// src/Components/Home/Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

// 1) Mock AOS so init() is a jest.fn()
jest.mock('aos', () => ({
  init: jest.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    // Clear any previous calls
    require('aos').init.mockClear();
  });

  test('initializes AOS and renders all sections correctly', () => {
    render(<Home />);

    const Aos = require('aos');
    // 2) Aos.init should be called once with duration 2000
    expect(Aos.init).toHaveBeenCalledWith({ duration: 2000 });
    expect(Aos.init).toHaveBeenCalledTimes(1);

    // 3) Title and subtitle
    const title = screen.getByText(/Welcome to Legalnable/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('title');
    expect(title).toHaveAttribute('data-aos', 'fade-up');

    const subtitle = screen.getByText(/Empowering Through Law & Support/i);
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('subTitle');
    expect(subtitle).toHaveAttribute('data-aos-duration', '2500');

    // 4) "Explore now" button
    const exploreBtn = screen.getByRole('button', { name: /explore now/i });
    expect(exploreBtn).toBeInTheDocument();
    expect(exploreBtn).toHaveClass('btn');
    expect(exploreBtn).toHaveAttribute('data-aos-duration', '3000');

    // 5) Three input fields with correct placeholders
    const locationInput = screen.getByPlaceholderText('Enter city or area');
    expect(locationInput).toBeInTheDocument();

    const distanceInput = screen.getByPlaceholderText('Legal Advice');
    expect(distanceInput).toBeInTheDocument();

    const priceInput = screen.getByPlaceholderText('Date & Time');
    expect(priceInput).toBeInTheDocument();

    // 6) "Search" button in card
    const searchBtn = screen.getByRole('button', { name: /search/i });
    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).toHaveClass('btn');
    expect(searchBtn).toHaveAttribute('data-aos', 'fade-left');
  });
});


