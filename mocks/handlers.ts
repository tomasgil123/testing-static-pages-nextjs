import { rest } from 'msw'

//we mock a situation where the first user has one video and the second user has two videos
//the rest of the user do not have videos
const mockVideos = [
  ['https://www.youtube.com/watch?v=91CzTz2-IJw'],
  ['https://www.youtube.com/watch?v=91CzTz2-IJw', 'https://www.youtube.com/watch?v=N6Kqg7bdKCQ'],
]

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos/1', async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()
    originalResponseData.videoUrls = mockVideos[0]
    return res(ctx.json(originalResponseData))
  }),
  rest.get('https://jsonplaceholder.typicode.com/todos/2', async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()
    originalResponseData.videoUrls = mockVideos[1]
    return res(ctx.json(originalResponseData))
  }),
]
