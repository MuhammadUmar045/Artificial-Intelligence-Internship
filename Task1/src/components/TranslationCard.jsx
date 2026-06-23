import React from 'react';
import { LanguageTrigger } from './LanguageTrigger';
import { FlapBoard } from './FlapBoard';

export const TranslationCard = ({
  sourceLang,
  targetLang,
  sourceText,
  translatedText,
  status,
  isAutoDetectOn,
  onSourceLangClick,
  onTargetLangClick,
  onSourceTextChange,
  onClearSource,
  onMicClick,
  onSourceSpeak,
  onTargetSpeak,
  onCopy,
  onStar,
  onDetectToggle,
  onSwap,
  onAutoToggle,
  onTranslate,
  isTranslating,
  isMicListening,
  charCount,
  charCountPercent,
  isStarred
}) => {
  return (
    <section className="card" id="card">
      {/* Source Panel */}
      <div className="panel source-panel">
        <div className="panel-head">
          <LanguageTrigger
            code={sourceLang.code.split('-')[0].toUpperCase()}
            name={sourceLang.name}
            isOpen={false}
            onClick={onSourceLangClick}
          />
          <button
            className={`ghost-btn ${isAutoDetectOn ? 'active' : ''}`}
            type="button"
            title="Detect the source language automatically"
            onClick={onDetectToggle}
          >
            {isAutoDetectOn ? 'Auto ✓' : 'Auto'}
          </button>
        </div>

        <textarea
          id="sourceText"
          maxLength="500"
          placeholder="Begin typing, or use the microphone…"
          value={sourceText}
          onChange={(e) => onSourceTextChange(e.target.value)}
          className={isAutoDetectOn ? 'dimmed' : ''}
        />

        <div className="panel-foot">
          <button
            className={`icon-btn ${isMicListening ? 'mic-listening is-on' : ''}`}
            id="micBtn"
            type="button"
            title="Speak to type"
            onClick={onMicClick}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M19 11a7 7 0 01-14 0M12 18v3"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            className="icon-btn"
            id="sourceSpeakBtn"
            type="button"
            title="Listen to the original"
            onClick={onSourceSpeak}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 9v6h4l5 4V5L8 9H4z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M17 8a6 6 0 010 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button className="icon-btn text" id="clearBtn" type="button" title="Clear the field" onClick={onClearSource}>
            Clear
          </button>
          <div className={`char-ring ${charCountPercent > 0.85 ? 'warn' : ''}`} id="charRing">
            <svg viewBox="0 0 24 24">
              <circle className="track" cx="12" cy="12" r="10"></circle>
              <circle
                className="fill"
                id="ringFill"
                cx="12"
                cy="12"
                r="10"
                strokeDasharray="62.8"
                strokeDashoffset={62.8 - 62.8 * charCountPercent}
              />
            </svg>
            <span id="charCount">{charCount} / 500</span>
          </div>
        </div>
      </div>

      {/* Seam */}
      <div className="seam">
        <button
          className="swap-btn"
          id="swapBtn"
          type="button"
          title="Swap languages (Ctrl+Shift+S)"
          onClick={onSwap}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7 7h11l-3-3M17 17H6l3 3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={`translate-btn ${isTranslating ? 'loading' : ''}`}
          id="translateBtn"
          type="button"
          title="Translate (Ctrl+Enter)"
          onClick={onTranslate}
          disabled={isTranslating}
        >
          Set Type
        </button>
        <label className="auto-toggle">
          <input type="checkbox" id="autoToggle" checked={false} onChange={onAutoToggle} />
          <span>Live</span>
        </label>
      </div>

      {/* Target Panel */}
      <div className="panel target-panel">
        <div className="panel-head">
          <LanguageTrigger
            code={targetLang.code.split('-')[0].toUpperCase()}
            name={targetLang.name}
            isOpen={false}
            onClick={onTargetLangClick}
          />
          <span className={`status-chip ${status}`}>{getStatusText(status)}</span>
        </div>

        <FlapBoard text={translatedText} isEmpty={!translatedText} />
        <div className="sr-only" role="status" aria-live="polite">
          {translatedText}
        </div>

        <div className="panel-foot">
          <button
            className="icon-btn"
            id="targetSpeakBtn"
            type="button"
            title="Listen to the translation"
            onClick={onTargetSpeak}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 9v6h4l5 4V5L8 9H4z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M17 8a6 6 0 010 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="icon-btn"
            id="copyBtn"
            type="button"
            title="Copy the translation"
            onClick={onCopy}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M5 16V6a2 2 0 012-2h9" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button
            className={`icon-btn starred ${isStarred ? 'starred' : ''}`}
            id="starBtn"
            type="button"
            title="Save to your type cases"
            onClick={onStar}
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

const getStatusText = (status) => {
  const statusMap = {
    ready: 'Ready',
    loading: 'Setting type…',
    done: 'Set',
    error: 'Error'
  };
  return statusMap[status] || 'Ready';
};
