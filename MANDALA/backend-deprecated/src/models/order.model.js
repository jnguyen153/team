const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderScheme = mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    producer: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    product: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    itemCount: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    orderDate: {
      type: Date,
      required: true,
      unique: true,
      trim: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
      unique: true,
      trim: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderScheme.plugin(toJSON);
orderScheme.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderScheme);

module.exports = Order;
