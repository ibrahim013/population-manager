import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @description user schema
 */
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export default model('users', UserSchema);
