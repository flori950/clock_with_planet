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
    
    expect(screen.getByRole('button', { name: /add city/i })).toBeInTheDocument();
  });

  it('allows adding a new city', async () => {
    const user = userEvent.setup();
    render(<WorldClocks theme="space-dark" />);
    
    // Initially, the add form should not be visible
    expect(screen.queryByPlaceholderText(/search cities worldwide/i)).not.toBeInTheDocument();
    
    // Click add city button
    const addButton = screen.getByRole('button', { name: /add city/i });
    await user.click(addButton);
    
    // Should show add city form - look for the search input
    expect(screen.getByPlaceholderText(/search cities worldwide/i)).toBeInTheDocument();
  });
});
