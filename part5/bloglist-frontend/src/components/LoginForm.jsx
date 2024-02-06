import { useState } from 'react'

const LoginForm = ({ LoginUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (event) => {
        event.preventDefault()
        LoginUser({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Log in to bloglist app</h2>
            <form onSubmit={loginUser}>
                <div>
                    username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm