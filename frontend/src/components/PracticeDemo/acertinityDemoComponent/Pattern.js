import React from 'react';
import LandingPage from '../../../Pages/LandingPage';

const Pattern = () => {
  return (
    <div className="w-full h-full bg-gray-900 relative">
      <div
        className="w-full h-full"
       
        style={{
          backgroundImage: 'linear-gradient(32deg, rgba(8, 8, 8, 0.74) 30px, transparent)',
          backgroundSize: '60px 60px',
          backgroundPosition: '-5px -5px',
        }}
        
      />
    </div>
  );
}

export default Pattern;