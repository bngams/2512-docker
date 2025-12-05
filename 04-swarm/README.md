# Créer le cluster
# La machine host va servir de noeud master
docker swarm init
# (copier la commande join obtenue)

# Récupérer et noter le token 
docker swarm join-token -q worker
# Ou créer une variable pour stocker le token d'ajout au noeud master
SWARM_TOKEN=$(docker swarm join-token -q worker)
# Pour afficher le token $SWARM_TOKEN

# Récupérer l'adresse ip du noeud master
# Sur windows exécuter la commande docker info et regarder dans les informations qui apparaissent la ligne Node Address ou Manager Address
docker info | grep -w 'Node Address' | awk '{print $3}'
# Ou Créer une variable pour 
SWARM_MASTER_IP=$(docker info | grep -w 'Node Address' | awk '{print $3}')

# Créer un noeud worker
docker run -d --privileged --name worker-1 --hostname=worker-1 -p 12375:2375 docker:latest

# Connecter le noeud au master
## Option 1 : avec docker exec en direct
docker exec worker-1 docker swarm join --token "$(docker swarm join-token -q worker)" "$(docker info --format '{{.Swarm.NodeAddr}}'):2377"

## Option 2 Se connecter au worker-1
docker exec -it worker-1 /bin/sh
### et Lancer la commande docker swarm join dans le terminal du worker-1
### docker swarm join --token TOKEN IP_MASTER:2377
docker swarm join --token SWMTKN-1-XXX IP:2377

# Créer un second noeud worker (répéter)
docker run -d --privileged --name worker-2 --hostname=worker-2 -p 22375:2375 docker:latest
docker exec -it worker-2 /bin/sh
docker swarm join --token

# Expérience simple: utiliser les commandes docker services 
# Lancer un premier "container" à l'échelle du cluster
docker service create --replicas 1 --name web -p 8080:80 nginx
# lister les services
docker service ls
# lister les instances / containers / replicas du service web
docker service ps web 
# mise à l'échelle manuelle
docker service scale web=3

# Expérience cluster avec une stack docker (compose.yml)
https://docs.docker.com/engine/swarm/stack-deploy/