import mongoose from 'mongoose';

const Roles = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
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

const RolesModel = mongoose.model('roles', Roles);

export default RolesModel;
