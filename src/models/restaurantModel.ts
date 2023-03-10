import mongoose from 'mongoose'

const RestaurantSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    address: { type: String, required: true },
    menu_url: { type: String, required: true },
    name: { type: String, required: true },
    photo_url: { type: String, required: true },
    rating: { type: Array },
    created_by: { type: String, required: true },
    modified_by: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Restaurant', RestaurantSchema)
