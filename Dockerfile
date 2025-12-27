FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Download fonts
FROM base AS fonts
WORKDIR /app
RUN apk add --no-cache wget
RUN mkdir -p public/fonts

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY --from=fonts /app/public/fonts ./public/fonts

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Preserve your existing ARG and ENV
ARG NEXT_PUBLIC_URL_ARG
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL_ARG}
ENV NEXT_SHARP_PATH="/app/node_modules/sharp"

# Update font references to use local files

# Build the application
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Preserve your existing ARG and ENV
ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_SHARP_PATH="/app/node_modules/sharp"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static/feed.xml ./public/
COPY --from=builder /app/.next/static/sitemap.xml ./public/
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy the font files to the server directory
RUN mkdir -p .next/server/fonts
COPY --from=builder /app/public/fonts ./.next/server/fonts

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Command to run the application
CMD ["node", "server.js"]