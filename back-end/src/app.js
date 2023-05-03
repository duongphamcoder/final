/* eslint-disable no-undef */
import 'dotenv/config';
import mongoose from 'mongoose';
import { routes } from './routes/index.js';



export default class App {
  start(app) {
    mongoose.connect(`${process.env.DATABASE}`).then(() => {
      console.log('Connected to MongoDB');

      app.listen(process.env.PORT, async () => {
        console.log('Server running');

        routes(app);
      });
    });
  }
}
