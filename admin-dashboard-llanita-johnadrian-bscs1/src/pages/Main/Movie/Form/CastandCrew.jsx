import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';
import './CAC.css'

const CastAndCrews = () => {
  const { movieId } = useParams();
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", role: "", url: "" });
  const [loading, setLoading] = useState(false);
  const {cast, setCast, crew, setCrew, handleAddCastAndCrew} = useOutletContext();

  useEffect(() => {
    if (!movieId) return;
  
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/credits?movieId=${movieId}`);
        console.log("Fetched members:", response.data); 
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching cast & crew:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMembers();
  }, [movieId]);
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // Add a new member ----------
  
  const addMember = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("You must be logged in to add cast & crew.");
      return;
    }

    if (!newMember.name || !newMember.role || !newMember.url) {
      alert("Please provide all required fields (name, role, and URL).");
      return;
    }

    try {
      setLoading(true);
      const data = {
        movieId: movieId || "123",
        name: newMember.name,
        characterName: newMember.role,
        url: newMember.url,
      };

      const response = await axios.post("/casts", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMembers([...members, response.data]);
      setNewMember({ name: "", role: "", url: "" });
      alert("Member added successfully!");
    } catch (error) {
      console.error("Error adding member:", error);
      alert("An error occurred while adding the member.");
    } finally {
      setLoading(false);
    }
  };

  //modify this code so that for each cast, insert them into casts database, also add a a button to save it

  // Delete a member
  const deleteMember = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("You must be logged in to delete cast & crew.");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`/movies/${movieId}/cast-and-crew/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMembers(members.filter((member) => member.id !== id));
      alert("Member deleted successfully!");
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("An error occurred while deleting the member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Cast & Crew</h2>
      <div style={{ marginBottom: "20px" }}>
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
        <input
          type="text"
          name="url"
          placeholder="Profile URL"
          value={newMember.url}
          onChange={handleInputChange}
        />
        <button onClick={addMember} disabled={loading}>
          {loading ? "Adding..." : "Add Member"}
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : members.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {members.map((member) => (
  <li
    key={member.id}
    style={{
      borderBottom: "1px solid #ccc",
      padding: "10px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <strong>{member.name}</strong> - {member.role} <br />
      <a href={member.url} target="_blank" rel="noopener noreferrer">
        Profile
      </a>
    </div>
    <button
      onClick={() => deleteMember(member.id)}
      disabled={loading}
    >
      Delete
    </button>
  </li>
))}



        </ul>
      ) : (
        <p>No cast or crew members added yet.</p>
      )}

<div className="cast-crew">
  <h2>Cast & Crew</h2>
  <div className="cast-list">
    {cast.map((member) => (
      <div key={member.id} className="cast-member">
        <img
          src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
          alt={`Photo of ${member.name}`}
          className="cast-photo"
          onError={(e) => (e.target.style.display = "none")} // Handle missing images gracefully
        />
        <div className="cast-info">
          <p className="cast-name">
            <strong>{member.name}</strong>
          </p>
          <p className="cast-role">as {member.character || "Unknown Role"}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default CastAndCrews;
