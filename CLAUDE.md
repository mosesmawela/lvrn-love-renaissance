# LVRN - Love Renaissance Project Configuration

## Project Overview

This is a React + TypeScript + Vite application for LVRN (Love Renaissance) - a music label website featuring:
- Landing page with hero section
- Music/video embed players
- Firebase integration
- Supabase integration
- Framer Motion animations
- GSAP animations
- Three.js 3D elements

## Tech Stack

- **Framework**: React 19.2.3 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: CSS/Tailwind (see index.css)
- **Animations**: Framer Motion, GSAP
- **Backend**: Firebase, Supabase
- **3D**: Three.js

## Available Claude Agents

Located in `.claude/agents/`:

1. **frontend-developer** - Senior frontend developer for React/Vue/Angular
   - Use for: Component development, UI implementation, state management
   - Trigger: "@frontend-developer build a new section..."

2. **ui-ux-designer** - UI/UX specialist
   - Use for: Design improvements, UX audits, responsive design
   - Trigger: "@ui-ux-designer improve the layout..."

3. **code-architect** - System architecture expert
   - Use for: Refactoring, architecture decisions, code organization
   - Trigger: "@code-architect refactor the component structure..."

4. **test-generator** - Testing specialist
   - Use for: Writing tests, test coverage, testing strategies
   - Trigger: "@test-generator create tests for..."

## Available Skills

Located in `.claude/skills/`:

1. **react-best-practices** - 40+ React performance rules
   - Bundle optimization
   - Re-render optimization
   - Waterfall elimination
   - Server/Client component patterns

2. **web-performance-optimization** - Web performance techniques
   - Loading optimization
   - Rendering performance
   - Resource prioritization

3. **development/** - Development tools and utilities
   - Code quality
   - Debugging techniques
   - Development workflows

## Available Commands

Located in `.claude/commands/`:

1. **generate-tests.md** - Generate test cases for components
2. **optimize-bundle-size.md** - Analyze and reduce bundle size
3. **optimize-build.md** - Improve build performance
4. **performance-audit.md** - Full performance audit
5. **webapp-testing.md** - Comprehensive web app testing

## How to Use

### Using Agents
Mention an agent when you need specialized help:

```
@frontend-developer Create a new artist profile page with image gallery
```

### Using Skills
Reference skills when optimizing:

```
Use the react-best-practices skill to optimize the Hero component
```

### Using Commands
Commands can be referenced for specific tasks:

```
Run the performance-audit command on the homepage
```

## Project Structure

```
/
├── components/       # React components
├── assets/          # Static assets
├── public/          # Public files
├── src/             # Additional source files
├── .claude/         # Claude templates (agents, skills, commands)
├── dist/            # Build output
├── App.tsx          # Main app component
├── index.tsx        # Entry point
├── constants.ts     # App constants
└── types.ts         # TypeScript types
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Claude Integration

This project is configured with Claude Code templates for enhanced development assistance. The templates provide:

- Specialized agents for different development tasks
- Skills for React performance optimization
- Commands for testing and performance auditing
- Best practices for modern web development

For more information on Claude templates, visit: https://github.com/davila7/claude-code-templates
