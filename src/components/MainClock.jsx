import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Sunrise, Sunset, Clock, Sun } from 'lucide-react';

const MainClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sunTimes, setSunTimes] = useState({
    sunrise: '6:30 AM',
    sunset: '7:45 PM'
  });

  // Use sunrise-sunset API for accurate times with better error handling
  const fetchAccurateSunTimes = async (latitude, longitude) => {
    try {
      console.log(`Fetching sun times for: ${latitude}, ${longitude}`);
      
      // Use sunrise-sunset.org API (free, no key required, CORS enabled)
      const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          timeout: 5000
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.status === 'OK' && data.results) {
        // Convert UTC times to local time
        const sunriseUTC = new Date(data.results.sunrise);
        const sunsetUTC = new Date(data.results.sunset);
        
        console.log('UTC times:', { sunrise: sunriseUTC, sunset: sunsetUTC });
        
        const formatTime = (date) => {
          return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
        };
        
        const result = {
          sunrise: formatTime(sunriseUTC),
          sunset: formatTime(sunsetUTC)
        };
        
        console.log('Formatted times:', result);
        return result;
      } else {
        throw new Error(`API returned status: ${data.status}`);
      }
    } catch (error) {
      console.error('Sunrise-sunset API failed:', error);
      
      // Enhanced fallback calculation based on location
      // Better fallback times for August in different regions
      if (latitude > 52 && latitude < 55 && longitude > 13 && longitude < 15) {
        // Berlin area in August
        return {
          sunrise: '6:05 AM',
          sunset: '8:05 PM'
        };
      } else if (latitude > 50 && latitude < 55) {
        // Northern Central Europe in August
        return {
          sunrise: '6:10 AM',
          sunset: '8:00 PM'
        };
      } else if (latitude > 45 && latitude < 50) {
        // Southern Central Europe in August
        return {
          sunrise: '6:20 AM',
          sunset: '7:50 PM'
        };
      } else if (latitude > 40 && latitude < 45) {
        // Southern Europe in August
        return {
          sunrise: '6:30 AM',
          sunset: '7:40 PM'
        };
      }
      
      // Default fallback
      return {
        sunrise: '6:30 AM',
        sunset: '7:45 PM'
      };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user's location for accurate sunrise/sunset times
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Get accurate sunrise/sunset times from API
            const accurateSunTimes = await fetchAccurateSunTimes(latitude, longitude);
            setSunTimes(accurateSunTimes);
            
            console.log(`Location: ${latitude}, ${longitude}`);
            console.log('Accurate sun times:', accurateSunTimes);
          } catch (error) {
            console.log('Error processing location:', error);
            // Fallback to default times
            setSunTimes({ sunrise: '6:30 AM', sunset: '7:45 PM' });
          }
        },
        (error) => {
          console.log('Geolocation access denied or failed:', error.message);
          // Fallback to default times
          setSunTimes({ sunrise: '6:30 AM', sunset: '7:45 PM' });
        },
        {
          timeout: 10000,
          maximumAge: 300000 // Cache position for 5 minutes
        }
      );
    } else {
      console.log('Geolocation not supported by this browser');
      setSunTimes({ sunrise: '6:30 AM', sunset: '7:45 PM' });
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
      
      {/* Enhanced Sun Position Graph */}
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
          marginBottom: '1.5rem',
          gap: '0.5rem'
        }}>
          <Sun size={20} style={{ color: '#ffa500' }} />
          <span style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            Sun Position Today
          </span>
        </div>
        
        <div style={{ 
          position: 'relative',
          height: '80px',
          background: 'linear-gradient(90deg, #1a1625 0%, #4a5568 15%, #ffa500 25%, #ffd700 50%, #ffa500 75%, #4a5568 85%, #1a1625 100%)',
          borderRadius: '40px',
          overflow: 'hidden',
          border: '3px solid rgba(255, 165, 0, 0.4)',
          boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Sky gradient overlay */}
          <div style={{
            position: 'absolute',
            left: '0%',
            right: '0%',
            top: '0',
            bottom: '0',
            background: isDaytime ? 
              'linear-gradient(90deg, rgba(0, 0, 50, 0.3) 0%, rgba(135, 206, 235, 0.2) 20%, rgba(255, 215, 0, 0.1) 40%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 215, 0, 0.1) 60%, rgba(135, 206, 235, 0.2) 80%, rgba(0, 0, 50, 0.3) 100%)' :
              'linear-gradient(90deg, rgba(0, 0, 20, 0.6) 0%, rgba(25, 25, 112, 0.4) 20%, rgba(255, 165, 0, 0.2) 40%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 165, 0, 0.2) 60%, rgba(25, 25, 112, 0.4) 80%, rgba(0, 0, 20, 0.6) 100%)',
            borderRadius: '37px'
          }} />
          
          {/* Sun disk with enhanced animation */}
          <div style={{
            position: 'absolute',
            left: `${sunPosition}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '32px',
            height: '32px',
            background: isDaytime ? 
              'radial-gradient(circle, #ffff00 0%, #ffd700 70%, #ff8c00 100%)' : 
              'radial-gradient(circle, #ffa500 0%, #ff7f50 70%, #ff4500 100%)',
            borderRadius: '50%',
            border: '4px solid rgba(255, 255, 255, 0.9)',
            boxShadow: `0 0 25px ${isDaytime ? '#ffff00' : '#ffa500'}, 0 0 50px ${isDaytime ? '#ffd700' : '#ff7f50'}`,
            animation: 'sunPulse 4s infinite ease-in-out',
            zIndex: 3
          }}>
            <Sun size={16} style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: isDaytime ? '#ff8c00' : '#ffffff',
              filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
            }} />
          </div>
          
          {/* Time markers with better styling */}
          <div style={{ 
            position: 'absolute', 
            left: '8px', 
            top: '-30px', 
            fontSize: '0.85rem', 
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '500',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            🌅 {sunTimes.sunrise}
          </div>
          <div style={{ 
            position: 'absolute', 
            right: '8px', 
            top: '-30px', 
            fontSize: '0.85rem', 
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '500',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            🌇 {sunTimes.sunset}
          </div>
          <div style={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            top: '-30px', 
            fontSize: '0.85rem', 
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 'bold',
            background: 'rgba(255, 165, 0, 0.3)',
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            ☀️ 12:00 PM
          </div>
        </div>
        
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '1rem',
          color: isDaytime ? '#ffff00' : '#ffa500',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>
            {isDaytime ? '☀️' : '🌙'}
          </span>
          <span>
            {isDaytime ? 'Daytime' : 'Nighttime'} • Sun is {sunPosition.toFixed(1)}% through its arc
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainClock;
