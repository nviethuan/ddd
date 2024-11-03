# Start MongoDB Replica Set

1. Start replica set
```bash
docker compose up -d
```

2. Get IPs of the containers
```bash
docker network inspect mongo-replica-set_mongo-network
```

3. Set the IPs in the ./scripts/setup.sh file

4. Run the setup script
```bash
docker compose -f docker-compose.setup.yml up -d
```
