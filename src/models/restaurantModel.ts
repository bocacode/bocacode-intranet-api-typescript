import mongoose from 'mongoose'

const RestaurantSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    address: { type: String, required: true },
    menu_url: { type: String, required: true },
    name: { type: String, required: true },
    photo_url: { type: String, required: true },
    rating: { type: [Number] },
    average_rating: { type: Number },
    created_by: { type: String, required: true },
    modified_by: { type: String },
    active: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Restaurant', RestaurantSchema)
