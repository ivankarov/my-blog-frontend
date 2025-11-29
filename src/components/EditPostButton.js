import React, {useState} from 'react';
import {postService} from '../service/postService';
const EditPostButton = ({post,onPostUpdated}) =>{
    const[IsEdition, SetIsEdition] = useState(false);
    const[IsLoading, SetIsLoading] = useState(false);
    const[formData,setFormData]=useState({title:post.title, content:post.content});
    const handleEdit = () =>{
        SetIsEdition(true);
    };
    const handleCancel = () =>{
        SetIsEdition(false);
        setFormData({title:post.title,content:post.content});
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!formData.title.trim() || !formData.content.trim()){
            alert('Заполните заголовк и содержание')
            return;
        }
        try{
            SetIsLoading(true);
            try{
                await postService.updatePost(post.id,{title:formData.title.trim(), content: formData.content.trim()});
            }catch(error){
                if(error.response?.status !== 404){
                    throw error;
                } 
                console.log('абсолютно похуй');
                console.error('Полная ошибка обновления:',error);
                console.error('Данные ошибки:',error.response?.data);
                console.error('Статус ошибки:',error.response?.status);
            }
            if (onPostUpdated){
                onPostUpdated();
            }
            SetIsEdition(false);
            alert('Пост успешно обновлен');
        }catch(error){
            console.error('Ошибка обновления поста:',error);
            alert('Не удалось обновить пост');
            
        }finally{
            SetIsLoading(false);
        }
    };
    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});        
    };
    if(IsEdition){
        return (
            <div style={{
                position:'fixed',top:'0',left:'0',right:'0',bottom:'0',background:'rgba(0,0,0,0,5)',display:'flex',justifyContent:'center',
                alignItems:'center',zIndex:1000
            }}>
                <div style={{
                    background:'white',padding:'2rem',borderRadius:'8px',width:'90%',maxWidth:'500px'
                }}>
                    <h3>Редактировать пост</h3>
                    <form onSubmit={handleSubmit}>
                    <div style={{marginBottom:'1rem'}}>
                        <input type="text" name="title" placeholder="Заголовок текста" value={formData.title} onChange={handleChange}
                        style={{width:'100%',padding:'0.5rem',border:'1px solid #ccc',borderRadius:'4px',fontSize:'1rem'}} required/>
                    </div>
                    <div style={{marginBottom:'1rem'}}>
                        <textarea name="content" placeholder="Содержание поста" value={formData.content} onChange={handleChange} 
                        rows ="6" style={{width:'100%',padding:'0.5rem',border:'1px solid #ccc',borderRadius:'4px',fontSize:'1rem',resize:'vertical'}}required/>
                    </div>
                    <div style={{display:'flex',gap:'0.5rem'}}>
                        <button type="submit" disabled={IsLoading} style={{
                            padding:'0.5rem 1rem', background: IsLoading ? '#ccc': '#007bff', color:'white',border:'none',borderRadius:'4px',
                            cursor : IsLoading ? 'not-allowed':'pointer'
                        }}>{IsLoading ? "Сохранение...":"Сохранить"}</button>
                        <button type="button" onClick={handleCancel} style={{padding:'0.5rem 1rem',background:'#6c757d', color:'white',
                            border:'none',borderRadius:'4px',cursor:'pointer'
                        }}>Отмена</button>
                    </div>
                    </form>
                </div>
            </div>
        );
    };
    return(
        <button onClick={handleEdit} style={{padding:'0.25rem 0.5rem', background:'transparent',color:'#007bff',border:'1px solid #007bff',
            borderRadius:'4px',fontSize:'0.8rem',cursor:'pointer',marginRight:'0.5rem'
        }}>
            Редактировать
        </button>
    );  
}
export default EditPostButton;