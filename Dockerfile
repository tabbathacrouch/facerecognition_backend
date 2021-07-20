FROM node:16.5.0

# Create app directory
RUN mkdir -p /usr/src/facerecognition_backend
WORKDIR /usr/src/facerecognition_backend

# Install app dependencies
COPY package.json /usr/src/facerecognition_backend
RUN npm install


# Bundle app source
COPY . /usr/src/facerecognition_backend


# Build arguments
ARG NODE_VERSION=16.5.0

# Environment
ENV NODE_VERSION $NODE_VERSION