import mongoose from 'mongoose'

const StudentsSchema = new mongoose.Schema(
  {
    github: { type: String, required: true },
    image_full: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    linkedin: { type: String, required: true },
    uid: { type: String, required: true },
    user_slug: { type: String, required: true },
    prev_title: { type: String, required: true },
    created_by: { type: String, required: true },
    inspiration: { type: String, required: true },
    most_important_skill: { type: String, required: true },
    why_boca_code: { type: String, required: true },
    project_title: { type: String, required: true },
    project: { type: String, required: true },
    project_about: { type: String, required: true },
    project_image: { type: String, required: true },
    resume: { type: String, required: true },
    about: { type: String, required: true },
    doc_id: { type: String, required: true },
    enabled: { type: Boolean, required: true, default: true },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Students', StudentsSchema)
