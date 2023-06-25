import mongoose from 'mongoose'

const AlumniSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    address: { type: String, required: true },
    menu_url: { type: String, required: true },
    name: { type: String, required: true },
    photo_url: { type: String, required: true },
    rating: { type: Array },
    created_by: { type: String, required: true },
    modified_by: { type: String },
    active: { type: Boolean, default: true, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Alumni', AlumniSchema)
