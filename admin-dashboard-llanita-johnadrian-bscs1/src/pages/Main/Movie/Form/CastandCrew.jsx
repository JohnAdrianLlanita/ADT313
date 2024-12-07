import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "./CAC.css";



const CastAndCrews = () => {
  const { movieId } = useParams();
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", role: "", url: "" });
  const [loading, setLoading] = useState(false);
  const { cast, setCast, crew, setCrew } = useOutletContext();
const handleSelectCastMember = async (member) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alert("You must be logged in to add cast members.");
    return;
  }
 
  try {
    const data = {
      movieId: Number(movieId), // Convert to number since it's PARAM_INT in PHP
      userId: localStorage.getItem("userId"), // Add userId from localStorage
      name: member.name,
      characterName: member.character || "Unknown Role",
      url: `https://image.tmdb.org/t/p/w185${member.profile_path}`
    };
 
    console.log("Sending data:", data); // For debugging
 
    const response = await axios.post("/casts", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
 
    console.log("Response:", response.data); // For debugging
    alert(`Successfully added ${member.name} to the database.`);
  } catch (error) {
    console.error("Error adding cast member:", error.response?.data || error); // Log full error
    alert(`Failed to add ${member.name}. Error: ${error.response?.data?.message || 'Please try again.'}`);
  }
};
  

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

  // Add a new member
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

  // Save all members to database
  const saveAllMembers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("You must be logged in to save cast & crew.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `/movies/${movieId}/save-cast-and-crew`,
        { members },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("All cast & crew saved successfully!");
    } catch (error) {
      console.error("Error saving cast & crew:", error);
      alert("An error occurred while saving the cast & crew.");
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
          <button
            onClick={() => handleSelectCastMember(member)}
            className="select-button"
          >
            Add to Database
          </button>
        </div>
      </div>
    ))}
  </div>
</div>



    </div>
  );
};

export default CastAndCrews;
