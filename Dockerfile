FROM node:16.20.0-alpine3.17 as develop-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# этап сборки (build stage)
FROM develop-stage as build-stage
#ENV API_URL "http://10.10.77.11:8086/api"
RUN npm run build #generate

# этап production (production-stage)
#FROM nginx:stable-alpine as production-stage
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build-stage /app/.output/public /usr/share/nginx/html
#EXPOSE 80
EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]
#RUN npm run build
RUN npm run preview
#CMD ["npm", "run", "preview"]
