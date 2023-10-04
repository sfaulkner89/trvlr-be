import mongoose from 'mongoose'
const { Schema } = mongoose

export const CommentSchema = new Schema({
  id: String!,
  placeId: String!,
  userId: String!,
  listId: String,
  content: String!,
  dateCreated: String!,
  dateModified: String!
})

export const Comment = mongoose.model('comments', CommentSchema)
