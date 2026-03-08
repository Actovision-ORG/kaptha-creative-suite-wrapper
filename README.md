# @actovision/kaptha-creative-suite

React canvas design editor — thin wrapper that loads the Kaptha Creative Suite from CDN.

## Installation

```bash
npm install @actovision/kaptha-creative-suite
```

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

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | `string` | Yes | Your Kaptha API key |
| `theme` | `'light' \| 'dark'` | No | Editor theme |
| `defaultWidth` | `number` | No | Initial canvas width |
| `defaultHeight` | `number` | No | Initial canvas height |
| `className` | `string` | No | CSS class for container |
| `style` | `CSSProperties` | No | Inline styles for container |
| `templates` | `Template[]` | No | Custom template library |
| `templatesUrl` | `string` | No | URL to fetch templates JSON |
| `templateAssetsBaseUrl` | `string` | No | Base URL for template assets |
| `googleFontsList` | `string[]` | No | Custom Google Fonts list |
| `presetSizes` | `PresetSize[]` | No | Custom canvas size presets |
| `documents` | `DocumentMeta[]` | No | Saved documents list |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onReady` | `() => void` | Called when editor is ready |
| `onError` | `(error: Error) => void` | Called on initialization error |
| `onLoadError` | `(error: Error) => void` | Called if CDN bundle fails to load |
| `onSave` | `(data, preview?) => Promise<void>` | Save handler |
| `onExport` | `(data) => void` | Export handler |
| `onImageUpload` | `(file) => Promise<{ url }>` | Image upload handler |
| `onDocumentDelete` | `(docId) => Promise<void>` | Document delete handler |
| `onDocumentDuplicate` | `(docId) => Promise<DocumentMeta>` | Document duplicate handler |
| `onDocumentLoad` | `(docId) => Promise<ExportData>` | Document load handler |
| `onAIText` | `(action, text) => Promise<string \| null>` | AI text action handler |
| `onAIImage` | `(action, imageUrl) => Promise<string \| null>` | AI image action handler |

 

## Script Tag Usage (No NPM)

You can also use the editor directly via CDN without this wrapper:

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

  // Later: editor.destroy();
</script>
```

## Preloading

To preload the CDN bundle before rendering:

```tsx
import { loadBundle } from '@actovision/kaptha-creative-suite';

// Call early (e.g., on route prefetch)
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

## How It Works

This package is a thin React wrapper (~2 KB) that:

1. Dynamically loads the editor JS + CSS from `code.kaptha.dev`
2. Creates a React root inside your container div
3. Renders the full Kaptha Creative Suite editor
4. Provides TypeScript types for full IDE support

The actual editor code is served from Cloudflare R2 CDN, keeping your bundle size minimal.

## License

MIT
