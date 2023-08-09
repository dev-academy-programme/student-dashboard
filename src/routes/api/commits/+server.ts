import { PrismaClient } from '@prisma/client'
import * as z from 'zod'
import type { RequestEvent } from './$types'

const schema = z.object({
  ref: z.string(),
  repository: z.object({
    name: z.string(),
    created_at: z.number()
  }),
  organization: z.object({
    login: z.string()
  }),
  commits: z.array(
    z.object({
      id: z.string(),
      timestamp: z.string(),
      author: z.object({
        name: z.string(),
        username: z.string()
      })
    })
  )
})
export async function POST({ request }: RequestEvent) {
  console.log('requested')

  const prisma = new PrismaClient()
  try {
    const body = await request.json()

    // validate the request body
    const result = schema.safeParse(body)

    if (!result.success) {
      return new Response(JSON.stringify(result.error), {
        status: 400,
        headers: {
          'content-type': 'application/json'
        }
      })
    }

    const payload = result.data

    await prisma.repo.upsert({
      where: {
        name: payload.repository.name
      },
      update: {
        forked_date: new Date(payload.repository.created_at),
        name: payload.repository.name
      },
      create: {
        forked_date: new Date(payload.repository.created_at),
        name: payload.repository.name
      }
    })

    for (const commit of payload.commits) {
      await prisma.commit.upsert({
        where: {
          id: commit.id
        },
        update: {
          username: commit.author.username,
          created_on: commit.timestamp,
          repo_name: payload.repository.name,
          branch: payload.ref,
          id: commit.id
        },
        create: {
          username: commit.author.username,
          created_on: commit.timestamp,
          repo_name: payload.repository.name,
          branch: payload.ref,
          id: commit.id
        }
      })
    }

    return new Response('OK', { status: 201 })
  } catch (error) {
    console.log(error)
    await prisma.log.create({
      data: {
        error: JSON.stringify(error)
      }
    })

    return new Response(JSON.stringify(error), { status: 500 })
  }
}
