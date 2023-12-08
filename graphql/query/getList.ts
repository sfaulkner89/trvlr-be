import { List } from '../schema/List'

export default async (_parents: undefined, args: { id: string }) => {
  return List.findOne({ id: args.id })
}
