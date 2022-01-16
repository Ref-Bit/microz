import { Schema, model } from 'mongoose';

interface ITicket {
  title: string;
  price: number;
  userId: string;
}

const TicketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const TicketModel = model<ITicket>('Ticket', TicketSchema);

//! Necessary for Typescript to check passed arguments when creating a new Ticket
class Ticket extends TicketModel {
  constructor(attrs: ITicket) {
    super(attrs);
  }
}

export { Ticket };
