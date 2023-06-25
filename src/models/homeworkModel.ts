import mongoose from 'mongoose'

const HomeworkSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    week: { type: String, required: true },
    topic: { type: String, required: true },
    created_by: { type: String, required: true },
    subtopic: { type: String },
    question: { type: String },
    enabled: { type: Boolean, default: true, required: true },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Homework', HomeworkSchema)
