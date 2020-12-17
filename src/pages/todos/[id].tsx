import React, { FC } from 'react'
import { useInView } from 'react-intersection-observer'

import MainLayout from 'src/layouts/main'

//types
import PageWithLayout from 'src/types/pageWithLayout'
import { Todo } from 'src/types/todos'

interface TodoPage {
  todo: Todo
}

interface PropsPage {
  props: TodoPage
}

interface StaticPaths {
  paths: { params: { id: string } }[]
  fallback: boolean
}

const Home: FC<TodoPage> = ({ todo }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  })
  return (
    <div>
      Todo page
      <div
        style={{
          width: '300px',
          margin: 'auto',
          height: '1500px',
          borderBottom: '1px solid black',
        }}
      >
        <div>{todo.title}</div>
      </div>
      <div ref={ref}>
        <span>Video</span>
        {inView && (
          <>
            {todo.videoUrls.length > 0 && (
              <>
                {todo.videoUrls.length === 1 ? (
                  <span style={{ margin: '5px' }}>{'--Has video--'}</span>
                ) : (
                  <span style={{ margin: '5px' }}>{'--Has many videos--'}</span>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div style={{ width: '300px', margin: 'auto', height: '1500px' }}></div>
    </div>
  )
}

;(Home as PageWithLayout).layout = MainLayout

export async function getStaticPaths(): Promise<StaticPaths> {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    fallback: false,
  }
}

export async function getStaticProps({ params }): Promise<PropsPage> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
  const todo = await response.json()
  todo.videoUrls = todo.videoUrls ? todo.videoUrls : []
  return { props: { todo } }
}

export default Home
