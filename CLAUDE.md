# CLAUDE.md - AI Assistant Guidelines

This file provides guidance for AI assistants working with this repository.

## Repository Overview

**Repository:** claudecodesandbox
**Owner:** PaddyC
**Status:** New/Empty Repository (Sandbox Environment)

This is a sandbox repository used for experimentation and development with Claude Code and other AI assistants.

## Codebase Structure

```
claudecodesandbox/
├── CLAUDE.md          # This file - AI assistant guidelines
└── .git/              # Git version control
```

*Note: This repository is currently empty. Update this section as the codebase grows.*

## Development Workflow

### Branch Strategy

- **Main Branch:** Primary branch for stable code
- **Feature Branches:** Use descriptive names prefixed with `claude/` for AI-assisted development
- Always create feature branches for new work
- Keep commits atomic and well-documented

### Commit Guidelines

1. Write clear, descriptive commit messages
2. Use conventional commit format when applicable:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code refactoring
   - `test:` for test additions/changes
   - `chore:` for maintenance tasks

3. Include context in commit messages explaining *why* changes were made

### Code Review Process

- All changes should be reviewed before merging to main
- Use pull requests for collaboration
- Address review feedback promptly

## Key Conventions

### Code Style

*Define project-specific code style guidelines here as the project develops.*

- Follow language-specific best practices
- Maintain consistent formatting
- Write self-documenting code with meaningful names

### File Organization

*Update this section as the project structure evolves.*

- Keep related files grouped together
- Use clear, descriptive file and directory names
- Maintain a flat structure where possible, nest only when necessary

### Documentation

- Keep README.md updated with project overview
- Document public APIs and complex logic
- Use inline comments sparingly, only where code isn't self-explanatory

## Environment Setup

### Prerequisites

*List required tools and dependencies as they are added to the project.*

### Installation

*Document installation steps as the project develops.*

### Running the Project

*Add run commands and scripts as they are created.*

## Testing

*Document testing conventions and commands as tests are added.*

## AI Assistant Instructions

When working with this repository, AI assistants should:

### General Guidelines

1. **Read before writing:** Always understand existing code before making changes
2. **Minimal changes:** Make focused, targeted modifications
3. **Avoid over-engineering:** Keep solutions simple and appropriate for the task
4. **Security awareness:** Never introduce vulnerabilities or commit sensitive data
5. **Test changes:** Verify modifications work as expected

### Git Operations

1. Always work on feature branches, never directly on main
2. Commit frequently with meaningful messages
3. Push changes to remote after completing work
4. Create pull requests for review when appropriate

### Code Quality

1. Follow existing patterns and conventions in the codebase
2. Don't add unnecessary abstractions or complexity
3. Clean up any code you modify (but don't refactor unrelated code)
4. Ensure changes don't break existing functionality

### Communication

1. Explain significant changes and their rationale
2. Ask clarifying questions when requirements are unclear
3. Report any issues or blockers encountered
4. Provide clear summaries of completed work

## Troubleshooting

*Add common issues and solutions as they are discovered.*

## Resources

*Add helpful links and documentation references as needed.*

---

*Last Updated: 2026-01-29*
