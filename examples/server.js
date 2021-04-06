const RoamPrivateApi = require( '../RoamPrivateApi.js' );
const secrets = require( '../secrets.json' );
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
//create a server object:

const api = new RoamPrivateApi( secrets.graph, secrets.email, secrets.password, {
	headless: true,
	folder: './tmp/',
} );


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    console.log(req.body);
    res.send('hello world')
})

app.post('/query', async function (req, res) {
    console.log(req.body);
    try {
        let result = await api.runQuery(req.body.query);
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})


app.post('/', function (req, res) {
    console.log(req.body);
    res.send('hello world')
})


async function run() {
    console.log('Logging into Roam...')
	await api.logIn();
    console.log('Started server...')
    app.listen(3000);
}
run();

