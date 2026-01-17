import { Task } from '@/lib/tasks';

interface TaskDescriptionProps {
  task: Task;
}

export default function TaskDescription({ task }: TaskDescriptionProps) {
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
    </div>
  );
}