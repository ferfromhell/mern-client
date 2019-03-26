# Stage 1 buid my app npm run build


FROM node:alpine as build-stage
WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY ./ /app/
RUN npm run build

# # # Stage 2 ngnix proxy configuration
FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 6543
CMD ["nginx", "-g", "daemon off;"]


# stage 2 npm run build locally
# FROM nginx:alpine
# COPY default.conf /etc/nginx/conf.d/default.conf
# COPY ./build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]




# Ivans explanation
# FROM nginx:alpine
# # RUN rm /etc/nginx/conf.d/*
# COPY proxy.conf /etc/nginx.conf.d/
# WORKDIR /srv/www/static

# COPY ./build .
