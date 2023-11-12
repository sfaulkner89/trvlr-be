import mongoose, { InferSchemaType } from 'mongoose'
const { Schema } = mongoose

const MessageSchema = new Schema({
  id: String!,
  to: [String]!,
  from: String!,
  message: String!,
  dateCreated: Date!
})

export const MessageGroupSchema = new Schema({
  id: String!,
  name: String,
  group: Boolean!,
  members: [String]!,
  messages: [MessageSchema],
  dateCreated: Date!,
  dateModified: Date!
})

MessageGroupSchema.virtual('memberData', {
  ref: 'profiles',
  localField: 'members',
  foreignField: 'id'
})

export const MessageGroup = mongoose.model('messages', MessageGroupSchema)
export type MessageGroupTS = InferSchemaType<typeof MessageGroupSchema>
