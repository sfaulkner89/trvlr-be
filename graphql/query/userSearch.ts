import { User } from '../schema/User'

export default async (_parent: undefined, args: { query: string }) => {
  const regex = new RegExp(args.query.toLowerCase())

  const usernameMatch = await User.find({
    $and: [{ $or: [{ username: regex }, { displayName: regex }] }]
  })

  return usernameMatch
}
