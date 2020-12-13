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
            }}
            key={user.id}
          >
            {user.name}
            <>
              {user.videoUrls.length > 0 && (
                <>
                  {user.videoUrls.length === 1 ? (
                    <span style={{ margin: '5px' }}>{'--Has video--'}</span>
                  ) : (
                    <span style={{ margin: '5px' }}>{'--Has many videos--'}</span>
                  )}
                </>
              )}
            </>
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
    return { id: user.id, name: user.name, videoUrls: user.videoUrls ? user.videoUrls : [] }
  })
  return { props: { users } }
}

export default Home
