import React from 'react';
import { escapeHtml } from '../utils/constants';

export const History = ({ items, onLoadItem, onToggleStar, onClearAll }) => {
  if (!items.length) {
    return (
      <section className="history">
        <div className="history-head">
          <h2>
            Type cases <span className="count">(0)</span>
          </h2>
          <button className="ghost-btn" type="button">
            Clear all
          </button>
        </div>
        <div className="history-empty">Translations you set will collect here, like proofs pulled from the press.</div>
      </section>
    );
  }

  return (
    <section className="history">
      <div className="history-head">
        <h2>
          Type cases <span className="count">({items.length})</span>
        </h2>
        <button className="ghost-btn" type="button" onClick={onClearAll}>
          Clear all
        </button>
      </div>
      <div className="history-strip">
        {items.map((item) => (
          <div
            key={item.id}
            className="stub"
            onClick={(e) => {
              if (e.target.closest('.stub-star')) {
                onToggleStar(item.id);
              } else {
                onLoadItem(item);
              }
            }}
          >
            <div className={`stub-star ${item.starred ? 'starred' : ''}`}>
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3z"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="stub-pair">{item.srcCode.toUpperCase()} → {item.tgtCode.toUpperCase()}</p>
            <p className="stub-src">{escapeHtml(item.src)}</p>
            <p className="stub-tgt">{escapeHtml(item.tgt)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
