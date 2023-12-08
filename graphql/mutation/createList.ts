import { v4 } from 'uuid'
import {
  PlaceInitialization,
  initializePlace
} from '../mutations/places/createPlace'
import { List } from '../schema/List'
import { Note } from '../schema/Note'
import { User } from '../schema/User'
import { LatLngInput } from '../generated/graphql'

type ListInitialization = {
  userId: string
  displayName: string
  location: LatLngInput
  city?: string
  country?: string
  initialPlace?: PlaceInitialization
}

export default async (_parent: undefined, args: ListInitialization) => {
  let initializedPlace
  console.log(args)
  if (args.initialPlace) {
    initializedPlace = await initializePlace(_parent, args.initialPlace)
  }
  const listId = v4()
  const list = new List({
    id: listId,
    userId: args.userId,
    displayName: args.displayName,
    location: args.location,
    city: args.city,
    country: args.country,
    dateCreated: new Date(),
    dateModified: new Date(),
    placeIds: initializedPlace ? [initializedPlace.id] : [],
    followers: [args.userId],
    ratings: [
      {
        id: v4(),
        userId: args.userId,
        dateCreated: new Date(),
        stars: args.initialPlace ? args.initialPlace.rating : null
      }
    ]
  })
  if (
    args.initialPlace?.note &&
    list.id &&
    initializedPlace?.id &&
    args.userId
  ) {
    const note = new Note({
      id: v4(),
      placeId: initializedPlace.id,
      userId: args.userId,
      listId: list.id,
      content: args.initialPlace.note,
      dateCreated: new Date(),
      dateModified: new Date()
    })
    list.noteIds.push(note.id)
    await note.save()
  }

  const listMaker = await User.findOne({ id: args.userId })
  listMaker.listIds.push(listId)

  await listMaker.save()
  await list.save()
  return list
}
