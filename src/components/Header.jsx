import { useState } from 'react';
import { Settings, Sun, Moon, Palette } from 'lucide-react';

const Header = ({ theme, setTheme, onThemeChange }) => {
  const [showSettings, setShowSettings] = useState(false);

  const themes = [
    { name: 'Space Dark', value: 'space-dark', icon: '🌌', description: 'Cosmic deep space theme' },
    { name: 'Light Mode', value: 'light', icon: '☀️', description: 'Clean light interface' },
    { name: 'Ocean Blue', value: 'ocean', icon: '🌊', description: 'Deep ocean blue theme' },
    { name: 'Sunset', value: 'sunset', icon: '🌅', description: 'Warm sunset colors' },
    { name: 'Forest', value: 'forest', icon: '🌲', description: 'Nature green theme' },
    { name: 'Purple Galaxy', value: 'galaxy', icon: '🌌', description: 'Purple cosmic theme' },
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
    setShowSettings(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo/Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            fontSize: '2rem',
            background: 'linear-gradient(45deg, #00bfff, #8a2be2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold'
          }}>
            🌌 Space Clock
          </div>
          <div style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.9rem'
          }}>
            Cosmic Time Dashboard
          </div>
        </div>

        {/* Theme & Settings Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Quick Theme Toggle */}
          <button
            onClick={() => handleThemeChange(theme === 'space-dark' ? 'light' : 'space-dark')}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '0.5rem',
              color: '#00bfff',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            title="Toggle light/dark mode"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              background: showSettings ? 'rgba(0, 191, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              border: `1px solid ${showSettings ? 'rgba(0, 191, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '10px',
              padding: '0.5rem',
              color: showSettings ? '#00bfff' : 'rgba(255, 255, 255, 0.8)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            title="Theme settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '2rem',
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
          padding: '1.5rem',
          minWidth: '300px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            <Palette size={20} />
            Theme Selection
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '0.5rem'
          }}>
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => handleThemeChange(themeOption.value)}
                style={{
                  background: theme === themeOption.value ? 'rgba(0, 191, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${theme === themeOption.value ? 'rgba(0, 191, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '10px',
                  padding: '0.75rem',
                  color: theme === themeOption.value ? '#00bfff' : 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  fontSize: '0.8rem'
                }}
                title={themeOption.description}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                  {themeOption.icon}
                </div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {themeOption.name}
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                  {themeOption.description}
                </div>
              </button>
            ))}
          </div>

          <div style={{
            marginTop: '1rem',
            padding: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center'
          }}>
            Current: {themes.find(t => t.value === theme)?.name || 'Space Dark'}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
