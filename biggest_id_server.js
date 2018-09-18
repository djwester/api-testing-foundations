const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('biggest_id_db.json')
const middlewares = jsonServer.defaults()



server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method == 'POST') {
    if (req.body.id && req.body.id == Infinity){
      delete req.body['id']; //just set it to the next available ID instead
    }
  } 
  next() // continue to JSON Server router
 })
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running. Requests can be accessed at http://localhost:3000/')
})