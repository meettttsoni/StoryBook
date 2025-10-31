# Kanban Board Component

A production-grade, fully-featured Kanban Board component built with React 18+, TypeScript, and Tailwind CSS. This component provides a complete task management solution with drag-and-drop functionality, responsive design, and comprehensive accessibility features.

![Kanban Board](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-blue) ![Storybook](https://img.shields.io/badge/Storybook-7.6+-pink)

## 📖 Live Storybook
👉 [View Storybook](https://meettttsoni.github.io/StoryBook/)

## 🚀 Features

### Core Functionality
- ✅ **Drag & Drop**: Smooth, intuitive drag-and-drop using @dnd-kit
- ✅ **Task Management**: Create, edit, delete, and move tasks between columns
- ✅ **Flexible Columns**: Support for 3-6 customizable columns
- ✅ **Task Details**: Title, description, priority, assignee, tags, and due dates
- ✅ **Visual Feedback**: Highlighted drop targets and drag overlays
- ✅ **Overdue Indicators**: Visual warnings for overdue tasks

### User Experience
- ✅ **Responsive Design**: 
  - Desktop: Multi-column horizontal scroll
  - Tablet: 2-column layout
  - Mobile: Stacked vertical view
- ✅ **Accessibility**: 
  - Full keyboard navigation (Tab, Enter, Space, Arrow keys)
  - ARIA roles and labels
  - Screen reader support
- ✅ **Smooth Animations**: Framer Motion powered transitions
- ✅ **Modern UI**: Clean, professional design with Tailwind CSS

### Performance
- ✅ **Optimized Rendering**: React.memo and useMemo for performance
- ✅ **Efficient State Management**: Custom hooks with Zustand-ready architecture
- ✅ **Lazy Loading**: Modal components load on demand
- ✅ **Virtualization Ready**: Structured for large datasets

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2+ | UI Framework |
| TypeScript | 5.3+ | Type Safety |
| Tailwind CSS | 3.4+ | Styling |
| Storybook | 7.6+ | Component Documentation |
| @dnd-kit/core | 6.1+ | Drag & Drop |
| Framer Motion | 11+ | Animations |
| date-fns | 3+ | Date Handling |
| clsx | 2.1+ | Conditional Classes |
| Vite | 5+ | Build Tool |

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone or navigate to the project directory
cd kanban-component

# Install dependencies
npm install

# Run development server
npm run dev

# Run Storybook
npm run storybook

# Build for production
npm run build

# Build Storybook
npm run build-storybook
```

### Project Structure

```
kanban-component/
├── README.md
├── package.json
├── .storybook/
│   ├── main.ts              # Storybook configuration
│   └── preview.ts           # Global Storybook settings
└── src/
    ├── components/
    │   ├── KanbanBoard/
    │   │   ├── KanbanBoard.tsx        # Main board component
    │   │   ├── KanbanColumn.tsx       # Column component
    │   │   ├── KanbanCard.tsx         # Task card component
    │   │   ├── TaskModal.tsx          # Task edit modal
    │   │   └── KanbanBoard.stories.tsx # Storybook stories
    │   └── primitives/
    │       ├── Button.tsx             # Reusable button
    │       ├── Modal.tsx              # Reusable modal
    │       └── Avatar.tsx             # User avatar
    ├── hooks/
    │   ├── useKanbanBoard.ts          # Board state management
    │   └── useDragAndDrop.ts          # Drag & drop logic
    ├── utils/
    │   ├── task.utils.ts              # Task utilities
    │   └── column.utils.ts            # Column utilities
    ├── types/
    │   └── index.ts                   # TypeScript types
    └── styles/
        └── globals.css                # Global styles
```

## 📖 Usage

### Basic Example

```tsx
import { KanbanBoard } from './components/KanbanBoard/KanbanBoard';
import { Column, Task } from './types';

const columns: Column[] = [
  { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1'] },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: [] },
];

const tasks: Record<string, Task> = {
  'task-1': {
    id: 'task-1',
    title: 'Implement feature',
    description: 'Add new functionality',
    status: 'todo',
    priority: 'high',
    assignee: 'John Doe',
    tags: ['frontend'],
    createdAt: new Date(),
  },
};

function App() {
  return (
    <KanbanBoard 
      initialColumns={columns} 
      initialTasks={tasks} 
    />
  );
}
```

### Custom Styling

```tsx
<KanbanBoard 
  initialColumns={columns} 
  initialTasks={tasks}
  className="custom-kanban-board"
/>
```

## 🎨 Storybook Stories

The component includes comprehensive Storybook stories:

1. **Default** - Normal board with sample data
2. **Empty** - Clean slate with no tasks
3. **LargeDataset** - 35+ tasks for performance testing
4. **MobileResponsive** - Mobile viewport demonstration
5. **InteractivePlayground** - Full feature showcase
6. **WithOverdueTasks** - Overdue task highlighting
7. **MinimalThreeColumns** - 3-column configuration
8. **MaximumSixColumns** - 6-column configuration

### Running Storybook

```bash
npm run storybook
```

Visit `http://localhost:6006` to explore all stories.

## 🎯 Component API

### KanbanBoard Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `initialColumns` | `Column[]` | Yes | Array of column configurations |
| `initialTasks` | `Record<string, Task>` | Yes | Object mapping task IDs to tasks |
| `className` | `string` | No | Additional CSS classes |

### Task Interface

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  tags: string[];
  createdAt: Date;
  dueDate?: Date;
}
```

### Column Interface

```typescript
interface Column {
  id: string;
  title: string;
  color: string;
  taskIds: string[];
}
```

## ♿ Accessibility Features

- **Keyboard Navigation**: Full support for keyboard-only users
  - `Tab` - Navigate between elements
  - `Enter/Space` - Activate buttons and open tasks
  - `Escape` - Close modals
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper use of HTML5 elements
- **Color Contrast**: WCAG AA compliant colors

## 📱 Responsive Breakpoints

- **Mobile** (< 640px): Stacked vertical layout
- **Tablet** (640px - 1024px): 2-column layout
- **Desktop** (> 1024px): Full horizontal scroll

## 🎭 Customization

### Custom Colors

Modify `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      priority: {
        low: '#your-color',
        medium: '#your-color',
        high: '#your-color',
        urgent: '#your-color',
      },
    },
  },
}
```

### Custom Animations

Add to `tailwind.config.js`:

```javascript
animation: {
  'custom-fade': 'customFade 0.3s ease-in-out',
},
keyframes: {
  customFade: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
}
```

## 🧪 Testing

The component is built with testability in mind:

- Modular architecture for easy unit testing
- Clear separation of concerns
- Custom hooks for isolated logic testing
- Storybook for visual regression testing

## 🚀 Performance Optimization

- **Memoization**: Components use `React.memo` and `useMemo`
- **Efficient Updates**: State updates are optimized
- **Lazy Loading**: Modal components load on demand
- **Optimized Re-renders**: Only affected components re-render

## 📝 Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configured for React and TypeScript
- Consistent naming conventions
- Comprehensive type definitions

### Best Practices
- Component composition over inheritance
- Custom hooks for reusable logic
- Utility functions for common operations
- Clear prop interfaces

## 🐛 Known Limitations

- Maximum 6 columns recommended for optimal UX
- Large datasets (100+ tasks) may benefit from virtualization
- Touch devices may have slight drag sensitivity differences

## 🔮 Future Enhancements

- [ ] Virtual scrolling for large datasets
- [ ] Task filtering and search
- [ ] Bulk operations
- [ ] Undo/redo functionality
- [ ] Export/import board state
- [ ] Real-time collaboration support
- [ ] Custom field types
- [ ] Advanced analytics

## 📄 License

This project is created as a demonstration component. Feel free to use and modify as needed.

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Adding comprehensive test coverage
- Implementing state persistence
- Adding backend integration
- Enhancing error handling
- Adding loading states

## 📞 Support

For questions or issues:
1. Check the Storybook documentation
2. Review the TypeScript types
3. Examine the example stories
4. Inspect the component source code

## 🎉 Acknowledgments

Built with modern React best practices and inspired by popular project management tools like Trello, Jira, and Asana.

---

**Live Storybook Demo**: [To be added after deployment]

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
