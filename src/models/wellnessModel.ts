import mongoose from 'mongoose'

const WellnessSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    topic: { type: String, required: true },
    quote: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String },
    photo_url: { type: String, required: true },
    created_by: { type: String, required: true },
    enabled: { type: Boolean, default: true, required: true },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Wellness', WellnessSchema)
