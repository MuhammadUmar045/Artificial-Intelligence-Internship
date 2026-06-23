import React from 'react';
import { FLAP_CHARSET } from '../utils/constants';

export const FlapBoard = ({ text, isEmpty }) => {
  const [flapCells, setFlapCells] = React.useState([]);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  React.useEffect(() => {
    if (!text) {
      setFlapCells([]);
      return;
    }

    if (reduceMotion || text.length > 220) {
      setFlapCells(text.split('').map((ch) => ({ ch, currentChar: ch, flipping: false })));
      return;
    }

    const cells = text.split('').map((ch) => ({
      ch,
      currentChar: ch === ' ' ? '\u00A0' : FLAP_CHARSET[Math.floor(Math.random() * FLAP_CHARSET.length)],
      flipping: false
    }));

    setFlapCells(cells);

    cells.forEach((cell, idx) => {
      if (cell.ch === ' ') return;

      const ticks = 4 + Math.floor(Math.random() * 3);
      const startDelay = idx * 14;
      let tick = 0;

      const run = () => {
        setFlapCells((prev) => {
          const updated = [...prev];
          updated[idx].flipping = true;
          return updated;
        });

        setTimeout(() => {
          setFlapCells((prev) => {
            const updated = [...prev];
            updated[idx].flipping = false;
            if (tick < ticks - 1) {
              updated[idx].currentChar = FLAP_CHARSET[Math.floor(Math.random() * FLAP_CHARSET.length)];
            } else {
              updated[idx].currentChar = cell.ch;
            }
            return updated;
          });

          if (tick < ticks - 1) {
            tick++;
            setTimeout(run, 60);
          }
        }, 130);
      };

      setTimeout(run, startDelay);
    });
  }, [text, reduceMotion]);

  return (
    <div className={`flap-board ${isEmpty ? 'empty' : ''}`} data-placeholder="Your translation will be set here…">
      {flapCells.map((cell, idx) => (
        <span key={idx} className={`flap-cell ${cell.flipping ? 'flip' : ''}`}>
          <span className="flap-char">{cell.currentChar}</span>
        </span>
      ))}
    </div>
  );
};
