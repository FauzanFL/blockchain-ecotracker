FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./

RUN mkdir -p apps/server
COPY apps/server/package.json ./apps/server/

RUN pnpm install --frozen-lockfile --filter ./apps/server...

COPY . .

RUN pnpm --filter server exec prisma generate

EXPOSE 3001

CMD ["sh", "-c", "pnpm --filter server exec prisma migrate deploy && pnpm --filter server run dev"]