import { useEffect, useState } from "react";

function Gallery() {
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  const getPhotos = async () => {
  const response = await fetch(`https://api.pexels.com/v1/curated?page=${page}`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  const data = await response.json();

  setPhotos((prevPhotos) => [
  ...prevPhotos,
  ...data.photos,
]);
};

  const loadMore = () => {
  setPage((prevPage) => prevPage + 1);
};

  useEffect(() => {
  getPhotos();
  }, [page]);

  console.log(photos);

  return (
  <div className="gallery-container">
    <h1>Photo Gallery</h1>

    <div className="gallery-grid">
      {photos.map((photo) => (
        <div className="photo-card" key={photo.id}>
          <img
            src={photo.src.medium}
            alt={photo.alt}
          />

          <p>{photo.photographer}</p>
        </div>
      ))}
    </div>

        <button onClick={loadMore}>
          Load More
        </button>

  </div>
);
}

export default Gallery;