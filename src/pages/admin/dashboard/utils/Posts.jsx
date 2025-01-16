import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const Posts = () => {

    const [posts, setPosts] = useState([]);
    const products = useSelector(state => state.products.products)
    const [newPost, setNewPost] = useState('');
    const [editingPost, setEditingPost] = useState(null);
    const [editingText, setEditingText] = useState('');

    const addPost = () => {
        if (newPost.trim()) {
            setPosts([...posts, newPost]);
            setNewPost('');
        }
    };

    const removePost = (index) => {
        setPosts(posts.filter((_, i) => i !== index));
    };

    const editPost = (index) => {
        setEditingPost(index);
        setEditingText(posts[index]);
    };

    const saveEdit = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index] = editingText;
        setPosts(updatedPosts);
        setEditingPost(null);
        setEditingText('');
    };
// useEffect(() => {
//     setPosts(products)
// } , [products])
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="border p-2 mr-2"
                    placeholder="Add a new post"
                />
                <button onClick={addPost} className="bg-blue-500 text-white p-2 rounded">
                    Add Post
                </button>
            </div>
            <ul>
                {posts.map((post, index) => (
                    <li key={index} className="mb-2 flex items-center">
                        {editingPost === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="border p-2 mr-2"
                                />
                                <button onClick={() => saveEdit(index)} className="bg-green-500 text-white p-2 rounded mr-2">
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="flex-1">{post}</span>
                                <button onClick={() => editPost(index)} className="bg-yellow-500 text-white p-2 rounded mr-2">
                                    Edit
                                </button>
                            </>
                        )}
                        <button onClick={() => removePost(index)} className="bg-red-500 text-white p-2 rounded">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;