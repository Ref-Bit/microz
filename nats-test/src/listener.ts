import { connect } from 'node-nats-streaming';

console.clear();

const stan = connect('ticketing', '123', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Connected to listener');

  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg) => {
    console.log('Message Received...📩')
  });
});
