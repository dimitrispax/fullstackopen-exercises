const Login = ({ LoginUser, NewUsername, HandleUsernameChange, NewPassword, HandlePasswordChange }) => {
    return (
        <div>
            <h2>Log in to bloglist app</h2>
            <form onSubmit={LoginUser}>
                <div>
                    username: <input value={NewUsername} onChange={HandleUsernameChange} />
                </div>
                <div>
                    password: <input value={NewPassword} onChange={HandlePasswordChange} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login