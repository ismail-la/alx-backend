// Create the Job creator
import { createQueue } from 'kue';
const queue = createQueue();
const job_Data = { phoneNumber: '+254111222', message: 'Your order is on its way. Thank you for shopping with us.' };
const job = queue.create('push_notification_code', job_Data).save((error) => {
  if (!error) console.log(`Notification job created: ${job.id}`);
});

job.on('complete', () => console.log('Notification job completed'));
job.on('failed', () => console.log('Notification job failed'));
