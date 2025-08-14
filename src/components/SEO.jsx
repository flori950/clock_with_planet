import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Space Clock Dashboard',
  description = 'A stunning space-themed glassmorphism clock dashboard with world times, planetary calculations, and real-time updates.',
  keywords = 'clock, space, glassmorphism, react, world time, planets, dashboard, cosmic',
  author = 'Florian Hunter',
  url = 'https://clock.florian-hunter.de',
  image = 'https://clock.florian-hunter.de/clock/assets/preview.jpg',
  type = 'website'
}) => {
  const fullTitle = title === 'Space Clock Dashboard' ? title : `${title} | Space Clock Dashboard`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Space Clock Dashboard" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@florianhunter" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0a0a23" />
      <meta name="msapplication-TileColor" content="#0a0a23" />
      <meta name="msapplication-navbutton-color" content="#0a0a23" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Space Clock Dashboard",
          "description": description,
          "url": url,
          "applicationCategory": "Utility",
          "operatingSystem": "Web Browser",
          "author": {
            "@type": "Person",
            "name": author,
            "url": "https://florian-hunter.de"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "screenshot": image,
          "featureList": [
            "Real-time world clocks",
            "Planetary time calculations",
            "Space-themed glassmorphism design",
            "Multiple cosmic themes",
            "Responsive design",
            "Open source"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
