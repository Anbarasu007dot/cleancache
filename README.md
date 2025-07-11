# CleanCache – API Optimization with Redis

 A simple Node.js + Express project that uses Redis caching to improve API performance.  
 Fully containerized using Docker and docker-compose.

 Features
-  Caches repeated API requests using Redis
-  Improves response speed by avoiding duplicate processing
-  Runs with Docker (Node + Redis)
-  TTL (expiry) to avoid stale cache

 Tech Stack
- Node.js
- Express.js
- Redis
- Docker & Docker Compose

 How It Works
1. User sends a request like `/weather?city=delhi`
2. App checks Redis for cached result
3. If not cached, it generates a result, stores it in Redis for 30 seconds
4. On repeated request, serves cached response instantly

 Run Locally (Docker Required)
docker-compose up
