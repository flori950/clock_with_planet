import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainClock from '../components/MainClock';

// Mock date-fns functions
vi.mock('date-fns', () => ({
  format: vi.fn(() => '14:30:45'),
  formatInTimeZone: vi.fn(() => '14:30:45'),
}));

describe('MainClock Component', () => {
  it('renders the main clock', () => {
    render(<MainClock theme="space-dark" />);
    
    expect(screen.getByText(/earth time/i)).toBeInTheDocument();
  });

  it('displays time correctly', () => {
    render(<MainClock theme="space-dark" />);
    
    // Should display mocked time - use getAllByText since time appears multiple times
    expect(screen.getAllByText('14:30:45')[0]).toBeInTheDocument();
  });

  it('renders sunrise and sunset information', () => {
    render(<MainClock theme="space-dark" />);
    
    expect(screen.getByText(/sunrise/i)).toBeInTheDocument();
    expect(screen.getByText(/sunset/i)).toBeInTheDocument();
  });
});
