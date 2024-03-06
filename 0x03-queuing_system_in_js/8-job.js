// Writing the job creation function
// Adds jobs to queue 'push_notification_code_3'

export default function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');
  jobs.forEach((job_Data) => {
    const job = queue.create('push_notification_code_3', job_Data);
    job.save((error) => {
      if (!error) console.log(`Notification job created: ${job.id}`);
    });
    job.on('complete', () => console.log(`Notification job ${job.id} completed`));
    job.on('progress', (progress) => console.log(`Notification job ${job.id} ${progress}% completed`));
    job.on('failed', (errorMessage) => console.log(`Notification job ${job.id} failed: ${errorMessage}`));
  });
}
