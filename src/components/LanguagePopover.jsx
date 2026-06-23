import React from 'react';
import { LANGS } from '../utils/constants';

export const LanguagePopover = ({ isOpen, position, onSelectLang, searchValue, onSearchChange }) => {
  const [filteredLangs, setFilteredLangs] = React.useState(LANGS);

  React.useEffect(() => {
    const f = (searchValue || '').toLowerCase();
    setFilteredLangs(
      LANGS.filter(
        (l) =>
          !f ||
          l.name.toLowerCase().includes(f) ||
          l.native.toLowerCase().includes(f) ||
          l.code.includes(f)
      )
    );
  }, [searchValue]);

  if (!isOpen) return null;

  return (
    <div
      className="lang-popover"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        className="lang-search"
        placeholder="Search languages…"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        autoFocus
      />
      <ul className="lang-list">
        {filteredLangs.map((lang) => (
          <li key={lang.code} onClick={() => onSelectLang(lang)}>
            <span className="code-tag">{lang.code.split('-')[0].toUpperCase()}</span>
            <span>{lang.name}</span>
            <span className="native">{lang.native}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
