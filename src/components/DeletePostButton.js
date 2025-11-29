import React, {useState} from 'react';
import {postService} from '../service/postService';

const DeletePostButton= ({postId, onPostDeleted}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm,setshowConfirm] = useState(false);
    const handleDelete = async() =>{
        try{
            setIsDeleting(true);
            try{
                const result = await postService.deletePost(postId);
            }catch(error){
                if(error.response?.status !== 404){
                    throw error;
                }
                console.log('Ваще похуй');
            }
            if (onPostDeleted){
                onPostDeleted();
            }
            alert('Пост удален')
        }catch(error){
            let secondError = true;
            try{
                await postService.getPostById(postId);
            }catch(error2){
                alert('Пост уже удален')
                secondError = false;
            }
            if(secondError){
            console.log('Ошибка удаление в handleDelete: ', error.response?.data?.message);
            alert('Не удалось удалить пост');
            }
        }finally{
            setIsDeleting(false);
            setshowConfirm(false);
        }
    }
    if (showConfirm){
        return(
            <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                <span style={{fontSize:'0.8rem',color:'#666'}}>Удалить?</span>
                <button onClick={handleDelete} 
                        disabled={isDeleting}
                        style={{padding:'0.25rem 0.5rem',background:'#dc3545',color:'white',border:'none',borderRadius:'4px',
                        fontSize:'0.8rem',cursos: isDeleting ? 'not-allowed':'pointer'
                        }}>{isDeleting ? '...':'Да'}</button>
                <button onClick={() => setshowConfirm(false)} style={{padding:'0.25rem',color:'white',border:'none',borderRadius:'4px',
                fontSize:'0.8rem',cursor:'pointer'
                }}>Нет</button>
            </div>
        );
    }
     return(
            <button onClick={() => setshowConfirm(true)}
             style={{padding:'0.25rem 0.5rem',background:'transparent',color:'#dc3545',border:'1px solid #dc3545'
            ,borderRadius:'4px',fontSize:'0.8rem',cursor:'pointer'}}>
                Удалить
            </button>
        );
};
export default DeletePostButton;