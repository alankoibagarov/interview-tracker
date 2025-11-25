# Interview Tracker

A full‑stack web application to manage, track, and analyze interviews. It includes authentication, a dashboard with stats, and CRUD operations for interviews.

## Tech Stack

- Backend: NestJS, TypeORM, PostgreSQL, JWT, Config Module
- Frontend: React + Vite, TypeScript, Tailwind CSS, @heroicons/react (icons)
- Testing: Jest, Supertest
- Dev: Docker (optional), ESLint + Prettier

## Repository Structure

```
interview-tracker/
├─ backend/                     # NestJS API
│  ├─ src/
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ auth/                 # Auth module (JWT)
│  │  ├─ interviews/           # Interviews module
│  │  └─ users/                # Users service/entity
│  ├─ test/                    # e2e tests
│  ├─ package.json
│  └─ ...
├─ frontend/                   # React client
│  ├─ src/
│  │  ├─ components/           # Reusable UI components
│  │  ├─ const/                # Constants
│  │  ├─ helpers/              # Helper functions
│  │  ├─ layouts/              # Page layouts
│  │  ├─ pages/                # Route pages
│  │  ├─ routing/              # Router configuration
│  │  ├─ services/             # API service calls
│  │  ├─ store/                # State management (Redux/Zustand)
│  │  ├─ test/                 # Tests
│  │  └─ App.tsx
│  ├─ index.html
│  ├─ package.json
│  └─ ...
├─ docker-compose.yml          # (Optional) PostgreSQL container
├─ README.md
└─ LICENSE
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL (local or Docker)

### 1) Clone

```sh
git clone https://github.com/alankoibagarov/interview-tracker.git
cd interview-tracker
```

### 2) Environment

Create `.env` in root folder:

```ini
# App
PORT=3000
NODE_ENV=development
JWT_SECRET=ABCD1234

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=mydb

# Typical Postgres URL used by ORMs (Prisma/TypeORM/etc.)
DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# Frontend
VITE_API_LINK=http://localhost:3000
```

These map to `TypeOrmModule.forRoot` in `backend/src/app.module.ts`.

### 3) Install

```sh
cd backend && npm install
cd ../frontend && npm install
```

### 4) Database Setup (TypeORM)

```sh
cd backend
npm run typeorm migration:run
```

Optional: Seed initial data

```sh
npm run seed
```

### 5) Run

Backend (http://localhost:3000):

```sh
cd backend
npm run start:dev
```

Frontend (http://localhost:5173):

```sh
cd frontend
npm run dev
```

## Useful npm Scripts

Backend:

- `npm run start:dev` – run Nest in watch mode
- `npm run test` – unit tests
- `npm run test:e2e` – end‑to‑end tests (Supertest)
- `npm run lint` – run ESLint
- `npm run typeorm migration:run` – run database migrations
- `npm run seed` – seed initial data

Frontend:

- `npm run dev` – start Vite dev server
- `npm run build` – build for production
- `npm run preview` – preview production build locally

## API Overview (Backend)

- `POST /auth/login` – returns `{ access_token }` for valid credentials
- `GET /interviews` – list user interviews (auth required)
- Additional CRUD endpoints exist under `/interviews`.

## Docker Setup (Optional)

Run PostgreSQL in Docker:

```sh
docker-compose up -d
```

## Development Notes

- TypeORM runs with `synchronize: true` in development; disable for production.
- Ensure `.env` is added to `.gitignore` before committing.

## Testing

Run unit tests:

```sh
cd backend
npm run test
```

Run e2e tests:

```sh
cd backend
npm run test:e2e
```

## Contributing

Issues and PRs are welcome. Please run lint and tests before submitting.

## License

This project is licensed under the MIT License.
