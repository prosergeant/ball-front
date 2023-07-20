FROM node:16.20.0-alpine3.17 as develop-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]
#RUN npx browserslist@latest --update-db
RUN npm run build
CMD ["node", ".output/server/index.mjs"]
#CMD ["npm", "run", "preview"]
