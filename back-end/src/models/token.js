import mongoose from 'mongoose';

const Token = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    acceptToken: String,
  },
  { timestamps: true }
);

const TokensModel = mongoose.model('tokens', Token);

export default TokensModel;
