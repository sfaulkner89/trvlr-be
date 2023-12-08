import { List } from '../schema/List'
import { User } from '../schema/User'

export default async (
  _parent: undefined,
  args: { listId: string; userId: string }
) => {
  const list = await List.findOne({ id: args.listId })
  const user = await User.findOne({ id: args.userId })

  user.listIds = user.listIds.filter(listId => listId !== args.listId)
  list.deleted = true
  await list.save()
  await user.save()
  return user
}
