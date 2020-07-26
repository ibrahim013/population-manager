import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const dataSchema = new Schema({}, {strict: false});
  export default model('remoteData', dataSchema);