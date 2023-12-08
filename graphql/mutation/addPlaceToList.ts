import { v4 } from 'uuid'
import { PlaceToAdd } from '../generated/graphql'
import {
  PlaceInitialization,
  initializePlace
} from '../mutations/places/createPlace'
import { List } from '../schema/List'
import { Note } from '../schema/Note'

export default async (
  _parent: undefined,
  args: { place: PlaceInitialization; listId: String; userId: String }
) => {
  const newPlace = await initializePlace(_parent, args.place)
  const listToAddTo = await List.findOne({ id: args.listId })
  if (args.place.note) {
    console.log('note found')
    try {
      const note = new Note({
        id: v4(),
        userId: args.userId,
        placeId: newPlace.id,
        listId: args.listId,
        content: args.place.note,
        dateCreated: new Date(),
        dateModified: new Date()
      })
      await note.save()
    } catch (e) {
      console.log(e)
    }
  }
  listToAddTo.placeIds.push(newPlace.id)
  await listToAddTo.save()
  return listToAddTo
}
