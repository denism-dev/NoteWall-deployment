import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [sortOldest, setSortOldest] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get('http://localhost:3000/api/notes');
      setNotes(sortOldest ? response.data : response.data.reverse());
    };
    fetchNotes();
  }, [sortOldest]);
  const handleSortOldest = () => {
    setSortOldest(true);
  };
  const handleSortNewest = () => {
    setSortOldest(false);
  };

  return (
    <div className='container'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Note Wall</h1>
        <li className='list-unstyled'><Link to="/write" className='btn btn-outline-primary '>Write Note</Link></li>
      </div>


      <ul className=' d-flex'>
        <li className='list-unstyled '><p>leave a note</p></li>

        <li className='list-unstyled'>
          <button onClick={handleSortOldest} className='margin-left: 3rem'>
            Sort by Oldest
          </button>
        </li>

        <li className='list-unstyled'>
          <button onClick={handleSortNewest} className='margin-left: 3rem'>
            Sort by Newest
          </button>
        </li>

      </ul>


      <ul>
        {notes.map(note => (
          <li key={note._id} className='list-unstyled'>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </div>
              <div><Link to={`/edit/${note._id}`}>Edit</Link> </div>
            </div>
          </li>
        ))}
      </ul>
      <li className='list-unstyled' style={{ display: 'block', margin: 'auto', width: 'fit-content' }}>
        <Link to="/random" className='btn btn-outline-primary '>Random Note</Link>
      </li>
    </div>
  );
}

export default Dashboard;
