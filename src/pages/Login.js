import React ,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {authService} from "../service/authService";

const Login=()=>{
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate('');
    const handleLogin = async () => {
        try{
            const data = await authService.login(username, password);
            localStorage.setItem('token',data.token);
            localStorage.setItem('user',JSON.stringify({username: data.username}));
            alert('залогинен');
            console.log('token в при логине: ', localStorage.getItem('token'));
            navigate('/posts');
        }catch(error){
            setError('Login failed');
            console.error('Login error:', error);
        }
    };
    return (
        <div style={{padding:'2rem'}}>
            <h2>Login</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <input type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{display:'block',margin: '0.5rem 0' ,padding: '0.5rem'}}/>
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style ={{display:'block',margin:'0.5rem 0',padding:'0.5rem'}}/>
            <button 
            onClick={handleLogin}
            style={{padding:'0.5rem 1rem'}}>
            Login
            </button>
        </div>
    );
};
export default Login;