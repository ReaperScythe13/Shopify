import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login(){
    const [loginData, setLoginData] = React.useState({ username: "", password: ""})
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState()

    async function handleSubmit(e){
        e.preventDefault()
        setStatus("Submitting")
        try { const response = await fetch("http://localhost:5003/auth/login", 
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
            console.log(data.token)
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
            <form onSubmit={handleSubmit}>
                <input 
                    type='username' 
                    name='username'
                    onChange={handleChange} 
                    placeholder='Username' 
                    value= {loginData.username}
                />
                <input
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
        </div>
    )
}
