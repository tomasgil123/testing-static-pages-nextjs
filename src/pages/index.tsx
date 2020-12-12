import React, { FC } from 'react'

import MainLayout from 'src/layouts/main'

//types
import PageWithLayout from 'src/types/pageWithLayout'
import { User } from 'src/types/user'

interface Users {
  users: User[]
}
interface PropsPage {
  props: Users
}

const Home: FC<Users> = ({ users }) => {
  return (
    <div>
      Home
      <div style={{ width: '300px', margin: 'auto' }}>
        {users.map((user) => (
          <div
            style={{
              padding: '10px',
              border: '1px solid black',
              margin: '5px',
              textDecoration: user.id > 10 ? 'line-through' : 'inherit',
            }}
            key={user.id}
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  )
}

;(Home as PageWithLayout).layout = MainLayout

export async function getStaticProps(): Promise<PropsPage> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const result = await response.json()
  const users: User[] = result.map((user) => {
    return { id: user.id, name: user.name }
  })
  return { props: { users } }
}

export default Home
