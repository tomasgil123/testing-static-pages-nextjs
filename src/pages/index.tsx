/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import Link from 'next/link'
import MainLayout from 'src/layouts/main'

//types
import PageWithLayout from 'src/types/pageWithLayout'

const Home: FC = () => {
  return (
    <div>
      Home
      <div style={{ width: '300px', margin: 'auto' }}>
        {[1, 2, 3].map((numberTodo) => (
          <div
            key={numberTodo}
            style={{ padding: '10px', margin: '10px', border: '1px solid black' }}
          >
            <Link href={`/todos/${numberTodo}`}>
              <a>{`Todo ${numberTodo}`}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

;(Home as PageWithLayout).layout = MainLayout

export default Home
