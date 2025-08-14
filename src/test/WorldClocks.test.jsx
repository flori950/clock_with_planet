import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorldClocks from '../components/WorldClocks';

describe('WorldClocks Component', () => {
  it('renders world clocks section', () => {
    render(<WorldClocks theme="space-dark" />);
    
    expect(screen.getByText(/world clocks/i)).toBeInTheDocument();
  });

  it('renders add city button', () => {
    render(<WorldClocks theme="space-dark" />);
    
    expect(screen.getByText(/add city/i)).toBeInTheDocument();
  });

  it('allows adding a new city', async () => {
    const user = userEvent.setup();
    render(<WorldClocks theme="space-dark" />);
    
    // Click add city button
    const addButton = screen.getByText(/add city/i);
    await user.click(addButton);
    
    // Should show add city form
    expect(screen.getByPlaceholderText(/city name/i)).toBeInTheDocument();
  });
});
