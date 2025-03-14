# Stage 1: Build Angular app
FROM node:18 as build
ARG API_URL=http://backend:8000/api/items
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN mkdir -p src/environments && \
    echo "export const environment = { production: true, apiUrl: '${API_URL}' };" > src/environments/environment.prod.ts
RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80