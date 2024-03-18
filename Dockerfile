FROM node:alpine as build-stage
COPY . /app
WORKDIR /app
RUN npm install -s
RUN npm run build
FROM node:alpine as production-stage
COPY --from=build-stage /app/.next /app/.next
WORKDIR /app
CMD ["npm", "start"]
EXPOSE 3000