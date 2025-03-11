.PHONY: build up down restart logs clean

# Variables
DOCKER_COMPOSE = docker-compose

# Default target
all: build up

# Build the container
build:
	$(DOCKER_COMPOSE) build

# Start the container
up:
	$(DOCKER_COMPOSE) up -d

# Stop the container
down:
	$(DOCKER_COMPOSE) down

# Restart the container
restart: down up

# Show logs
logs:
	$(DOCKER_COMPOSE) logs -f

# Show website logs only
website-logs:
	$(DOCKER_COMPOSE) logs -f website

# Clean up unused Docker resources
clean:
	docker system prune -f