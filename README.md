# 🚀 Eco Tracker

Eco Tracke is a blockchain-based carbon emission tracking system. This project is built using a monorepo architecture with **Turborepo**, featuring a **NestJS** backend, a **Next.js** frontend, and a specialized **Simulator** for emission data.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20 or higher
- **pnpm**: v8 or higher (essential for workspace management)
- **Docker & Docker Desktop**: Required for the containerized setup
- **PostgreSQL**: Required only if running the project natively (Method 1)

---

## 🛠 Project Structure

```text
.
├── apps/
│   ├── server/       # Backend API (NestJS + Prisma)
│   ├── web/          # Frontend Dashboard (Next.js + Tailwind)
│   └── simulator/    # Emission data simulation script
├── packages/         # Shared configurations (ESLint, TSConfig)
├── docker-compose.yml # Orchestration for all services
└── pnpm-workspace.yaml
```

## 🚦 How to Run the Project

You can choose between running the project natively on your machine or using Docker for a fully isolated environment.

### Method 1: Running With Turborepo (Native)

1. **Database Setup**: Ensure PostgreSQL is running locally. Create an empty database and copy .env.example to .env in the **server** directory:

   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME"
   ```

2. **Setup All Environment**: Copy .env.example to .env in **server**, **simulator**, and **web** directory. And adjust the value

3. **Install Dependecies**
   ```
   pnpm install
   ```
4. **Database Migration**: Generate the Prisma client and push the schema to your local database:
   ```
   pnpm --filter server exec prisma migrate dev
   ```
5. **Start Development Mode**

   ```
   pnpm dev
   ```

   - Web: http://localhost:3000
   - Server: http://localhost:3001

### Method 2: Running with Docker Compose (Recommended)

Best for consistent environments. This method handles the database, migrations, and all service networking automatically. You just need docker and docker compose installed.

1. **Environment Configuration**: Copy .env.example to .env in the **root** directory and make sure your .env file uses 0.0.0.0 for the host and refers to the service name for connectivity:

   ```
   SERVER_PORT=3001
   API_URL=http://server:3001
   DB_HOST=db
   DB_PORT=5432
   ```

2. **Build and Launch**:

   ```
   docker compose up --build
   ```

3. **Automatic Migrations**: The server container is configured to run prisma migrate deploy automatically. It uses a healthcheck to ensure the database is ready before starting the migration.

4. **Background Launch** (optional): After build, run this following command to run service in the background:

   ```
   docker compose up -d
   ```
