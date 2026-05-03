# Nexus Professional — Module 1 (User Profile & Auth)

This repository contains the complete implementation of **Module 1** for the Nexus Professional platform.

## 🚀 Overview
Module 1 handles the core identity layer of the platform, including user registration, authentication, professional profiles, skill management, portfolios, work history, certifications, and reviews.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, PostgreSQL, Multer (Uploads), JWT (Auth), Bcrypt (Security).
- **Frontend**: React 19, Vite, Tailwind CSS v3, Axios, React Router 7.
- **Design**: "Editorial Engine" protocol with premium dark/light mode support.

## 📦 Key Features
- **Premium UI**: Stunning bento-grid dashboard and animated auth pages.
- **Identity Trust**: Integrated verification request flow and verified badges.
- **Skill Matrix**: Dynamic management of professional skills with level tracking.
- **Career Timeline**: Chronological work history and resume-style public profiles.
- **Dockerized**: Full containerization support for local development and staging.

## ⚙️ Setup Instructions

### 1. Database Setup
Run the SQL files in order:
```bash
psql -U postgres -d SPM_db -f Module1/database/schema.sql
psql -U postgres -d SPM_db -f Module1/database/triggers.sql
```

### 2. Backend Setup
```bash
cd Module1/backend
npm install
# Configure .env based on .env.example
npm start
```

### 3. Frontend Setup
```bash
cd Module1/frontend
npm install
# Configure .env (VITE_API_URL=http://localhost:5001/api)
npm run dev
```

### 4. Docker Deployment
```bash
cd Module1
docker-compose up --build
```

## 🎨 Design System
The project follows the Nexus Pro tokens:
- **Primary**: #001736
- **Accent**: #89f5e7
- **Surface**: #f9f9ff (Light) | #00132e (Dark)
- **Typography**: Manrope (Headlines) & Inter (Body)
