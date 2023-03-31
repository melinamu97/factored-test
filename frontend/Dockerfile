FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
ENV NODE_ENV production
EXPOSE 3000
CMD ["npm", "start"]

