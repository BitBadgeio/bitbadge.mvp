import { Task } from '@/lib/tasks';

interface TaskDescriptionProps {
  task: Task;
}

export default function TaskDescription({ task }: TaskDescriptionProps) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <p className="text-nord0 dark:text-nord4">{task.description}</p>
    </div>
  );
}