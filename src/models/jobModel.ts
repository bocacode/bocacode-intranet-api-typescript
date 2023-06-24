import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    type: { type: String, required: true },
    frequency: { type: String, required: true },
    location: { type: String, required: true },
    date_posted: { type: String, required: true },
    url: { type: String, required: true },
    created_by: { type: String, required: true },
    enabled: { type: Boolean , required: true, default: false},
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
