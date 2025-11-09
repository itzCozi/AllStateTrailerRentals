# Multi-stage build for SvelteKit (adapter-node)
# Builder stage
FROM node:20-alpine AS builder

# Enable corepack to use pnpm
RUN corepack enable

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the source and build
COPY . .
RUN pnpm build

# Runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only what we need at runtime
COPY --from=builder /app/build ./build
# Copy package.json to preserve ESM "type": "module"
COPY package.json ./package.json

# Create place for persistent JSON database files; will be mounted as a volume
RUN mkdir -p /app/database
VOLUME ["/app/database"]

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

# Start the SvelteKit node server
CMD ["node", "build/index.js"]
