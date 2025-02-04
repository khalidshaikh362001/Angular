FROM nginx:latest

RUN mkdir -p /nginxapps/config
RUN mkdir -p /nginxapps/html

COPY config /nginxapps/config/
COPY html /nginxapps/html/

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

