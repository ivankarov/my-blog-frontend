import React ,{useState,useEffect,useCallback} from 'react';
import {postService} from "../service/postService";
import CreatePost from "../components/CreatePost";
import DeletePostButton from "../components/DeletePostButton";
import EditPostButton from '../components/EditPostButton';
import AddComment from '../components/AddComments';
import CommentList from '../components/CommentList';
const Posts =()=>{
    const [loading,setLoading] = useState(true);
    const [posts,setPosts] = useState([]);
    const [error,setError] = useState('');
    const loadPosts = useCallback( async () => { 
        try{
            setLoading(true);
            const postsData=await postService.getAllPosts();
            let postsArray = [];
            if(postsData && Array.isArray(postsData)){
                postsArray=postsData;
            }
            else if(postsData && postsData.length !== undefined){
                postsArray=Array.from(postsData);
            }else{
                postsArray = postsData.data || postsData.posts || [];
            }
            postsArray=postsArray.filter(item => {
                return item && typeof item === 'object' && item.id !== undefined && item.content !==undefined 
                && item.title !== undefined;
            });
            setPosts(postsArray);
        }catch(err){
            setError('Не удалось загрузить посты...' + (err.response?.data?.message || error.message));
        }finally{
            setLoading(false);
        }
    },[]);
    useEffect(() =>{loadPosts();} , [loadPosts]);
    const handlePostCreated =()=>{
        loadPosts();
    };
    if (loading){
        return (
            <div style={{padding:'2rem'}}>
                <h2>Все посты</h2>
                <p>Загрузка...</p>
            </div>
        );
    }
    if (error){
        return(
            <div style={{padding:'2rem'}}>
                <h2>Все посты</h2>
                <p style={{color:'red'}}>{error}</p>
                <button onClick={loadPosts}>Попробовать снова</button>
            </div>
        );
    }
    return(
        <div style={{padding:'2rem',maxWidth:'800px',margin:'0 auto'}}>
            <h2>Все посты</h2>
            <div style={{background:'#f0f0f0', padding:'1rem',marginBottom:'1rem'}}>
                <strong>Дебаг: </strong>
                Постов всего: {posts.length} | 
                Тип: {typeof posts} |
                Массив: {Array.isArray(posts) ? 'да' : 'нет'}
            </div>
            <CreatePost onPostCreated={handlePostCreated}/>
            {posts.length === 0 ?(
                <p>Пока нет постов. Будь первым!</p>
            ):(
                <div>
                    {posts.map(post => (
                    <div key={post.id} style={{border: '1px solid #ddd',borderRadius: '8px', padding:'1rem',marginBottom:'1rem',background:'white'}}>
                        <h3 style={{margin:'0 0 0.5rem 0'}}>
                            {post.title}
                        </h3>
                        <p style={{margin:'0 0 1rem 0' , color:'#666'}}>
                            {post.content}
                        </p>
                        <div style={{fontSize: '0.8rem', color:'#999'}}>
                            Автор: {post.author?.username || 'Неизвестен'} | Дата: {new Date(post.createdAt).toLocaleDateString()} 
                        </div>
                        <div style={{display:'flex',gap:'0.5rem'}}>
                            <DeletePostButton postId={post.id} onPostDeleted={handlePostCreated}/>
                            <EditPostButton post={post} onPostUpdated={handlePostCreated}/>
                        </div>
                        <AddComment postId={post.id} onCommentAdded={loadPosts}/>
                        <CommentList postId={post.id}/>
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Posts;
