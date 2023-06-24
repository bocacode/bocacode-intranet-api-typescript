import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    event_name: { type: String, required: true },
    date: { type: String, required: true },
    photoUrl: { type: String, required: true },
    url: { type: String, required: true },
    created_by: { type: String, required: true },
    enabled: { type: Boolean, default: true, required: true },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Event', EventSchema)