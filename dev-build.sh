#!/bin/bash

# Create the network
docker network create mynetwork

# Build the Docker images
docker-compose build