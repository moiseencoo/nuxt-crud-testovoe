// // Start server (only if not in Vercel)
// if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
//   const port = process.env.PORT || 2311
//   server.listen(port, () => {
//     console.log(`JSON Server is running on port ${port}`)
//   })
// } 

// JSON Server module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(2311, () => {
	console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
