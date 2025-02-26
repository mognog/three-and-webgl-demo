# Development Workflow and Code Structure

## Code Organization
- Separate logic into **modular files**:
  - `graphics.js` → Rendering logic
  - `ai.js` → AI API calls
  - `ui.js` → UI and interactivity
  - `utils.js` → Shared utility functions
  - `constants.js` → Configuration and constants
- Use **descriptive function and variable names**.
- Follow **ES6+ module structure** for maintainability.
- Implement **state management patterns** for complex UI states.
- Maintain **strict separation of concerns** between different parts of the application.
- Keep files at a **manageable size** (under 300-400 lines) by breaking into smaller modules.
- **Validate file names** against project conventions to prevent hard-to-spot errors (e.g., `classifier.json` not `classifier,json`).

Related: See rendering-performance-and-interaction.md for graphics code organization and ai-integration-and-ux.md for AI module structure.

## Development Workflow
- Use **Vite or similar tools** for efficient development builds.
- Enforce **code linting** with ESLint or Prettier.
- Maintain a **consistent folder structure** for assets and logic.
- Add **unit tests** for critical functionality.
- Implement **continuous integration** for automated testing.
- Add **automated filename validation** in CI/CD pipelines to catch naming inconsistencies.

Related: See testing-and-quality-assurance.md for testing practices and deployment-and-optimization.md for CI/CD pipelines.

## Code Readability
- Use **clear function and variable names**.
- Include **code comments** where needed.
- Follow consistent **indentation and formatting styles**.
- Add **TypeScript or JSDoc** for better type safety and documentation.
- Implement **error boundaries** to isolate and debug issues.
- Break down **complex functions** into smaller, more manageable pieces.

Related: See error-handling-and-debugging.md for error boundary implementation.

## Graphics Code Organization
- Separate **initialization** from **rendering** logic in graphics components.
- Create **explicit lifecycle methods** (init, display, hide, destroy) for UI components.
- Use **factory patterns** for creating complex objects like 3D scenes.
- Implement **state management** for tracking component visibility and readiness.
- Add **debug flags** that can be toggled to show/hide helper objects.
- Create **dedicated utility classes** for common 3D operations.

## Error Prevention Patterns
- Use **initialization guards** to prevent multiple initialization of the same component.
- Implement **safe DOM manipulation** patterns that preserve references.
- Add **explicit dependency injection** to make component dependencies clear.
- Create **validation methods** that verify component state before operations.
- Use **feature detection** instead of assuming browser capabilities.

## Browser API Best Practices
- Follow **browser-recommended patterns** for performance-sensitive APIs like Canvas and WebGL.
- Create **utility functions** that encapsulate browser API best practices.
- Implement **factory functions** that set up Canvas and WebGL contexts with optimal settings.
- Add **performance-focused wrappers** around frequently used browser APIs.
- Document **browser-specific optimizations** in code comments.
- Create **shared context configuration** objects for consistent API usage.

Related: See rendering-performance-and-interaction.md for specific rendering API optimizations.
