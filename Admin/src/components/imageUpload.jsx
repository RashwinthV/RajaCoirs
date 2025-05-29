import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [allImages, setAllImages] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzZjZGE2ZjdiNjRjY2FhM2JjNjkwYyIsImVtYWlsIjoidnJhc2h3aW50aEBnbWFpbC5jb20iLCJpYXQiOjE3NDg0MjIyNjgsImV4cCI6MTc0OTAyNzA2OH0.pugPBwhW63SOF6V7GZIaAY1VnXSNLjljZ1hd7q852XQ";

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/v2/images/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();
    setUploadedImageUrl(data.url);
    fetchAllImages(); // Refresh list
  };

  const fetchAllImages = async () => {
      const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzZjZGE2ZjdiNjRjY2FhM2JjNjkwYyIsImVtYWlsIjoidnJhc2h3aW50aEBnbWFpbC5jb20iLCJpYXQiOjE3NDg1Mjc1MjksImV4cCI6MTc0OTEzMjMyOX0.SEx7l1EZzftscer5VXp9AHBHSyHlNTrt-aUzkesDCuU"

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/v2/images/getImage`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setAllImages(data);
  };

  useEffect(() => {
    fetchAllImages();
  }, []);
  console.log(allImages);
  

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Image Upload and Display (React + Node.js)</h1>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ width: "300px" }}
          />
        </div>
      )}

      <hr />

      <h3>All Uploaded Images:</h3>
<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
  {allImages.map((img, index) => {
    return (
      <img
        key={index}
        src={img.url} 
        alt={img.name }
        style={{ width: "150px" }}
        onError={() => console.error(`Image failed to load: ${img.url}`)}
      />
    );
  })}
</div>

    </div>
  );
}

export default ImageUpload;
