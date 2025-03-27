import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    api.get(`/posts/${id}`).then((response) => {
      setPost(response.data);
    });

    api.get(`/posts/${id}/comments`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const handleAddComment = () => {
    api.post(`/posts/${id}/comments`, {
      content: newComment,
    }).then((response) => {
      setComments([...comments, response.data]);
      setNewComment('');
    });
  };

  return (
    <div className="container mt-4">
      {post && (
        <div className="card mb-4">
          <div className="card-body">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p><small className="text-muted">Author: {post.username}</small></p>
            <p><small className="text-muted">Created at: {new Date(post.createdAt).toLocaleString()}</small></p>
          </div>
        </div>
      )}

      <h2>Comments</h2>
      <ul className="list-group mb-4">
        {comments.map((comment) => (
          <li className="list-group-item" key={comment.id}>
            <p>{comment.content}</p>
            <p><small className="text-muted">Author: {comment.username}</small></p>
            <p><small className="text-muted">Created at: {new Date(comment.createdAt).toLocaleString()}</small></p>
          </li>
        ))}
      </ul>

      <div className="mb-3">
        <textarea
          className="form-control"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default PostDetail;
