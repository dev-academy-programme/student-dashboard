import { renderToStaticMarkup } from 'react-dom/server'
import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import express from 'express'
import { PrismaClient } from '@prisma/client'

import Index from './pages/index.tsx'
import Layout from './layouts/main.tsx'
import commitRoutes from './routes/commits.ts'
import * as db from '../prisma/db.ts'
import { createPivotTable, flip } from './utils.ts'
import { getStudentSummary } from './github.ts'

const server = express()
export default server

const __dirname = Path.dirname(URL.fileURLToPath(import.meta.url))

// setup public folder
const publicFolder = Path.join(__dirname, '../public')
server.use(express.static(publicFolder))

server.use(express.json())

// setup routes
server.use('/api/commits', commitRoutes)

server.get('/', async (req, res) => {
  const sort = (req.query.sort as string) || 'progress'
  const prisma = new PrismaClient()
  const commits = await db.getCommits(prisma)

  const students = flip(commits)

  const studentSummary = getStudentSummary(students)
  if (sort === 'progress') {
    studentSummary.sort((a, b) => b.progressScore - a.progressScore)
  } else if (sort === 'name') {
    studentSummary.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sort === 'commits') {
    studentSummary.sort((a, b) => a.totalCommits - b.totalCommits)
  } else if (sort === 'repo') {
    studentSummary.sort((a, b) => a.lastRepo.localeCompare(b.lastRepo))
  } else if (sort === 'date') {
    studentSummary.sort((a, b) => a.lastCommitDate - b.lastCommitDate)
  }

  let pivotReposStudents = createPivotTable(students, 'repo_name')
  let pivotDaysStudents = createPivotTable(students, 'created_on')
  const uniqueNames = students.map((student) => student.name)

  res.send(
    renderToStaticMarkup(
      <Layout title="Hello World!">
        <Index
          sort={sort}
          uniqueNames={uniqueNames}
          studentSummary={studentSummary}
          pivotReposStudents={pivotReposStudents}
          pivotDaysStudents={pivotDaysStudents}
        />
      </Layout>,
    ),
  )
})
