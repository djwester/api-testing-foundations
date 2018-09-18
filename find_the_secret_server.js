const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('find_the_secret_db.json')
const middlewares = jsonServer.defaults()


function isAuthorized(req){
  if (req.url.includes('/profile') ){
    return false;
  }
  return true;
}
server.use(middlewares)
server.use((req, res, next) => {
  if (isAuthorized(req)) {
    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
 })
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running. Requests can be accessed at http://localhost:3000/')
})