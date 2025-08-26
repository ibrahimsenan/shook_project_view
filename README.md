# Dineo Restaurants Management Service

<p align="center">
  <img src="https://github.com/ibrahimsenan/shook_project_view/blob/main/UI/artboard321110.png?raw=true" width="700" />
</p>

## Project Discription
![Project Overview](https://github.com/ibrahimsenan/shook_project_view/blob/main/UI/flow/project_overview_one.jpg?raw=true)

#### Instalation

To install and run the project there are two ways:
Install node [Node](https://nodejs.org/en/download/), make sure docker is running and from the project root directory run:

```bash
npm install
```

##### Runing with docker service

- Install docker desktop [Docker](https://docs.docker.com/get-docker/), make sure docker is running

From the project root directory run

```bash
docker-compose build
```

After complete building

```bash
docker-compose up
```

##### Runing with npm node service

- Install [mongo](https://www.mongodb.com/), make sure it is running.
- Install caching and authontication server [redis](https://redis.io/docs/getting-started/installation/install-redis-on-windows/).

```bash
npm start
```

#### To add your mobile app or web app build it in:

```bash
development/services/mobile/
development/services/web/
```

development/services/mobile/DineoRestaurantApp

## Services Overview

#### [FrontEnd](//)

- Web Application

  - React

- Mobile Application
  - React Native
  - Flutter

#### Backend

- Nginx as proxy for all request from client
- MongoDB as main database
- Redis as instore database for session management
- Nodejs as Backend Server bewtween Frontend applications and DB
- Go Echo Webserver for Authentication
- Swagger for HTTP Endpoint Dokumentation
- Filebeat Log Data
- Kibana Log Analysis
- Elasticsearch Store Log Data
- Socket.io for real-time data

## Project Phases

## Running all project services
