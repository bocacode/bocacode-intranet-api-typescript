import mongoose from 'mongoose'

const CodeChallengeSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty_level: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_by: { type: String, required: true },
    enabled: { type: Boolean, default: true, required: true },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('CodeChallenge', CodeChallengeSchema)