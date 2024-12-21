import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  picture: { type: String, required: true },
});

export default mongoose.model('News', newsSchema);
