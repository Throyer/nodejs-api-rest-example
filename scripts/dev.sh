#!/bin/bash

if [ -z "$1" ]; then
  echo "missing 'up' or 'down' argument"
  exit
fi

if [ $1 = "up" ]; then
  docker-compose -f ./docker/docker-compose.dev.yml --env-file .env up -d
  exit
fi

if [ $1 = "down" ]; then
  docker-compose -f ./docker/docker-compose.dev.yml --env-file .env down
  exit
fi

echo "invalid argument"
