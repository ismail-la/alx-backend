// Install a redis instance

import { Client } from 'redis';
const redis_Client = Client();

redis_Client.on('error', (error) => {
  console.log(`Redis client not connected to server: ${error.message}`);
  redis_Client.quit();
});
redis_Client.on('connect', () => console.log('Redis client connected to the server'));
