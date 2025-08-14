// Comprehensive world cities database with timezones
export const worldCities = [
  // North America
  { city: 'New York', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸', region: 'North America' },
  { city: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles', flag: '🇺🇸', region: 'North America' },
  { city: 'Chicago', country: 'United States', timezone: 'America/Chicago', flag: '🇺🇸', region: 'North America' },
  { city: 'Miami', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸', region: 'North America' },
  { city: 'San Francisco', country: 'United States', timezone: 'America/Los_Angeles', flag: '🇺🇸', region: 'North America' },
  { city: 'Las Vegas', country: 'United States', timezone: 'America/Los_Angeles', flag: '🇺🇸', region: 'North America' },
  { city: 'Seattle', country: 'United States', timezone: 'America/Los_Angeles', flag: '🇺🇸', region: 'North America' },
  { city: 'Boston', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸', region: 'North America' },
  { city: 'Toronto', country: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦', region: 'North America' },
  { city: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', flag: '🇨🇦', region: 'North America' },
  { city: 'Montreal', country: 'Canada', timezone: 'America/Montreal', flag: '🇨🇦', region: 'North America' },
  { city: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', flag: '🇲🇽', region: 'North America' },

  // Europe
  { city: 'London', country: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧', region: 'Europe' },
  { city: 'Paris', country: 'France', timezone: 'Europe/Paris', flag: '🇫🇷', region: 'Europe' },
  { city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪', region: 'Europe' },
  { city: 'Rome', country: 'Italy', timezone: 'Europe/Rome', flag: '🇮🇹', region: 'Europe' },
  { city: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', flag: '🇪🇸', region: 'Europe' },
  { city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', flag: '🇳🇱', region: 'Europe' },
  { city: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna', flag: '🇦🇹', region: 'Europe' },
  { city: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', flag: '🇨🇭', region: 'Europe' },
  { city: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm', flag: '🇸🇪', region: 'Europe' },
  { city: 'Copenhagen', country: 'Denmark', timezone: 'Europe/Copenhagen', flag: '🇩🇰', region: 'Europe' },
  { city: 'Helsinki', country: 'Finland', timezone: 'Europe/Helsinki', flag: '🇫🇮', region: 'Europe' },
  { city: 'Oslo', country: 'Norway', timezone: 'Europe/Oslo', flag: '🇳🇴', region: 'Europe' },
  { city: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', flag: '🇷🇺', region: 'Europe' },
  { city: 'Prague', country: 'Czech Republic', timezone: 'Europe/Prague', flag: '🇨🇿', region: 'Europe' },
  { city: 'Warsaw', country: 'Poland', timezone: 'Europe/Warsaw', flag: '🇵🇱', region: 'Europe' },
  { city: 'Budapest', country: 'Hungary', timezone: 'Europe/Budapest', flag: '🇭🇺', region: 'Europe' },
  { city: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon', flag: '🇵🇹', region: 'Europe' },
  { city: 'Athens', country: 'Greece', timezone: 'Europe/Athens', flag: '🇬🇷', region: 'Europe' },
  { city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', flag: '🇹🇷', region: 'Europe' },

  // Asia
  { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵', region: 'Asia' },
  { city: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳', region: 'Asia' },
  { city: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳', region: 'Asia' },
  { city: 'Hong Kong', country: 'Hong Kong', timezone: 'Asia/Hong_Kong', flag: '🇭🇰', region: 'Asia' },
  { city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬', region: 'Asia' },
  { city: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', flag: '🇰🇷', region: 'Asia' },
  { city: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳', region: 'Asia' },
  { city: 'New Delhi', country: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳', region: 'Asia' },
  { city: 'Bangalore', country: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳', region: 'Asia' },
  { city: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', flag: '🇦🇪', region: 'Asia' },
  { city: 'Doha', country: 'Qatar', timezone: 'Asia/Qatar', flag: '🇶🇦', region: 'Asia' },
  { city: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', flag: '🇸🇦', region: 'Asia' },
  { city: 'Tel Aviv', country: 'Israel', timezone: 'Asia/Jerusalem', flag: '🇮🇱', region: 'Asia' },
  { city: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', flag: '🇹🇭', region: 'Asia' },
  { city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾', region: 'Asia' },
  { city: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', flag: '🇮🇩', region: 'Asia' },
  { city: 'Manila', country: 'Philippines', timezone: 'Asia/Manila', flag: '🇵🇭', region: 'Asia' },
  { city: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei', flag: '🇹🇼', region: 'Asia' },
  { city: 'Ho Chi Minh City', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳', region: 'Asia' },

  // Africa
  { city: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', flag: '🇪🇬', region: 'Africa' },
  { city: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', flag: '🇳🇬', region: 'Africa' },
  { city: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', flag: '🇰🇪', region: 'Africa' },
  { city: 'Cape Town', country: 'South Africa', timezone: 'Africa/Johannesburg', flag: '🇿🇦', region: 'Africa' },
  { city: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', flag: '🇿🇦', region: 'Africa' },
  { city: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca', flag: '🇲🇦', region: 'Africa' },
  { city: 'Addis Ababa', country: 'Ethiopia', timezone: 'Africa/Addis_Ababa', flag: '🇪🇹', region: 'Africa' },
  { city: 'Tunis', country: 'Tunisia', timezone: 'Africa/Tunis', flag: '🇹🇳', region: 'Africa' },

  // South America
  { city: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷', region: 'South America' },
  { city: 'Rio de Janeiro', country: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷', region: 'South America' },
  { city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷', region: 'South America' },
  { city: 'Lima', country: 'Peru', timezone: 'America/Lima', flag: '🇵🇪', region: 'South America' },
  { city: 'Bogotá', country: 'Colombia', timezone: 'America/Bogota', flag: '🇨🇴', region: 'South America' },
  { city: 'Santiago', country: 'Chile', timezone: 'America/Santiago', flag: '🇨🇱', region: 'South America' },
  { city: 'Caracas', country: 'Venezuela', timezone: 'America/Caracas', flag: '🇻🇪', region: 'South America' },

  // Oceania
  { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺', region: 'Oceania' },
  { city: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', flag: '🇦🇺', region: 'Oceania' },
  { city: 'Brisbane', country: 'Australia', timezone: 'Australia/Brisbane', flag: '🇦🇺', region: 'Oceania' },
  { city: 'Perth', country: 'Australia', timezone: 'Australia/Perth', flag: '🇦🇺', region: 'Oceania' },
  { city: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', flag: '🇳🇿', region: 'Oceania' },
  { city: 'Wellington', country: 'New Zealand', timezone: 'Pacific/Auckland', flag: '🇳🇿', region: 'Oceania' },
  { city: 'Fiji', country: 'Fiji', timezone: 'Pacific/Fiji', flag: '🇫🇯', region: 'Oceania' },

  // Additional Major Cities
  { city: 'Reykjavik', country: 'Iceland', timezone: 'Atlantic/Reykjavik', flag: '🇮🇸', region: 'Europe' },
  { city: 'Dublin', country: 'Ireland', timezone: 'Europe/Dublin', flag: '🇮🇪', region: 'Europe' },
  { city: 'Brussels', country: 'Belgium', timezone: 'Europe/Brussels', flag: '🇧🇪', region: 'Europe' },
  { city: 'Luxembourg', country: 'Luxembourg', timezone: 'Europe/Luxembourg', flag: '🇱🇺', region: 'Europe' },
  { city: 'Monaco', country: 'Monaco', timezone: 'Europe/Monaco', flag: '🇲🇨', region: 'Europe' },
  { city: 'Vatican City', country: 'Vatican', timezone: 'Europe/Vatican', flag: '🇻🇦', region: 'Europe' },
  { city: 'San Marino', country: 'San Marino', timezone: 'Europe/San_Marino', flag: '🇸🇲', region: 'Europe' },
  { city: 'Andorra', country: 'Andorra', timezone: 'Europe/Andorra', flag: '🇦🇩', region: 'Europe' },
  { city: 'Honolulu', country: 'United States', timezone: 'Pacific/Honolulu', flag: '🇺🇸', region: 'North America' },
  { city: 'Anchorage', country: 'United States', timezone: 'America/Anchorage', flag: '🇺🇸', region: 'North America' },
];

// Helper function to search cities
export const searchCities = (query) => {
  if (!query) return worldCities;
  
  const lowercaseQuery = query.toLowerCase();
  return worldCities.filter(city => 
    city.city.toLowerCase().includes(lowercaseQuery) ||
    city.country.toLowerCase().includes(lowercaseQuery) ||
    city.region.toLowerCase().includes(lowercaseQuery)
  );
};

// Helper function to get cities by region
export const getCitiesByRegion = (region) => {
  return worldCities.filter(city => city.region === region);
};

// Get all unique regions
export const getRegions = () => {
  return [...new Set(worldCities.map(city => city.region))];
};
