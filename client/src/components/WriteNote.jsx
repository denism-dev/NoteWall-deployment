import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function WriteNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const handleSubmit = async () => {
    setTitleError('');
    setBodyError('');

    if (title.length <= 2) {
      setTitleError('Title must be longer than 2 characters.');
      return;
    }

    if (body.length > 255) {
      setBodyError('Body cannot be longer than 255 characters.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/note', { title, body });
      navigate('/');
    } catch (error) {}
  };

  return (
    <div className='container'>
      <nav>
        <Link to={`/`}>Back to home</Link>
      </nav>
      <h1>Write Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && <div className="text-danger">{titleError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <textarea
            className="form-control"
            id="body"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {bodyError && <div className="text-danger">{bodyError}</div>}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default WriteNote;
