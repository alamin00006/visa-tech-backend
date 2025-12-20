import mongoose from 'mongoose'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true,
  maxPoolSize: 10,

  socketTimeoutMS: 45000,
  family: 4,
}

const uri = `mongodb+srv://Alamin:ZnEUylHANPiysG7L@cluster0.scp6egc.mongodb.net/Apollo?retryWrites=true&w=majority`

export const connectWithDB = () => {
  mongoose
    .connect(uri, options)
    .then(() => {
      console.log('database connection succesfull')
    })
    .catch((err: any) => {
      console.error(err)
    })
}
