import mongoose from 'mongoose'

const NewsSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    photoURL: {type: String, required: true},
    link: { type: String, required: true },
    created_by: { type: String, required: true },
    enabled: { type: Boolean, default: true, required: true },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('News', NewsSchema)
