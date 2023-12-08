import { User } from '../schema/User'

export default async (_parents: undefined, args: { userId: string }) => {
  const user = await User.findOne({ id: args.userId })
  return user
}
