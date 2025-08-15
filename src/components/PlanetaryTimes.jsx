import { useState, useEffect, useMemo, useCallback } from 'react';
import { Zap, Plus, X, Search, Sunrise, Sunset } from 'lucide-react';

const PlanetaryTimes = () => {
  const [planetTimes, setPlanetTimes] = useState({});
  const [activePlanets, setActivePlanets] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // All available celestial bodies with emoji icons
  const allCelestialBodies = useMemo(() => [
    // Inner Planets
    { name: 'Mercury', dayLength: 1407.6, icon: '🟤', color: '#8c7853', category: 'Inner Planets', type: 'planet' },
    { name: 'Venus', dayLength: 5832.5, icon: '🟡', color: '#ffc649', category: 'Inner Planets', type: 'planet' },
    { name: 'Mars', dayLength: 24.6, icon: '🔴', color: '#ff4500', category: 'Inner Planets', type: 'planet' },
    
    // Outer Planets
    { name: 'Jupiter', dayLength: 9.9, icon: '🟤', color: '#d2691e', category: 'Outer Planets', type: 'planet' },
    { name: 'Saturn', dayLength: 10.7, icon: '🪐', color: '#fad5a5', category: 'Outer Planets', type: 'planet' },
    { name: 'Uranus', dayLength: 17.2, icon: '🔵', color: '#4fd0e3', category: 'Outer Planets', type: 'planet' },
    { name: 'Neptune', dayLength: 16.1, icon: '🔵', color: '#4b70dd', category: 'Outer Planets', type: 'planet' },
    
    // Dwarf Planets
    { name: 'Pluto', dayLength: 153.3, icon: '🟫', color: '#a0522d', category: 'Dwarf Planets', type: 'dwarf-planet' },
    { name: 'Ceres', dayLength: 9.1, icon: '⚪', color: '#c0c0c0', category: 'Dwarf Planets', type: 'dwarf-planet' },
    { name: 'Eris', dayLength: 25.9, icon: '⚫', color: '#696969', category: 'Dwarf Planets', type: 'dwarf-planet' },
    { name: 'Makemake', dayLength: 22.5, icon: '🟤', color: '#8b4513', category: 'Dwarf Planets', type: 'dwarf-planet' },
    { name: 'Haumea', dayLength: 3.9, icon: '⚪', color: '#daa520', category: 'Dwarf Planets', type: 'dwarf-planet' },
    
    // Earth's Moon
    { name: 'Moon', dayLength: 708.7, icon: '🌙', color: '#c0c0c0', category: 'Earth\'s Moon', type: 'moon' },
    
    // Jupiter's Moons
    { name: 'Io', dayLength: 42.5, icon: '🟡', color: '#ffff80', category: 'Jupiter\'s Moons', type: 'moon' },
    { name: 'Europa', dayLength: 85.2, icon: '🔵', color: '#87ceeb', category: 'Jupiter\'s Moons', type: 'moon' },
    { name: 'Ganymede', dayLength: 171.7, icon: '🟤', color: '#696969', category: 'Jupiter\'s Moons', type: 'moon' },
    { name: 'Callisto', dayLength: 400.5, icon: '⚫', color: '#2f4f4f', category: 'Jupiter\'s Moons', type: 'moon' },
    
    // Saturn's Moons
    { name: 'Titan', dayLength: 382.7, icon: '🟠', color: '#cd853f', category: 'Saturn\'s Moons', type: 'moon' },
    { name: 'Enceladus', dayLength: 32.9, icon: '⚪', color: '#f0f8ff', category: 'Saturn\'s Moons', type: 'moon' },
    { name: 'Mimas', dayLength: 22.6, icon: '🔘', color: '#d3d3d3', category: 'Saturn\'s Moons', type: 'moon' },
    { name: 'Iapetus', dayLength: 1904.2, icon: '⚫', color: '#696969', category: 'Saturn\'s Moons', type: 'moon' },
    
    // Mars' Moons
    { name: 'Phobos', dayLength: 7.6, icon: '🟤', color: '#8b4513', category: 'Mars\' Moons', type: 'moon' },
    { name: 'Deimos', dayLength: 30.3, icon: '🟤', color: '#a0522d', category: 'Mars\' Moons', type: 'moon' },
    
    // Uranus' Moons
    { name: 'Titania', dayLength: 208.9, icon: '🔵', color: '#87ceeb', category: 'Uranus\' Moons', type: 'moon' },
    { name: 'Oberon', dayLength: 323.1, icon: '🔵', color: '#696969', category: 'Uranus\' Moons', type: 'moon' },
    
    // Neptune's Moons
    { name: 'Triton', dayLength: 141.0, icon: '🔵', color: '#4169e1', category: 'Neptune\'s Moons', type: 'moon' }
  ], []);

  // Default active planets (initial selection)
  const defaultPlanets = useMemo(() => [
    'Mars', 'Moon', 'Venus', 'Jupiter', 'Saturn', 'Mercury'
  ], []);

  // Initialize with default planets
  useEffect(() => {
    const defaultActivePlanets = allCelestialBodies.filter(body => 
      defaultPlanets.includes(body.name)
    );
    setActivePlanets(defaultActivePlanets);
  }, [allCelestialBodies, defaultPlanets]);

  // Group active planets by category
  const groupedPlanets = useMemo(() => {
    return activePlanets.reduce((acc, planet) => {
      if (!acc[planet.category]) {
        acc[planet.category] = [];
      }
      acc[planet.category].push(planet);
      return acc;
    }, {});
  }, [activePlanets]);

  // Calculate simple planetary sunrise/sunset times (similar to city style)
  const calculatePlanetarySunTimes = useCallback((planetName, dayLength) => {
    // Simple estimation based on planet's day length
    const planetDayHours = dayLength;
    
    // Assume sunrise at 25% of day, sunset at 75% of day
    const sunriseHour = planetDayHours * 0.25;
    const sunsetHour = planetDayHours * 0.75;
    
    const formatTime = (hours) => {
      const h = Math.floor(hours) % 24;
      const m = Math.floor((hours % 1) * 60);
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };
    
    return {
      sunrise: formatTime(sunriseHour),
      sunset: formatTime(sunsetHour)
    };
  }, []);

  useEffect(() => {
    const updatePlanetTimes = () => {
      const times = {};
      activePlanets.forEach(planet => {
        const now = new Date();
        const planetDay = planet.dayLength;
        
        // Calculate how much time has passed on this planet
        const earthSecondsToday = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
        const planetSeconds = (earthSecondsToday / planetDay) * 24 * 3600;
        
        const planetHours = Math.floor(planetSeconds / 3600) % 24;
        const planetMinutes = Math.floor((planetSeconds % 3600) / 60);
        const planetSecs = Math.floor(planetSeconds % 60);
        
        const time = `${planetHours.toString().padStart(2, '0')}:${planetMinutes.toString().padStart(2, '0')}:${planetSecs.toString().padStart(2, '0')}`;
        
        const sunTimes = calculatePlanetarySunTimes(planet.name, planet.dayLength);
        
        times[planet.name] = { 
          time, 
          dayLength: `${planet.dayLength}h`,
          ...sunTimes
        };
      });
      setPlanetTimes(times);
    };

    updatePlanetTimes();
    const timer = setInterval(updatePlanetTimes, 1000);
    return () => clearInterval(timer);
  }, [activePlanets, calculatePlanetarySunTimes]);

  const addPlanet = (planet) => {
    if (!activePlanets.some(p => p.name === planet.name)) {
      setActivePlanets([...activePlanets, planet]);
      setShowAddForm(false);
      setSearchQuery('');
    }
  };

  const removePlanet = (planetName) => {
    setActivePlanets(activePlanets.filter(p => p.name !== planetName));
  };

  const filteredPlanets = allCelestialBodies.filter(planet =>
    planet.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !activePlanets.some(active => active.name === planet.name)
  );

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <Zap className="card-icon" size={24} />
          Planetary Times
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-button"
          aria-label="Add planet"
          style={{
            background: 'rgba(138, 43, 226, 0.2)',
            border: '1px solid rgba(138, 43, 226, 0.5)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <Plus size={20} color="#8a2be2" />
        </button>
      </div>

      {showAddForm && (
        <div style={{
          background: 'rgba(138, 43, 226, 0.1)',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Search size={16} style={{ marginRight: '0.5rem', color: 'rgba(255, 255, 255, 0.6)' }} />
            <input
              type="text"
              placeholder="Search celestial bodies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '5px',
                padding: '0.5rem',
                color: 'white',
                flex: 1
              }}
            />
            <button
              onClick={() => setShowAddForm(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                marginLeft: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.5rem',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {filteredPlanets.map(planet => (
              <div
                key={planet.name}
                onClick={() => addPlanet(planet)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <span style={{ fontSize: '1.2rem' }}>{planet.icon}</span>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{planet.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {planet.dayLength}h day • {planet.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="planetary-grid">
        {Object.entries(groupedPlanets).map(([category, planets]) => (
          <div key={category} className="planet-category">
            <h3 className="category-title" style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>
              {category}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {planets.map(planet => (
                <div key={planet.name} className="planet-card">
                  <div className="planet-header">
                    <div className="planet-info">
                      <span className="planet-icon" style={{ fontSize: '1.5rem' }}>{planet.icon}</span>
                      <div>
                        <div className="planet-name">{planet.name}</div>
                        <div className="planet-type">Day: {planetTimes[planet.name]?.dayLength || `${planet.dayLength}h`}</div>
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removePlanet(planet.name)}
                      title="Remove planet"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="planet-time">
                    {planetTimes[planet.name]?.time || '--:--:--'}
                  </div>
                  
                  {/* Sunrise/Sunset Information (city style) */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    background: 'rgba(255, 165, 0, 0.1)',
                    borderRadius: '8px',
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Sunrise size={14} color="#ffb366" />
                      <span style={{ color: '#ffb366' }}>
                        {planetTimes[planet.name]?.sunrise || '--:--'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Sunset size={14} color="#ff8c42" />
                      <span style={{ color: '#ff8c42' }}>
                        {planetTimes[planet.name]?.sunset || '--:--'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanetaryTimes;
