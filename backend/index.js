const express = require('express');
const { Server } = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketio = require('socket.io')
const expressWinston = require('express-winston');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config.json');
const Zork = require('./zork.js');
const log = require('./log');

const z = new Zork();

const app = express();
const server = Server(app);
const io = socketio(server)

app.use(cors());
app.use(bodyParser.json());
app.use(expressWinston.logger({
  winstonInstance: log,
  meta: false,
  colorize: true,
}));

app.get('/output', (req, res) => {
  res.json({ status: 'OK', output: z.lastOutput() });
});
app.post('/submit', (req, res) => {
  // const { submission } = req.body;
  z.write(req.body.submission);
  res.json({ status: 'OK' });
});
app.get('/', (req, res) => {
  res.json({ status: 'OK', data: 'hello world!' });
});

server.listen(config.express.port, () => log.info(`Server listening on ${config.express.port}`));
