import mongoose from 'mongoose'
const { Schema } = mongoose

export const UserSchema = new Schema({
  id: String,
  email: String,
  password: String,
  username: String,
  displayName: String,
  dob: String,
  profileLocation: String,
  followers: Array,
  following: Array,
  countries: Array,
  lists: Array,
  groups: Array
})

export const User = mongoose.model('profiles', UserSchema)
