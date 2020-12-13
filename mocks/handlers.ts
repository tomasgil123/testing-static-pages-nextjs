import { rest } from 'msw'

const mockVideos = [
  ['https://www.youtube.com/watch?v=91CzTz2-IJw'],
  ['https://www.youtube.com/watch?v=91CzTz2-IJw', 'https://www.youtube.com/watch?v=N6Kqg7bdKCQ'],
]

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()
    const modifiedResponse = originalResponseData.map((user, index) => {
      return { ...user, videoUrls: mockVideos[index] ? mockVideos[index] : [] }
    })
    return res(ctx.json(modifiedResponse))
  }),
]
