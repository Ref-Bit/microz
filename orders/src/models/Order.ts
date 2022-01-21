import { Schema, model } from 'mongoose';
import { OrderStatus } from '@refbit-ticketing/common';
import { ITicketDoc } from './Ticket';

export { OrderStatus };

interface IOrder {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: ITicketDoc;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: Schema.Types.Date,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
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

const OrderModel = model<IOrder>('Order', OrderSchema);

//! Necessary for Typescript to check passed arguments when creating a new Order
class Order extends OrderModel {
  constructor(attrs: IOrder) {
    super(attrs);
  }
}

export { Order };
