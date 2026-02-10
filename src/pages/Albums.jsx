import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Albums = () => {
  const [album, setAlbum] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/albums`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const albumsArray = Array.isArray(res.data.albums)
            ? res.data.albums
            : Object.values(res.data.albums || []);
          setAlbum(albumsArray);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  const handleCreateAlbum = async () => {
    try {
      setError("");

      if (!name || !description) {
        setError("Please Enter the album name and description");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/albums`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAlbum((prev) => [res.data.newAlbum, ...prev]);
      setName("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="max-w-6xl mx-auto px-6 py-10 my-14">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-indigo-900">
          Snapify Albums 📸
        </h1>
        <p className="text-gray-500 mt-1">
          Create and manage your memories
        </p>
      </div>

      {/* Create Album Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Create Album
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Album Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Album Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        <button
          onClick={handleCreateAlbum}
          className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition shadow-sm"
        >
          Create Album
        </button>
      </div>

      {/* Albums Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Your Albums
        </h2>

        {album.length === 0 ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {album.map((alb) => (
              <div
                key={alb.albumId}
                onClick={() => navigate(`/albums/id/${alb.albumId}`)}
                className="
                  cursor-pointer
                  bg-white
                  rounded-2xl
                  p-5
                  border
                  shadow-sm
                  hover:shadow-md
                  hover:-translate-y-1
                  transition
                "
              >
                {/* Fake cover block (Google Photos style) */}
                <div className="h-28 rounded-xl bg-gradient-to-br from-indigo-200 to-purple-200 mb-4"></div>

                <h3 className="text-lg font-semibold text-gray-800">
                  {alb.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {alb.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default Albums;
