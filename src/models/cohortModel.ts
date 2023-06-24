import mongoose from 'mongoose'

const CohortSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true },
        number: { type: String, required: true },
        photoURL: { type: String, required: true },
        summary: { type: String, required: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
        created_by: { type: String, required: true },
        enabled: { type: Boolean, required: true, default: true },
        modified_by: { type: String },

    },
    { timestamps: true }
)

export default mongoose.model('Cohorts', CohortSchema)