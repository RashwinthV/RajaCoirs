import React, { useEffect, useState } from "react";
import "../Styles/Gallery.css";

function Gallery() {
  const [allImages, setAllImages] = useState([]);
  const [popupImg, setPopupImg] = useState(null);
  const token = localStorage.getItem("token");

  const fetchAllImages = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_IMAGE_URL}/images/getImage`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch images");

      const data = await res.json();

      const imagesWithSize = await Promise.all(
        data.map((img) => {
          return new Promise((resolve) => {
            const image = new Image();
            image.src = img.url;
            image.onload = () => {
              resolve({
                ...img,
                width: image.width,
                height: image.height,
                aspectRatio: image.width / image.height,
              });
            };
            image.onerror = () => {
              resolve(null);
            };
          });
        })
      );

      const sortedImages = imagesWithSize
        .filter(Boolean)
        .sort((a, b) => a.aspectRatio - b.aspectRatio);

      setAllImages(sortedImages);
    } catch (err) {
      console.error("Error fetching images:", err.message);
    }
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  return (
    <div className="gallery-wrapper">
      <h3 className="gallery-title">Hello! Welcome to Raja Coir's Photo Gallery</h3>
      <div className="image-grid">
        {allImages.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={img.name || `Uploaded ${index}`}
            className="gallery-image fade-in"
            onClick={() => setPopupImg(img.url)}
            onError={() => console.error(`Image failed to load: ${img.url}`)}
          />
        ))}
      </div>

      {popupImg && (
        <div className="popup-overlay" onClick={() => setPopupImg(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img src={popupImg} alt="Enlarged" />
            <button className="close-btn bg-dark  rounded-circle" onClick={() => setPopupImg(null)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
