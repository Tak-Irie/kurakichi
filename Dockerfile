FROM node:14 AS Build
WORKDIR /app
COPY . .
ENV NODE_ENV=production
RUN yarn install

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