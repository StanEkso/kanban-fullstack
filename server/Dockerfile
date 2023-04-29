# STAGE 1
FROM node:18-buster-slim AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD npm run start:prod