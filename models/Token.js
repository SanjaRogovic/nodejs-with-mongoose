import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    value: {
      type: String,
      required: true
    }
  });
  
  const Token = mongoose.model('Token', TokenSchema);

export default Token