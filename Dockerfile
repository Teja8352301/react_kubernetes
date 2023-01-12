FROM node:18-alpine3.14

WORKDIR /app/react

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx

EXPOSE 80

COPY --from=0 /app/react/build /usr/share/nginx/html