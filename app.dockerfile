FROM nginx

RUN mkdir /app
COPY ./nginx/app.conf /etc/nginx/conf.d/default.conf
COPY ./frontend/build /app
RUN chmod -R 777 /app
