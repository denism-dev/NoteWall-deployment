import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/note/${id}`);
        setNote(response.data);
        setTitle(response.data.title);
        setBody(response.data.body);
      } catch (error) {
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
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
      await axios.put(`http://localhost:3000/api/note/${id}`, { title, body });
      navigate('/');
    } catch (error) {
      // Handle validation or server errors
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/note/${id}`);
      navigate('/');
    } catch (error) {
      // Handle server errors
    }
  };

  return (
    <div className='container'>
      <nav>
        <Link to={`/`}>Back to home</Link>
      </nav>
      <h1>Edit Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
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
          <label htmlFor="body" className="form-label">Body</label>
          <textarea
            className="form-control"
            id="body"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {bodyError && <div className="text-danger">{bodyError}</div>}
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Update Note
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete Note
        </button>
      </form>
    </div>
  );
}

export default EditNote;

