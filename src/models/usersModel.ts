import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    type: { type: String, required: true },
    phone: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 'Pending', required: true },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
