FROM node:20-alpine
RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./

RUN mkdir -p apps/simulator
COPY apps/simulator/package.json ./apps/simulator/

RUN pnpm install --frozen-lockfile --filter simulator...

COPY . .

CMD ["pnpm", "--filter", "simulator", "run", "start"]