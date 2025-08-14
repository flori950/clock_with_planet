import { Heart, Github, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-card" style={{
      marginTop: '2rem',
      padding: '1.5rem',
      textAlign: 'center',
      borderRadius: '15px',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center'
      }}>
        {/* Main footer content */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '1rem'
        }}>
          {/* Made with love */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.9rem'
          }}>
            <span>Made with</span>
            <Heart 
              size={16} 
              style={{ 
                color: '#ff6b6b',
                animation: 'pulse 2s infinite' 
              }} 
            />
            <span>by Florian Hunter</span>
          </div>

          {/* Links */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <a
              href="https://github.com/florian-hunter"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                padding: '0.5rem',
                borderRadius: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#00bfff';
                e.target.style.background = 'rgba(0, 191, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                e.target.style.background = 'transparent';
              }}
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>

            <a
              href="https://florian-hunter.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                padding: '0.5rem',
                borderRadius: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#00bfff';
                e.target.style.background = 'rgba(0, 191, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                e.target.style.background = 'transparent';
              }}
            >
              <Globe size={16} />
              <span>Website</span>
            </a>
          </div>
        </div>

        {/* Tech stack info */}
        <div style={{
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.6)',
          lineHeight: 1.5,
          textAlign: 'center'
        }}>
          Built with React 18, Vite, and lots of cosmic inspiration ✨
          <br />
          Featuring glassmorphism design and real-time planetary calculations
          <br />
          <span style={{ fontSize: '0.7rem', color: 'rgba(0, 191, 255, 0.7)' }}>
            🔄 Automated dependency updates via Renovate on GitHub
          </span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          
          @media (max-width: 768px) {
            footer > div {
              gap: 1rem !important;
            }
            
            footer > div > div:first-child {
              flex-direction: column !important;
              gap: 1rem !important;
            }
            
            footer > div > div:nth-child(2) {
              flex-direction: column !important;
              gap: 1rem !important;
            }
          }
        `
      }} />
    </footer>
  );
};

export default Footer;
