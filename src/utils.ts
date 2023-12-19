import type { getCommits } from '../prisma/db'
import type { StudentData } from './github'

export function standardDeviation(values: number[]) {
  const avg = average(values)
  const squareDiffs = values.map(function (value) {
    const diff = value - avg
    const sqrDiff = diff * diff
    return sqrDiff
  })

  const avgSquareDiff = average(squareDiffs)
  const stdDev = Math.sqrt(avgSquareDiff)
  return stdDev
}

function average(data: number[]) {
  const sum = data.reduce((sum, value) => sum + value, 0)
  const avg = sum / data.length
  return avg
}

type PivotOn = 'repo_name' | 'created_on'

export function createPivotTable(students: StudentData[], pivotOn: PivotOn) {
  const pivotTable: { [key: string]: { [key: string]: number } } = {}

  students.forEach((student) => {
    student.Commits.forEach((commit) => {
      const pivotKey =
        pivotOn === 'created_on'
          ? new Date(commit[pivotOn]).toISOString().split('T')[0]
          : commit[pivotOn]

      if (!pivotTable[pivotKey]) {
        pivotTable[pivotKey] = {}
      }

      if (!pivotTable[pivotKey][student.name]) {
        pivotTable[pivotKey][student.name] = 0
      }

      pivotTable[pivotKey][student.name]++
    })
  })

  return pivotTable
}

// start with commits for student to and return student with each commit
export function flip(commits: Awaited<ReturnType<typeof getCommits>>) {
  const studentMap = new Map<string, StudentData>()

  commits.forEach((commit) => {
    const studentUsername = commit.Student.username
    const student = studentMap.get(studentUsername)

    if (student) {
      student.Commits.push({
        username: studentUsername,
        branch: commit.branch,
        created_on: commit.created_on,
        repo_name: commit.repo_name,
      })
    } else {
      studentMap.set(studentUsername, {
        name: commit.Student.name,
        username: studentUsername,
        github_id: commit.Student.github_id,
        Commits: [
          {
            username: studentUsername,
            branch: commit.branch,
            created_on: commit.created_on,
            repo_name: commit.repo_name,
          },
        ],
      })
    }
  })

  // Convert the Map to a plain array of student objects.
  const students: StudentData[] = Array.from(studentMap.values())

  return students
}

export function getLastSegment(url: string) {
  var segments = url.split('/')
  var lastSegment = segments[segments.length - 1]
  return lastSegment
}
