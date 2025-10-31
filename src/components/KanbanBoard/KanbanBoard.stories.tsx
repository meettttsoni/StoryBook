import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from './KanbanBoard';
import { Column, Task } from '../../types';

// Sample data
const sampleColumns: Column[] = [
  { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1', 'task-2'] },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-3'] },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-4'] },
];

const sampleTasks: Record<string, Task> = {
  'task-1': {
    id: 'task-1',
    title: 'Implement drag and drop',
    description: 'Add drag and drop functionality to the kanban board using @dnd-kit',
    status: 'todo',
    priority: 'high',
    assignee: 'John Doe',
    tags: ['frontend', 'feature'],
    createdAt: new Date('2024-01-15'),
    dueDate: new Date('2024-02-01'),
  },
  'task-2': {
    id: 'task-2',
    title: 'Design task modal',
    description: 'Create a beautiful modal for editing task details',
    status: 'todo',
    priority: 'medium',
    assignee: 'Jane Smith',
    tags: ['UI', 'design'],
    createdAt: new Date('2024-01-16'),
  },
  'task-3': {
    id: 'task-3',
    title: 'Setup TypeScript',
    description: 'Configure TypeScript with strict mode and proper types',
    status: 'in-progress',
    priority: 'urgent',
    assignee: 'John Doe',
    tags: ['setup', 'typescript'],
    createdAt: new Date('2024-01-14'),
    dueDate: new Date('2024-01-20'),
  },
  'task-4': {
    id: 'task-4',
    title: 'Create folder structure',
    description: 'Organize project files and folders',
    status: 'done',
    priority: 'low',
    assignee: 'Jane Smith',
    tags: ['setup'],
    createdAt: new Date('2024-01-13'),
  },
};

// Generate large dataset
const generateLargeDataset = () => {
  const columns: Column[] = [
    { id: 'backlog', title: 'Backlog', color: '#9ca3af', taskIds: [] },
    { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: [] },
    { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
    { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [] },
    { id: 'testing', title: 'Testing', color: '#8b5cf6', taskIds: [] },
    { id: 'done', title: 'Done', color: '#10b981', taskIds: [] },
  ];

  const tasks: Record<string, Task> = {};
  const priorities: Array<'low' | 'medium' | 'high' | 'urgent'> = ['low', 'medium', 'high', 'urgent'];
  const assignees = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson'];
  const tagOptions = ['frontend', 'backend', 'design', 'bug', 'feature', 'enhancement', 'documentation'];

  for (let i = 1; i <= 35; i++) {
    const taskId = `task-${i}`;
    const columnIndex = Math.floor(Math.random() * columns.length);
    const column = columns[columnIndex];

    tasks[taskId] = {
      id: taskId,
      title: `Task ${i}: ${['Implement', 'Design', 'Fix', 'Refactor', 'Test'][i % 5]} ${['feature', 'bug', 'component', 'API', 'UI'][i % 5]}`,
      description: `This is a detailed description for task ${i}. It contains important information about what needs to be done.`,
      status: column.id,
      priority: priorities[i % 4],
      assignee: assignees[i % assignees.length],
      tags: [tagOptions[i % tagOptions.length], tagOptions[(i + 1) % tagOptions.length]],
      createdAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
      dueDate: Math.random() > 0.5 ? new Date(2024, 1, Math.floor(Math.random() * 28) + 1) : undefined,
    };

    column.taskIds.push(taskId);
  }

  return { initialColumns: columns, initialTasks: tasks };
};

const meta: Meta<typeof KanbanBoard> = {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A production-grade Kanban Board component with drag-and-drop functionality, task management, and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialColumns: {
      description: 'Array of column configurations',
      control: { type: 'object' },
    },
    initialTasks: {
      description: 'Object mapping task IDs to task data',
      control: { type: 'object' },
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

/**
 * Default Kanban board with sample data showing basic functionality
 */
export const Default: Story = {
  args: {
    initialColumns: sampleColumns,
    initialTasks: sampleTasks,
  },
};

/**
 * Empty board with no tasks - useful for starting fresh
 */
export const Empty: Story = {
  args: {
    initialColumns: [
      { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: [] },
      { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
      { id: 'done', title: 'Done', color: '#10b981', taskIds: [] },
    ],
    initialTasks: {},
  },
};

/**
 * Board with a large dataset (35+ tasks across 6 columns)
 * Tests performance and scrolling behavior
 */
export const LargeDataset: Story = {
  args: generateLargeDataset(),
};

/**
 * Mobile responsive view - resize viewport to see stacked layout
 */
export const MobileResponsive: Story = {
  args: {
    initialColumns: sampleColumns,
    initialTasks: sampleTasks,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Interactive playground with all features enabled
 * Try dragging tasks, editing them, and adding new ones
 */
export const InteractivePlayground: Story = {
  args: {
    initialColumns: [
      { id: 'backlog', title: 'Backlog', color: '#9ca3af', taskIds: ['task-5', 'task-6'] },
      { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1', 'task-2'] },
      { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-3'] },
      { id: 'review', title: 'Review', color: '#f59e0b', taskIds: ['task-7'] },
      { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-4'] },
    ],
    initialTasks: {
      ...sampleTasks,
      'task-5': {
        id: 'task-5',
        title: 'Research new technologies',
        description: 'Explore latest frontend frameworks and tools',
        status: 'backlog',
        priority: 'low',
        assignee: 'Alice Cooper',
        tags: ['research'],
        createdAt: new Date('2024-01-10'),
      },
      'task-6': {
        id: 'task-6',
        title: 'Update documentation',
        description: 'Keep docs up to date with latest changes',
        status: 'backlog',
        priority: 'medium',
        assignee: 'Bob Martin',
        tags: ['documentation'],
        createdAt: new Date('2024-01-12'),
        dueDate: new Date('2024-01-25'),
      },
      'task-7': {
        id: 'task-7',
        title: 'Code review for PR #123',
        description: 'Review and provide feedback on the new feature implementation',
        status: 'review',
        priority: 'high',
        assignee: 'Jane Smith',
        tags: ['review', 'code-quality'],
        createdAt: new Date('2024-01-17'),
        dueDate: new Date('2024-01-19'),
      },
    },
  },
};

/**
 * Board with overdue tasks highlighted
 */
export const WithOverdueTasks: Story = {
  args: {
    initialColumns: sampleColumns,
    initialTasks: {
      'task-1': {
        id: 'task-1',
        title: 'Overdue task - needs attention!',
        description: 'This task is past its due date',
        status: 'todo',
        priority: 'urgent',
        assignee: 'John Doe',
        tags: ['urgent', 'overdue'],
        createdAt: new Date('2024-01-01'),
        dueDate: new Date('2024-01-10'), // Past date
      },
      'task-2': {
        id: 'task-2',
        title: 'Another overdue task',
        description: 'This also needs immediate attention',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Jane Smith',
        tags: ['important'],
        createdAt: new Date('2024-01-05'),
        dueDate: new Date('2024-01-15'), // Past date
      },
      'task-3': {
        id: 'task-3',
        title: 'Upcoming deadline',
        description: 'This task is due soon',
        status: 'in-progress',
        priority: 'medium',
        assignee: 'John Doe',
        tags: ['frontend'],
        createdAt: new Date('2024-01-18'),
        dueDate: new Date('2024-02-28'),
      },
    },
  },
};

/**
 * Minimal board with just 3 columns
 */
export const MinimalThreeColumns: Story = {
  args: {
    initialColumns: [
      { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1', 'task-2', 'task-3'] },
      { id: 'doing', title: 'Doing', color: '#3b82f6', taskIds: ['task-4'] },
      { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-5'] },
    ],
    initialTasks: {
      'task-1': {
        id: 'task-1',
        title: 'First task',
        status: 'todo',
        priority: 'high',
        tags: ['important'],
        createdAt: new Date(),
      },
      'task-2': {
        id: 'task-2',
        title: 'Second task',
        status: 'todo',
        priority: 'medium',
        tags: ['feature'],
        createdAt: new Date(),
      },
      'task-3': {
        id: 'task-3',
        title: 'Third task',
        status: 'todo',
        priority: 'low',
        tags: [],
        createdAt: new Date(),
      },
      'task-4': {
        id: 'task-4',
        title: 'In progress task',
        status: 'doing',
        priority: 'urgent',
        assignee: 'Developer',
        tags: ['wip'],
        createdAt: new Date(),
      },
      'task-5': {
        id: 'task-5',
        title: 'Completed task',
        status: 'done',
        priority: 'medium',
        assignee: 'Developer',
        tags: ['completed'],
        createdAt: new Date(),
      },
    },
  },
};

/**
 * Maximum 6 columns configuration
 */
export const MaximumSixColumns: Story = {
  args: {
    initialColumns: [
      { id: 'backlog', title: 'Backlog', color: '#9ca3af', taskIds: ['task-1'] },
      { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-2'] },
      { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-3'] },
      { id: 'review', title: 'Review', color: '#f59e0b', taskIds: ['task-4'] },
      { id: 'testing', title: 'Testing', color: '#8b5cf6', taskIds: ['task-5'] },
      { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-6'] },
    ],
    initialTasks: {
      'task-1': {
        id: 'task-1',
        title: 'Backlog item',
        status: 'backlog',
        priority: 'low',
        tags: ['future'],
        createdAt: new Date(),
      },
      'task-2': {
        id: 'task-2',
        title: 'Todo item',
        status: 'todo',
        priority: 'medium',
        tags: ['planned'],
        createdAt: new Date(),
      },
      'task-3': {
        id: 'task-3',
        title: 'In progress item',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Developer 1',
        tags: ['active'],
        createdAt: new Date(),
      },
      'task-4': {
        id: 'task-4',
        title: 'Review item',
        status: 'review',
        priority: 'high',
        assignee: 'Developer 2',
        tags: ['review'],
        createdAt: new Date(),
      },
      'task-5': {
        id: 'task-5',
        title: 'Testing item',
        status: 'testing',
        priority: 'medium',
        assignee: 'QA Engineer',
        tags: ['testing'],
        createdAt: new Date(),
      },
      'task-6': {
        id: 'task-6',
        title: 'Done item',
        status: 'done',
        priority: 'low',
        assignee: 'Team',
        tags: ['completed'],
        createdAt: new Date(),
      },
    },
  },
};
