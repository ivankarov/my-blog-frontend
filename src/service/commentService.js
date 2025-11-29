import api from './api';
export const commentService ={
    getCommentsByPost: async (postId) =>{
        const response=await api.get(`/posts/${postId}/comments`);
        return response.data;
    },
    createComment: async (postId,commentData) => {
        const response = await api.post(`/posts/${postId}/comments`,commentData);
        return response.data;
    },
    deleteComment: async (postId,commentId) =>{
        const response=await api.delete(`/posts/${postId}/comments/${commentId}`)
        return response.data;
    },
    updateComment: async (postId,commentId,newText) =>{
        const response = await api.post(`/posts/${postId}/comments/${commentId}/update`,newText);
        return response.data;
    },
    getAllComments: async() =>{
        const response = await api.get(`/comments`);
        return response.data;
    }
};