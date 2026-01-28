# Step 1: Use Node.js
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy project files
COPY . .

# Step 6: Build the Vite project
RUN npm run build

# Step 7: Install a simple server
RUN npm install -g serve

# Step 8: Expose port
EXPOSE 3000

# Step 9: Run the app
CMD ["serve", "-s", "dist", "-l", "3000"]
