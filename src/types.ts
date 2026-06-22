/**
 * TypeScript types for Kaptha Creative Suite.
 * These mirror the types from the core package.
 */

export type ToolType =
  | 'templates'
  | 'text'
  | 'image'
  | 'elements'
  | 'icons'
  | 'draw'
  | 'background'
  | 'resize'
  | 'layers'
  | 'animate'
  | 'quotes'
  | 'qrcode'
  | null;

export type ThemeMode = 'light' | 'dark';

export type ShapeType =
  | 'Rect'
  | 'Ellipse'
  | 'RegularPolygon'
  | 'Star'
  | 'Arc'
  | 'Ring'
  | 'Wedge'
  | 'Path'
  | 'Line'
  | 'Arrow'
  | 'Text'
  | 'Image'
  | 'Group';

export interface PresetSize {
  key: string;
  label: string;
  category: string;
  width: number;
  height: number;
  aspect: 'Horizontal' | 'Vertical' | 'Square';
  featured?: boolean;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  data: unknown;
}

export interface DocumentMeta {
  id: string;
  name: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExportData {
  version?: number;
  /** Document title, as entered in the editor. */
  name?: string;
  nodes: unknown[];
  canvas: {
    width: number;
    height: number;
    background?: unknown;
  };
}

export interface EditorActions {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomLevel: number;
  resetView: () => void;
  fitToScreen: () => void;
  fitAllElements: () => void;
  exportAsPNG: (pixelRatio?: number) => void;
  exportAsJPEG: (pixelRatio?: number, quality?: number) => void;
  exportAsJSON: () => ExportData;
  downloadJSON: () => void;
  exportAsGIF: (fps?: number, pixelRatio?: number) => void;
  exportAsWebM: (fps?: number, pixelRatio?: number) => void;
  isExporting: boolean;
  exportProgress: number;
  importFromFile: () => void;
  importFromJSON: (json: string) => boolean;
  save: () => Promise<void>;
  documentName: string;
  setDocumentName: (name: string) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  newImage: () => void;
  /** Render the canvas to a PNG dataURL and open it in the preview modal (no download). */
  preview: (pixelRatio?: number) => void;
  /** Current preview image dataURL; `null` when the modal is closed. */
  previewImage: string | null;
  /** Show/hide the preview modal by setting the dataURL, or `null` to close. */
  setPreviewImage: (url: string | null) => void;
  /** Label of the currently running slow action (e.g. 'preview', 'save', 'ai-generate'), or `null` when idle. */
  busyAction: string | null;
  /** Convenience flag: `true` when any slow action is running. */
  isBusy: boolean;
}

export interface KapthaCreativeSuiteProps {
  apiKey: string;
  onReady?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  theme?: ThemeMode;
  /** Whether to render the built-in top navbar. Defaults to true. */
  showTopNavbar?: boolean;
  /** Show "Powered by Kaptha" credit text on screen. Defaults to false. */
  showCredit?: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
  templates?: Template[];
  documents?: DocumentMeta[];
  googleFontsList?: string[];
  presetSizes?: PresetSize[];
  templateAssetsBaseUrl?: string;
  templatesUrl?: string;
  onSave?: (data: ExportData, preview?: Blob) => Promise<void>;
  onExport?: (data: ExportData) => void;
  onImageUpload?: (file: File) => Promise<{ url: string }>;
  onDocumentDelete?: (docId: string) => Promise<void>;
  onDocumentDuplicate?: (docId: string) => Promise<DocumentMeta>;
  onDocumentLoad?: (docId: string) => Promise<ExportData>;
  onAIText?: (action: string, text: string) => Promise<string | null>;
  onAIImage?: (action: string, imageUrl: string) => Promise<string | null>;
  /** Called when the editor mounts with an actions object for external control */
  onEditorReady?: (actions: EditorActions) => void;
  /** Backend API base URL (overrides VITE_API_URL env var) */
  apiUrl?: string;
  /** Backend icons API URL. Icons API handles OAuth server-side. */
  iconsApiUrl?: string;
  /** Separate AI backend base URL (overrides apiUrl for AI calls) */
  aiApiUrl?: string;
  /** API key for the AI backend (overrides apiKey for AI calls) */
  aiApiKey?: string;
  /** Full URL overrides for individual AI endpoints */
  aiEndpoints?: {
    generate?: string;
    text?: string;
    image?: string;
    models?: string;
    images?: string;
  };
  /** Custom headers for AI requests (replaces default x-api-key/x-origin-domain) */
  aiHeaders?: Record<string, string>;
  /** Fetch credentials mode for AI requests. Defaults to 'same-origin' */
  aiCredentials?: RequestCredentials;
  /** Initial design data to auto-load into the canvas on mount */
  initialData?: ExportData;
  /** Template ID to auto-load from templates list on mount */
  initialTemplateId?: string;
}

export interface EditorInstance {
  destroy: () => void;
  update: (props: Partial<KapthaCreativeSuiteProps>) => void;
  getContainer: () => HTMLElement;
}

export interface CreateEditorOptions extends KapthaCreativeSuiteProps {
  container: HTMLElement | string;
}

export type CreateEditorFn = (options: CreateEditorOptions) => EditorInstance;
