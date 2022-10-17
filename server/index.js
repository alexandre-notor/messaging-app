const http = require('http');
const fs = require('fs');


//function pour le sauvegarde des Messages
function saveMessage(data) {
    let [key, value] = data.toString('utf-8').split('=');
    if (key === 'message') value = decodeURIComponent(value);

    try {
        const oldMessage = JSON.parse(fs.readFileSync('./messages', 'utf-8'));
        oldMessage.messages.push(value);
        fs.writeFileSync('./messages', JSON.stringify(oldMessage))
    } catch (e) {
        fs.writeFileSync('./messages', JSON.stringify({ messages: [value] }))
    }
}




const server = http.createServer();

server.on("request", (req, res) => {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader("Access-Control-Allow-Origin", "*")

    if (req.url == '/put') {

        req.on('data', (data) => saveMessage(data));
        res.statusCode(200)
    } else if (req.url == '/get') {
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
