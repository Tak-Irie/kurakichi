FROM node:14.19 AS Install

WORKDIR /app

ENV PSQL_URL="kurakichi-postgres_store-1"
ENV REDIS_URL="kurakichi-redis-1"
ENV NODE_ENV="production"

COPY package.json .
COPY yarn.lock .

COPY apps/server/dist apps/server/dist
COPY apps/server/package.json apps/server/package.json

COPY packages/domain/dist packages/domain/dist
COPY packages/domain/package.json packages/domain/package.json

COPY packages/third-api/dist packages/third-api/dist
COPY packages/third-api/package.json packages/third-api/package.json

COPY packages/tsconfig packages/tsconfig
COPY packages/prisma/src packages/prisma/src
COPY packages/prisma/package.json packages/prisma/package.json

RUN yarn install

RUN yarn run gen:prisma:generate

# RUN rm -rf node_modules/.prisma/*
# RUN cp packages/prisma/node_modules/.prisma node_modules/.prisma




EXPOSE 80

CMD ["sh"]


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