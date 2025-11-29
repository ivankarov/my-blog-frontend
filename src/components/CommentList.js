import React, {useState,useEffect} from 'react';
import {commentService} from '../service/commentService';
import DeleteCommentButton from './DeleteCommentButton';
const CommentList =({postId}) =>{
    const [comments,setComments]=useState([]);
    const [loading,setLoading]=useState(false);
    const[error,setError]=useState('');
    const loadComments = async() => {
        try{
            setLoading(true);
            const commentsData = await commentService.getCommentsByPost(postId);
            setComments(commentsData);
        }catch(err){
            setError('не удалось загрузить коменты');
            console.error('Ощибка загрузки коментов:',err);
        }
        finally{
            setLoading(false);
        }
    };
    useEffect(()=>{if(postId){loadComments();}},[postId,loadComments]);
    if (loading) {
        return <div>Загрузка коментов...</div>;
    }
    if(error){
        return <div style={{color:'red'}}>{error}</div>;
    }
    return (
        <div style={{marginTop:'1rem'}}>
            <h4>Комментарии ({comments.length})</h4>
            {comments.length===0 ? (<p>Пока нет коментов</p>) :(comments.map(comment => (<div
            key={comment.id} style={{border:'1px solid #eee',borderRadius:'4px',padding:'0.5rem', marginBottom:'0.5rem',background:'#f9f9f9'}}>
                <div style={{fontSize:'0.8rem',color:'#666',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                    <strong>{comment.authorName}</strong> {new Date(comment.createdAt).toLocaleString()}
                    </div>
                    <DeleteCommentButton postId={postId}
                        commentId={comment.id}
                        onCommentDeleted={loadComments}/>
                    </div>
                <p style={{margin:'0.5rem 0 0 0'}}>{comment.text}</p>        
                </div>)))}
        </div>
    );
};
export default CommentList;