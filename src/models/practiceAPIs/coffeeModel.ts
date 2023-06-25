import mongoose from 'mongoose'

const CoffeeSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true},
    ingredients: { type: String, required: true},
    created_by: { type: String, required: true },
    enabled: { type: Boolean },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Coffee', CoffeeSchema)
