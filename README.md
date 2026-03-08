# @actovision/kaptha-creative-suite

[![npm version](https://badge.fury.io/js/%40actovision%2Fkaptha-creative-suite.svg)](https://www.npmjs.com/package/@actovision/kaptha-creative-suite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> React wrapper for Kaptha Creative Suite — A powerful canvas design editor with drag-and-drop, shapes, text, images, animations, and more.

A lightweight React component that loads the Kaptha Creative Suite from CDN. Build stunning graphics, social media posts, presentations, and more — **no React version conflicts**.

**[Live Demo](https://creative-suite.kaptha.dev)**

## Features

- **API Key Authentication** — Secure access with background validation and retry logic
- **Zero Dependencies** — CDN-based bundle (~278KB gzipped) with React bundled internally
- **Universal Compatibility** — Works with React 18, 19, and vanilla JS via CDN
- **Canvas Editor** — Full-featured design editor with Konva rendering engine
- **Drag-and-Drop** — Intuitive visual editor with shapes, text, images, icons, and more
- **Animations** — Timeline-based animations with multiple presets and easing options
- **Dark/Light Theme** — Built-in theme support
- **Touch Support** — Responsive layout with pinch-to-zoom, two-finger pan, mobile-friendly UI
- **TypeScript** — Full type safety with comprehensive interfaces

## Requirements

- React ^18.0.0 || ^19.0.0
- React DOM ^18.0.0 || ^19.0.0
- API key (get yours at [app.kaptha.com](https://app.kaptha.com))

## Installation

```bash
npm install @actovision/kaptha-creative-suite
```

**Note:** React and React DOM are peer dependencies and should already be in your project.

## Quick Start

```tsx
import { KapthaCreativeSuite } from '@actovision/kaptha-creative-suite';

function App() {
  return (
    <KapthaCreativeSuite
      apiKey="your-api-key"
      style={{ width: '100vw', height: '100vh' }}
      onSave={async (data) => {
        console.log('Design saved:', data);
      }}
    />
  );
}
```

> **Note:** Editor renders after CDN bundle loads. API validation happens in background. Use `onReady` to know when validation completes.

## API Reference

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `apiKey` | `string` | Yes | — | Your API key from [app.kaptha.com](https://app.kaptha.com) |
| `theme` | `'light' \| 'dark'` | No | `'light'` | Editor theme |
| `defaultWidth` | `number` | No | — | Initial canvas width |
| `defaultHeight` | `number` | No | — | Initial canvas height |
| `className` | `string` | No | — | CSS class for container |
| `style` | `CSSProperties` | No | — | Inline styles for container |
| `templates` | `Template[]` | No | — | Custom template library |
| `templatesUrl` | `string` | No | — | URL to fetch templates JSON |
| `templateAssetsBaseUrl` | `string` | No | — | Base URL for template assets |
| `googleFontsList` | `string[]` | No | — | Custom Google Fonts list |
| `presetSizes` | `PresetSize[]` | No | — | Custom canvas size presets |
| `documents` | `DocumentMeta[]` | No | — | Saved documents list |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onReady` | `() => void` | Called when editor is ready (after API validation) |
| `onError` | `(error: Error) => void` | Called on initialization error (e.g., invalid API key) |
| `onLoadError` | `(error: Error) => void` | Called if CDN bundle fails to load |
| `onSave` | `(data, preview?) => Promise<void>` | Save handler with optional preview blob |
| `onExport` | `(data) => void` | Export handler |
| `onImageUpload` | `(file) => Promise<{ url }>` | Image upload handler |
| `onDocumentDelete` | `(docId) => Promise<void>` | Document delete handler |
| `onDocumentDuplicate` | `(docId) => Promise<DocumentMeta>` | Document duplicate handler |
| `onDocumentLoad` | `(docId) => Promise<ExportData>` | Document load handler |
| `onAIText` | `(action, text) => Promise<string \| null>` | AI text action handler |
| `onAIImage` | `(action, imageUrl) => Promise<string \| null>` | AI image action handler |

### Noun Project Icons (Optional)

| Prop | Type | Description |
|------|------|-------------|
| `nounProjectKey` | `string` | Noun Project API key |
| `nounProjectSecret` | `string` | Noun Project API secret |
| `nounProjectProxyUrl` | `string` | Proxy URL for Noun Project API |

## Architecture

**Framework-agnostic core + lightweight wrapper** for maximum compatibility:

| Component | Size | Description |
|-----------|------|-------------|
| **CDN Bundle** | ~278KB (gzipped) | Self-contained editor with React, Konva, all components |
| **React Wrapper** | ~2KB | This npm package — loads CDN and provides React API |
| **Total Download** | ~280KB | First load only, cached by browser |

### Why This Approach?

- **Zero Conflicts** — CDN bundle uses isolated React instance
- **Smaller Builds** — Editor not bundled with your app
- **Framework Agnostic** — CDN bundle works with any framework or vanilla JS
- **Background Validation** — Non-blocking API key checks with retry logic

## Direct CDN Usage

For non-React projects or script-tag usage:

```html
<link rel="stylesheet" href="https://code.kaptha.dev/creative/embed/editor.css" />
<script src="https://code.kaptha.dev/creative/embed/editor.js"></script>

<div id="editor" style="width: 100vw; height: 100vh;"></div>

<script>
  const editor = KapthaCreativeSuite.createEditor({
    container: '#editor',
    apiKey: 'your-api-key',
    onSave: async (data) => console.log(data),
  });

  // Update props
  editor.update({ theme: 'dark' });

  // Destroy when done
  editor.destroy();
</script>
```

## Preloading

To preload the CDN bundle before rendering (e.g., on route prefetch):

```tsx
import { loadBundle } from '@actovision/kaptha-creative-suite';

loadBundle();
```

## TypeScript

All types are exported:

```tsx
import type {
  KapthaCreativeSuiteProps,
  ExportData,
  Template,
  DocumentMeta,
  PresetSize,
  ThemeMode,
  ShapeType,
  NodeData,
  ToolType,
} from '@actovision/kaptha-creative-suite';
```

## Examples

See complete working examples in the [`/examples`](./examples) folder:

- **[CDN](./examples/cdn)** — Single HTML file, zero build step
- **[NPM](./examples/npm)** — Vite + React with TypeScript

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Editor not rendering** | Check console for errors, verify CDN access |
| **"Invalid API key" error** | Get a valid key from [app.kaptha.com](https://app.kaptha.com) |
| **Validation slow** | Normal — background validation with retry (up to 7s) |
| **React conflicts** | Not possible — CDN bundle uses isolated React instance |
| **TypeScript errors** | Install `@types/react` and `@types/react-dom` |

## License

MIT © [Actovision](https://github.com/Actovision-ORG)

## Support

- **Email**: hello@kaptha.com
- **Issues**: [GitHub Issues](https://github.com/Actovision-ORG/kaptha-creative-suite-wrapper/issues)
- **API Keys**: [Console](https://app.kaptha.com)
- **Demo**: [creative-suite.kaptha.dev](https://creative-suite.kaptha.dev)

## Related Packages

- [kaptha-email-editor](https://github.com/Actovision-ORG/kaptha-email-editor) — Drag-and-drop email builder with MJML export
