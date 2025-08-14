import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

// Mock components to avoid dependency issues in tests
vi.mock('../components/StarField', () => ({
  default: () => <div data-testid="starfield">StarField</div>
}));

const AppWithHelmet = () => (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main application', () => {
    render(<AppWithHelmet />);
    
    expect(screen.getByText('🌌 Space Clock')).toBeInTheDocument();
  });

  it('renders all main components', () => {
    render(<AppWithHelmet />);
    
    // Check if main sections are present
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
  });

  it('applies default space-dark theme', () => {
    render(<AppWithHelmet />);
    
    const app = document.querySelector('.app');
    expect(app).toHaveClass('theme-space-dark');
  });

  it('renders StarField component when space-dark theme is active', () => {
    render(<AppWithHelmet />);
    
    expect(screen.getByTestId('starfield')).toBeInTheDocument();
  });
});
