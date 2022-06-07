FROM timbru31/node-alpine-git
COPY ./web-3dbp-visualization/. /visualization
WORKDIR /visualization
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000/tcp