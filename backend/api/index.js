const jsonServer = require('json-server')
const cors = require('cors')

// Create server
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Enable CORS
server.use(cors())

// Use middlewares
server.use(middlewares)

// Use router
server.use('/', router)

// Export for Vercel
module.exports = (req, res) => {
  return server(req, res)
} 