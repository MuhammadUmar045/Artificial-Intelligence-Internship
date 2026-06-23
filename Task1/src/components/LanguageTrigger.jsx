import React from 'react';

export const LanguageTrigger = ({ code, name, isOpen, onClick }) => {
  return (
    <button className={`lang-trigger ${isOpen ? 'open' : ''}`} onClick={onClick} type="button">
      <span className="lang-flag-code">{code}</span>
      <span className="lang-name">{name}</span>
      <svg className="chevron" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 4l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
