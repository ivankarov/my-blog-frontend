import React, {useState} from 'react';
import { commentService } from '../service/commentService';
const DeleteCommentButton = ({postId,commentId, onCommentDeleted}) =>{
    const[loading,setLoading] = useState(false);
    const handleDelete = async()=>{
        if(!window.confirm('Удалить комментарий?')) {
            return;
        }
        try{
            setLoading(true);
            await commentService.deleteComment(postId,commentId);
            if(onCommentDeleted){
                onCommentDeleted();
            }
        }catch(err){
            console.error('Ошибка удаления комментария:',err);
            alert('Не удалось удалить комменатрий');
        }finally{
            setLoading(false);
        }
    };
    return(
        <button onClick={handleDelete} 
        disabled={loading} 
        style={{padding:'0.2rem 0.4rem',background:'transparent',color:'#dc3545',border:'1px solid #dc3545',borderRadius:'4px',fontSize:'0.7rem',cursor:loading ? 'not-allowed':'pointer',}}>
            {loading?'...':'Удалить'}
        </button>
    );
};
export default DeleteCommentButton;