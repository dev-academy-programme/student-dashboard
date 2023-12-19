import type { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'

type Commit = Prisma.CommitGetPayload<{
  select: {
    username: true
    branch: true
    created_on: true
    repo_name: true
    Student: { select: { name: true; username: true; github_id: true } }
  }
}>

function getFakeData(): Commit[] {
  // Challenges names
  const challenges = [
    'Challenge 1',
    'Challenge 2',
    'Challenge 3',
    'Challenge 4',
    'Challenge 5',
    'Challenge 6',
    'Challenge 7',
    'Challenge 8',
    'Challenge 9',
    'Challenge 10',
    'Challenge 11',
    'Challenge 12',
    'Challenge 13',
    'Challenge 14',
    'Challenge 15',
  ]

  const students = []

  // generate 10 students
  for (let i = 0; i < 10; i++) {
    students.push({
      name: faker.person.firstName(),
      username: faker.internet.userName(),
      github_id: Math.floor(Math.random() * 1000000),
    })
  }

  const commits: Commit[] = []

  // generate commits for each student
  students.forEach((student) => {
    // a student makes 20 to 100 commits
    const commitCount = Math.floor(Math.random() * 80) + 20

    for (let j = 0; j < commitCount; j++) {
      // randomly select a challenge
      const challenge =
        challenges[Math.floor(Math.random() * challenges.length)]

      commits.push({
        username: student.username,
        branch: 'main',
        created_on: faker.date.past(),
        repo_name: challenge,
        Student: {
          name: student.name,
          username: student.username,
          github_id: student.github_id,
        },
      })
    }
  })

  return commits
}

export async function getCommits(prisma: PrismaClient) {
  const commits = await prisma.commit.findMany({
    select: {
      username: true,
      branch: true,
      created_on: true,
      repo_name: true,
      Student: {
        select: {
          name: true,
          username: true,
          github_id: true,
        },
      },
    },
    where: {
      Student: {
        is_student: true,
      },
    },
    orderBy: {
      created_on: 'desc',
    },
  })

  return commits
}
