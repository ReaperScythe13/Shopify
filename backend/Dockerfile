# Use an official Node.js runtime
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy schema
COPY prisma ./prisma
RUN npx prisma generate

# Copy app code
COPY . .

# Debug: Confirm Prisma Client generated
RUN ls -la node_modules/.prisma/client || echo "Client not generated"

# Expose app port
EXPOSE 5003

# Start the server
CMD ["node", "src/server.js"]










