'use client';

import { useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { MissionTask, TaskStatus } from "@/lib/tasks";
import { cn } from "@/lib/utils";

const columnMeta: Record<TaskStatus, { label: string; accent: string }> = {
  "backlog": {
    label: "Backlog",
    accent: "from-slate-900 to-slate-900/40",
  },
  "in-progress": {
    label: "In Progress",
    accent: "from-indigo-950 to-slate-900",
  },
  "done": {
    label: "Done",
    accent: "from-emerald-950 to-slate-900",
  },
};

const statusOrder: TaskStatus[] = ["backlog", "in-progress", "done"];

interface TaskBoardProps {
  tasks: MissionTask[];
}

export function TaskBoard({ tasks }: TaskBoardProps) {
  const [items, setItems] = useState(tasks);

  const grouped = useMemo(() => {
    const columns: Record<TaskStatus, MissionTask[]> = {
      backlog: [],
      "in-progress": [],
      done: [],
    };
    for (const task of items) {
      columns[task.status].push(task);
    }
    return columns;
  }, [items]);

  function handleDrag(result: DropResult) {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const nextStatus = destination.droppableId as TaskStatus;
    setItems((prev) =>
      prev.map((task) =>
        task.id === draggableId && task.status !== nextStatus
          ? { ...task, status: nextStatus }
          : task,
      ),
    );
  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="grid gap-4 md:grid-cols-3">
        {statusOrder.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "rounded-3xl border border-slate-800/80 bg-gradient-to-b p-4",
                  columnMeta[status].accent,
                  snapshot.isDraggingOver ? "border-emerald-400/60" : undefined,
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                    {columnMeta[status].label}
                  </p>
                  <span className="text-xs text-slate-500">{grouped[status].length}</span>
                </div>
                <div className="space-y-3">
                  {grouped[status].map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(dragProvided, dragSnapshot) => (
                        <Card
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={cn(
                            "cursor-grab rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 text-slate-100 transition",
                            dragSnapshot.isDragging ? "scale-[1.01] border-emerald-400/60 shadow-xl" : "hover:border-slate-700",
                          )}
                        >
                          <p className="text-base font-medium">{task.title}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {task.tags.map((tag) => (
                              <Badge key={tag} className="bg-slate-800 text-slate-300 border border-slate-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                            <span>Assigned · {task.owner}</span>
                            <span>{new Date(task.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
