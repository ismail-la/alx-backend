// Can I have a seat?
import { createClient } from 'redis';
import { promisify } from 'util';
import { createQueue } from 'kue';
import express from 'express';

const app = express();
const queue = createQueue();
const client = createClient();

const port = 1245;
const host = '127.0.0.1';

let reservationEnabled = true;

// Redis client ops
function reserveSeat(number) {
  client.set('available_seats', number);
}


// Queries redis for number of available seats
async function getCurrentAvailableSeats() {
  const get = promisify(client.get).bind(client);
  const availableSeats = await get('available_seats');
  return Number(availableSeats);
}

// Express app routes
// Gets number of available seats
app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.send({ numberOfAvailableSeats: availableSeats });
});

// Enqueues seat reservation process
app.get('/reserve_seat', (_req, res) => {
  if (!reservationEnabled) {
    res.send({ status: 'Reservation are blocked' });
    return;
  }
  res.send({ status: 'Reservation in process' });
  const reserveSeatJob = queue.create('reserve_seat').save();
  reserveSeatJob.on('complete', () => {
    console.log(`Seat reservation job ${reserveSeatJob.id} completed`);
  });
  reserveSeatJob.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${reserveSeatJob.id} failed ${errorMessage}`);
  });
});

// Processes seats reservation jobs
app.get('/process', (_req, res) => {
  queue.process('reserve_seat', async (_job, done) => {
    let availableSeats = await getCurrentAvailableSeats();
    if (!availableSeats) {
      done(new Error('Not enough seats available'));
      return;
    }
    availableSeats -= 1;
    reserveSeat(availableSeats);
    if (!availableSeats) reservationEnabled = false;
    done();
  });
  res.send({ status: 'Queue processing' });
});

app.listen(port, host, () => {
  console.log(`Server is live at ${host}:${port}`);
});
