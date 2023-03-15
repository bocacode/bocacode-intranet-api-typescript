import mongoose from 'mongoose'

const LectureSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    title: { type: String, required: true },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    fileURL: { type: String, required: true },
    created_by: { type: String, required: true },
    enabled: { type: Boolean },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Lecture', LectureSchema)