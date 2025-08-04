FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy source code and data
COPY . .

# Expose port
EXPOSE 2311

# Start the application
CMD ["npm", "start"] 