import mongoose from 'mongoose';

const { Schema } = mongoose;

const highlightSchema = new Schema({
  title: String,
  description: String
});

const Highlight = mongoose.model('Highlight', highlightSchema);

export default Highlight;
