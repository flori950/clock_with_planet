import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Sunrise, Sunset, Clock, Sun } from 'lucide-react';

const MainClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sunTimes, setSunTimes] = useState({
    sunrise: '6:30 AM',
    sunset: '7:45 PM'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set default sunrise/sunset times that work well for most locations
    const setDefaultSunTimes = () => {
      setSunTimes({
        sunrise: '6:30 AM',
        sunset: '7:45 PM'
      });
    };

    // Try to get user's location for sunrise/sunset times
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // You can integrate with a sunrise/sunset API here
            // For now, we'll use location-based mock data
            console.log(`Location: ${latitude}, ${longitude}`);
            
            // Set times based on general latitude (more realistic defaults)
            if (latitude > 40) {
              setSunTimes({ sunrise: '6:15 AM', sunset: '8:00 PM' }); // Northern regions
            } else if (latitude < 25) {
              setSunTimes({ sunrise: '6:45 AM', sunset: '7:30 PM' }); // Southern regions
            } else {
              setSunTimes({ sunrise: '6:30 AM', sunset: '7:45 PM' }); // Mid-latitudes
            }
          } catch (error) {
            console.log('Error processing location:', error);
            setDefaultSunTimes();
          }
        },
        (error) => {
          console.log('Geolocation access denied or failed:', error.message);
          setDefaultSunTimes();
        }
      );
    } else {
      console.log('Geolocation not supported by this browser');
      setDefaultSunTimes();
    }

    return () => clearInterval(timer);
  }, []);

  // Calculate sun position for the graph
  const getSunPosition = () => {
    const now = new Date();
    
    try {
      // Parse sunrise/sunset times more robustly
      const parseSunTime = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        const [hour, minute] = time.split(':').map(Number);
        
        let hour24 = hour;
        if (period === 'PM' && hour !== 12) hour24 += 12;
        if (period === 'AM' && hour === 12) hour24 = 0;
        
        const date = new Date();
        date.setHours(hour24, minute, 0, 0);
        return date;
      };

      const sunriseTime = parseSunTime(sunTimes.sunrise);
      const sunsetTime = parseSunTime(sunTimes.sunset);

      // Handle case where sunset is next day
      if (sunsetTime < sunriseTime) {
        sunsetTime.setDate(sunsetTime.getDate() + 1);
      }

      const totalDaylight = sunsetTime - sunriseTime;
      const currentProgress = now - sunriseTime;
      
      let position = (currentProgress / totalDaylight) * 100;
      
      // Clamp position between 0 and 100
      position = Math.max(0, Math.min(100, position));
      
      const isDaytime = now >= sunriseTime && now <= sunsetTime;
      
      return { position, isDaytime };
    } catch (error) {
      console.log('Error calculating sun position:', error);
      // Return safe defaults
      const hour = now.getHours();
      const isDaytime = hour >= 6 && hour < 20;
      const position = isDaytime ? ((hour - 6) / 14) * 100 : 0;
      return { position: Math.max(0, Math.min(100, position)), isDaytime };
    }
  };

  const { position: sunPosition, isDaytime } = getSunPosition();

  return (
    <div className="glass-card main-clock">
      <div className="card-header">
        <h2 className="card-title">
          <Clock className="card-icon" size={24} />
          Earth Time
        </h2>
      </div>
      
      <div className="clock-time">
        {format(currentTime, 'HH:mm:ss')}
      </div>
      
      <div className="clock-date">
        {format(currentTime, 'EEEE, MMMM do, yyyy')}
      </div>
      
      <div className="clock-timezone">
        {Intl.DateTimeFormat().resolvedOptions().timeZone}
      </div>
      
      <div className="sun-times">
        <div className="sun-time">
          <Sunrise className="sun-icon" size={32} />
          <div className="sun-time-text">{sunTimes.sunrise}</div>
          <div className="sun-time-label">Sunrise</div>
        </div>
        
        <div className="sun-time">
          <Sunset className="sun-icon" size={32} />
          <div className="sun-time-text">{sunTimes.sunset}</div>
          <div className="sun-time-label">Sunset</div>
        </div>
      </div>
      
      {/* Sun Position Graph */}
      <div style={{ 
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'rgba(255, 165, 0, 0.1)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 165, 0, 0.2)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '1rem',
          gap: '0.5rem'
        }}>
          <Sun size={20} style={{ color: '#ffa500' }} />
          <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1rem' }}>
            Sun Position Today
          </span>
        </div>
        
        <div style={{ 
          position: 'relative',
          height: '60px',
          background: 'linear-gradient(90deg, #1a1625 0%, #ffa500 20%, #ffd700 50%, #ffa500 80%, #1a1625 100%)',
          borderRadius: '30px',
          overflow: 'hidden',
          border: '2px solid rgba(255, 165, 0, 0.3)'
        }}>
          {/* Daylight area */}
          <div style={{
            position: 'absolute',
            left: '0%',
            right: '0%',
            top: '0',
            bottom: '0',
            background: isDaytime ? 
              'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.3) 20%, rgba(255, 215, 0, 0.5) 50%, rgba(255, 215, 0, 0.3) 80%, transparent 100%)' :
              'linear-gradient(90deg, rgba(0, 0, 50, 0.5) 0%, rgba(255, 165, 0, 0.2) 20%, rgba(255, 215, 0, 0.3) 50%, rgba(255, 165, 0, 0.2) 80%, rgba(0, 0, 50, 0.5) 100%)',
            borderRadius: '28px'
          }} />
          
          {/* Current sun position */}
          <div style={{
            position: 'absolute',
            left: `${sunPosition}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24px',
            height: '24px',
            background: isDaytime ? '#ffff00' : '#ffa500',
            borderRadius: '50%',
            border: '3px solid rgba(255, 255, 255, 0.8)',
            boxShadow: `0 0 20px ${isDaytime ? '#ffff00' : '#ffa500'}`,
            animation: 'pulse 3s infinite ease-in-out',
            zIndex: 2
          }}>
            <Sun size={12} style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: isDaytime ? '#ff8c00' : '#fff'
            }} />
          </div>
          
          {/* Time markers */}
          <div style={{ position: 'absolute', left: '0%', top: '-25px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            {sunTimes.sunrise}
          </div>
          <div style={{ position: 'absolute', right: '0%', top: '-25px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            {sunTimes.sunset}
          </div>
          <div style={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            top: '-25px', 
            fontSize: '0.8rem', 
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 'bold'
          }}>
            12:00 PM
          </div>
        </div>
        
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: isDaytime ? '#ffff00' : '#ffa500'
        }}>
          {isDaytime ? '☀️ Daytime' : '🌙 Nighttime'} • Sun is {sunPosition.toFixed(1)}% through its arc
        </div>
      </div>
    </div>
  );
};

export default MainClock;
