export default async function authenticate(req, res, next) {
  const user = req.session.user

  if (!user) {
    req.isAuthenticated = false
    req.user = null
  } else {
    req.isAuthenticated = true
    req.user = user
  }
  await next()
}
