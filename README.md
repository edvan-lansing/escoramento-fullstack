# Escoramento Platform

Fullstack monorepo inspired by Escoramento.com.

The project contains:
- Public website
- Admin CMS
- Backend API

## Architecture

```
escoramento-fullstack
├── frontend/web
├── cms/admin
└── backend
```

## Applications

### Frontend (Website)
- Next.js app for the public-facing pages
- Component architecture with reusable UI blocks
- Internationalization (pt/en)

### CMS (Admin Panel)
- Next.js admin panel for product management
- Tailwind CSS UI (Material UI removed)
- Product CRUD and image upload integration
- Authentication with role-based actions

### Backend (API)
- Node.js + Express REST API
- Mongoose models for MongoDB
- Authentication, validation and upload middleware

## Tech Stack

Frontend:
- Next.js
- React
- Material UI
- next-intl (i18n)

CMS:
- Next.js
- React
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express
- MongoDB + Mongoose
- Multer

## Running Locally

Install and run each app in its own folder.

### Backend

```bash
cd backend
npm install
npm run dev
```

### CMS

```bash
cd cms/admin
npm install
npm run dev
```

### Frontend

```bash
cd frontend/web
npm install
npm run dev
```

## Notes

- The CMS config sets `turbopack.root` for monorepo compatibility.
- If you use different ports or hosts locally, update API base URLs accordingly.
