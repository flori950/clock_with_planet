import { useState, useEffect, useMemo } from 'react';
import { Zap } from 'lucide-react';

const PlanetaryTimes = () => {
  const [planetTimes, setPlanetTimes] = useState({});

  // Planetary day lengths in Earth hours
  const planetData = useMemo(() => [
    { name: 'Mars', dayLength: 24.6, emoji: '🔴', color: '#ff4500' },
    { name: 'Moon', dayLength: 708.7, emoji: '🌙', color: '#c0c0c0' },
    { name: 'Venus', dayLength: 5832.5, emoji: '🟡', color: '#ffc649' },
    { name: 'Jupiter', dayLength: 9.9, emoji: '🟤', color: '#d2691e' },
    { name: 'Saturn', dayLength: 10.7, emoji: '🪐', color: '#fad5a5' },
    { name: 'Mercury', dayLength: 1407.6, emoji: '⚫', color: '#8c7853' },
  ], []);

  useEffect(() => {
    const updatePlanetTimes = () => {
      const now = new Date();
      
      const times = {};
      
      planetData.forEach(planet => {
        const planetDayLength = planet.dayLength; // in Earth hours
        const planetDayInMs = planetDayLength * 60 * 60 * 1000;
        
        // Calculate how many planetary days have passed since a reference point
        const referenceTime = new Date('2024-01-01T00:00:00Z');
        const timeSinceReference = now - referenceTime;
        const planetaryDaysSinceReference = timeSinceReference / planetDayInMs;
        const currentPlanetaryDayProgress = planetaryDaysSinceReference % 1;
        
        // Convert to hours and minutes
        const planetaryHoursInDay = 24; // We'll use 24-hour format for consistency
        const currentPlanetaryHour = Math.floor(currentPlanetaryDayProgress * planetaryHoursInDay);
        const currentPlanetaryMinute = Math.floor((currentPlanetaryDayProgress * planetaryHoursInDay * 60) % 60);
        const currentPlanetarySecond = Math.floor((currentPlanetaryDayProgress * planetaryHoursInDay * 3600) % 60);
        
        times[planet.name] = {
          time: `${currentPlanetaryHour.toString().padStart(2, '0')}:${currentPlanetaryMinute.toString().padStart(2, '0')}:${currentPlanetarySecond.toString().padStart(2, '0')}`,
          dayLength: planetDayLength,
          progress: currentPlanetaryDayProgress
        };
      });
      
      setPlanetTimes(times);
    };

    updatePlanetTimes();
    const timer = setInterval(updatePlanetTimes, 1000);
    return () => clearInterval(timer);
  }, [planetData]);

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <Zap className="card-icon" size={24} />
          Planetary Times
        </h2>
      </div>
      
      <div className="planetary-times">
        {planetData.map((planet) => (
          <div key={planet.name} className="planetary-time">
            <div className="planet-name">
              {planet.emoji} {planet.name}
            </div>
            <div className="planet-time" style={{ color: planet.color }}>
              {planetTimes[planet.name]?.time || '00:00:00'}
            </div>
            <div style={{ 
              fontSize: '0.8rem', 
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: '0.5rem'
            }}>
              Day: {planet.dayLength}h
            </div>
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              marginTop: '0.5rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(planetTimes[planet.name]?.progress || 0) * 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${planet.color}, ${planet.color}88)`,
                borderRadius: '2px',
                transition: 'width 1s ease'
              }} />
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem',
        background: 'rgba(138, 43, 226, 0.1)',
        borderRadius: '10px',
        fontSize: '0.9rem',
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center'
      }}>
        🌌 Times are calculated based on each planet's rotation period relative to Earth
      </div>
    </div>
  );
};

export default PlanetaryTimes;
