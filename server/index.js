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



// funtion pour la lecture des messages
function readMessage() {
    try {
        return fs.readFileSync('./messages', 'utf-8');

    } catch (e) {
        return JSON.stringify({ messages: [] });
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
        res.setHeader("Content-Type", "Application/json");
        res.statusCode(200);
        res.write(readMessage());

    } else {
    res.statusCode(400)
    }
    res.end();
})


server.listen(3010);
