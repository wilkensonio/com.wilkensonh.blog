# Frontend Dockerfile
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies and build the project
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve build with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80
