import { Schema, model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ITicket {
  title: string;
  price: number;
  userId: string;
}

export interface ITicketDoc extends Document, ITicket {
  version: number;
}

const TicketSchema = new Schema<ITicketDoc>(
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
      },
    },
  }
);

TicketSchema.set('versionKey', 'version');
TicketSchema.plugin(updateIfCurrentPlugin);

const TicketModel = model<ITicketDoc>('Ticket', TicketSchema);

//! Necessary for Typescript to check passed arguments when creating a new Ticket
class Ticket extends TicketModel {
  constructor(attrs: ITicket) {
    super(attrs);
  }
}

export { Ticket };
