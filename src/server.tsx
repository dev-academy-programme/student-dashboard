import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import express from 'express'
import commitRoutes from './routes/commitRoutes.js'

const server = express()
export default server

const __dirname = Path.dirname(URL.fileURLToPath(import.meta.url))

// setup public folder
export const publicFolder = Path.join(__dirname, '../public')
server.use(express.static(publicFolder))

server.use(express.json())

// setup routes
server.use('/api/commits', commitRoutes)

server.get('/', (req, res) => {
  res.send({ message: 'Hello from the server!' })
})
