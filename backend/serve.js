const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join('../', 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

server.unsubscribe(jsonServer.bodyParser)

const PORT = process.env.PORT || 8080
server.listen(PORT , () => {
  console.log(`JSON Server is running on port -> ${PORT}`)
})
