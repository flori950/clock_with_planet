import { useState, useEffect, useCallback } from 'react';
import { Globe, Plus, X, Search, MapPin, Sunrise, Sunset } from 'lucide-react';

const WorldClocks = () => {
  const [worldTimes, setWorldTimes] = useState([]);
  const [currentTimes, setCurrentTimes] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simple but reliable sunrise/sunset calculation for August
  const calculateSunTimes = useCallback((lat) => {
    const latitude = parseFloat(lat);
    
    // Simple estimation for August (no async, reliable)
    let sunriseHour = 6;
    let sunsetHour = 20;
    
    // Adjust based on latitude for August
    if (latitude > 60) { // Arctic
      sunriseHour = 4.5;
      sunsetHour = 21.5;
    } else if (latitude > 52) { // Northern Europe (Berlin area)
      sunriseHour = 6.0;
      sunsetHour = 20.1;
    } else if (latitude > 45) { // Central Europe
      sunriseHour = 6.2;
      sunsetHour = 19.8;
    } else if (latitude > 30) { // Southern Europe
      sunriseHour = 6.5;
      sunsetHour = 19.5;
    } else if (latitude > 0) { // Tropical
      sunriseHour = 6.3;
      sunsetHour = 19.2;
    } else { // Southern Hemisphere (winter)
      sunriseHour = 7.2;
      sunsetHour = 17.8;
    }
    
    const formatHour = (hour) => {
      const h = Math.floor(hour);
      const m = Math.floor((hour - h) * 60);
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };
    
    return {
      sunrise: formatHour(sunriseHour),
      sunset: formatHour(sunsetHour)
    };
  }, []);

  const getCountryFlag = useCallback((countryCode) => {
    if (!countryCode) return <Globe size={16} color="#8a2be2" />;
    
    // Return flag emoji for now, but we could replace with SVG icons
    const flagMap = {
  'ad': '🇦🇩', 'ae': '🇦🇪', 'af': '🇦🇫', 'ag': '🇦🇬', 'ai': '🇦🇮', 'al': '🇦🇱', 'am': '🇦🇲', 'ao': '🇦🇴', 'aq': '🇦🇶', 'ar': '🇦🇷', 'as': '🇦🇸', 'at': '🇦🇹', 'au': '🇦🇺', 'aw': '🇦🇼', 'ax': '🇦🇽', 'az': '🇦🇿',
  'ba': '🇧🇦', 'bb': '🇧🇧', 'bd': '🇧🇩', 'be': '🇧🇪', 'bf': '🇧🇫', 'bg': '🇧🇬', 'bh': '🇧🇭', 'bi': '🇧🇮', 'bj': '🇧🇯', 'bl': '🇧🇱', 'bm': '🇧🇲', 'bn': '🇧🇳', 'bo': '🇧🇴', 'bq': '🇧🇶', 'br': '🇧🇷', 'bs': '🇧🇸', 'bt': '🇧🇹', 'bv': '🇧🇻', 'bw': '🇧🇼', 'by': '🇧🇾', 'bz': '🇧🇿',
  'ca': '🇨🇦', 'cc': '🇨🇨', 'cd': '🇨🇩', 'cf': '🇨🇫', 'cg': '🇨🇬', 'ch': '🇨🇭', 'ci': '🇨🇮', 'ck': '🇨🇰', 'cl': '🇨🇱', 'cm': '🇨🇲', 'cn': '🇨🇳', 'co': '🇨🇴', 'cr': '🇨🇷', 'cu': '🇨🇺', 'cv': '🇨🇻', 'cw': '🇨🇼', 'cx': '🇨🇽', 'cy': '🇨🇾', 'cz': '🇨🇿',
  'de': '🇩🇪', 'dj': '🇩🇯', 'dk': '🇩🇰', 'dm': '🇩🇲', 'do': '🇩🇴', 'dz': '🇩🇿',
  'ec': '🇪🇨', 'ee': '🇪🇪', 'eg': '🇪🇬', 'eh': '🇪🇭', 'er': '🇪🇷', 'es': '🇪🇸', 'et': '🇪🇹',
  'fi': '🇫🇮', 'fj': '🇫🇯', 'fk': '🇫🇰', 'fm': '🇫🇲', 'fo': '🇫🇴', 'fr': '🇫🇷',
  'ga': '🇬🇦', 'gb': '🇬🇧', 'gd': '🇬🇩', 'ge': '🇬🇪', 'gf': '🇬🇫', 'gg': '🇬🇬', 'gh': '🇬🇭', 'gi': '🇬🇮', 'gl': '🇬🇱', 'gm': '🇬🇲', 'gn': '🇬🇳', 'gp': '🇬🇵', 'gq': '🇬🇶', 'gr': '🇬🇷', 'gs': '🇬🇸', 'gt': '🇬🇹', 'gu': '🇬🇺', 'gw': '🇬🇼', 'gy': '🇬🇾',
  'hk': '🇭🇰', 'hm': '🇭🇲', 'hn': '🇭🇳', 'hr': '🇭🇷', 'ht': '🇭🇹', 'hu': '🇭🇺',
  'id': '🇮🇩', 'ie': '🇮🇪', 'il': '🇮🇱', 'im': '🇮🇲', 'in': '🇮🇳', 'io': '🇮🇴', 'iq': '🇮🇶', 'ir': '🇮🇷', 'is': '🇮🇸', 'it': '🇮🇹',
  'je': '🇯🇪', 'jm': '🇯🇲', 'jo': '🇯🇴', 'jp': '🇯🇵',
  'ke': '🇰🇪', 'kg': '🇰🇬', 'kh': '🇰🇭', 'ki': '🇰🇮', 'km': '🇰🇲', 'kn': '🇰🇳', 'kp': '🇰🇵', 'kr': '🇰🇷', 'kw': '🇰🇼', 'ky': '🇰🇾', 'kz': '🇰🇿',
  'la': '🇱🇦', 'lb': '🇱🇧', 'lc': '🇱🇨', 'li': '🇱🇮', 'lk': '🇱🇰', 'lr': '🇱🇷', 'ls': '🇱🇸', 'lt': '🇱🇹', 'lu': '🇱🇺', 'lv': '🇱🇻', 'ly': '🇱🇾',
  'ma': '🇲🇦', 'mc': '🇲🇨', 'md': '🇲🇩', 'me': '🇲🇪', 'mf': '🇲🇫', 'mg': '🇲🇬', 'mh': '🇲🇭', 'mk': '🇲🇰', 'ml': '🇲🇱', 'mm': '🇲🇲', 'mn': '🇲🇳', 'mo': '🇲🇴', 'mp': '🇲🇵', 'mq': '🇲🇶', 'mr': '🇲🇷', 'ms': '🇲🇸', 'mt': '🇲🇹', 'mu': '🇲🇺', 'mv': '🇲🇻', 'mw': '🇲🇼', 'mx': '🇲🇽', 'my': '🇲🇾', 'mz': '🇲🇿',
  'na': '🇳🇦', 'nc': '🇳🇨', 'ne': '🇳🇪', 'nf': '🇳🇫', 'ng': '🇳🇬', 'ni': '🇳🇮', 'nl': '🇳🇱', 'no': '🇳🇴', 'np': '🇳🇵', 'nr': '🇳🇷', 'nu': '🇳🇺', 'nz': '🇳🇿',
  'om': '🇴🇲',
  'pa': '🇵🇦', 'pe': '🇵🇪', 'pf': '🇵🇫', 'pg': '🇵🇬', 'ph': '🇵🇭', 'pk': '🇵🇰', 'pl': '🇵🇱', 'pm': '🇵🇲', 'pn': '🇵🇳', 'pr': '🇵🇷', 'ps': '🇵🇸', 'pt': '🇵🇹', 'pw': '🇵🇼', 'py': '🇵🇾',
  'qa': '🇶🇦',
  're': '🇷🇪', 'ro': '🇷🇴', 'rs': '🇷🇸', 'ru': '🇷🇺', 'rw': '🇷🇼',
  'sa': '🇸🇦', 'sb': '🇸🇧', 'sc': '🇸🇨', 'sd': '🇸🇩', 'se': '🇸🇪', 'sg': '🇸🇬', 'sh': '🇸🇭', 'si': '🇸🇮', 'sj': '🇸🇯', 'sk': '🇸🇰', 'sl': '🇸🇱', 'sm': '🇸🇲', 'sn': '🇸🇳', 'so': '🇸🇴', 'sr': '🇸🇷', 'ss': '🇸🇸', 'st': '🇸🇹', 'sv': '🇸🇻', 'sx': '🇸🇽', 'sy': '🇸🇾', 'sz': '🇸🇿',
  'tc': '🇹🇨', 'td': '🇹🇩', 'tf': '🇹🇫', 'tg': '🇹🇬', 'th': '🇹🇭', 'tj': '🇹🇯', 'tk': '🇹🇰', 'tl': '🇹🇱', 'tm': '🇹🇲', 'tn': '🇹🇳', 'to': '🇹🇴', 'tr': '🇹🇷', 'tt': '🇹🇹', 'tv': '🇹🇻', 'tw': '🇹🇼', 'tz': '🇹🇿',
  'ua': '🇺🇦', 'ug': '🇺🇬', 'um': '🇺🇲', 'us': '🇺🇸', 'uy': '🇺🇾', 'uz': '🇺🇿',
  'va': '🇻🇦', 'vc': '🇻🇨', 've': '🇻🇪', 'vg': '🇻🇬', 'vi': '🇻🇮', 'vn': '🇻🇳', 'vu': '🇻🇺',
  'wf': '🇼🇫', 'ws': '🇼🇸',
  'ye': '🇾🇪', 'yt': '🇾🇹',
  'za': '🇿🇦', 'zm': '🇿🇲', 'zw': '🇿🇼'
    };
    
    return flagMap[countryCode.toLowerCase()] || <Globe size={16} color="#8a2be2" />;
  }, []);

  const getTimezoneFromCoordinates = useCallback(async (lat, lon) => {
    // Use coordinate-based timezone estimation (no API calls to avoid CORS)
    const longitude = parseFloat(lon);
    const latitude = parseFloat(lat);
    
    // Enhanced timezone mapping based on coordinates
    try {
      // Europe
      if (latitude > 35 && latitude < 70) {
        if (longitude >= -10 && longitude < 10) return 'Europe/London';
        if (longitude >= 10 && longitude < 25) return 'Europe/Berlin';
        if (longitude >= 25 && longitude < 45) return 'Europe/Helsinki';
        if (longitude >= 45 && longitude < 65) return 'Europe/Moscow';
      }
      
      // Asia
      if (latitude > 10 && latitude < 60) {
        if (longitude >= 65 && longitude < 85) return 'Asia/Yekaterinburg';
        if (longitude >= 85 && longitude < 105) return 'Asia/Krasnoyarsk';
        if (longitude >= 105 && longitude < 125) return 'Asia/Shanghai';
        if (longitude >= 125 && longitude < 145) return 'Asia/Tokyo';
      }
      
      // North America
      if (latitude > 25 && latitude < 70) {
        if (longitude >= -170 && longitude < -140) return 'America/Anchorage';
        if (longitude >= -140 && longitude < -120) return 'America/Los_Angeles';
        if (longitude >= -120 && longitude < -105) return 'America/Denver';
        if (longitude >= -105 && longitude < -85) return 'America/Chicago';
        if (longitude >= -85 && longitude < -65) return 'America/New_York';
      }
      
      // Australia/Oceania
      if (latitude < -10 && latitude > -50) {
        if (longitude >= 110 && longitude < 140) return 'Australia/Perth';
        if (longitude >= 140 && longitude < 160) return 'Australia/Sydney';
        if (longitude >= 160 && longitude < -160) return 'Pacific/Auckland';
      }
      
      // Basic longitude-based fallback
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
      if (longitude >= 157.5 && longitude < 172.5) return 'Asia/Kamchatka';
      if (longitude >= 172.5 || longitude < -157.5) return 'Pacific/Auckland';
      if (longitude >= -157.5 && longitude < -142.5) return 'Pacific/Honolulu';
      if (longitude >= -142.5 && longitude < -127.5) return 'America/Anchorage';
      if (longitude >= -127.5 && longitude < -112.5) return 'America/Los_Angeles';
      if (longitude >= -112.5 && longitude < -97.5) return 'America/Denver';
      if (longitude >= -97.5 && longitude < -82.5) return 'America/Chicago';
      if (longitude >= -82.5 && longitude < -67.5) return 'America/New_York';
      if (longitude >= -67.5 && longitude < -52.5) return 'America/Halifax';
      if (longitude >= -52.5 && longitude < -37.5) return 'Atlantic/Azores';
      if (longitude >= -37.5 && longitude < -22.5) return 'Atlantic/Azores';
      if (longitude >= -22.5 && longitude < -7.5) return 'Atlantic/Cape_Verde';
      
      return 'UTC';
    } catch (error) {
      console.error('Error determining timezone:', error);
      return 'UTC';
    }
  }, []);

  const fetchCityInfo = useCallback(async (cityName) => {
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
        fullName: display_name,
        flag: getCountryFlag(address?.country_code)
      };
    } catch (error) {
      console.error('Error fetching city info:', error);
      throw error;
    }
  }, [getTimezoneFromCoordinates, getCountryFlag]);

  // Generate random starter cities from different continents
  const getRandomStarterCities = useCallback(async () => {
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
          flag: cityInfo.flag || '🌍',
          coordinates: cityInfo.coordinates
        });
      } catch {
        // Fallback if API fails
        const fallbacks = [
          { id: 1, city: 'New York', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸', coordinates: { lat: 40.7128, lon: -74.0060 } },
          { id: 2, city: 'London', country: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧', coordinates: { lat: 51.5074, lon: -0.1278 } },
          { id: 3, city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵', coordinates: { lat: 35.6762, lon: 139.6503 } },
          { id: 4, city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺', coordinates: { lat: -33.8688, lon: 151.2093 } }
        ];
        return fallbacks;
      }
    }
    return starterCities;
  }, [fetchCityInfo]);

  // Initialize with random cities
  useEffect(() => {
    const initializeCities = async () => {
      try {
        const randomCities = await getRandomStarterCities();
        setWorldTimes(randomCities);
      } catch {
        // Fallback to static cities if API fails
        setWorldTimes([
          { id: 1, city: 'New York', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸', coordinates: { lat: 40.7128, lon: -74.0060 } },
          { id: 2, city: 'London', country: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧', coordinates: { lat: 51.5074, lon: -0.1278 } },
          { id: 3, city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵', coordinates: { lat: 35.6762, lon: 139.6503 } },
          { id: 4, city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺', coordinates: { lat: -33.8688, lon: 151.2093 } }
        ]);
      }
    };
    
    initializeCities();
  }, [getRandomStarterCities]);

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
  }, [searchQuery, getCountryFlag]);

  useEffect(() => {
    const updateTimes = () => {
      const times = {};
      worldTimes.forEach(({ id, timezone, coordinates }) => {
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
          
          // Calculate sunrise/sunset if coordinates are available
          let sunTimes = { sunrise: '--:--', sunset: '--:--' };
          if (coordinates && coordinates.lat) {
            sunTimes = calculateSunTimes(coordinates.lat);
          }
          
          times[id] = { time, date, ...sunTimes };
        } catch {
          times[id] = { time: '--:--:--', date: 'Invalid timezone', sunrise: '--:--', sunset: '--:--' };
        }
      });
      setCurrentTimes(times);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, [worldTimes, calculateSunTimes]);

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
          flag: suggestionData.flag || '🌍',
          coordinates: { lat: suggestionData.lat, lon: suggestionData.lon }
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
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-button"
          aria-label="Add city"
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
              placeholder="Search cities worldwide..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowSuggestions(true)}
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
              onClick={closeAddForm}
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

          {/* Auto-suggestions dropdown */}
          {showSuggestions && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxHeight: '200px',
              overflowY: 'auto'
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
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '5px',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.25rem',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                  >
                    <span style={{ marginRight: '0.5rem' }}>{suggestion.flag}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{suggestion.city}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                        {suggestion.country}{suggestion.region ? ` • ${suggestion.region}` : ''}
                      </div>
                    </div>
                    <MapPin size={12} style={{ color: 'rgba(138, 43, 226, 0.7)' }} />
                  </div>
                ))
              )}
            </div>
          )}
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
            
            {/* Sunrise/Sunset Information */}
            <div className="sun-times" style={{
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
                  {currentTimes[id]?.sunrise || '--:--'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Sunset size={14} color="#ff8c42" />
                <span style={{ color: '#ff8c42' }}>
                  {currentTimes[id]?.sunset || '--:--'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClocks;
