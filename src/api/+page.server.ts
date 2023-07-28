import pkg from '@prisma/client'

import * as db from '../../prisma/db'
import { createPivotTable, flip, standardDeviation } from '../utils'
const { PrismaClient } = pkg

interface CommitData {
  username: string
  branch: string
  created_on: Date
  repo_name: string
}

export interface StudentData {
  name: string
  github_id: number
  username: string
  Commits: CommitData[]
}

export async function load() {
  const prisma = new PrismaClient()
  const commits = await db.getCommits(prisma)

  const students = flip(commits)

  const studentSummary = getStudentSummary(students)
  let pivotReposStudents = createPivotTable(students, 'repo_name')
  let pivotDaysStudents = createPivotTable(students, 'created_on')
  const uniqueNames = students.map((student) => student.name)

  return {
    uniqueNames,
    streamed: {
      studentSummary,
      pivotReposStudents,
      pivotDaysStudents
    }
  }
}

function getStudentSummary(students: StudentData[]) {
  return students.map((student) => {
    const totalCommits = student.Commits.length
    const lastCommit = student.Commits.sort(
      (a, b) => Number(b.created_on) - Number(a.created_on)
    ).find((id) => id)
    const commitDates = student.Commits.flat().map((commit) =>
      Number(commit.created_on)
    )

    let commitGaps = []
    for (let i = 1; i < commitDates.length; i++) {
      let gap = (commitDates[i] - commitDates[i - 1]) / (1000 * 60 * 60 * 24)
      commitGaps.push(gap)
    }

    let commitCount = commitDates.length
    let consistencyScore = standardDeviation(commitGaps)

    let progressScore =
      consistencyScore !== 0 ? commitCount / consistencyScore : commitCount

    return {
      name: student.name,
      username: student.username,
      totalCommits,
      lastCommitDate: lastCommit?.created_on,
      progressScore,
      lastRepo: lastCommit?.repo_name
    }
  })
}
