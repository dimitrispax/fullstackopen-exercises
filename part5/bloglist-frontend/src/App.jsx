import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Error from './components/Error'
import Bloglist from './components/Bloglist'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  /* Function that logins a user in to the application. */
  const loginUser = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage("Wrong Credentials.")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000);
    }
  }

  return (
    <div>
      <Error ErrorMessage={errorMessage} />
      {user === null
        ? <Login
          LoginUser={loginUser}
          NewUsername={username}
          HandleUsernameChange={handleUsernameChange}
          NewPassword={password}
          HandlePasswordChange={handlePasswordChange}
        />
        : <Bloglist Blogs={blogs} User={user} />
      }

    </div>
  )
}

export default App