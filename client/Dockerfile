# Use an official Node runtime as a parent image
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1500

CMD ["npm", "start"]
