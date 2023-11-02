import mongoose from 'mongoose'
const { Schema } = mongoose

const ContactIdSchema = new Schema({
  id: String!,
  group: String!
})

export const UserSchema = new Schema({
  id: { type: String, index: true },
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
  contactIds: [ContactIdSchema],
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
