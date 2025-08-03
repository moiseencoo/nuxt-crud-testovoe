const jsonServer = require('json-server')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Enable CORS for all routes
server.use(cors())

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Use router
server.use('/api', router)

// Use the router on /api
server.use('/api', router)

// Start server
const port = process.env.PORT || 2311
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
}) 