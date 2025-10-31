import React, { useState, useCallback, useMemo } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import clsx from 'clsx';
import { Column, Task } from '../../types';
import { useKanbanBoard } from '../../hooks/useKanbanBoard';
import { useDragAndDrop, DragEndEvent } from '../../hooks/useDragAndDrop';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { TaskModal } from './TaskModal';

export interface KanbanBoardProps {
  initialColumns: Column[];
  initialTasks: Record<string, Task>;
  className?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialColumns,
  initialTasks,
  className,
}) => {
  const {
    columns,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useKanbanBoard(initialColumns, initialTasks);

  const {
    sensors,
    activeId,
    handleDragStart,
    handleDragEnd: handleDragEndHook,
    handleDragCancel,
    collisionDetection,
  } = useDragAndDrop();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskClick = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTask(null);
  }, []);

  const handleTaskSave = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      updateTask(taskId, updates);
    },
    [updateTask]
  );

  const handleTaskDelete = useCallback(
    (taskId: string) => {
      const column = columns.find((col) => col.taskIds.includes(taskId));
      if (column) {
        deleteTask(taskId, column.id);
      }
    },
    [columns, deleteTask]
  );

  const handleAddTask = useCallback(
    (columnId: string) => {
      const title = 'New Task';
      addTask(columnId, title);
    },
    [addTask]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        handleDragEndHook();
        return;
      }

      const activeId = active.id as string;
      const overId = over.id as string;

      // Find the source column and task index
      const sourceColumn = columns.find((col) => col.taskIds.includes(activeId));
      if (!sourceColumn) {
        handleDragEndHook();
        return;
      }

      const sourceIndex = sourceColumn.taskIds.indexOf(activeId);

      // Determine if we're dropping on a column or a task
      const destinationColumn = columns.find(
        (col) => col.id === overId || col.taskIds.includes(overId)
      );

      if (!destinationColumn) {
        handleDragEndHook();
        return;
      }

      // Calculate destination index
      let destinationIndex: number;
      if (destinationColumn.id === overId) {
        // Dropped on column itself, add to end
        destinationIndex = destinationColumn.taskIds.length;
      } else {
        // Dropped on a task, insert before it
        destinationIndex = destinationColumn.taskIds.indexOf(overId);
      }

      // Perform the move
      moveTask(
        activeId,
        sourceColumn.id,
        destinationColumn.id,
        sourceIndex,
        destinationIndex
      );

      handleDragEndHook();
    },
    [columns, moveTask, handleDragEndHook]
  );

  const activeTask = useMemo(() => {
    return activeId ? tasks[activeId] : null;
  }, [activeId, tasks]);

  const getColumnTasks = useCallback(
    (column: Column): Task[] => {
      return column.taskIds
        .map((taskId) => tasks[taskId])
        .filter((task): task is Task => task !== undefined);
    },
    [tasks]
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div
          className={clsx(
            'w-full h-full bg-gray-50 p-6',
            'overflow-x-auto overflow-y-hidden',
            className
          )}
          role="main"
          aria-label="Kanban board"
        >
          {/* Desktop/Tablet: Horizontal scroll */}
          <div className="hidden sm:flex gap-4 h-full min-h-[600px]">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={getColumnTasks(column)}
                onTaskClick={handleTaskClick}
                onTaskDelete={handleTaskDelete}
                onAddTask={() => handleAddTask(column.id)}
              />
            ))}
          </div>

          {/* Mobile: Stacked view */}
          <div className="sm:hidden space-y-4">
            {columns.map((column) => (
              <div key={column.id} className="w-full">
                <KanbanColumn
                  column={column}
                  tasks={getColumnTasks(column)}
                  onTaskClick={handleTaskClick}
                  onTaskDelete={handleTaskDelete}
                  onAddTask={() => handleAddTask(column.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 opacity-90">
              <KanbanCard
                task={activeTask}
                onClick={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        task={selectedTask}
        columns={columns}
        onSave={handleTaskSave}
        onDelete={handleTaskDelete}
      />
    </>
  );
};
