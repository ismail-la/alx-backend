// Node Redis client and async operations
import { print, createClient } from 'redis';
import { promisify } from 'util';

const redis_Client = createClient();

redisClient.on('error', (error) => {
  console.log(`Redis_client not connected to server: ${error.message}`);
  redis_Client.quit();
});

const get = promisify(redis_Client.get).bind(redis Client);

// Set a key-value pair in redis

function setNewSchool(schoolName, value) {
  redis Client.set(schoolName, value, print);
}

// Gets and display the value associated with given key

async function displaySchoolValue(schoolName) {
  const value = await get(schoolName);
  if (value) console.log(value);
}

async function main() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

redis_Client.on('connect', () => {
  console.log('Redis client connected to the server');
  main();
});
