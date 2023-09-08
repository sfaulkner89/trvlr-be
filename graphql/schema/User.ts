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
  listIds: Array,
  groups: Array,
  checkInLocation: {
    location: {
      latitude: Number,
      longitude: Number
    },
    placeId: String,
    names: {
      main_text: String,
      secondary_text: String
    }
  }
})

export const User = mongoose.model('profiles', UserSchema)
