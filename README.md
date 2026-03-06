# Escoramento Platform

Fullstack platform inspired by the Escoramento.com website.  
This project includes a public website, an admin CMS, and a backend API to manage products and content.

The goal of this project is to demonstrate a modern **fullstack architecture** using React, Next.js, Node.js, and MongoDB.

---

# Architecture

This project is organized as a **monorepo** containing three main applications:

```
escoramento-fullstack
│
├── frontend / web (Next.js website)
├── cms / admin (React admin dashboard)
└── backend (Node.js API)
```

### Frontend (Website)
Public-facing website built with **Next.js** and **Material UI**, replicating the Escoramento interface and layout.

Features:
- Responsive layout
- Product listing
- UI components using MUI
- Internationalization (PT / EN)
- Modern component architecture

### CMS (Admin Panel)
Administrative interface to manage products and content.

Features:
- Product CRUD
- Product status control
- Image upload support
- Dashboard interface
- API integration

### Backend (API)
REST API built with **Node.js**, **Express**, and **MongoDB**.

Features:
- Product CRUD endpoints
- MongoDB integration with Mongoose
- File upload support
- Error handling middleware
- RESTful architecture

---

# Tech Stack

Frontend
- Next.js
- React
- Material UI
- next-intl (i18n)

CMS
- React
- Axios
- Dashboard UI

Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Multer (file uploads)

---

# Folder Structure

```

escoramento-fullstack
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── middleware
│   │   └── config
│   │
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── cms
│   └── admin
│
├── frontend
│   └── web
│
└── README.md
