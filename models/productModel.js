import mongoose from 'mongoose';

const prodctSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  name: { type: String, required: true },
  color : { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  sizes: {type : Array ,required: true  },
});

const productModel = mongoose.model('Product', prodctSchema);

export default productModel;
