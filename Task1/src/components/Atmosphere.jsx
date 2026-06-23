import React from 'react';

export const Atmosphere = () => {
  const codes = ['EN', 'FR', '日', 'ع', 'ру', 'ES', 'हि', '한', 'DE', 'PT', 'TH', 'ID'];

  return (
    <div className="atmosphere" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 22}px`,
            animationDuration: `${18 + Math.random() * 22}s`,
            animationDelay: `${-Math.random() * 30}s`
          }}
        >
          {codes[i % codes.length]}
        </span>
      ))}
    </div>
  );
};
