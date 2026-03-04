# Admin Users Dashboard (React + TypeScript + Vite)

Practice project for a senior frontend interview task.

## Objective

Build a production-like admin dashboard using REST API data with:

- Users list page
- Search, filter, sort, pagination
- User details page
- Edit role/status in modal
- Local persistence via localStorage
- Unit and component tests
- Accessibility basics

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Vitest
- React Testing Library
- Docker + Docker Compose
- JSONPlaceholder API

## Features

- `/users` page with table
- Search by name/email
- Filter by role and status
- Sort by name (A-Z) and created date (newest)
- Pagination (5 per page)
- Loading, error, empty states
- `/users/:id` details page
- Edit modal for role and status
- Save edits to localStorage
- Keyboard-close modal with `Esc`
- Unit tests for filter/sort utilities
- Component test for list + filtering behavior

## Project Structure

```txt
src/
  api/
  components/
  features/
  hooks/
  pages/
  test/
  types/
  utils/
```

## Prerequisites

- Windows + WSL2
- Docker Desktop
- Git
- Node.js (optional for non-Docker run)

## Environment Setup

Create `.env` from `.env.example` and set your WSL UID/GID:

```bash
id -u
id -g
```

Example:

```env
UID=<your-id-u>
GID=<your-id-g>
```

## Run With Docker (Recommended)

```bash
docker compose down -v --remove-orphans
docker compose up --build
```

App URL:

- http://localhost:5173

## Install Dependencies Manually (If Needed)

```bash
docker compose run --rm web sh -lc "npm install --include=dev"
```

## Run Tests

```bash
docker compose run --rm web sh -lc "npm run test"
```

## Run Lint

```bash
docker compose run --rm web sh -lc "npm run lint"
```

## Build

```bash
docker compose run --rm web sh -lc "npm run build"
```

## Local Run Without Docker

```bash
npm install
npm run dev
```

## Data Source

- `GET https://jsonplaceholder.typicode.com/users`
- Role and status are augmented locally by user id
- Edit changes are persisted in localStorage

## Troubleshooting

Permission denied on `package-lock.json`:

```bash
sudo chown -R $(id -u):$(id -g) .
docker compose down -v
docker compose up --build
```

`vite: not found`:

- Dependencies were not installed in container volume

```bash
docker compose run --rm web sh -lc "npm install --include=dev"
```

## Git Workflow

Suggested commit order:

1. `chore: bootstrap project and docker setup`
2. `feat: users list with search filter sort pagination`
3. `feat: user details and edit modal with localStorage`
4. `test: add unit and component tests`
5. `fix: a11y and edge case handling`

## Definition of Done

- App runs via Docker
- All required pages and states implemented
- Tests pass
- Lint passes
- README is clear for a new developer to run quickly

## Learning Resources

- React: https://react.dev/learn
- TypeScript: https://www.typescriptlang.org/docs/
- Vite: https://vite.dev/guide/
- React Router: https://reactrouter.com/start
- Vitest: https://vitest.dev/guide/
- Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Docker Compose: https://docs.docker.com/compose/
- JSONPlaceholder: https://jsonplaceholder.typicode.com/
- WCAG: https://www.w3.org/WAI/standards-guidelines/wcag/
- web.dev Accessibility: https://web.dev/accessibility/
