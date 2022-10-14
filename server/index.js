const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on("request", (req, res) => {
    if(req.url == '/send') {
        /**
         * Ici nous recevont le message d'un utilisateur, il faudra
         * l'enregistrer dans le fichier ./messages
         * Le format de donnée est le suivant:
         * {id: "0001", user: "Herilion", "text": "Je suis parti au Salon"}
         */
    } else if (req.url == '/receive') {
        /**
         * ici il faudra renvoyer des données encodé en JSON
         * Le format de donnée est le suivant:
         * {id: "0001", user: "Herilion", "text": "Je suis parti au Salon"}
         * Pour les données en JSON il faut que l'entête de la reponse soit
         * {"Content-Type": "application/json"}
         * Penser à Utiliser JSON.stringify() et JSON.parse()
        */

    } else {
        /**Ici nous devont verifier le type de la requêtte et permettre
         * une requêtte CORS en cas de besoin
        */
    }
})


server.listen(3010);
