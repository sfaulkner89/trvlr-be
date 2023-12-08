import { MutationResolvers } from '../generated/graphql'
import addPlaceToList from './addPlaceToList'
import createGroup from './createGroup'
import createList from './createList'
import createPlace from './createPlace'
import deleteList from './deleteList'
import follow from './follow'
import postDetails from './postDetails'
import postMessage from './postMessage'

export default {
  addPlaceToList,
  createGroup,
  createList,
  createPlace,
  deleteList,
  follow,
  postDetails,
  postMessage
} as MutationResolvers
