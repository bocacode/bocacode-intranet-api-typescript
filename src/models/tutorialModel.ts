import mongoose from 'mongoose'

const TutorialSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    media_type: { type: String, required: true },
    topic: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    created_by: { type: String, required: true },
    enabled: { type: Boolean, default: true, required: true },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Tutorial', TutorialSchema)
