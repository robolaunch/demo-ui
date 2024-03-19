FROM node:alpine as build-stage

COPY . /app
WORKDIR /app
RUN npm install -s
RUN npm run build

FROM node:alpine as runtime-stage

WORKDIR /app
COPY --from=build-stage /app .

ARG BACKEND_URL
ARG KEYCLOAK_URL
ARG KEYCLOAK_REALM
ARG KEYCLOAK_CLIENT_ID

ENV BACKEND_URL=$BACKEND_URL
ENV KEYCLOAK_URL=$KEYCLOAK_URL
ENV KEYCLOAK_REALM=$KEYCLOAK_REALM
ENV KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID

EXPOSE 3000


CMD [ "sh", "-c", "sed -i 's|BACKEND_URL|${BACKEND_URL}|g' /app/src/config.js && sed -i 's|KEYCLOAK_URL|${KEYCLOAK_URL}|g' /app/src/config.js && sed -i 's|KEYCLOAK_REALM|${KEYCLOAK_REALM}|g' /app/src/config.js && sed -i 's|KEYCLOAK_CLIENT_ID|${KEYCLOAK_CLIENT_ID}|g' /app/src/config.js && npm start"]


