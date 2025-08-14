import { useState, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import './App.css'
import SEO from './components/SEO'
import Header from './components/Header'
import StarField from './components/StarField'
import MainClock from './components/MainClock'
import WorldClocks from './components/WorldClocks'
import PlanetaryTimes from './components/PlanetaryTimes'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState('space-dark');

  useEffect(() => {
    // Apply theme to body
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    console.log('Theme changed to:', newTheme);
  };

  return (
    <HelmetProvider>
      <SEO />
      <div className={`app theme-${theme}`}>
        <Header 
          theme={theme} 
          setTheme={setTheme} 
          onThemeChange={handleThemeChange} 
        />
        {theme === 'space-dark' && <StarField />}
        <main className="dashboard" role="main">
          <MainClock theme={theme} />
          <WorldClocks theme={theme} />
          <PlanetaryTimes theme={theme} />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App
