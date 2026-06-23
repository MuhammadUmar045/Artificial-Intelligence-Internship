# Polyglot Press — Translation Desk

A modern, elegant translation application built with React and Vite. Type once, read in multiple languages with character-by-character flipping animation.

## Features

- **Multi-language Translation**: Support for 30+ languages including English, Spanish, French, Chinese, Arabic, and more
- **Live Translation**: Enable "Live" mode for instant translation as you type
- **Auto-Detection**: Automatic source language detection
- **Speech Input**: Speak to type using Web Speech API
- **Text-to-Speech**: Listen to both source and translated text
- **Language Swap**: Quickly swap between source and target languages
- **Translation History**: Save and manage your translations
- **Starred Translations**: Mark important translations for quick access
- **Character Counter**: Visual progress indicator with 500-character limit
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Beautiful dark interface with brass and mint accents
- **Flap Board Animation**: Animated character transitions for the target text
- **Persistent Storage**: History and settings saved in browser localStorage

## Tech Stack

- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **MyMemory API** - Free translation service
- **Web Speech API** - Voice input and output
- **LocalStorage** - Client-side persistence

## Getting Started

### Prerequisites

- Node.js 14+ installed on your system
- npm, yarn, or pnpm package manager

### Installation

1. Navigate to the project directory:
```bash
cd polyglot-press-react
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
polyglot-press-react/
├── src/
│   ├── components/           # React components
│   │   ├── Atmosphere.jsx    # Background animated text
│   │   ├── FlapBoard.jsx     # Animated translation display
│   │   ├── History.jsx       # Translation history panel
│   │   ├── LanguagePopover.jsx  # Language selection popup
│   │   ├── LanguageTrigger.jsx  # Language button
│   │   ├── Masthead.jsx      # Header with greeting cycler
│   │   ├── Toast.jsx         # Toast notifications
│   │   └── TranslationCard.jsx  # Main translation interface
│   ├── hooks/
│   │   └── useLocalStorage.js   # Custom hook for localStorage
│   ├── utils/
│   │   └── constants.js      # Languages, greetings, and utilities
│   ├── App.jsx               # Main app component
│   ├── App.css               # App-specific styles
│   ├── index.css             # Global styles
│   └── main.jsx              # React entry point
├── public/                   # Static files
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── .gitignore               # Git ignore rules
```

## Key Components

### `TranslationCard`
The main interface component containing:
- Source language selection and input textarea
- Target language selection
- Character counter with visual progress
- Microphone button for voice input
- Speech buttons for audio playback
- Live translation toggle

### `FlapBoard`
Animated display of translated text with:
- Character-by-character flip animation
- Fallback for accessibility (prefers-reduced-motion)
- Support for long text (220+ characters)

### `LanguagePopover`
Searchable language selection dropdown with:
- 30+ language options
- Search/filter functionality
- Language name and native name display

### `History`
Translation history management with:
- Recent translation entries
- Star/favorite marking
- Quick-load functionality
- Clear all option

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Translate |
| `Ctrl+Shift+S` | Swap languages |
| `Escape` | Close popover |

## API Integration

The app uses the **MyMemory Translation API** (free tier):
- 5,000 characters per day per IP address
- Anonymous sharing of translations
- No API key required

API Endpoint: `https://api.mymemory.translated.net/get`

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with Web Speech API support

### Web Speech API Notes

- Speech Recognition (STT) support: Most modern browsers (Chrome, Edge, Safari)
- Speech Synthesis (TTS) support: All modern browsers
- Safari on iOS has limited microphone support

## Customization

### Adding More Languages

Edit `src/utils/constants.js` and add to the `LANGS` array:
```javascript
{code:'pt-BR', name:'Portuguese (Brazil)', native:'Português (Brasil)'}
```

### Styling

Global styles are in `src/index.css`. CSS variables are defined in the `:root` section:
```css
--brass: #C99A53;
--mint: #5FAE8D;
--coral: #D6604D;
```

### Color Scheme

- **Ink**: Dark background colors
- **Brass**: Accent and highlight colors
- **Parchment**: Light text and backgrounds
- **Mint**: Success states
- **Coral**: Error and warning states

## Performance Optimizations

- **Code Splitting**: Each component is independently imported
- **Lazy Translation**: Debounced auto-translation (650ms delay)
- **Animation Optimization**: Respects `prefers-reduced-motion` preference
- **Efficient State Management**: React hooks with minimal re-renders
- **LocalStorage Caching**: Instant history loading

## Accessibility Features

- **ARIA Labels**: Proper semantic HTML with ARIA attributes
- **Screen Reader Support**: Live region announcements for translations
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Reduced Motion Support**: Animations respect user preferences
- **Color Contrast**: WCAG AA compliant color ratios

## Troubleshooting

### Translations Not Working
- Check internet connection
- Verify MyMemory API is accessible
- Check if daily free quota (5,000 characters) is exceeded
- Try again tomorrow or use alternative service

### Microphone Not Working
- Check browser microphone permissions
- Ensure HTTPS is used (required for Web Speech API on production)
- Try a different browser

### History Not Persisting
- Check if browser allows localStorage (not in private/incognito mode)
- Ensure storage quota hasn't been exceeded
- Check browser storage settings

## Development Tips

### Debugging

Use React Developer Tools browser extension for component inspection and state debugging.

### Hot Reload

Vite automatically hot-reloads changes during development.

### Building Components

Follow the existing component structure:
1. Accept props for all configurable aspects
2. Use className for conditional styling
3. Include aria-labels for accessibility
4. Export named components

## Contributing

Feel free to fork and improve! Some potential enhancements:

- [ ] Dark/Light theme toggle
- [ ] Favorite languages quick access
- [ ] Translation comparison (side-by-side)
- [ ] Export history to JSON/CSV
- [ ] Custom translation service support
- [ ] Text highlighting/notes
- [ ] Offline support with Service Worker

## License

MIT License - Feel free to use this project for personal and commercial purposes.

## Credits

- **Design Inspiration**: Print shop aesthetic with modern digital interface
- **Fonts**: 
  - Fraunces (Display)
  - IBM Plex Sans (Body)
  - IBM Plex Mono (Code)
- **Translation Service**: MyMemory Translation API
- **Built with**: React, Vite, and love ❤️

## Feedback & Support

For issues, suggestions, or improvements, please create an issue in the repository.

---

**Polyglot Press** — *Type once. Read in any language.* 🌍
