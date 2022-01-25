import { Ticket } from '../Ticket';

it('Implements optimistic concurrency control', async () => {
  const ticket = new Ticket({
    title: 'Test-Title',
    price: 20,
    userId: 'random-user-id',
  });
  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  await firstInstance!.save();

  await expect(secondInstance!.save()).rejects.toThrow();
});

it('Increments the version number on multiple saves', async () => {
  const ticket = new Ticket({
    title: 'Test-Title',
    price: 20,
    userId: 'random-user-id',
  });

  // Expected version 0
  await ticket.save();
  expect(ticket.version).toEqual(0);

  // Expected version 1
  await ticket.save();
  expect(ticket.version).toEqual(1);

  // Expected version 2
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
