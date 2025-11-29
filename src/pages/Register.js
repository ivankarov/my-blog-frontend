import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authService} from '../service/authService';
const Register = () =>{
    const [formData, setFormData] = useState({username:'',password:'',email:''});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await authService.register(formData);
            alert('Регистрация успешна!');
            navigate('/login');
        }catch(error){
            console.log('Полная ошибка:',error);
            console.log('Ответ сервера', error.response);
            const errorMessage = error.response?.data?.meassage || 'Ошибка регистрации';
            setError(errorMessage);
            console.error('Register error:', error);
        }
    };
    const handleChange=(e) =>{
        setFormData({...formData,[e.target.name] : e.target.value});
    };
    return (
        <div style={{padding:'2rem', maxWidth:'400px', margin:'0 auto'}}>
            <h2>Регистрация</h2>
            {error && <p style={{colo:'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:'1rem'}}>
                    <input  type="text"
                            name="username"
                            palceholder="Имя пользователя"
                            value={formData.username}
                            onChange={handleChange}
                            style={{ width:'100%', padding:'0.5rem', border:'1px solid #ccc',borderRadius:'4px'}} required/>
                </div>
                <div style={{marginBottom:'1rem'}}>
                    <input  type="email" 
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{width:'100%',padding:'0.5rem',border:'1px solid #ccc',borderRadius:'4px'}}required/>
                </div>
                 <div style={{marginBottom:'1rem'}}>
                    <input  type="password" 
                            name="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={handleChange}
                            style={{width:'100%',padding:'0.5rem',border:'1px solid #ccc',borderRadius:'4px'}}required/>
                </div>
                <button type="submit"
                        style={{width:'100%',padding:'0.5rem',background:'#007bff',color:'white',border:'none',borderRadius:'4px'}}>
                Зарегистрироваться  
                </button>
            </form>
        </div>
    );
} ;
export default Register;