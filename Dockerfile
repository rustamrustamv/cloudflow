# Use Nginx as base image
FROM nginx:alpine

# Copy the entire src directory to the Nginx serve directory
COPY src/ /usr/share/nginx/html/

# Create custom Nginx config with stub_status enabled
RUN mkdir -p /etc/nginx/conf.d
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1