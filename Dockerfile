FROM node:14.19 AS Install

WORKDIR /app

COPY package.json .
COPY yarn.lock .

COPY apps/server/dist apps/server/dist
COPY apps/server/package.json apps/server/package.json
COPY apps/server/src/prisma/schema.prisma apps/server/dist/src/prisma/schema.prisma
COPY apps/server/src/prisma/migrations apps/server/dist/src/prisma/migrations
COPY apps/server/src/graphql/generated/generatedSchema.graphql apps/server/dist/src/graphql/generated/generatedSchema.graphql

COPY packages/domain/dist packages/domain/dist
COPY packages/domain/package.json packages/domain/package.json

COPY packages/third-api/dist packages/third-api/dist
COPY packages/third-api/package.json packages/third-api/package.json

COPY packages/tsconfig packages/tsconfig

RUN yarn install --production

COPY node_modules/.prisma .prisma
RUN mv .prisma node_modules/.prisma

FROM node:14.19-alpine3.15

ENV NODE_ENV="production"
COPY --from=Install /app /app
WORKDIR /app
CMD ["apps/server/dist/src/index.js"]