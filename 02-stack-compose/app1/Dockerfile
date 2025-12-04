FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Documentation purposes
EXPOSE 3000 
CMD ["node", "index.js"]

