# Space Clock Dashboard ✨

A stunning space-themed glassmorphism clock dashboard featuring real-time world clocks, planetary time calculations, and cosmic visual effects.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-clock.florian--hunter.de-blue?style=for-the-badge)](https://clock.florian-hunter.de)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

## 🌟 Features

### Core Functionality
- **🕒 Real-time Digital Clock** - Beautiful cosmic-themed main display with date and timezone
- **🌅 Sunrise/Sunset Times** - Daily sun times with elegant icons (ready for API integration)
- **🌍 World Clocks** - Add/remove cities from around the world with live updates
- **🪐 Planetary Times** - Accurate time calculations for Mars, Moon, Venus, Jupiter, Saturn, Mercury
- **🎨 6 Cosmic Themes** - Space Dark, Nebula Purple, Galaxy Blue, Solar Gold, Cosmic Pink, Aurora Green

### Design & UX
- **✨ Glassmorphism Design** - Modern frosted glass effects with space backgrounds
- **⭐ Starfield Animation** - 150 animated twinkling stars
- **📱 Responsive Design** - Perfect on desktop, tablet, and mobile
- **🚀 Fast Loading** - Optimized performance with code splitting
- **🔍 SEO Optimized** - Complete meta tags and structured data

## 🚀 Live Demo

Visit the live application: **[https://clock.florian-hunter.de](https://clock.florian-hunter.de)**

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | Modern UI framework with latest hooks |
| **Vite** | 7.1.2 | Lightning-fast build tool and dev server |
| **date-fns** | 4.1.0 | Modern date/time manipulation |
| **Lucide React** | 0.466.0 | Beautiful consistent icon library |
| **React Helmet Async** | 2.0.5 | SEO and meta tag management |
| **Vitest** | 2.3.0 | Fast unit testing framework |

## 📦 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/florian-hunter/space-clock-dashboard.git
cd space-clock-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:5174`

## 🧪 Testing

The project includes comprehensive tests with Vitest:

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Automated FTP Deployment

This project automatically deploys to your FTP server when you push to the main/master branch.

**Required GitHub Secrets:**
- `FTP_SERVER` - Your FTP server hostname
- `FTP_USERNAME` - Your FTP username  
- `FTP_PASSWORD` - Your FTP password

The deployment will upload the built files to the `/clock/` directory on your server.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder contents to your server's `/clock/` directory.

## 🔄 Dependency Management

This project uses [Renovate](https://renovatebot.com/) for automated dependency updates every 3 hours. The configuration is in `renovate.json`.

## 🎨 Theme System

Switch between 6 cosmic themes:

| Theme | Description | Primary Colors |
|-------|-------------|----------------|
| **Space Dark** | Deep space with twinkling stars | Cyan, Blue |
| **Nebula Purple** | Purple cosmic nebula | Purple, Pink |
| **Galaxy Blue** | Blue galaxy spiral | Blue, Cyan |
| **Solar Gold** | Golden solar system | Gold, Orange |
| **Cosmic Pink** | Pink cosmic dust | Pink, Purple |
| **Aurora Green** | Northern lights aurora | Green, Teal |

## 📁 Project Structure

```
├── public/                 # Static assets
├── scripts/                # Deployment scripts
│   └── deploy.js          # FTP deployment automation
├── src/
│   ├── components/        # React components
│   │   ├── Footer.jsx     # Footer with social links
│   │   ├── Header.jsx     # Navigation header
│   │   ├── MainClock.jsx  # Main time display
│   │   ├── PlanetaryTimes.jsx # Planet time calculations
│   │   ├── SEO.jsx        # SEO meta tags component
│   │   ├── StarField.jsx  # Animated starfield
│   │   └── WorldClocks.jsx # World clock grid
│   ├── test/              # Test utilities and setup
│   ├── App.jsx            # Main application
│   ├── App.css            # Glassmorphism styles
│   └── main.jsx           # React entry point
├── renovate.json          # Dependency automation
├── vite.config.js         # Build configuration
└── vitest.config.js       # Test configuration
```

## 🌍 Adding Cities & Customization

### Adding New Cities
Edit `src/components/WorldClocks.jsx`:

```javascript
const timezones = [
  { label: 'New York', value: 'America/New_York', flag: '🇺🇸' },
  { label: 'Your City', value: 'Your/Timezone', flag: '🏁' },
  // Add more cities...
];
```

### Modifying Planetary Data
Update `src/components/PlanetaryTimes.jsx`:

```javascript
const planets = [
  { 
    name: 'Mars', 
    dayLength: 24.6229, 
    emoji: '🔴', 
    color: '#ff4500' 
  },
  // Add more planets...
];
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Test** your changes (`npm run test`)
5. **Push** to the branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

## 📊 Performance Features

- ⚡ **Code Splitting** - Automatic chunk optimization
- 🎯 **Tree Shaking** - Remove unused code
- 📦 **Asset Optimization** - Compressed images and fonts
- 🔄 **Efficient Updates** - Smart re-rendering with React 19
- 💾 **Memory Management** - Optimized component lifecycle

## 🔐 Security & Best Practices

- 🛡️ **Input Validation** - All user inputs sanitized
- 🔒 **Environment Variables** - Sensitive data protected
- 📋 **Content Security** - CSP headers configured
- 🧪 **Automated Testing** - Comprehensive test coverage
- 🔄 **Dependency Updates** - Regular security patches

## 📱 PWA Readiness

The application is prepared for PWA conversion:
- ✅ Responsive design
- ✅ Fast loading
- ✅ Optimized performance
- 🔄 Service worker (ready to implement)
- 🔄 Offline support (ready to implement)

## 👨‍💻 Author

**Florian Hunter**
- 🌐 Website: [florian-hunter.de](https://florian-hunter.de)
- 💼 GitHub: [@florian-hunter](https://github.com/florian-hunter)

---

<div align="center">

**Made with ❤️ and cosmic inspiration ✨**

</div>
