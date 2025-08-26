FROM node:lts-alpine
ENV NODE_ENV=development

RUN apk add --no-cache python3 py3-pip
# RUN pip install PyPDF2

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --development --silent && mv node_modules ../
COPY . .
RUN npm install --global nodemon --unsafe-perm exp


EXPOSE 5000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
