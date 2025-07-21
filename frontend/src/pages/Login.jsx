import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login(){
    const [loginData, setLoginData] = React.useState({ username: "", password: "", email: ""})
    const [status, setStatus] = React.useState('idle')
    const [error, setError] = React.useState()
    const [formType, setFormType] = React.useState('Login')
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from || "/"

    async function handleSubmit(e){
        e.preventDefault()
        setStatus("Submitting")
        try { const response = await fetch(formType === 'Login' ? "http://localhost:5003/auth/login" :"http://localhost:5003/auth/register", 
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            }
        )
            const data = await response.json()
            if(!response.ok){
                throw{
                    message: data.message,
                    statusText: response.statusText,
                    status: response.status

                }
            }
                localStorage.setItem('key', data.token)
                navigate(from, { replace: true })
      }catch(err){
            setError(err)
      }finally{
            setStatus('idle')
      }
    }
    function handleChange(e){
        const { name, value } = e.target
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div className='loginForm'> 
            
            {formType === 'Login' ?  
            <form onSubmit={handleSubmit} className="login">
                {location.state?.message &&
                    <h3 className="login-error">{location.state.message}</h3>
                }
                <label for='username'>Username</label>
                <input
                    id='username' 
                    type='username' 
                    name='username'
                    onChange={handleChange} 
                    placeholder='Username' 
                    value= {loginData.username}
                />
                <label for='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    onChange={handleChange}
                    placeholder='*********'
                    value={loginData.password}
                />
                <button disabled= {status === 'Submitting'}>
                    {status === 'Submitting' ? 'Logging in' : 'Log in'}
                </button>
            </form> :
            <form onSubmit={handleSubmit} className="login">
                <label for='username'>Username</label>
                <input 
                    id='username'
                    type='username' 
                    name='username'
                    onChange={handleChange} 
                    placeholder='Username' 
                    value= {loginData.username}
                />

                <label for='email'>Email</label>
                <input
                    id='email' 
                    type='email' 
                    name='email'
                    onChange={handleChange} 
                    placeholder='bob@example.com' 
                    value= {loginData.email}
                />
                <label for='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    onChange={handleChange}
                    placeholder='*********'
                    value={loginData.password}
                />
                <button disabled= {status === 'Submitting'}>
                    {status === 'Submitting' ? 'Logging in' : 'Log in'}
                </button>
                
            </form>
}
            <button className="login-btn" onClick={() => setFormType(prev => prev === 'Login' ? 'Register' : 'Login')}>{formType === "Login" ? "Register a account" : "Already have a account? Log in"}</button>
        </div>
    )
}
