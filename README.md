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
```

### Production Deployment (VPS)

#### 1. Install Docker on VPS
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
exit && ssh back
```

#### 2. Deploy Application
```bash
# Clone code
git clone <your-repo-url>
cd medix

# Setup environment
cp frontend/env.example frontend/.env
cp backend/env.example backend/.env
nano frontend/.env  # Update REACT_APP_BACKEND_ENDPOINT=https://yourdomain.com/api
nano backend/.env   # Update CORS_ORIGIN=https://yourdomain.com

# Deploy
docker-compose -f docker-compose.prod.yml up --build -d
```

#### 3. Setup SSL (Optional)
```bash
# Install certbot
sudo apt install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Update nginx config and restart
docker-compose -f docker-compose.prod.yml restart nginx
```

## 📁 Project Structure
```
medix/
├── backend/          # Node.js API
├── frontend/         # React App
├── nginx/           # Production nginx
├── docker-compose.yml           # Production
├── docker-compose.dev.yml       # Development
├── docker-compose.prod.yml      # Production with nginx
├── init-letsencrypt.sh          # SSL setup
└── renew-ssl.sh                 # SSL renewal
```

## 📋 Useful Commands

### Development
```bash
# Start development
docker-compose -f docker-compose.dev.yml up --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development
docker-compose -f docker-compose.dev.yml down
```

### Production
```bash
# Start production
docker-compose -f docker-compose.prod.yml up --build -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Update application
git pull origin main
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --build -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```

### SSL Management
```bash
# Setup SSL
chmod +x init-letsencrypt.sh
./init-letsencrypt.sh

# Renew SSL
chmod +x renew-ssl.sh
./renew-ssl.sh

# Auto-renewal (add to crontab)
crontab -e
# Add: 0 12 1 * * /path/to/renew-ssl.sh
```

### Database
```bash
# Backup
docker-compose -f docker-compose.prod.yml exec mongo mongodump --out /data/backup/$(date +%Y%m%d)

# Restore
docker-compose -f docker-compose.prod.yml exec mongo mongorestore /data/backup/20241201/
```

## 📁 Project Structure

```
medix/
├── backend/                 # Node.js API server
│   ├── Dockerfile          # Production Dockerfile
│   ├── Dockerfile.dev      # Development Dockerfile
│   ├── env.example         # Environment variables template
│   └── src/
├── frontend/               # React application
│   ├── Dockerfile          # Production Dockerfile
│   ├── Dockerfile.dev      # Development Dockerfile
│   ├── env.example         # Environment variables template
│   └── nginx.conf          # Nginx configuration
├── nginx/                  # Production nginx config
│   └── nginx.conf
├── docker-compose.yml      # Production compose
├── docker-compose.dev.yml  # Development compose
├── docker-compose.prod.yml # Production with nginx
└── README.md
```



## 🐛 Troubleshooting

### Common Issues
```bash
# 404 Errors - Restart nginx
docker-compose -f docker-compose.prod.yml restart nginx

# Hot reloading not working - Restart dev
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build

# If still not working, check environment variables
docker-compose -f docker-compose.dev.yml exec frontend-dev env | grep CHOKIDAR

# Database connection - Check logs
docker-compose logs mongo

# SSL issues - Renew certificates
./renew-ssl.sh

# Port in use - Kill process
sudo lsof -i :3000
sudo kill -9 <PID>
```

 