import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const AlbumDetails = () => {
  const { albumName } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/albums/name/${encodeURIComponent(albumName)}`
        );

        setAlbums(res.data.findAlbum || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbum();
  }, [albumName]);

  if (albums.length === 0) return <p className="text-white text-xl">Loading...</p>;

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 pt-15 px-4">
      <Navbar/>
      <div className="w-full max-w-5xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Album Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {albums.map((album) => {
            const sharedUsers = album.sharedUser || [];

            return (
              <div
                key={album._id}
                className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {album.name}
                </h2>

                <p className="text-white/90 mb-4">{album.description}</p>

                <h3 className="text-lg font-semibold text-white mb-2">
                  Shared With:
                </h3>

                {sharedUsers.length === 0 ? (
                  <p className="text-white/80 italic">No shared users</p>
                ) : (
                  <ul className="list-disc list-inside text-white/90 space-y-1">
                    {sharedUsers.map((user, index) => (
                      <li key={index}>{user}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
