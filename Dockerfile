FROM node:14 AS Build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run gen:prisma:generate
ENV PSQL_URL="postgres://127.0.0.1:5432"
ENV REDIS_URL="redis://127.0.0.1:6380"
EXPOSE 80
CMD ["yarn", "dev"]


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