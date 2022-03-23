FROM node:14 AS package-install
WORKDIR /app
COPY dist .
COPY package.json .


RUN yarn install
RUN wget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem


FROM gcr.io/distroless/nodejs:14
COPY --from=package-install /app /app
WORKDIR /app
ENV NODE_ENV=production
CMD ["src/index.js"]