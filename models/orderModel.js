import mongoose from 'mongoose';
const shippingSchema = {
  address: { type: String, required: true },
  reciever: { type: String, required: true },
  phone: { type: String, required: true },
};

const orderItemSchema = new mongoose.Schema({
  qty: { type: Number, required: true },
  price: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  itemsPrice: { type: Number },
  shippingPrice: { type: Number },
  totalPrice: { type: Number },
  paidAt: { type: Date },
}, {
  timestamps: true
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;