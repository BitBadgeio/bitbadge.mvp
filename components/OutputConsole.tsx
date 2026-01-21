interface OutputConsoleProps {
  output: string;
}

export default function OutputConsole({ output }: OutputConsoleProps) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">Output Console</h2>
      <div>
        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm overflow-auto max-h-96">
          {output || 'No output yet.'}
        </pre>
      </div>
    </div>
  );
}