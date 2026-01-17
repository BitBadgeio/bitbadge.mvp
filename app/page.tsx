'use client';

import { useState, useEffect } from 'react';
import { tasks, Task } from '@/lib/tasks';
import TaskDescription from '@/components/TaskDescription';
import MonacoEditor from '@/components/MonacoEditor';
import OutputConsole from '@/components/OutputConsole';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export default function Home() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(true);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const currentTask: Task = tasks[currentTaskIndex] || tasks[0];
  const isCompleted = currentTaskIndex >= tasks.length;

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('bitbadgeProgress') || '{"currentTask": 0}');
    setCurrentTaskIndex(progress.currentTask);
  }, []);

  useEffect(() => {
    if (!isCompleted) {
      setUserCode(currentTask.starterCode);
      setOutput('');
    }
  }, [currentTask, isCompleted]);

  useEffect(() => {
    const loadPyodideInstance = async () => {
      try {
        const pyodideInstance = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.1/full/',
        });
        setPyodide(pyodideInstance);
        setPyodideLoading(false);
        setOutput('Pyodide loaded. Ready to run code.');
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput('Error: Failed to load Pyodide.');
        setPyodideLoading(false);
      }
    };
    loadPyodideInstance();
  }, []);

  const runCode = async () => {
    if (!pyodide) {
      setOutput('Pyodide not loaded yet.');
      return;
    }

    setLoading(true);
    setOutput('Running code...');

    try {
      let allPassed = true;
      let feedback = '';

      for (const test of currentTask.tests) {
        if (test.type === 'output') {
          // Capture stdout from running user code
          const testCode = `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = captured_output = StringIO()
${userCode}
output = captured_output.getvalue()
sys.stdout = old_stdout
output
`;
          const result = await pyodide.runPythonAsync(testCode);
          const trimmedResult = result ? result.trim() : '';
          const trimmedExpected = test.expectedOutput.trim();
          if (trimmedResult === trimmedExpected) {
            feedback += `✓ Output test passed: "${test.expectedOutput}" found.\n`;
          } else {
            feedback += `✗ Output test failed: Expected "${test.expectedOutput}", got "${trimmedResult}".\n`;
            allPassed = false;
          }
        } else if (test.type === 'return') {
          // First, run user code to define functions
          await pyodide.runPythonAsync(userCode);
          // Then evaluate the test input
          const result = await pyodide.runPythonAsync(test.input);
          if (result == test.expectedOutput) {
            feedback += `✓ Return test passed: ${test.input} == ${test.expectedOutput}.\n`;
          } else {
            feedback += `✗ Return test failed: ${test.input} returned ${result}, expected ${test.expectedOutput}.\n`;
            allPassed = false;
          }
        }
      }

      if (allPassed) {
        feedback += '\n🎉 All tests passed! Congratulations!';
        // Update progress
        const newIndex = currentTaskIndex + 1;
        setCurrentTaskIndex(newIndex);
        localStorage.setItem('bitbadgeProgress', JSON.stringify({ currentTask: newIndex }));
        if (newIndex >= tasks.length) {
          feedback += '\n🏆 All tasks completed! You have finished the Bitbadge MVP.';
        }
      } else {
        feedback += '\n❌ Some tests failed. Try again.';
      }

      setOutput(feedback);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Bitbadge MVP</h1>
        {isCompleted ? (
          <div className="text-center p-8 border rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-2">🎉 Congratulations!</h2>
            <p>You have completed all tasks in the Bitbadge MVP.</p>
          </div>
        ) : (
          <>
            <TaskDescription task={currentTask} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <MonacoEditor value={userCode} onChange={setUserCode} />
                <div className="mt-2 text-center">
                  <button
                    onClick={runCode}
                    disabled={loading || pyodideLoading || isCompleted}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {pyodideLoading ? 'Loading Pyodide...' : loading ? 'Running...' : 'Run Code'}
                  </button>
                </div>
              </div>
              <OutputConsole output={pyodideLoading ? 'Loading Pyodide...' : output} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
