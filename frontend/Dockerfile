# ====== BUILD ======
FROM node:22.17-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.12.4 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# ====== PRODUCTION ======
FROM node:22.17-alpine AS production

RUN addgroup -S app && adduser -S -G app app

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN chown -R app:app /app

USER app

EXPOSE 3000

CMD ["pnpm", "start"]