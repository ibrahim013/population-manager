import dotenv from 'dotenv';

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const key = process.env.KEY;

const Keys = {
  mongoURI: `mongodb+srv://population:${password}@cluster0.djj4v.mongodb.net/${user}?retryWrites=true&w=majority`,
  secretorkey: `${key}`,
  mongo_URI_TEST: `mongodb://${user}:${password}@ds335275.mlab.com:35275/population-manager-test`,
};

export default Keys;
