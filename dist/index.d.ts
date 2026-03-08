import { FC } from 'react';
import { KapthaCreativeSuiteProps } from './types';
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
export declare const KapthaCreativeSuite: FC<WrapperProps>;
//# sourceMappingURL=index.d.ts.map