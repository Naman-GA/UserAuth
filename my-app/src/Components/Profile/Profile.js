import React, { useState } from "react";
import basestyle from "../Base.module.css";
import axios from "axios"; // Import Axios

const Profile = ({ setUserState, username }) => {
  const [image, setImage] = useState(null);

  // Function to handle image upload
  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/imageUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("Image uploaded successfully!");
        setImage(null); // Reset the image state
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // No need for this function in this case
  };

  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
      {/* Form for image upload */}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])} // Set the selected image to state
        />
        <button
          type="button" // Change type to button
          className={basestyle.button_common}
          onClick={handleImageUpload} // Call the image upload function on button click
        >
          Upload Image
        </button>
      </form>
      {/* Logout button */}
      <button
        className={basestyle.button_common}
        onClick={() => setUserState({})}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;