import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { format } from 'date-fns';
import { Task } from '../../types';
import { Avatar } from '../primitives/Avatar';
import { getPriorityColor, getPriorityLabel, isOverdue } from '../../utils/task.utils';

export interface KanbanCardProps {
  task: Task;
  onClick: () => void;
  onDelete: () => void;
}

export const KanbanCard = memo<KanbanCardProps>(({ task, onClick, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const overdue = isOverdue(task);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        'bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer',
        'hover:shadow-md transition-shadow duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        isDragging && 'opacity-50 shadow-lg',
        overdue && 'border-l-4 border-l-red-500'
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Task: ${task.title}`}
    >
      {/* Header with Priority and Delete */}
      <div className="flex items-start justify-between mb-2">
        <span
          className={clsx(
            'inline-flex items-center px-2 py-1 rounded text-xs font-medium border',
            getPriorityColor(task.priority)
          )}
        >
          {getPriorityLabel(task.priority)}
        </span>
        <button
          onClick={handleDeleteClick}
          className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Delete task"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer with Assignee and Due Date */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center">
          {task.assignee && <Avatar name={task.assignee} size="sm" />}
        </div>
        {task.dueDate && (
          <div
            className={clsx(
              'flex items-center text-xs',
              overdue ? 'text-red-600 font-semibold' : 'text-gray-500'
            )}
          >
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {format(new Date(task.dueDate), 'MMM dd')}
          </div>
        )}
      </div>
    </div>
  );
});

KanbanCard.displayName = 'KanbanCard';
