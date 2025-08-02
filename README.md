# Medix - Medical Management System

React + Node.js + MongoDB application with Docker support.

## 🚀 Quick Start

### Local Development (Hot Reloading)

```bash
# 1. Clone & setup
git clone <your-repo-url>
cd medix
cp frontend/env.example frontend/.env
cp backend/env.example backend/.env

# 2. Start development
docker-compose -f docker-compose.dev.yml up --build

# 3. Access
Frontend: http://localhost:3001
Backend: http://localhost:4000
MongoDB Express: http://localhost:8081 (development only)

# 4. Stop development (Ctrl+C or new terminal)
docker-compose -f docker-compose.dev.yml down

# 5. Restart development
docker-compose -f docker-compose.dev.yml up --build

# 6. If package install
docker-compose -f docker-compose.dev.yml down
docker volume prune
docker-compose -f docker-compose.dev.yml up --build

```

### Production Deployment (VPS)

```bash
# 1. Install Docker & Docker Compose (Ubuntu)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
exit && ssh back

# 2. Clone & setup
git clone <your-repo-url>
cd medix
cp frontend/env.example frontend/.env
cp backend/env.example backend/.env
nano frontend/.env  # Update REACT_APP_BACKEND_ENDPOINT=https://yourdomain.com/api
nano backend/.env   # Update CORS_ORIGIN=https://yourdomain.com

# 3. Start production
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --build -d

# 4. Setup SSL (optional)
sudo apt install certbot
sudo certbot certonly --standalone -d vedicmedix.in -d www.vedicmedix.in
# Certificates will be used automatically by Docker nginx

# 5. Clean MongoDB (optional, wipes all data!)
docker-compose -f docker-compose.prod.yml down
docker volume rm mongodb_prod
docker-compose -f docker-compose.prod.yml up --build -d
```

## 📁 Project Structure

```
medix/
├── backend/          # Node.js API
├── frontend/         # React App
├── nginx/            # Production nginx
├── docker-compose.yml           # Production
├── docker-compose.dev.yml       # Development
├── docker-compose.prod.yml      # Production with nginx
├── init-letsencrypt.sh          # SSL setup
├── renew-ssl.sh                 # SSL renewal
```

## 🔍 Checking Logs in Production

To debug or monitor your production containers, use these commands:

### Nginx Logs

```bash
docker-compose -f docker-compose.prod.yml logs nginx
```

### Backend Logs

```bash
docker-compose -f docker-compose.prod.yml logs backend
docker logs medix-backend-dev-1
```

- Use these commands to see real-time logs and troubleshoot issues.
- You can also add `-f` to follow logs live:
  ```bash
  docker-compose -f docker-compose.prod.yml logs -f nginx
  docker-compose -f docker-compose.prod.yml logs -f backend
  ```
