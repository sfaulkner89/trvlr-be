import Signup from '../schema/Signup'

export default (
  _: undefined,
  args: { email: string; username: string; name: string }
) => {
  const newSignup = new Signup({
    email: args.email,
    username: args.username.toLowerCase(),
    name: args.name
  })
  return newSignup.save()
}
