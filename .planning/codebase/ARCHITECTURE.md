# Architecture

## Pattern & Layers
- Traditional client-server architecture.
- Frontend React application consuming a Node.js Express backend API.
- Relational database layer with PostgreSQL.

## Data Flow
1. Client (Browser) makes HTTP requests to Frontend (port 3000/80) or Backend API (port 5001).
2. Backend routes handle business logic.
3. Backend queries PostgreSQL (port 5432).
4. Data flows back to client.

## Entry Points
- Frontend: `vite.config.js` -> `index.html` -> `src/`
- Backend: `server.js`
