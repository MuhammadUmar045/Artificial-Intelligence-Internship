# Development Guide

## Setting Up Your Development Environment

### Initial Setup

1. Clone or download the project
2. Install Node.js 14 or higher from https://nodejs.org
3. Run `npm install` to install dependencies

### Available Scripts

#### `npm run dev`
Starts the Vite development server with hot module replacement (HMR).
- Opens automatically at http://localhost:3000
- Changes to files are reflected immediately
- Errors are reported in the browser console and terminal

#### `npm run build`
Creates an optimized production build.
- Bundles and minifies all code
- Optimizes images and assets
- Output goes to `dist/` directory
- Takes ~30 seconds

#### `npm run preview`
Serves the production build locally for testing.
- Use before deploying to catch production-specific issues
- Runs at http://localhost:3000

## Project Architecture

### State Management

The app uses React hooks for state management:
- `useState` - Component-level state
- `useLocalStorage` - Persistent browser storage
- `useEffect` - Side effects and subscriptions

Key state:
- `sourceLang`, `targetLang` - Selected languages
- `sourceText` - User input
- `translatedText` - Translation result
- `history` - Translation history
- `status` - Translation state (ready/loading/done/error)

### Data Flow

```
User Input
    ↓
setSourceText() / setTranslatedText()
    ↓
Component State Updates
    ↓
Re-render with new data
    ↓
Display changes
```

### API Integration

**MyMemory API Calls**:
```javascript
fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`)
```

Response handling:
- Parse JSON
- Check for errors
- Extract `responseData.translatedText`
- Handle quota exceeded errors

## Component Development

### Creating a New Component

1. Create file in `src/components/ComponentName.jsx`
2. Import React and dependencies
3. Write functional component with JSX
4. Export as default or named export

Example:
```jsx
import React from 'react';

export const MyComponent = ({ prop1, onAction }) => {
  const [state, setState] = React.useState(null);
  
  return <div>{prop1}</div>;
};
```

### Component Guidelines

- Keep components focused and single-responsibility
- Props should define all external dependencies
- Use descriptive prop names
- Include JSDoc comments for complex logic
- Handle loading and error states
- Provide accessible fallbacks

## Debugging

### Browser DevTools

1. Open DevTools (F12)
2. Go to Console tab to see logs
3. Use React DevTools extension for component inspection
4. Check Network tab for API calls

### Common Issues & Solutions

**"Cannot find module React"**
- Ensure all files import React at the top
- Run `npm install` to get dependencies

**Translations not working**
- Check Network tab in DevTools
- Verify MyMemory API endpoint is accessible
- Check if quota is exceeded (5000 chars/day per IP)

**Styles not applying**
- Check if CSS file is imported in component
- Verify class names match CSS selectors
- Check for CSS specificity issues

**State not updating**
- Ensure you're using setState, not direct assignment
- Check if component is re-rendering (add console.log)
- Verify dependencies in useEffect

## Performance Tips

### Optimization Opportunities

1. **Memoization**: Use `React.memo()` for expensive components
   ```jsx
   export const MyComponent = React.memo(({ data }) => (...))
   ```

2. **Lazy Loading**: Code split large components
   ```jsx
   const LargeComponent = React.lazy(() => import('./LargeComponent'))
   ```

3. **Debouncing**: Delay API calls during typing
   ```javascript
   clearTimeout(timer);
   timer = setTimeout(() => translateNow(), 650);
   ```

## Testing Locally

### Pre-deployment Checklist

- [ ] `npm run build` succeeds
- [ ] `npm run preview` works correctly
- [ ] Test all languages translate
- [ ] Test microphone (if available)
- [ ] Test speech playback
- [ ] Check mobile responsiveness
- [ ] Verify history saves correctly
- [ ] Test keyboard shortcuts

### Browser Compatibility Testing

- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support (iOS 14+)
- Mobile: Test in device or DevTools mobile view

## Code Quality

### Style Guide

- Use 2-space indentation
- Use meaningful variable names
- Keep functions small and focused
- Write comments for complex logic
- Use const/let instead of var

### Recommended Extensions

- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Prettier** - Code formatter
- **ESLint** - Code quality
- **React Developer Tools** - Component debugging
- **React DevTools Profiler** - Performance analysis

## Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist/` folder with production-ready files.

### Deploying to Hosting Services

**Vercel (recommended)**
```bash
npm i -g vercel
vercel
```

**Netlify**
- Connect GitHub repo
- Set build command: `npm run build`
- Set publish directory: `dist`

**Traditional Hosting**
- Upload `dist/` contents to web server
- Ensure server supports SPA routing (if needed)
- Test in production environment

## Monitoring & Maintenance

### What to Watch

- API quota usage (5000 chars/day)
- Browser console for errors
- User-reported issues
- Performance metrics

### Updates

- Keep React updated: `npm update react`
- Keep Vite updated: `npm update vite`
- Check for security vulnerabilities: `npm audit`

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [MyMemory API Docs](https://mymemory.translated.net/doc/spec.php)

---

Happy coding! 🚀
