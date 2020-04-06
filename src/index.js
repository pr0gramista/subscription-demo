const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { PubSub } = require('@google-cloud/pubsub');

const app = express()
const pubSubClient = new PubSub();

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send({ message: 'Hello there!' }))

const TOPIC_NAME = 'projects/YOUR_LOVELY_PROJECT/topics/files-update'

const writeData = (res, id = 0, type = 'dummy', data) => {
  res.write('id: ' + id + '\n');
  res.write('event: ' + type + '\n')
  res.write('data: ' + JSON.stringify(data) + '\n\n');
}

app.get('/stream', async (req, res) => {
  let counter = 0;

  const newSubName = 'files-update' + Math.round((Math.random() * 100000000)).toString(16);
  const [subscription] = await pubSubClient
    .topic()
    .createSubscription(newSubName); // You can set smaller expiration policy to make cleaning old subs faster!

  req.socket.setTimeout(2147483647); // Really looooong timeout

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.write('\n');

  writeData(res, counter, 'hello', { message: 'This is one of the data package!' })

  subscription.on('message', (message) => {
    counter++
    writeData(res, counter, 'hello', message.data)
  });

  req.on('close', () => {
    console.log('Socket closed!')
    subscription.close()
    subscription.delete()
  });
})

app.listen(8080, () => console.log('Listening'))