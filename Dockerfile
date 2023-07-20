FROM node:lts-alpine as develop-stage

WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@9.8.1
RUN npm install
COPY . .

EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]
RUN npx browserslist@latest --update-db
RUN npm run build
CMD ["npm", "run", "dev"]
