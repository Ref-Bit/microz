import { connect } from 'node-nats-streaming';

console.clear();

const stan = connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Connected to publisher');

  const data = JSON.stringify({
    id: '123',
    title: 'Ticket-Title',
    price: 20,
  });

  stan.publish('ticket:created', data, (err, guid) => {
    if (err) {
      console.log('publish failed: ' + err);
    } else {
      console.log('published message/event with guid: ' + guid);
    }
  });
});
