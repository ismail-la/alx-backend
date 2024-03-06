// Node Redis client and advanced operations

import { createClient, print } from 'redis';
const redis_Client = createClient();

redis_Client.on('error', (error) => {
  console.log(`Redis client not connected to server: ${error.message}`);
});

redis_Client.on('connect', () => {
  console.log('Redis client connected to the server');
});

redis_Client.hset('HolbertonSchools', 'Portland', 50, print);
redis_Client.hset('HolbertonSchools', 'Seattle', 80, print);
redis_Client.hset('HolbertonSchools', 'New York', 20, print);
redis_Client.hset('HolbertonSchools', 'Bogota', 20, print);
redis_Client.hset('HolbertonSchools', 'Cali', 40, print);
redis_Client.hset('HolbertonSchools', 'Paris', 42, print);
redis_Client.hgetall('HolbertonSchools', (_error, value) => console.log(value));
