const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 50 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, maxLength: 50 },
  price: { type: Number, required: true, maxLength: 50 },
  numberInStock: { type: Number, required: true, maxLength: 50 },
  aisle: { type: Number, required: true, maxLength: 50 }
});


ItemSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object

    return `/models/item/${this._id}`;
  });

module.exports = mongoose.model('Item', ItemSchema);
