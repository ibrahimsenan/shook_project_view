import { createClient, RedisClientType } from '@redis/client';

const client: RedisClientType = createClient({
  socket: {
    host: 'cache_server',
    port: 6379,
    reconnectStrategy: () => {
      console.log('reconnectStrategy', new Date().toJSON());
      return 5000; // milliseconds before retry
    },
  },
})
  .on('connect', () => console.log('connect', new Date().toJSON()))
  .on('ready', () => console.log('ready', new Date().toJSON()))
  .on('error', (err: Error) => console.error('error', err, new Date().toJSON()));

try {
  client
    .connect()
    .then(() => {
      console.log('** Redis connected :) ** ');
    })
    .catch((err: Error) => {
      console.log('ERROR !!! REDIS SERVER ** happened    ' + err);
    });
} catch (err) {
  console.error('connect err', err, new Date().toJSON());
}

export default client;