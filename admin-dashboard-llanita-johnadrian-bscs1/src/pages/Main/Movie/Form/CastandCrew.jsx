import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CastAndCrew = ({ movieId }) => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', role: '' });

  useEffect(() => {
    axios
      .get(`/movies/${movieId}/cast-and-crew`)
      .then((response) => setMembers(response.data))
      .catch((error) => console.error('Error fetching cast & crew:', error));
  }, [movieId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const addMember = () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    if (movieId !== undefined) {
      alert('Please search and select a movie.');
    } else {
      const data = {
        
        movieId: '',
        userId: 'selectedMovie.overview',
        name: 'selectedMovie.popularity',
        url: 'selectedMovie.release_date',
        characterName: 'selectedMovie.vote_average',
      };
      const method = movieId ? 'patch' : 'post'; //#1
      const url = movieId ? `/casts/${movieId}` : '/casts'; //#1

      axios({
        method: 'post',
        url: '/casts',
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((saveResponse) => {
          console.log(saveResponse);
          alert('Success');
        //   navigate('/main/movies'); //#5
        })
        .catch((error) => {
          alert('An error occurred: ' + error); //#4
        });
    }
  };

  const deleteMember = (id) => {
    axios
      .delete(`/movies/${movieId}/cast-and-crew/${id}`)
      .then(() => setMembers(members.filter((member) => member.id !== id)))
      .catch((error) => console.error('Error deleting member:', error));
  };

  return (
    <div>
      <h2>Cast & Crew</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newMember.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newMember.role}
          onChange={handleInputChange}
        />
        <button onClick={addMember}>Add</button>
      </div>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} - {member.role}
            <button onClick={() => deleteMember(member.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CastAndCrew;
