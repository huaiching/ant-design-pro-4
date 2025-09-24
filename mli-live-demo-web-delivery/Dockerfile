ARG BASEIMAGE_UI=harbor.mli.com.corp/mli-custom-base/mli-node:18-slim-c06645

# Set base image first
FROM ${BASEIMAGE_UI}

# Set environment variable
ENV WEB_DIR=/user/lib/mli/web

# Copy web app
ADD cicd_build ${WEB_DIR}

# Configure listen ports
# container:3000, micro:3001
EXPOSE 8000-8003

# Set working directory
WORKDIR ${WEB_DIR}

# Set yarn ssl config
# RUN yarn config set strict-ssl false

# Run web-server
CMD node server.js