import { Schema, model, Document } from 'mongoose';

export interface ITicket extends Document {
  title: string;
  price: number;
}

/*
 export interface TicketDoc extends Document {
  title: string;
  price: number;
}
*/

const TicketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
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
