import { TaskCard } from "./TaskCard";
import type { Task } from "@/types";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">Nenhuma tarefa encontrada</p>
          <p className="text-sm">Tente ajustar os filtros ou criar uma nova tarefa</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onTaskUpdate={onTaskUpdate}
        />
      ))}
    </div>
  );
}