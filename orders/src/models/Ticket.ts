import { Schema, model, Document } from 'mongoose';
import { Order, OrderStatus } from './Order';

interface ITicket extends Document {
  title: string;
  price: number;
}

export interface ITicketDoc extends Document, ITicket {
  isReserved(): Promise<boolean>;
}

const TicketSchema = new Schema<ITicketDoc>(
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

//! A ticket is reserved if it belongs to an Order, and the status is NOT OrderStatus.Cancelled
TicketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this.id, // Ticket id
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  return !!existingOrder;
};

const TicketModel = model<ITicketDoc>('Ticket', TicketSchema);

//! Necessary for Typescript to check passed arguments when creating a new Ticket
class Ticket extends TicketModel {
  constructor(attrs: ITicket) {
    super(attrs);
  }
}

export { Ticket };
