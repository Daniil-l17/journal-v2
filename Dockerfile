FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Сборка Next без Turbopack (в Docker стабильнее)
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npx next build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

USER nextjs

EXPOSE 5176
ENV PORT=5176
ENV HOSTNAME=0.0.0.0

CMD ["npm", "start"]
FROM node:22-alpine AS build

RUN apk add --no-cache git

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  npm ci

COPY . .

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/server.js ./server.js

COPY --from=build /app/node_modules ./node_modules

USER nextjs

EXPOSE 5176

ENV PORT=5176
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]