FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ARG NEXT_PUBLIC_URL_ARG
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL_ARG}
ENV NEXT_SHARP_PATH="/app/node_modules/sharp"
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app

# Install dependencies including dumb-init for proper process management
RUN apk add --no-cache nginx libc6-compat dumb-init

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_SHARP_PATH="/app/node_modules/sharp"
ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}

# Create necessary directories
RUN mkdir -p /run/nginx /var/cache/nginx /var/log/nginx

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Create user (for file ownership, not for running process)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy application files
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app

# Create startup script
RUN cat > /app/start.sh <<'EOF'
#!/bin/sh
set -e

echo "Starting Next.js server..."
node server.js &
NEXTJS_PID=$!

echo "Starting nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

echo "Both processes started. Next.js PID: $NEXTJS_PID, Nginx PID: $NGINX_PID"

# Function to handle shutdown
shutdown() {
    echo "Shutting down gracefully..."
    kill -TERM $NGINX_PID 2>/dev/null || true
    kill -TERM $NEXTJS_PID 2>/dev/null || true
    wait $NGINX_PID $NEXTJS_PID
    exit 0
}

# Trap termination signals
trap shutdown SIGTERM SIGINT

# Wait for any process to exit
wait -n

# If we reach here, one process died
EXIT_CODE=$?
echo "A process exited with code $EXIT_CODE. Shutting down..."
kill -TERM $NGINX_PID 2>/dev/null || true
kill -TERM $NEXTJS_PID 2>/dev/null || true
exit $EXIT_CODE
EOF

RUN chmod +x /app/start.sh

EXPOSE 80

# Use dumb-init to handle signals properly
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/app/start.sh"]