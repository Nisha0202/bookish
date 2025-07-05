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

Frontend: [https://bookish-frontend-snowy.vercel.app/books](https://bookish-frontend-snowy.vercel.app/books)  
Backend API: [https://bookish-backend-taupe.vercel.app](https://bookish-backend-taupe.vercel.app)

## Folder Structure

bookish/
  backend/
    public/
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
