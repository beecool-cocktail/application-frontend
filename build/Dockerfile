########## builder ##########
FROM node:20.10-alpine AS deps

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack pnpm@8.6.0 install --frozen-lockfile --ignore-scripts


########## builder ##########
FROM node:20.10-alpine AS builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build


########## runner ##########
FROM node:20.10-alpine AS runner

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

CMD ["yarn", "start", "-p", "8080"]