# -------------------------------------------
# Stage 1: Build the React App
# -------------------------------------------
FROM node:latest AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# -------------------------------------------
# Stage 2: Serve the App Using Nginx
# -------------------------------------------
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]