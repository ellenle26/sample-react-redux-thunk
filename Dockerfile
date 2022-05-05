FROM node:14.17.6

RUN apt -y -q update && \
    apt -y -q install tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

WORKDIR /srv/
COPY . /srv/

RUN npm install

EXPOSE 3000
