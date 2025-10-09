# Interview Flow

Interview Flow is a full-stack web application designed to help users manage, track, and analyze upcoming and past interviews. It features a dashboard, statistics, and a user-friendly interface for efficient interview management.

## Packages

### Backend

- [NestJS](https://nestjs.com/) - Node.js framework
- [Jest](https://jestjs.io/) - Testing framework

### Frontend

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Frontend build tool
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Folder Structure

```
interview-tracker/
├── backend/         # NestJS backend API
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   ├── main.ts
│   │   └── interviews/
│   │       ├── interview.entity.ts
│   │       ├── interviews.controller.ts
│   │       ├── interviews.module.ts
│   │       └── interviews.service.ts
│   ├── test/
│   ├── package.json
│   └── ...
├── frontend/        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── InterviewsTable.tsx
│   │   │   └── Navigation.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Home.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md        # Project overview
└── ...
```

## How to Run the Application

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### 1. Clone the Repository

```sh
git clone https://github.com/alankoibagarov/interview-tracker.git
cd interview-tracker
```

### 2. Install Dependencies

Install backend dependencies:

```sh
cd backend
npm install
```

Install frontend dependencies:

```sh
cd ../frontend
npm install
```

### 3. Run the Backend

```sh
cd backend
npm run start:dev
```

The backend server will start on [http://localhost:3000](http://localhost:3000).

### 4. Run the Frontend

```sh
cd frontend
npm run dev
```

The frontend will start on [http://localhost:5173](http://localhost:5173) by default.

## Features

- Dashboard for upcoming and past interviews
- Interview CRUD operations
- Statistics and analytics
- Modern UI with React and Tailwind CSS

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
