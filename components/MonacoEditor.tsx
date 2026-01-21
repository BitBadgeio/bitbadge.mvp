import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRunCode?: () => void;
}

export default function MonacoEditor({ value, onChange, onRunCode }: MonacoEditorProps) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current && onRunCode) {
      editorRef.current.addCommand(
        monacoRef.current.KeyMod.chord(monacoRef.current.KeyMod.Alt | monacoRef.current.KeyCode.Enter),
        () => onRunCode()
      );
    }
  }, [onRunCode]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 h-[335px] flex flex-col">
      <h2 className="text-xl font-bold mb-2 flex-shrink-0">Code Editor</h2>
      <div className="flex-1 min-h-0">
        <Editor
          height="267px"
          language="python"
          value={value}
          onChange={(val) => onChange(val || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace',
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}