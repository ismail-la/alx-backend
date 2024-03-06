// Node Redis client publisher
import { createClient } from 'redis';
const redis_Client = createClient();

redis_Client.on('error', (error) => {
  console.log(`Redis client not connected to server: ${error.message}`);
});

redis_Client.on('connect', () => {
  console.log('Redis client connected to the server');
});

function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    redis_Client.publish('holberton school channel', message);
  }, time);
}

publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);
