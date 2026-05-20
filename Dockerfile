# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Build backend
FROM node:20-alpine AS backend-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/src ./src
COPY server/tsconfig.json ./
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS production
WORKDIR /app

# Install serve for static files
RUN npm install -g serve

# Copy backend
COPY --from=backend-builder /app/server/dist ./server/dist
COPY --from=backend-builder /app/server/package*.json ./server/
COPY --from=backend-builder /app/server/node_modules ./server/node_modules

# Copy frontend static files
COPY --from=frontend-builder /app/dist ./dist

# Environment
ENV NODE_ENV=production
ENV PORT=3001
ENV DATA_DIR=/app/server/data

# Create data directory
RUN mkdir -p /app/server/data

EXPOSE 3001

# Start script
COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]
