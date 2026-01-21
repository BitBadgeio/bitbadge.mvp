import { Task } from '@/lib/tasks';

interface TaskDescriptionProps {
  task: Task;
}

export default function TaskDescription({ task }: TaskDescriptionProps) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 h-[335px] flex flex-col">
      <h2 className="text-xl font-bold mb-2 flex-shrink-0">{task.title}</h2>
      <div className="flex-1 overflow-auto">
        <p className="text-nord0 dark:text-nord4">{task.description}</p>
      </div>
    </div>
  );
}