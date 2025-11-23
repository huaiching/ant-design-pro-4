ARG BASEIMAGE_UI=suzeisnexus03.exigengroup.com:5001/base-ui-image:1.0.1

# Set base image first
FROM ${BASEIMAGE_UI}

# Set environment variable
ENV WEB_DIR=/user/lib/mli/web

# Copy web app
ADD cicd_build ${WEB_DIR}

# Configure listen ports
# container:3000, micro:3001
EXPOSE 3000-3001

# Set working directory
WORKDIR ${WEB_DIR}

# Run web-server
CMD node server.js