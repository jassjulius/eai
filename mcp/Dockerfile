# Build from the repository root so the index can be compiled from /entries:
#   docker build -f mcp/Dockerfile -t eai-mcp .
#   docker run --rm -p 3000:3000 eai-mcp
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY site/package.json site/
COPY mcp/package.json mcp/
RUN npm ci
COPY . .
RUN npm run build:index && npm run build -w mcp

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0 EAI_INDEX_PATH=/app/data/index.json
COPY package.json package-lock.json ./
COPY site/package.json site/
COPY mcp/package.json mcp/
RUN npm ci --omit=dev -w mcp && npm cache clean --force
COPY --from=build /app/mcp/dist mcp/dist
COPY --from=build /app/site/public/index.json data/index.json
EXPOSE 3000
USER node
CMD ["node", "mcp/dist/server.js", "--http"]
