import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import route from '../routes/index';
import Keys from '../../config/keys';

const app = express();
const port = process.env.PORT || 8000;

const db = Keys.mongoURI;


//  middleware configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log('database connected sucessfully'))
  .catch(err => console.log(err));

app.use('/api/v1', route);
app.get('/', (req, res) => res.status(200).json({
  msg: 'this is a population managemant system API' }));

app.listen(port, () => console.log(`server is up and runing on ${port}`));

export default app;
