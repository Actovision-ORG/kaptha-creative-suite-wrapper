import type { CreateEditorFn } from './types';

const CDN_BASE = 'https://code.kaptha.dev/creative/embed';
const MANIFEST_URL = `${CDN_BASE}/manifest.json`;

let loadPromise: Promise<void> | null = null;

/** Fetch manifest.json (no-cache) to get versioned URLs */
async function getUrls(): Promise<{ js: string; css: string }> {
  const fallback = { js: `${CDN_BASE}/editor.js`, css: `${CDN_BASE}/editor.css` };
  try {
    const res = await fetch(MANIFEST_URL, { cache: 'no-cache' });
    if (!res.ok) return fallback;
    const manifest = await res.json();
    return {
      js: manifest.js?.startsWith('http') ? manifest.js : `${CDN_BASE}/${manifest.js || 'editor.js'}`,
      css: manifest.css?.startsWith('http') ? manifest.css : `${CDN_BASE}/${manifest.css || 'editor.css'}`,
    };
  } catch {
    return fallback;
  }
}

function loadCSS(url: string): void {
  if (document.querySelector('link[href*="editor"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

function loadJS(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).KapthaCreativeSuite) {
      resolve();
      return;
    }

    const existing = document.querySelector('script[src*="editor"]') as HTMLScriptElement;
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Kaptha Creative Suite from CDN')));
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Kaptha Creative Suite from CDN'));
    document.head.appendChild(script);
  });
}

/**
 * Load the Kaptha Creative Suite CDN bundle (JS + CSS).
 * Fetches manifest.json first to get cache-busted URLs.
 * Safe to call multiple times — only loads once.
 */
export function loadBundle(): Promise<void> {
  if (!loadPromise) {
    loadPromise = getUrls().then(({ js, css }) => {
      loadCSS(css);
      return loadJS(js);
    });
  }
  return loadPromise;
}

/**
 * Get the CDN bundle's createEditor function.
 * Must be called after loadBundle() resolves.
 */
export function getCreateEditor(): CreateEditorFn {
  const global = (window as any).KapthaCreativeSuite;
  if (!global?.createEditor) {
    throw new Error('[KapthaCreativeSuite] CDN bundle not loaded. Call loadBundle() first.');
  }
  return global.createEditor;
}
