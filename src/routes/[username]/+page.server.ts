import { PrismaClient } from '@prisma/client'
import type { RequestEvent } from '@sveltejs/kit'
import { GITHUB_ORG } from '$env/static/private'

export async function load({ params }: RequestEvent) {
  const prisma = new PrismaClient()
  const commits = await prisma.commit.findMany({
    where: {
      username: params.username
    },
    select: {
      branch: true,
      repo_name: true,
      created_on: true,
      id: true,
      Student: {
        select: {
          name: true
        }
      }
    }
  })

  return {
    org: GITHUB_ORG,
    commits
  }
}
