import mongoose, { ConnectOptions } from 'mongoose'

if (process.env.NODE_ENV === 'development') mongoose.set('debug', true)

export const mongooseConnect = async () => {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(
      process.env.MONGO_URI as string,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as ConnectOptions
    )
    .then((result: any) => {
      if (result.STATES['1']) {
        console.log(`Connected to Mongo -  ${process.env.PORT} ->`)
      } else {
        console.error
      }
    })
    .catch((err) => console.error(err))
}
