# Minimal Library Management System 📚

A clean, minimal library management system built with React, Redux Toolkit Query, TypeScript, Node.js, Express and MongoDB.

## Features

- Book CRUD: Add, edit, delete, list, and view details.
- Borrow books with quantity and due date.
- Borrow summary aggregate.
- Optimistic UI, toast notifications, responsive, type-safe forms.
- No authentication; public access.

## Tech Stack

- **Frontend:** React + TypeScript + RTK Query + Tailwind CSS
- **Backend:** Node.js + Express.js + Mongoose (MongoDB)

## Running Locally

### Backend

```bash
cd backend
npm install
cp .env.example .env # Edit with your MongoDB URL if needed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: [http://localhost:5173](http://localhost:5173)  
Backend API: [http://localhost:3000](http://localhost:3000)

## Folder Structure

bookish/
  backend/
    src/
      controllers/
      models/
      routes/
      index.ts
    .env
    package.json
    tsconfig.json
  frontend/
    src/
      app/
      components/
      features/
      pages/
      main.tsx
      App.tsx
      index.css
    tailwind.config.js
    package.json
    tsconfig.json
  README.md

---
