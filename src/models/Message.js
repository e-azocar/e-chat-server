import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  text: { type: String, required: true },
  from: { type: mongoose.Types.ObjectId, required: true },
  to: { type: mongoose.Types.ObjectId, required: true },
}, {
  timestamps: true
});


export default mongoose.model('Message', messageSchema);
