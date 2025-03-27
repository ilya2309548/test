import React, { useState } from 'react';
import { api } from '../api/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    api.post('/posts', { title, content }).then((response) => {
      alert('Post created!');
    });
  };

  return (
    <div className="container mt-4">
      <h1>Create Post</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea
          id="content"
          className="form-control"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreatePost;
