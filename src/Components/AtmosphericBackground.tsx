import React from 'react';

// Styles for this component are in Modern.css for better reliability
const AtmosphericBackground: React.FC = () => {
  return (
    <div className="atmospheric-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="glass-overlay"></div>
      <div className="noise-overlay"></div>
    </div>
  );
};

export default AtmosphericBackground;
