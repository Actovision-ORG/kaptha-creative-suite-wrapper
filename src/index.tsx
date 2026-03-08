import { useEffect, useRef, useState, type FC } from 'react';
import { loadBundle, getCreateEditor } from './loader';
import type { KapthaCreativeSuiteProps, EditorInstance } from './types';

export type { KapthaCreativeSuiteProps, EditorInstance, CreateEditorOptions, CreateEditorFn } from './types';
export type { ToolType, ThemeMode, ShapeType, PresetSize, Template, DocumentMeta, ExportData } from './types';
export { loadBundle } from './loader';

interface WrapperProps extends KapthaCreativeSuiteProps {
  /** CSS class for the container div */
  className?: string;
  /** Inline styles for the container div */
  style?: React.CSSProperties;
  /** Called when the CDN bundle fails to load */
  onLoadError?: (error: Error) => void;
}

type LoadState = 'loading' | 'ready' | 'error';

/**
 * React wrapper component that loads the Kaptha Creative Suite
 * from CDN and renders it into a container div.
 *
 * @example
 * ```tsx
 * import { KapthaCreativeSuite } from '@actovision/kaptha-creative-suite';
 *
 * function App() {
 *   return (
 *     <KapthaCreativeSuite
 *       apiKey="your-api-key"
 *       onSave={async (data) => console.log(data)}
 *       style={{ width: '100vw', height: '100vh' }}
 *     />
 *   );
 * }
 * ```
 */
export const KapthaCreativeSuite: FC<WrapperProps> = ({
  className,
  style,
  onLoadError,
  ...editorProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorInstance | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  // Load CDN bundle on mount
  useEffect(() => {
    let cancelled = false;

    loadBundle()
      .then(() => {
        if (!cancelled) setLoadState('ready');
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadState('error');
          onLoadError?.(err);
        }
      });

    return () => { cancelled = true; };
  }, []);

  // Create/update editor once bundle is ready
  useEffect(() => {
    if (loadState !== 'ready' || !containerRef.current) return;

    if (!editorRef.current) {
      // First render — create editor
      const createEditor = getCreateEditor();
      editorRef.current = createEditor({
        container: containerRef.current,
        ...editorProps,
      });
    } else {
      // Subsequent renders — update props
      editorRef.current.update(editorProps);
    }
  }, [loadState, editorProps]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  if (loadState === 'error') {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
        <p style={{ color: '#ef4444', fontSize: 14 }}>
          Failed to load Kaptha Creative Suite. Please check your connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', ...style }}
    />
  );
};
