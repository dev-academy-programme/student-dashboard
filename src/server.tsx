import { renderToStaticMarkup } from 'react-dom/server'
import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import express from 'express'

import Index from './pages/index.tsx'
import commitRoutes from './routes/commits.ts'

const server = express()
export default server

const __dirname = Path.dirname(URL.fileURLToPath(import.meta.url))

// setup public folder
export const publicFolder = Path.join(__dirname, '../public')
server.use(express.static(publicFolder))

server.use(express.json())

// setup routes
server.use('/api/commits', commitRoutes)

server.get('/', async (req, res) => {
  res.send(renderToStaticMarkup(await Index({ sort: 'progress' })))
})
