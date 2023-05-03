import mongoose from 'mongoose';

const Users = new mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
    },
    password: String,
    fullName: {
      type: String,
      default: '',
    },
    phoneNumber: String,
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const UsersModel = mongoose.model('users', Users);

export default UsersModel;
