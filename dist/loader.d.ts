import { CreateEditorFn } from './types';
/**
 * Load the Kaptha Creative Suite CDN bundle (JS + CSS).
 * Returns a promise that resolves when the bundle is loaded.
 * Safe to call multiple times — only loads once.
 */
export declare function loadBundle(): Promise<void>;
/**
 * Get the CDN bundle's createEditor function.
 * Must be called after loadBundle() resolves.
 */
export declare function getCreateEditor(): CreateEditorFn;
//# sourceMappingURL=loader.d.ts.map