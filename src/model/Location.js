import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @description user schema
 */
const LocationSchema = new Schema({
  location: { type: String, required: true },
  creator: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    name: {
      type: String,
    },
  },
  sex: {
    male: {
      type: String,
    },
    female: {
      type: String,
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export default model('locations', LocationSchema);
