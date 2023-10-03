import mongoose from 'mongoose'
const { Schema } = mongoose

const MessageSchema = new Schema({
  to: [String]!,
  from: String!,
  message: String!,
  dateCreated: Date!
})

export const MessageGroupSchema = new Schema({
  name: String,
  group: Boolean!,
  members: [String],
  messages: [MessageSchema],
  dateCreated: Date!
})

export const MessageGroup = mongoose.model('messages', MessageGroupSchema)
