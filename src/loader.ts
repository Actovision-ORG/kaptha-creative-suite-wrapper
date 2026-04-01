import type { CreateEditorFn } from './types';

const CDN_BASE = 'https://code.kaptha.dev/creative/embed';
// Cache bust: hourly hash so browsers get fresh bundles within an hour of deploy
const CACHE_BUST = `?t=${Math.floor(Date.now() / 3600000)}`;
const JS_URL = `${CDN_BASE}/editor.js${CACHE_BUST}`;
const CSS_URL = `${CDN_BASE}/editor.css${CACHE_BUST}`;

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
    if ((window as any).KapthaCreativeSuite) {
      resolve();
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
 * Cache-busted with hourly timestamp hash.
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
