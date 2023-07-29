import * as utils from './utils'

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

export function getStudentSummary(students: StudentData[]) {
  return students.map((student) => {
    const totalCommits = student.Commits.length
    const lastCommit = student.Commits.sort(
      (a, b) => Number(b.created_on) - Number(a.created_on),
    )

    const commitDates = student.Commits.flat().map((commit) =>
      Number(commit.created_on),
    )

    let commitGaps = []
    for (let i = 1; i < commitDates.length; i++) {
      let gap = (commitDates[i] - commitDates[i - 1]) / (1000 * 60 * 60 * 24)
      commitGaps.push(gap)
    }

    let commitCount = commitDates.length
    let consistencyScore = utils.standardDeviation(commitGaps)

    let progressScore =
      consistencyScore !== 0 ? commitCount / consistencyScore : commitCount

    return {
      name: student.name,
      username: student.username,
      totalCommits,
      lastCommitDate: lastCommit[0].created_on,
      progressScore,
      lastRepo: lastCommit[0].repo_name,
    }
  })
}
