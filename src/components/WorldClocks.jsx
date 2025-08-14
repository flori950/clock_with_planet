import { useState, useEffect } from 'react';
import { Globe, Plus, X, Search, MapPin } from 'lucide-react';
import { worldCities, searchCities, getRegions } from '../data/worldCities';

const WorldClocks = () => {
  const [worldTimes, setWorldTimes] = useState([
    { id: 1, city: 'New York', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
    { id: 2, city: 'London', country: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
    { id: 3, city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { id: 4, city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  ]);
  
  const [currentTimes, setCurrentTimes] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [filteredCities, setFilteredCities] = useState(worldCities);

  // Filter cities based on search and region
  useEffect(() => {
    let cities = searchCities(searchQuery);
    if (selectedRegion !== 'all') {
      cities = cities.filter(city => city.region === selectedRegion);
    }
    setFilteredCities(cities.slice(0, 50)); // Limit to 50 results for performance
  }, [searchQuery, selectedRegion]);

  useEffect(() => {
    const updateTimes = () => {
      const times = {};
      worldTimes.forEach(({ id, timezone }) => {
        try {
          const time = new Date().toLocaleString('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          const date = new Date().toLocaleString('en-US', {
            timeZone: timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });
          times[id] = { time, date };
        } catch {
          times[id] = { time: '--:--:--', date: 'Invalid timezone' };
        }
      });
      setCurrentTimes(times);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, [worldTimes]);

  const addCity = (cityData) => {
    // Check if city already exists
    const exists = worldTimes.some(wt => 
      wt.city === cityData.city && wt.country === cityData.country
    );
    
    if (!exists) {
      const newId = Math.max(...worldTimes.map(wt => wt.id), 0) + 1;
      setWorldTimes([...worldTimes, { 
        id: newId, 
        city: cityData.city,
        country: cityData.country,
        timezone: cityData.timezone,
        flag: cityData.flag 
      }]);
      setShowAddForm(false);
      setSearchQuery('');
      setSelectedRegion('all');
    }
  };

  const removeCity = (id) => {
    setWorldTimes(worldTimes.filter(wt => wt.id !== id));
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <Globe className="card-icon" size={24} />
          World Clocks
        </h2>
        <button 
          className="control-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} />
          Add City
        </button>
      </div>

      {showAddForm && (
        <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} style={{ 
                  position: 'absolute', 
                  left: '10px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.7)'
                }} />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.5rem 0.5rem 2.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '0.9rem',
                  minWidth: '150px'
                }}
              >
                <option value="all">All Regions</option>
                {getRegions().map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div style={{ 
              maxHeight: '300px', 
              overflowY: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }}>
              {filteredCities.length === 0 ? (
                <div style={{ 
                  padding: '1rem', 
                  textAlign: 'center', 
                  color: 'rgba(255, 255, 255, 0.7)' 
                }}>
                  No cities found
                </div>
              ) : (
                filteredCities.map((city, index) => (
                  <div
                    key={`${city.city}-${city.country}`}
                    onClick={() => addCity(city)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      cursor: 'pointer',
                      borderBottom: index < filteredCities.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{city.flag}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: 'white' }}>
                        {city.city}
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: 'rgba(255, 255, 255, 0.7)' 
                      }}>
                        {city.country} • {city.region}
                      </div>
                    </div>
                    <MapPin size={14} style={{ color: 'rgba(0, 191, 255, 0.7)' }} />
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setShowAddForm(false)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="world-clocks-grid">
        {worldTimes.map(({ id, city, country, flag }) => (
          <div key={id} className="clock-card">
            <div className="clock-header">
              <div className="clock-location">
                <span className="flag">{flag}</span>
                <div>
                  <div className="city-name">{city}</div>
                  <div className="country-name">{country}</div>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeCity(id)}
                title="Remove city"
              >
                <X size={14} />
              </button>
            </div>
            <div className="clock-time">
              {currentTimes[id]?.time || '--:--:--'}
            </div>
            <div className="clock-date">
              {currentTimes[id]?.date || 'Loading...'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClocks;
