import { v4 } from 'uuid'
import { Comment } from '../../schema/Comment'

export default async function createPlaceComment (
  placeId: string,
  userId: string,
  listId: string,
  content: string
) {
  const newComment = new Comment({
    placeId,
    userId,
    listId,
    content,
    dateCreated: new Date().toDateString(),
    dateModified: new Date().toDateString()
  })
  await newComment.save()
  return newComment._id
}
