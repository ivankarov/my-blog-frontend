import React, {useState} from 'react';
import {postService} from '../service/postService';
const CreatePost = ({ onPostCreated }) => { 
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [isCreating,setIsCreating] = useState(false);
    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (!title.trim() || !content.trim()){
            alert('Заполните заголовок и содержание');
            return;
        }
        try{
            setIsCreating(true);
            await postService.createPost({
                title: title.trim(),
                content: content.trim()
            });
            setTitle('');
            setContent('');
            if(onPostCreated){
                onPostCreated();
            }
            alert('Пост успешно создан!');
        }catch(error){
            console.error('Ошибка создания поста:', error);
            alert('Не удалось создать пост');
        }finally{
            setIsCreating(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} style={{border:'1px solid #ddd', borderRadius:'8px',padding:'1.5rem',marginBottom:'2rem',
            background:'#f9f9f9'
        }}>
            <h3>Создать новый пост</h3>
            <div style={{marginBottom: '1rem'}}>
                <input type="text" placeholder="Заголовок поста" value={title} onChange={(e)=> setTitle(e.target.value)} style={{
                width:'100%', padding:'0.5rem', border: '1px solid #ccc', borderRadius:'4px',fontSize:'1rem'
                }}/>
            </div>
            <div sytle={{marginBottom:'1rem'}}>
                <textarea placeholder="Содержание поста" value={content} onChange={(e) => setContent(e.target.value)}
                rows="4" sytle={{width:'100%', padding:'0.5rem', border:'1px solid', borderRadius:'4px',fontSize:'1rem', resize:'vertical'}}/>          
            </div>
            <button type="submit" 
            disabled={isCreating} 
            style={{padding: '0.5rem 1rem', background: isCreating ? '#ccc': '#007bff',
            color:'white',border:'none',borderRadius:'4px',cursor: isCreating ? 'not-allowed': 'pointer'
            }}>{isCreating ? 'Создание...': 'Создать пост'}</button>
        </form>
    );
};
export default CreatePost;