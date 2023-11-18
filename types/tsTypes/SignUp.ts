import mongoose from 'mongoose'

export interface SignUp extends mongoose.Document {
  name: string
  email: string
  username: string
  countriesVisited: string[]
  countriesToVisit: string[]
}
