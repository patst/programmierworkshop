FROM node:11.9.0-alpine

ADD . /page
WORKDIR /page
RUN npm install -g http-server

EXPOSE 8080

CMD ["/usr/local/bin/http-server"]