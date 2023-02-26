import mongoose from 'mongoose'

const LogsSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    model: { type: String, required: true },
    event_type: { type: String, required: true },
    reference_id: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Log', LogsSchema)
