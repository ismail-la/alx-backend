// Node Redis client and basic operations
import { print, createClient } from 'redis';

const redis_Client = createClient();

redis_Client.on('error', (error) => {
  console.log(`Redis client not connected to server: ${error.message}`);
  redis_Client.quit();
});
redis_Client.on('connect', () => console.log('Redis client connected to the server'));

console.log(redis_Client.connected);

// Set a key-value pair in redis
function setNewSchool(schoolName, value) {
  redis_Client.set(schoolName, value, print);
}

// Gets and display the value associated with given key

function displaySchoolValue(schoolName) {
  redis_Client.get(schoolName, (_error, value) => {
    if (value) console.log(value);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
