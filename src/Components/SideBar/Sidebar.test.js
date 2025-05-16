import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './SideBar';
import '@testing-library/jest-dom';

describe('Sidebar Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );
  });

  // Logo Section Tests
  describe('Logo Section', () => {
    it('should render the logo image', () => {
      const logoImage = screen.getByRole('img');
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute('alt', 'Image Name');
    });

    it('should render the Legalnable text', () => {
      const logoText = screen.getByText('Legalnable');
      expect(logoText).toBeInTheDocument();
    });

    it('should navigate to /admin when Legalnable text is clicked', () => {
      const logoText = screen.getByText('Legalnable');
      fireEvent.click(logoText);
      expect(window.location.pathname).toBe('/admin');
    });
  });

  // Quick Menu Tests
  describe('Quick Menu Section', () => {
    it('should render the QUICK MENU title', () => {
      expect(screen.getByText('QUICK MENU')).toBeInTheDocument();
    });

    it('should render all quick menu links', () => {
      const menuItems = ['Members', 'Events', 'Testimonials', 'Blogs'];
      menuItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('should navigate to correct routes when menu items are clicked', () => {
      const membersLink = screen.getByText('Members');
      fireEvent.click(membersLink);
      expect(window.location.pathname).toBe('/members');

      const eventsLink = screen.getByText('Events');
      fireEvent.click(eventsLink);
      expect(window.location.pathname).toBe('/eventPage');

      const testimonialsLink = screen.getByText('Testimonials');
      fireEvent.click(testimonialsLink);
      expect(window.location.pathname).toBe('/testimonials');

      const blogsLink = screen.getByText('Blogs');
      fireEvent.click(blogsLink);
      expect(window.location.pathname).toBe('/blogs');
    });

    it('should display correct icons for quick menu items', () => {
      // Test for presence of icons by finding their parent links first
      const membersIcon = screen.getByText('Members').closest('a').querySelector('svg');
      const eventsIcon = screen.getByText('Events').closest('a').querySelector('svg');
      const testimonialsIcon = screen.getByText('Testimonials').closest('a').querySelector('svg');
      const blogsIcon = screen.getByText('Blogs').closest('a').querySelector('svg');

      expect(membersIcon).toBeInTheDocument();
      expect(eventsIcon).toBeInTheDocument();
      expect(testimonialsIcon).toBeInTheDocument();
      expect(blogsIcon).toBeInTheDocument();
    });
  });

  // Settings Section Tests
  describe('Settings Section', () => {
    // ... other settings tests ...

    it('should display correct icons for settings items', () => {
      // Test for presence of icons in settings section
      const chartsIcon = screen.getByText('Charts').closest('a').querySelector('svg');
      const trendsIcon = screen.getByText('Trends').closest('a').querySelector('svg');
      const contactIcon = screen.getByText('Contact').closest('a').querySelector('svg');
      const billingIcon = screen.getByText('Billing').closest('a').querySelector('svg');

      expect(chartsIcon).toBeInTheDocument();
      expect(trendsIcon).toBeInTheDocument();
      expect(contactIcon).toBeInTheDocument();
      expect(billingIcon).toBeInTheDocument();
    });
  });

  // Help Center Card Tests
  describe('Help Center Card', () => {
    it('should render the help center icon', () => {
      // Find the help center section first
      const helpCenter = screen.getByText('Help Center').closest('.sideBarCard');
      const helpIcon = helpCenter.querySelector('svg');
      expect(helpIcon).toBeInTheDocument();
    });
     
  });

  describe('CSS Classes', () => {
    it('should have correct classes', () => {
      // Get by the logo image's alt text, then check its parent
      const logoImage = screen.getByAltText('Image Name');
      const logoDiv = logoImage.parentElement;
      
      expect(logoDiv).toHaveClass('flex');
      expect(logoDiv.parentElement).toHaveClass('grid');
    });
  });
});