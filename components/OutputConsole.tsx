interface OutputConsoleProps {
  output: string;
  showNextButton?: boolean;
  onNextTask?: () => void;
}

export default function OutputConsole({ output, showNextButton, onNextTask }: OutputConsoleProps) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">Output Console</h2>
      <div>
        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm overflow-auto max-h-96">
          {output || 'No output yet.'}
        </pre>
        {showNextButton && onNextTask && (
          <div className="mt-2 text-center">
            <button
              onClick={onNextTask}
              className="px-6 py-2 bg-nord8 text-white rounded hover:bg-nord8/80"
            >
              Next Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}