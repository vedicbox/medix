# Use Node 22
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose API port
EXPOSE 4000

# Start backend server
CMD ["npm", "start"]
