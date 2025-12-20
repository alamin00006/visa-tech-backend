import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url:
    'mongodb+srv://Alamin:ZnEUylHANPiysG7L@cluster0.scp6egc.mongodb.net/Apollo?retryWrites=true&w=majority',
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
  },
}
