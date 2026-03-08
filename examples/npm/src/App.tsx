import { KapthaCreativeSuite } from '@actovision/kaptha-creative-suite';
import type { ExportData } from '@actovision/kaptha-creative-suite';

export default function App() {
  const handleSave = async (data: ExportData, preview?: Blob) => {
    console.log('Design saved:', data);
    if (preview) {
      console.log('Preview blob:', preview);
    }
  };

  const handleExport = (data: ExportData) => {
    console.log('Design exported:', data);
  };

  const handleImageUpload = async (file: File) => {
    // Replace with your upload logic
    // const formData = new FormData();
    // formData.append('file', file);
    // const res = await fetch('/api/upload', { method: 'POST', body: formData });
    // return await res.json();

    return { url: URL.createObjectURL(file) };
  };

  return (
    <KapthaCreativeSuite
      apiKey="your-api-key"
      style={{ width: '100vw', height: '100vh' }}
      onSave={handleSave}
      onExport={handleExport}
      onImageUpload={handleImageUpload}
      onLoadError={(err) => console.error('Failed to load editor:', err)}
    />
  );
}
