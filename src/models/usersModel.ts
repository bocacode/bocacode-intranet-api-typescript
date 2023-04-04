import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    access_level: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
