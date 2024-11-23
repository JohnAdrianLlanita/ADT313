import React, { useState, useEffect } from "react";
import axios from "axios";

const CastAndCrew = ({ movieId }) => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", role: "" });
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch existing members
  useEffect(() => {
    if (!movieId) return;

    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/movies/${movieId}/cast-and-crew`);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching cast & crew:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [movieId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // Add a new member
  const addMember = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("You must be logged in to add cast & crew.");
      return;
    }

    if (!movieId) {
      alert("Please select a movie.");
      return;
    }

    if (!newMember.name || !newMember.role) {
      alert("Please provide both name and role.");
      return;
    }

    try {
      setLoading(true);
      const data = { movieId, name: newMember.name, role: newMember.role };
      const response = await axios.post("/casts", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMembers([...members, response.data]); // Append the new member to the list
      setNewMember({ name: "", role: "" }); // Reset the input fields
      alert("Member added successfully!");
    } catch (error) {
      console.error("Error adding member:", error);
      alert("An error occurred while adding the member.");
    } finally {
      setLoading(false);
    }
  };

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
        <button onClick={addMember} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
      {loading && <p>Loading...</p>}
      <ul>
        {members.length > 0 ? (
          members.map((member) => (
            <li key={member.id}>
              {member.name} - {member.role}
              <button onClick={() => deleteMember(member.id)} disabled={loading}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No cast or crew members added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default CastAndCrew;