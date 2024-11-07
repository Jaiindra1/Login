import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

    const handleAuth = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'login' : 'register';
        try {
            const response = await fetch(`https://serve-g52v.onrender.com/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                if (isLogin) localStorage.setItem('token', data.token);
                 window.location.href = '/Dashboard';
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <div className="login-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleAuth}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login" type="submit">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p className="login-message">{message}</p>
            <button 
                className="toggle-auth"
                onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
        </div>
    );
}

export default Login;
