# Definition du template de l'image de base
FROM golang:1.21.6-alpine3.18


# Definition du repertoire de travail dans le conteneur
# WORKDIR <path-in-container>  
# sera cree si n'existe pas 
WORKDIR /app

# Copie des fichiers sources de l'application dans le conteneur
# COPY <source-from-host> <destination-path-in-container>
# COPY src/ /app => meme chose que WORKDIR /app + COPY src/ .
COPY src/ .

# Commandes pour installer les dependances et compiler l'application
# RUN = commande a executer dans le container
# mod download = telecharge les dependances definies dans go.mod
RUN go mod download
# compilation build de l'application avec sortie binaire dans /go/bin/app
RUN GOOS=linux go build -o /go/bin/app -v .

# Exposition du port d'ecoute de l'application
EXPOSE 8080

# Lancer l'application
# CMD = commande a executer au demarrage du container
CMD ["/go/bin/app"]

# Entrypoint permet de definir une commande principale avec des arguments optionnels
# ENTRYPOINT ["/go/bin/app"]   
# CMD ["arg1", "arg2"]