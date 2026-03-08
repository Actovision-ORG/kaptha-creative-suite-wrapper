import type { CreateEditorFn } from './types';

const CDN_BASE = 'https://code.kaptha.dev/creative/embed';
const JS_URL = `${CDN_BASE}/editor.js`;
const CSS_URL = `${CDN_BASE}/editor.css`;

let loadPromise: Promise<void> | null = null;

function loadCSS(): void {
  if (document.querySelector(`link[href="${CSS_URL}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = CSS_URL;
  document.head.appendChild(link);
}

function loadJS(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${JS_URL}"]`)) {
      // Script tag exists — check if already loaded
      if ((window as any).KapthaCreativeSuite) {
        resolve();
      } else {
        // Script tag exists but not yet loaded — wait for it
        const existing = document.querySelector(`script[src="${JS_URL}"]`) as HTMLScriptElement;
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Failed to load Kaptha Creative Suite from CDN')));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = JS_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Kaptha Creative Suite from CDN'));
    document.head.appendChild(script);
  });
}

/**
 * Load the Kaptha Creative Suite CDN bundle (JS + CSS).
 * Returns a promise that resolves when the bundle is loaded.
 * Safe to call multiple times — only loads once.
 */
export function loadBundle(): Promise<void> {
  if (!loadPromise) {
    loadCSS();
    loadPromise = loadJS();
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
