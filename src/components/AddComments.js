import React, {useState} from 'react';
import {commentService} from '../service/commentService';
const AddComment = ({postId, onCommentAdded}) =>{
    const[content,setContent] = useState('');
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState('');
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!content.trim()){
            alert('Введите текст');
            return;
        }
        try{
            setLoading(true);
            await commentService.createComment(postId,{text:content.trim()});
            setContent('');
            setError('');
            if(onCommentAdded){
                onCommentAdded();
            }
        }catch(err){
            setError('Не удалось добавить комент');
            console.error('Ошибка добавления комента',err);
        }finally{
            setLoading(false);
        }
    };
    return(
        <div style={{marginTop:'1rem'}}>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:'0.5rem'}}>
                    <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Напишите коментарий..."
                        rows="3" style={{width:'100%', padding:'0.5rem', border:'1px solid #ccc', borderRadius:'4px',fontSize:'0.9rem', resize:'vertical'}} disabled={loading}/>
                </div>
                {error && <div style={{color:'red',fontSize:'0.8rem',marginBottom:'0.5rem'}}>{error}</div>}
                <button type="submit" disabled={loading|| !content.trim()} style={{padding:'0.4rem 1rem',background:loading?'#ccc':'#007bff',color:'white',border:'none',borderRadius:'4px',cursor:loading? 'not-allowed':'pointer', fontSize:'0.9rem'}}>
                    {loading ? 'Отправка...': 'Добавить комментарий'}
                </button>
            </form>
        </div>
    );
}
export default AddComment;