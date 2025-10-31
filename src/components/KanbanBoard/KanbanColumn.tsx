import React, { memo, useState, useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import clsx from 'clsx';
import { Column, Task } from '../../types';
import { KanbanCard } from './KanbanCard';
import { Button } from '../primitives/Button';

export interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onAddTask: () => void;
}

export const KanbanColumn = memo<KanbanColumnProps>(
  ({ column, tasks, onTaskClick, onTaskDelete, onAddTask }) => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const { setNodeRef, isOver } = useDroppable({
      id: column.id,
    });

    const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const handleAddTask = () => {
      if (newTaskTitle.trim()) {
        onAddTask();
        setNewTaskTitle('');
        setIsAddingTask(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAddTask();
      } else if (e.key === 'Escape') {
        setIsAddingTask(false);
        setNewTaskTitle('');
      }
    };

    return (
      <div
        className={clsx(
          'flex flex-col bg-gray-100 rounded-lg min-w-[300px] max-w-[350px] h-full',
          'sm:min-w-[280px] sm:max-w-[320px]'
        )}
      >
        {/* Column Header - Sticky */}
        <div
          className="sticky top-0 z-10 bg-gray-100 px-4 py-3 border-b border-gray-200 rounded-t-lg"
          style={{ backgroundColor: column.color + '15' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: column.color }}
                aria-hidden="true"
              />
              <h2 className="font-semibold text-gray-900 text-sm">
                {column.title}
              </h2>
              <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
                {tasks.length}
              </span>
            </div>
          </div>
        </div>

        {/* Tasks Container - Scrollable */}
        <div
          ref={setNodeRef}
          className={clsx(
            'flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 space-y-3 scrollbar-thin',
            'min-h-[200px]',
            isOver && 'bg-blue-50/50'
          )}
          role="list"
          aria-label={`${column.title} tasks`}
        >
          <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <KanbanCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task)}
                onDelete={() => onTaskDelete(task.id)}
              />
            ))}
          </SortableContext>

          {tasks.length === 0 && !isAddingTask && (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              No tasks yet
            </div>
          )}

          {/* Add Task Input */}
          {isAddingTask && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter task title..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
                aria-label="New task title"
              />
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={handleAddTask}
                  disabled={!newTaskTitle.trim()}
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTaskTitle('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Add Task Button - Sticky */}
        <div className="sticky bottom-0 bg-gray-100 px-4 py-3 border-t border-gray-200 rounded-b-lg">
          {!isAddingTask && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddingTask(true)}
              className="w-full justify-start text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </Button>
          )}
        </div>
      </div>
    );
  }
);

KanbanColumn.displayName = 'KanbanColumn';
