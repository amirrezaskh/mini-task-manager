# Frontend Documentation

The frontend is a modern React application built with TypeScript, Material-UI, and Vite. It provides a responsive, user-friendly interface for the Mini Task Manager with clean architecture and reusable components.

## Technology Stack

### Core Technologies
- **React 19.1.1**: Latest React with modern hooks and features
- **TypeScript**: Type safety and enhanced developer experience
- **Vite**: Fast build tool and development server
- **Material-UI v7**: Complete component library with theming

### Key Dependencies
- **React Router v7**: Client-side routing and navigation
- **Styled Components**: CSS-in-JS for custom styling
- **Day.js**: Lightweight date manipulation library
- **MUI Date Pickers**: Advanced date/time selection components

## Project Architecture

### Feature-Based Structure
The frontend follows a feature-based architecture that promotes modularity and scalability:

```
src/
├── app/                    # Application shell
│   ├── layout/            # Navigation and layout components
│   └── router/            # Routing configuration
├── features/              # Feature-specific modules
│   ├── auth/              # Authentication features
│   ├── tasks/             # Task management features
│   └── about/             # About page
├── theme/                 # Material-UI theme configuration
├── lib/                   # Shared utilities
└── types/                 # TypeScript type definitions
```

### Design Principles
- **Component Composition**: Small, reusable components
- **Type Safety**: Comprehensive TypeScript usage
- **Responsive Design**: Mobile-first approach
- **Theme Consistency**: Centralized design system
- **Performance**: Optimized bundle size and loading

