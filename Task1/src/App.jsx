import React from 'react';
import { Atmosphere } from './components/Atmosphere';
import { Masthead } from './components/Masthead';
import { TranslationCard } from './components/TranslationCard';
import { LanguagePopover } from './components/LanguagePopover';
import { History } from './components/History';
import { ToastStack } from './components/Toast';
import { byCode, LANGS } from './utils/constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

export default function App() {
  const [sourceLang, setSourceLang] = React.useState(byCode('en'));
  const [targetLang, setTargetLang] = React.useState(byCode('es'));
  const [sourceText, setSourceText] = React.useState('');
  const [translatedText, setTranslatedText] = React.useState('');
  const [status, setStatus] = React.useState('ready');
  const [isAutoDetectOn, setIsAutoDetectOn] = React.useState(false);
  const [autoLive, setAutoLive] = React.useState(false);
  const [isTranslating, setIsTranslating] = React.useState(false);
  const [isMicListening, setIsMicListening] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(null);
  const [popoverSearch, setPopoverSearch] = React.useState('');
  const [toasts, setToasts] = React.useState([]);
  const [history, setHistory] = useLocalStorage('translation-history', []);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [recognitionRef] = React.useState(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    return SR ? new SR() : null;
  });

  const charCount = sourceText.length;
  const charCountPercent = Math.min(charCount / 500, 1);
  const isStarred = history.length > 0 && history[0].starred;
  const [popoverPos, setPopoverPos] = React.useState({ top: 0, left: 0 });

  // Setup speech recognition
  React.useEffect(() => {
    if (!recognitionRef) return;

    recognitionRef.interimResults = true;
    recognitionRef.continuous = false;

    recognitionRef.addEventListener('start', () => setIsMicListening(true));
    recognitionRef.addEventListener('end', () => setIsMicListening(false));
    recognitionRef.addEventListener('result', (e) => {
      let transcript = '';
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setSourceText(transcript);
    });
    recognitionRef.addEventListener('error', () => showToast('Could not hear that — try again'));

    return () => {
      recognitionRef.removeEventListener('start', () => setIsMicListening(true));
      recognitionRef.removeEventListener('end', () => setIsMicListening(false));
    };
  }, [recognitionRef]);

  // Auto translate timer
  React.useEffect(() => {
    if (!autoLive || !sourceText.trim()) return;

    const timer = setTimeout(translateNow, 650);
    return () => clearTimeout(timer);
  }, [sourceText, autoLive]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const translateNow = async () => {
    const text = sourceText.trim();
    if (!text) {
      setErrorMsg('Type something to set into type.');
      return;
    }

    setErrorMsg('');
    setStatus('loading');
    setIsTranslating(true);

    const srcCode = isAutoDetectOn ? 'auto' : sourceLang.code;
    const tgtCode = targetLang.code;

    try {
      const params = new URLSearchParams({
        q: text.slice(0, 500),
        langpair: srcCode + '|' + tgtCode
      });
      const res = await fetch('https://api.mymemory.translated.net/get?' + params.toString());
      if (!res.ok) throw new Error(`The archive could not be reached (HTTP ${res.status}).`);

      const data = await res.json();
      const translated = data?.responseData?.translatedText || '';

      if (!translated || /MYMEMORY WARNING/i.test(translated)) {
        throw new Error(
          "Today's free quota on the translation archive is used up. Try again tomorrow, or wire in your own Google/Microsoft API key."
        );
      }
      if (data.responseStatus && Number(data.responseStatus) !== 200) {
        throw new Error(data.responseDetails || 'The archive could not set that phrase.');
      }

      setTranslatedText(translated);
      setStatus('done');
      pushToHistory(text, translated, srcCode, tgtCode);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong while setting the type.');
    } finally {
      setIsTranslating(false);
    }
  };

  const pushToHistory = (src, tgt, srcCode, tgtCode) => {
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      src,
      tgt,
      srcCode,
      tgtCode,
      starred: false,
      ts: Date.now()
    };
    setHistory((prev) => {
      const updated = [entry, ...prev];
      return updated.slice(0, 24);
    });
  };

  const openPopover = (which, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const top = Math.min(rect.bottom + 8, window.innerHeight - 360);
    let left = rect.left;
    if (left + 280 > window.innerWidth - 12) left = window.innerWidth - 292;

    setPopoverPos({ top: top + window.scrollY, left });
    setPopoverOpen(which);
    setPopoverSearch('');
  };

  const closePopover = () => {
    setPopoverOpen(null);
    setPopoverSearch('');
  };

  const selectLang = (lang) => {
    if (popoverOpen === 'source') setSourceLang(lang);
    else if (popoverOpen === 'target') setTargetLang(lang);

    closePopover();
    if (autoLive && sourceText.trim()) {
      setTimeout(translateNow, 50);
    }
  };

  const handleSwap = () => {
    if (isAutoDetectOn) {
      showToast('Turn off auto-detect to swap languages');
      return;
    }

    const tmp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tmp);

    const srcVal = sourceText;
    const tgtVal = translatedText;
    setSourceText(tgtVal && translatedText ? tgtVal : srcVal);

    if (sourceText.trim()) {
      setTimeout(translateNow, 50);
    }
  };

  const handleClearSource = () => {
    setSourceText('');
    setTranslatedText('');
    setStatus('ready');
    setErrorMsg('');
  };

  const handleMicClick = () => {
    if (!recognitionRef) {
      showToast('Voice input is not supported in this browser');
      return;
    }

    if (isMicListening) {
      recognitionRef.stop();
    } else {
      recognitionRef.lang = isAutoDetectOn ? 'en-US' : sourceLang.code;
      try {
        recognitionRef.start();
      } catch (e) {}
    }
  };

  const handleSpeak = (text, langCode) => {
    if (!text || !('speechSynthesis' in window)) {
      showToast('Speech is not supported in this browser');
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langCode;
    window.speechSynthesis.speak(utter);
  };

  const handleCopy = async () => {
    const text = translatedText.trim();
    if (!text) {
      showToast('Nothing to copy yet');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch (err) {}
      ta.remove();
    }
    showToast('Copied to clipboard');
  };

  const handleStar = () => {
    if (!history.length) {
      showToast('Set a translation first');
      return;
    }
    setHistory((prev) => {
      const updated = [...prev];
      updated[0].starred = !updated[0].starred;
      return updated;
    });
    showToast(history[0].starred ? 'Removed from type cases' : 'Saved to type cases');
  };

  const handleLoadItem = (item) => {
    setSourceLang(byCode(item.srcCode === 'auto' ? 'en' : item.srcCode));
    setTargetLang(byCode(item.tgtCode));
    setSourceText(item.src);
    setTranslatedText(item.tgt);
    setStatus('done');
  };

  const handleToggleStar = (id) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, starred: !item.starred } : item))
    );
  };

  const handleClearHistory = () => {
    setHistory([]);
    showToast('Type cases cleared');
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        translateNow();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSwap();
      }
      if (e.key === 'Escape') {
        closePopover();
      }
    };

    const handleClickOutside = (e) => {
      if (popoverOpen && !e.target.closest('.lang-popover')) {
        closePopover();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [popoverOpen, sourceText]);

  return (
    <div>
      <Atmosphere />
      <main className="desk">
        <Masthead />

        <TranslationCard
          sourceLang={sourceLang}
          targetLang={targetLang}
          sourceText={sourceText}
          translatedText={translatedText}
          status={status}
          isAutoDetectOn={isAutoDetectOn}
          onSourceLangClick={(e) => openPopover('source', e)}
          onTargetLangClick={(e) => openPopover('target', e)}
          onSourceTextChange={setSourceText}
          onClearSource={handleClearSource}
          onMicClick={handleMicClick}
          onSourceSpeak={() => handleSpeak(sourceText, isAutoDetectOn ? 'en' : sourceLang.code)}
          onTargetSpeak={() => handleSpeak(translatedText, targetLang.code)}
          onCopy={handleCopy}
          onStar={handleStar}
          onDetectToggle={() => setIsAutoDetectOn(!isAutoDetectOn)}
          onSwap={handleSwap}
          onAutoToggle={(e) => setAutoLive(e.target.checked)}
          onTranslate={translateNow}
          isTranslating={isTranslating}
          isMicListening={isMicListening}
          charCount={charCount}
          charCountPercent={charCountPercent}
          isStarred={isStarred}
        />

        {errorMsg && <p className="error-banner">{errorMsg}</p>}

        <History
          items={history}
          onLoadItem={handleLoadItem}
          onToggleStar={handleToggleStar}
          onClearAll={handleClearHistory}
        />

        <footer className="colophon">
          <p>
            Translations are set using the free MyMemory archive (about 5,000 characters per day, shared anonymously
            by IP). Saved type cases live only in your browser, never shared.
          </p>
          <p>
            <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to set type · <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> to swap
          </p>
        </footer>
      </main>

      <LanguagePopover
        isOpen={popoverOpen !== null}
        position={popoverPos}
        onSelectLang={selectLang}
        searchValue={popoverSearch}
        onSearchChange={setPopoverSearch}
      />

      <ToastStack toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
