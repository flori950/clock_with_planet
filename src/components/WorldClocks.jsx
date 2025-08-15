import { useState, useEffect } from 'react';
import { Globe, Plus, X, Search, MapPin } from 'lucide-react';

const WorldClocks = () => {
  // Generate random starter cities from different continents
  const getRandomStarterCities = async () => {
    const majorCities = [
      // North America
      'New York', 'Los Angeles', 'Chicago', 'Toronto', 'Vancouver', 'Montreal', 'Mexico City', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington DC', 'Boston', 'Nashville', 'Baltimore', 'Louisville', 'Portland', 'Oklahoma City', 'Milwaukee', 'Las Vegas', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Kansas City', 'Mesa', 'Virginia Beach', 'Atlanta', 'Colorado Springs', 'Raleigh', 'Omaha', 'Miami', 'Oakland', 'Minneapolis', 'Tulsa', 'Cleveland', 'Wichita', 'Arlington',
      
      // Europe
      'London', 'Paris', 'Berlin', 'Madrid', 'Rome', 'Amsterdam', 'Vienna', 'Prague', 'Budapest', 'Warsaw', 'Stockholm', 'Oslo', 'Copenhagen', 'Helsinki', 'Dublin', 'Brussels', 'Zurich', 'Geneva', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dresden', 'Hannover', 'Nuremberg', 'Barcelona', 'Valencia', 'Seville', 'Bilbao', 'Milan', 'Naples', 'Turin', 'Florence', 'Bologna', 'Palermo', 'Catania', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims',
      
      // Asia
      'Tokyo', 'Beijing', 'Shanghai', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Goyang', 'Bangkok', 'Manila', 'Jakarta', 'Ho Chi Minh City', 'Hanoi', 'Kuala Lumpur', 'Singapore', 'Hong Kong', 'Macau', 'Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Taoyuan',
      
      // Middle East
      'Dubai', 'Abu Dhabi', 'Doha', 'Kuwait City', 'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Tehran', 'Isfahan', 'Mashhad', 'Karaj', 'Shiraz', 'Tabriz', 'Qom', 'Ahvaz', 'Kermanshah', 'Urmia', 'Rasht', 'Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Kayseri', 'Mersin',
      
      // Africa
      'Cairo', 'Lagos', 'Kinshasa', 'Johannesburg', 'Luanda', 'Dar es Salaam', 'Khartoum', 'Algiers', 'Nairobi', 'Casablanca', 'Addis Ababa', 'Cape Town', 'Alexandria', 'Giza', 'Abidjan', 'Kano', 'Ibadan', 'Accra', 'Dakar', 'Bamako', 'Conakry', 'Ouagadougou', 'Niamey', 'Lomé', 'Cotonou', 'Porto-Novo', 'Libreville', 'Malabo', 'Yaoundé', 'Douala',
      
      // South America
      'São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Bogotá', 'Santiago', 'Caracas', 'La Paz', 'Quito', 'Montevideo', 'Asunción', 'Georgetown', 'Paramaribo', 'Cayenne', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre', 'Belém', 'Goiânia', 'Guarulhos', 'Campinas', 'São Luís', 'Maceió', 'Duque de Caxias', 'Natal',
      
      // Oceania
      'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong', 'Hobart', 'Geelong', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba', 'Ballarat', 'Bendigo', 'Albury', 'Launceston', 'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier', 'Palmerston North', 'Dunedin', 'Rotorua', 'New Plymouth'
    ];
    const randomCities = majorCities.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    const starterCities = [];
    for (let i = 0; i < randomCities.length; i++) {
      try {
        const cityInfo = await fetchCityInfo(randomCities[i]);
        starterCities.push({
          id: i + 1,
          city: cityInfo.city,
          country: cityInfo.country,
          timezone: cityInfo.timezone,
          flag: cityInfo.flag || '🌍'
        });
      } catch {
        // Fallback if API fails
        const fallbacks = [
          { id: 1, city: 'New York', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
          { id: 2, city: 'London', country: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
          { id: 3, city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
          { id: 4, city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' }
        ];
        return fallbacks;
      }
    }
    return starterCities;
  };

  const [worldTimes, setWorldTimes] = useState([]);
  const [currentTimes, setCurrentTimes] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with random cities
  useEffect(() => {
    const initializeCities = async () => {
      try {
        const randomCities = await getRandomStarterCities();
        setWorldTimes(randomCities);
      } catch {
        // Fallback to static cities if API fails
        setWorldTimes([
          { id: 1, city: 'New York', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
          { id: 2, city: 'London', country: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
          { id: 3, city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
          { id: 4, city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' }
        ]);
      }
    };
    
    initializeCities();
  }, []);

  // Get live suggestions from geocoding API
  useEffect(() => {
    const getSuggestions = async () => {
      if (searchQuery.length >= 2) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=8&addressdetails=1&countrycodes=&extratags=1`
          );
          const data = await response.json();
          
          const formattedSuggestions = data.map((item, index) => ({
            id: `suggestion-${index}`,
            city: item.name || item.display_name.split(',')[0],
            country: item.address?.country || 'Unknown',
            region: item.address?.state || item.address?.region || item.address?.county || '',
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            display_name: item.display_name,
            flag: getCountryFlag(item.address?.country_code),
            isFromAPI: true
          }));
          
          setSuggestions(formattedSuggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(getSuggestions, 300); // Debounce API calls
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const getCountryFlag = (countryCode) => {
    if (!countryCode) return '🌍';
    
    const flagMap = {
      'us': '🇺🇸', 'gb': '🇬🇧', 'de': '🇩🇪', 'fr': '🇫🇷', 'it': '🇮🇹', 'es': '🇪🇸',
      'jp': '🇯🇵', 'cn': '🇨🇳', 'kr': '🇰🇷', 'in': '🇮🇳', 'au': '🇦🇺', 'ca': '🇨🇦',
      'br': '🇧🇷', 'mx': '🇲🇽', 'ar': '🇦🇷', 'ru': '🇷🇺', 'tr': '🇹🇷', 'eg': '🇪🇬',
      'za': '🇿🇦', 'ng': '🇳🇬', 'ke': '🇰🇪', 'ma': '🇲🇦', 'ae': '🇦🇪', 'sa': '🇸🇦',
      'ch': '🇨🇭', 'at': '🇦🇹', 'nl': '🇳🇱', 'be': '🇧🇪', 'se': '🇸🇪', 'no': '🇳🇴',
      'dk': '🇩🇰', 'fi': '🇫🇮', 'pl': '🇵🇱', 'cz': '🇨🇿', 'hu': '🇭🇺', 'ro': '🇷🇴',
      'gr': '🇬🇷', 'pt': '🇵🇹', 'ie': '🇮🇪', 'sg': '🇸🇬', 'th': '🇹🇭', 'my': '🇲🇾',
      'id': '🇮🇩', 'ph': '🇵🇭', 'vn': '🇻🇳', 'nz': '🇳🇿', 'cl': '🇨🇱', 'pe': '🇵🇪',
      'co': '🇨🇴', 've': '🇻🇪', 'ec': '🇪🇨', 'uy': '🇺🇾', 'py': '🇵🇾', 'bo': '🇧🇴'
    };
    
    return flagMap[countryCode.toLowerCase()] || '🌍';
  };

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

  const fetchCityInfo = async (cityName) => {
    try {
      // Use OpenStreetMap Nominatim API for geocoding (free, no API key needed)
      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1&addressdetails=1`
      );
      const geocodeData = await geocodeResponse.json();
      
      if (geocodeData.length === 0) {
        throw new Error('City not found');
      }
      
      const { lat, lon, display_name, address } = geocodeData[0];
      
      // Get timezone based on coordinates
      const timezone = await getTimezoneFromCoordinates(lat, lon);
      
      return {
        city: cityName,
        country: address?.country || 'Unknown',
        timezone: timezone,
        coordinates: { lat: parseFloat(lat), lon: parseFloat(lon) },
        fullName: display_name
      };
    } catch (error) {
      console.error('Error fetching city info:', error);
      throw error;
    }
  };

  const getTimezoneFromCoordinates = async (lat, lon) => {
    try {
      // Simple coordinate-based timezone estimation
      const longitude = parseFloat(lon);
      
      // Basic timezone estimation based on longitude
      // This is a simplified approach - in production you'd want a proper timezone API
      if (longitude >= -7.5 && longitude < 7.5) return 'Europe/London';
      if (longitude >= 7.5 && longitude < 22.5) return 'Europe/Berlin';
      if (longitude >= 22.5 && longitude < 37.5) return 'Europe/Helsinki';
      if (longitude >= 37.5 && longitude < 52.5) return 'Europe/Moscow';
      if (longitude >= 52.5 && longitude < 67.5) return 'Asia/Yekaterinburg';
      if (longitude >= 67.5 && longitude < 82.5) return 'Asia/Omsk';
      if (longitude >= 82.5 && longitude < 97.5) return 'Asia/Krasnoyarsk';
      if (longitude >= 97.5 && longitude < 112.5) return 'Asia/Irkutsk';
      if (longitude >= 112.5 && longitude < 127.5) return 'Asia/Yakutsk';
      if (longitude >= 127.5 && longitude < 142.5) return 'Asia/Vladivostok';
      if (longitude >= 142.5 && longitude < 157.5) return 'Asia/Magadan';
      if (longitude >= 157.5 || longitude < -157.5) return 'Pacific/Auckland';
      if (longitude >= -157.5 && longitude < -142.5) return 'Pacific/Honolulu';
      if (longitude >= -142.5 && longitude < -127.5) return 'America/Anchorage';
      if (longitude >= -127.5 && longitude < -112.5) return 'America/Los_Angeles';
      if (longitude >= -112.5 && longitude < -97.5) return 'America/Denver';
      if (longitude >= -97.5 && longitude < -82.5) return 'America/Chicago';
      if (longitude >= -82.5 && longitude < -67.5) return 'America/New_York';
      if (longitude >= -67.5 && longitude < -52.5) return 'America/Halifax';
      if (longitude >= -52.5 && longitude < -37.5) return 'America/St_Johns';
      if (longitude >= -37.5 && longitude < -22.5) return 'Atlantic/Azores';
      if (longitude >= -22.5 && longitude < -7.5) return 'Atlantic/Cape_Verde';
      
      return 'UTC'; // fallback
    } catch {
      return 'UTC';
    }
  };

  const addCity = async (suggestionData) => {
    // Check if city already exists
    const exists = worldTimes.some(wt => 
      wt.city === suggestionData.city && wt.country === suggestionData.country
    );
    
    if (!exists) {
      try {
        setIsLoading(true);
        
        // Get timezone from coordinates
        const timezone = await getTimezoneFromCoordinates(suggestionData.lat, suggestionData.lon);
        
        const newId = Math.max(...worldTimes.map(wt => wt.id), 0) + 1;
        setWorldTimes([...worldTimes, { 
          id: newId, 
          city: suggestionData.city,
          country: suggestionData.country,
          timezone: timezone,
          flag: suggestionData.flag || '🌍'
        }]);
        
        setShowAddForm(false);
        setSearchQuery('');
        setShowSuggestions(false);
        
      } catch {
        alert(`Sorry, couldn't determine timezone for "${suggestionData.city}". Please try again.`);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert(`${suggestionData.city} is already in your world clocks!`);
    }
  };

  const removeCity = (id) => {
    setWorldTimes(worldTimes.filter(wt => wt.id !== id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    addCity(suggestion);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setSearchQuery('');
    setShowSuggestions(false);
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
        <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Single Search Interface */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ 
                position: 'absolute', 
                left: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.7)',
                zIndex: 2
              }} />
              <input
                type="text"
                placeholder="Type any city name... (e.g., Paris, Berlin, Melbourne)"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(0, 191, 255, 0.3)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              />

              {/* Auto-suggestions dropdown */}
              {showSuggestions && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  maxHeight: '300px',
                  overflowY: 'auto',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(0, 191, 255, 0.3)',
                  borderRadius: '12px',
                  marginTop: '0.5rem',
                  zIndex: 10,
                  backdropFilter: 'blur(10px)'
                }}>
                  {isLoading ? (
                    <div style={{ 
                      padding: '1rem', 
                      textAlign: 'center', 
                      color: 'rgba(255, 255, 255, 0.7)' 
                    }}>
                      🔍 Searching worldwide...
                    </div>
                  ) : suggestions.length === 0 ? (
                    <div style={{ 
                      padding: '1rem', 
                      textAlign: 'center', 
                      color: 'rgba(255, 255, 255, 0.7)' 
                    }}>
                      No cities found. Try a different search term.
                    </div>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={`${suggestion.city}-${suggestion.country}-${index}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          borderBottom: index < suggestions.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                          transition: 'all 0.2s ease',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 191, 255, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>{suggestion.flag}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontWeight: 'bold', 
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            {suggestion.city}
                          </div>
                          <div style={{ 
                            fontSize: '0.8rem', 
                            color: 'rgba(255, 255, 255, 0.7)' 
                          }}>
                            {suggestion.country}{suggestion.region ? ` • ${suggestion.region}` : ''}
                          </div>
                        </div>
                        <MapPin size={14} style={{ color: 'rgba(0, 191, 255, 0.7)' }} />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Help text */}
            <div style={{ 
              fontSize: '0.8rem', 
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              lineHeight: '1.4'
            }}>
              🌍 All suggestions come from live worldwide data! Start typing any city name to see real locations with their countries and regions.
            </div>

            <button
              onClick={closeAddForm}
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
