// src/Components/Navbar/Navbar.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom'; // To handle routing in tests
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
  test('renders navbar and toggle functionality', () => {
    const { container } = render(<Navbar />, { wrapper: MemoryRouter });
    const navbarSection = container.querySelector('.navBarSection');
    expect(navbarSection).toBeInTheDocument();

    // call the toggle  by its class
    const toggleBtn = container.querySelector('.toggleNavbar');
    expect(toggleBtn).toBeInTheDocument();

    // call the nav menu wrapper 
    const navMenu = container.querySelector('.navBar');
    expect(navMenu).not.toHaveClass('activeNavbar');

    // Click toggle → menu should open
    fireEvent.click(toggleBtn);
    expect(navMenu).toHaveClass('activeNavbar');

    // call and click the close control → menu should close again
    const closeBtn = container.querySelector('.closeNavbar');
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(navMenu).not.toHaveClass('activeNavbar');
     
  });

  test('navigates to the admin dashboard when dashboard button is clicked', () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    // Mock navigate function
    const dashboardBtn = screen.getByRole('button', { name: /dashboard/i });
    fireEvent.click(dashboardBtn);

    // Make sure the navigation happened
    expect(window.location.pathname).toBe('/');
  });
});

