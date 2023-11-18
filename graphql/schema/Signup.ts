import mongoose, { InferSchemaType, mongo, Schema } from 'mongoose'
import { SignUp } from '../../types/tsTypes/SignUp'

export const SignupSchema = new Schema<SignUp>({
  name: String,
  email: String,
  username: { type: String, required: true, unique: true },
  countriesVisited: Array<String>,
  countriesToVisit: Array<String>
})

export default mongoose.model<SignUp>('signups', SignupSchema)
//export type SignUp = InferSchemaType<typeof SignupSchema>
