FROM mhart/alpine-node:latest
EXPOSE 3000
WORKDIR /app
COPY . /app
CMD ["npm", "start"]