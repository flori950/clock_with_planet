import { useState, useEffect } from 'react';
import { Globe, Plus, X } from 'lucide-react';

const WorldClocks = () => {
  const [worldTimes, setWorldTimes] = useState([
    { id: 1, city: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
    { id: 2, city: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
    { id: 3, city: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { id: 4, city: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  ]);
  
  const [currentTimes, setCurrentTimes] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCity, setNewCity] = useState({ city: '', timezone: '', flag: '' });

  const timezones = [
    { label: 'New York', value: 'America/New_York', flag: '🇺🇸' },
    { label: 'Los Angeles', value: 'America/Los_Angeles', flag: '🇺🇸' },
    { label: 'London', value: 'Europe/London', flag: '🇬🇧' },
    { label: 'Paris', value: 'Europe/Paris', flag: '🇫🇷' },
    { label: 'Berlin', value: 'Europe/Berlin', flag: '🇩🇪' },
    { label: 'Moscow', value: 'Europe/Moscow', flag: '🇷🇺' },
    { label: 'Dubai', value: 'Asia/Dubai', flag: '🇦🇪' },
    { label: 'Mumbai', value: 'Asia/Kolkata', flag: '🇮🇳' },
    { label: 'Tokyo', value: 'Asia/Tokyo', flag: '🇯🇵' },
    { label: 'Shanghai', value: 'Asia/Shanghai', flag: '🇨🇳' },
    { label: 'Sydney', value: 'Australia/Sydney', flag: '🇦🇺' },
    { label: 'Auckland', value: 'Pacific/Auckland', flag: '🇳🇿' },
  ];

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

  const addCity = () => {
    if (newCity.city && newCity.timezone) {
      const newId = Math.max(...worldTimes.map(wt => wt.id), 0) + 1;
      setWorldTimes([...worldTimes, { 
        id: newId, 
        city: newCity.city, 
        timezone: newCity.timezone,
        flag: newCity.flag 
      }]);
      setNewCity({ city: '', timezone: '', flag: '' });
      setShowAddForm(false);
    }
  };

  const removeCity = (id) => {
    setWorldTimes(worldTimes.filter(wt => wt.id !== id));
  };

  const handleTimezoneSelect = (timezone) => {
    const selected = timezones.find(tz => tz.value === timezone);
    if (selected) {
      setNewCity({
        city: selected.label,
        timezone: selected.value,
        flag: selected.flag
      });
    }
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
            <select
              value={newCity.timezone}
              onChange={(e) => handleTimezoneSelect(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                padding: '0.8rem',
                color: 'white',
                fontSize: '1rem'
              }}
            >
              <option value="">Select a city...</option>
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value} style={{ color: 'black' }}>
                  {tz.flag} {tz.label}
                </option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="control-btn" onClick={addCity}>
                Add
              </button>
              <button 
                className="control-btn" 
                onClick={() => setShowAddForm(false)}
                style={{ background: 'rgba(255, 0, 0, 0.2)', borderColor: 'rgba(255, 0, 0, 0.4)' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="world-clocks">
        {worldTimes.map((worldTime) => (
          <div key={worldTime.id} className="world-clock glass-card" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div className="world-clock-city">
                {worldTime.flag} {worldTime.city}
              </div>
              {worldTimes.length > 1 && (
                <button
                  onClick={() => removeCity(worldTime.id)}
                  className="delete-city-btn"
                  title="Remove city"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="world-clock-time">
              {currentTimes[worldTime.id]?.time || '--:--:--'}
            </div>
            <div className="world-clock-date">
              {currentTimes[worldTime.id]?.date || '---'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClocks;
