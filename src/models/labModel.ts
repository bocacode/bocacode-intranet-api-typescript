import mongoose from 'mongoose'

const LabSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    week: { type: String, required: true },
    topic: { type: String, required: true },
    sub_topic: { type: String },
    description: { type: String, required: true },
    created_by: { type: String, required: true },
    enabled: { type: Boolean },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Lab', LabSchema)
