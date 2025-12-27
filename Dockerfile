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

RUN apk add --no-cache nginx libc6-compat

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_SHARP_PATH="/app/node_modules/sharp"

ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}

RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/nginx.conf

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app

EXPOSE 80

CMD node server.js & nginx -g "daemon off;"
