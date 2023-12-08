import { QueryResolvers } from '../generated/graphql'
import getContacts from './getContacts'
import getList from './getList'
import getUser from './getUser'
import loginUser from './loginUser'
import userSearch from './userSearch'

export default {
  getContacts,
  getList,
  getUser,
  loginUser,
  userSearch
} as QueryResolvers
