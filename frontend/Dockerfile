# Step 1: Build React app
FROM node:22 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  

# Step 2: Serve using nginx
FROM nginx:stable-alpine

# Copy build to nginx html folder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
