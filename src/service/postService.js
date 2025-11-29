import api from './api'
export const postService={
    getAllPosts: async()=>{
        const response = await api.get('/posts/all');
        console.log('Полный response из сервиса:', response);
        return response.data;
    },
    getPostById: async(id)=>{
        const response = await api.get(`/posts/${id}`)
        return response.data;
    },
    createPost: async(postData)=>{
        const response = await api.post('/posts',postData)
        return response.data;
    },
    updatePost: async(id,postData)=>{
        console.log('updatePost - ID:', id,'Data:',postData);
        const response= await api.put(`/posts/${id}`,postData);
        console.log('updatePost - ответ:',response.data )
        return response.data;
    },
    deletePost: async(id) => {
        const response = '';
        try{
        const response = await api.delete(`/posts/${id}`);
        console.log('deletePost ответ:',response);
        }
        catch(error){
            console.log('ошибка в deletePost :',error);
            throw error;
        }
        return response.data;
    }
};