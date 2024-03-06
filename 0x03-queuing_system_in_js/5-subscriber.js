// Node Redis client subscriber
import { createClient } from 'redis';
const redis_Client = createClient();

redis_Client.on('error', (error) => {
  console.log(`Redis client not connected to server: ${error.message}`);
});

redis_Client.on('connect', () => {
  console.log('Redis client connected to the server');
});

redis_Client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    redis_Client.unsubscribe(channel);
    redis_Client.quit();
  }
});

redis_Client.subscribe('holberton school channel');
