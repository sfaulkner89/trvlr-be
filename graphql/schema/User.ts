import mongoose from 'mongoose'
import { MessageGroupTS } from './Message'
const { Schema } = mongoose

const ContactIdSchema = new Schema({
  id: String!,
  group: String!,
  visible: { type: Boolean, default: true }
})

export const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    dob: { type: String, required: true },
    profileLocation: String,
    followers: Array,
    following: Array,
    countries: Array,
    listIds: Array,
    messagingGroups: Array<MessageGroupTS>,
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
    },
    messageGroupIds: Array<String>
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
)

UserSchema.virtual('messagingGroupData', {
  ref: 'messages',
  localField: 'messagingGroups',
  foreignField: 'id'
})

UserSchema.virtual('messagingGroupContacts', {
  ref: 'profiles',
  localField: 'messagingGroups.members',
  foreignField: 'id'
})

export const User = mongoose.model('profiles', UserSchema)
