FROM node:14.19 AS Install

WORKDIR /app

# ENV PSQL_URL="postgresql://test:test@postgres"
# ENV REDIS_URL="redis://redis"
# ENV REDIS_AUTH_URL="redis://redis"
# ENV SERVER_PORT=80
# ENV NODE_ENV="production"

COPY package.json .
COPY yarn.lock .

COPY apps/server/dist apps/server/dist
COPY apps/server/package.json apps/server/package.json
COPY apps/server/src/prisma/schema.prisma apps/server/dist/src/prisma/schema.prisma
COPY apps/server/src/prisma/migrations apps/server/dist/src/prisma/migrations

COPY packages/domain/dist packages/domain/dist
COPY packages/domain/package.json packages/domain/package.json

COPY packages/third-api/dist packages/third-api/dist
COPY packages/third-api/package.json packages/third-api/package.json

COPY packages/tsconfig packages/tsconfig

RUN yarn install --production

COPY node_modules/.prisma .prisma
RUN mv .prisma node_modules/.prisma
# CMD ["node", "apps/server/dist/src/index.js"]

FROM node:14.19-alpine3.15
ENV PSQL_URL="postgresql://test:test@postgres"
ENV REDIS_URL="redis://redis"
ENV REDIS_AUTH_URL="redis://redis"
ENV SERVER_PORT=80


COPY --from=Install /app /app
WORKDIR /app
EXPOSE 80
CMD ["apps/server/dist/src/index.js"]




# COPY modules/domain /modules/domain
# COPY modules/prisma /modules/prisma
# COPY apps/server /apps/server

# RUN yarn install -D typescript
# RUN yarn


# FROM node:14 AS Install
# WORKDIR /app
# # COPY . .
# COPY package.json .
# COPY yarn.lock .
# COPY modules/domain /modules/domain
# COPY modules/prisma /modules/prisma
# COPY apps/server /apps/server

# RUN yarn install

# CMD ["yarn", "dev:server"]