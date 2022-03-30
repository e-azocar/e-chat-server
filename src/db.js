import { connect } from 'mongoose';

const dbConnection = () => connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('DB is connected'))
  .catch(err => console.error(err))

export default dbConnection;