import React from 'react';
import { GREETINGS } from '../utils/constants';

export const Masthead = () => {
  const [cycler, setCycler] = React.useState(GREETINGS[0]);
  const [cyclerIdx, setCyclerIdx] = React.useState(0);
  const [swappingOut, setSwappingOut] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSwappingOut(true);
      setTimeout(() => {
        setCyclerIdx((prev) => (prev + 1) % GREETINGS.length);
        setCycler(GREETINGS[(cyclerIdx + 1) % GREETINGS.length]);
        setSwappingOut(false);
      }, 300);
    }, 2600);

    return () => clearInterval(interval);
  }, [cyclerIdx]);

  return (
    <header className="masthead">
      <p className="eyebrow">POLYGLOT PRESS</p>
      <h1 className="title">
        <span className="static-line">Type it once.</span>
        <span className="cycler-line">
          Read it in <span className={`cycler ${swappingOut ? 'swap-out' : 'swap-in'}`}>{cycler}</span>.
        </span>
      </h1>
      <p className="sub">
        Set a phrase, choose two tongues, and watch the type reset itself character by character.
      </p>
    </header>
  );
};
