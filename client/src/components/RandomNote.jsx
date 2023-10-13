import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RandomNote() {
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  const fetchRandomNote = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/notes/random'); 
      setNote(response.data);
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchRandomNote();
  }, []);

  return (
    <div>
       <nav><Link to={`/`}>Back to home</Link></nav>
      <h1> Note Wall</h1>
      <p>Random note</p>
      {note && (
        <div>
          <p>Title: {note.title}</p>
          <p>Body: {note.body}</p>
        </div>
      )}
    </div>
  );
}

export default RandomNote;

