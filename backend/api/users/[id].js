const users = require('../../../db.json').users

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { id } = req.query
  const user = users.find(u => u.id.toString() === id.toString())

  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  if (req.method === 'GET') {
    res.json(user)
  } else if (req.method === 'PUT') {
    // Update user logic would go here
    res.json({ message: 'User updated' })
  } else if (req.method === 'DELETE') {
    // Delete user logic would go here
    res.json({ message: 'User deleted' })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
} 