########## deps ##########
FROM node:18.2-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts


########## builder ##########
FROM node:18.2-alpine AS builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build


########## runner ##########
FROM node:18.2-alpine AS runner

ARG REVISION_ID
LABEL revision_id=${REVISION_ID}

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV REVISION_ID=${REVISION_ID}

WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["pnpm", "start", "-p", "8080"]