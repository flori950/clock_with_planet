import { useEffect, useState } from 'react';

const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      try {
        const starArray = [];
        for (let i = 0; i < 150; i++) {
          starArray.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 3,
            size: Math.random() * 2 + 1,
          });
        }
        setStars(starArray);
      } catch (error) {
        console.log('Error generating stars:', error);
        setStars([]); // Fallback to empty array
      }
    };

    generateStars();
  }, []);

  return (
    <div className="stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
