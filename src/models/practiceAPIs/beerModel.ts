import mongoose from 'mongoose'

const BeerSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    rating: {
      average: { type: String, required: true },
      reviews: { type: String, required: true },
    },
    created_by: { type: String, required: true },
    enabled: { type: Boolean },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Beer', BeerSchema)
