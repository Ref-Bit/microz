import { Schema, model } from 'mongoose';
import { OrderStatus } from '@refbit-ticketing/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export { OrderStatus };

interface IOrder {
  userId: string;
  status: OrderStatus;
  price: number;
}

interface IOrderDoc extends Document, IOrder {
  version: number;
}

const OrderSchema = new Schema<IOrderDoc>(
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
    price: {
      type: Number,
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

OrderSchema.set('versionKey', 'version');
OrderSchema.plugin(updateIfCurrentPlugin);

const OrderModel = model<IOrderDoc>('Order', OrderSchema);

//! Necessary for Typescript to check passed arguments when creating a new Order
class Order extends OrderModel {
  constructor(attrs: IOrder) {
    super(attrs);
  }
}

export { Order };
