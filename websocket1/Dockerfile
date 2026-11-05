# --- STAGE 1: Dependencies ---
FROM node:22-alpine AS deps
WORKDIR /app

# Explicitly install and use npm 12.2.2
RUN npm install -g npm@12.2.2

# Copy package manifests first to leverage Docker cache
COPY package*.json ./

# Install all dependencies (including devDependencies needed for building)
RUN npm ci

# --- STAGE 2: Build ---
FROM node:22-alpine AS build
WORKDIR /app

# Explicitly install and use npm 12.2.2
RUN npm install -g npm@12.2.2

# 1. Copy your application source code files first
COPY . .

# 2. Overlay the clean, Alpine-compatible node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# 3. Build the NestJS application safely using Linux binaries
RUN npm run build

# Install only production dependencies to keep the final image slim
RUN npm prune --omit=dev && npm cache clean --force

# --- STAGE 3: Run ---
FROM node:22-alpine AS run
ENV NODE_ENV=production

# Set up the directory explicitly with correct user permissions
WORKDIR /app
RUN chown node:node /app

# Explicitly install and use npm 12.2.2 globally
RUN npm install -g npm@12.2.2

# Copy files while explicitly maintaining 'node' user ownership
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package*.json ./

# Switch to non-root user
# USER node

EXPOSE 3000

# Start the NestJS application
CMD ["node", "dist/main.js"]