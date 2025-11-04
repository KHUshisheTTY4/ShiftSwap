import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/api"; // No need for avatar update now
import "./UserProfile.css";
import { getAuthToken } from "../services/auth";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null); // State to hold the user profile data
  const [error, setError] = useState(null); // State to hold any error messages
  const [isEditing, setIsEditing] = useState(false); // To toggle between edit and view mode
  const [editedProfile, setEditedProfile] = useState({}); // To hold edited values temporarily

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserProfile(response.userDetails[0]); // Set userProfile state
        setEditedProfile(response.userDetails[0]); // Initialize edited profile
      } catch (error) {
        setError(error.message); // If error occurs, set it in the state
      }
    };

    fetchUserProfile(); // Call the function to fetch user profile
  }, []); // Empty dependency array ensures this runs once when component mounts
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Update the backend with the edited data (except for email)
      await updateUserProfile(editedProfile);
      setIsEditing(false); // Disable edit mode after saving
      setUserProfile(editedProfile); // Update the profile with the new data
    } catch (error) {
      setError(error.message); // If there's an error during the update, display the error
    }
  };

  if (error) {
    return <div>Error: {error}</div>; // Display error if fetching or saving fails
  }

  if (!userProfile) {
    return <div>Loading...</div>; // Show a loading message while fetching
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        {/* Header without avatar */}
        <h2>Profile</h2>
      </div>

      <div className="profile-details">
        <h3>Details</h3>
        {/* Editable and Non-editable Fields */}
        <div className="profile-detail">
          <span className="detail-label">Name:</span>
          {isEditing ? (
            <input
              type="text"
              name="fullname"
              value={editedProfile.fullname || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span className="detail-value">{userProfile.fullname}</span>
          )}
        </div>

        <div className="profile-detail">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{userProfile.email}</span>
        </div>

        <div className="profile-detail">
          <span className="detail-label">Phone:</span>
          {isEditing ? (
            <input
              type="text"
              name="phoneno"
              value={editedProfile.phoneno || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span className="detail-value">{userProfile.phoneno}</span>
          )}
        </div>

        <div className="profile-detail">
          <span className="detail-label">Current Job:</span>
          {isEditing ? (
            <input
              type="text"
              name="currentjob"
              value={editedProfile.currentjob || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span className="detail-value">
              {userProfile.currentjob || "No job specified"}
            </span>
          )}
        </div>

        <div className="profile-detail">
          <span className="detail-label">Gender:</span>
          {isEditing ? (
            <input
              type="text"
              name="gender"
              value={editedProfile.gender || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span className="detail-value">
              {userProfile.gender || "Not specified"}
            </span>
          )}
        </div>

        <div className="profile-detail">
          <span className="detail-label">Address:</span>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editedProfile.address || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span className="detail-value">
              {userProfile.address || "No address provided"}
            </span>
          )}
        </div>

        <div className="profile-detail">
          <span className="detail-label">Education:</span>
          {isEditing ? (
            <input
              type="text"
              name="education"
              value={editedProfile.education || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span className="detail-value">
              {userProfile.education || "No education added"}
            </span>
          )}
        </div>

        <div className="profile-detail">
          <span className="detail-label">Skills:</span>
          {isEditing ? (
            <input
              type="text"
              name="skills"
              value={editedProfile.skills || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span className="detail-value">
              {userProfile.skills || "No skills added"}
            </span>
          )}
        </div>

        <div className="profile-detail">
          <span className="detail-label">Languages Spoken:</span>
          {isEditing ? (
            <input
              type="text"
              name="languagesspoken"
              value={editedProfile.languagesspoken || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span className="detail-value">
              {userProfile.languagesspoken || "No languages added"}
            </span>
          )}
        </div>

        <div className="profile-detail">
          <span className="detail-label">Age:</span>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={editedProfile.age || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span className="detail-value">
              {userProfile.age || "No age added"}
            </span>
          )}
        </div>
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <button className="save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
