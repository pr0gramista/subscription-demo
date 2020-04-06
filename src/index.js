const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send({ message: 'Hello there!' }))

const writeData = (res, id = 0, type = 'dummy', data) => {
  res.write('id: ' + id + '\n');
  res.write('event: ' + type + '\n')
  res.write('data: ' + JSON.stringify(data) + '\n\n');
}

app.get('/stream', (req, res) => {
  let counter = 0;

  req.socket.setTimeout(2147483647); // Really looooong timeout

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.write('\n');

  writeData(res, counter, 'hello', { message: 'This is one of the data package!' })

  req.on('close', () => {
    console.log('Socket closed!')
  });
})

app.listen(8080, () => console.log('Listening'))