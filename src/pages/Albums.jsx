import React, { useEffect, useState } from "react";
import axios from "axios";

const Albums = () => {
  const [album, setAlbum] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/albums`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("FULL RESPONSE:", res.data);
          const albumsArray = Array.isArray(res.data.albums)
            ? res.data.albums
            : Object.values(res.data.albums || []);
          setAlbum(albumsArray);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);


  const handleCreateAlbum = async() =>{
    try{

      setError("");

      if(!name || !description){
        setError("Please Enter the album name and description");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/albums`,
        {name, description},
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlbum((prev)=> [res.data.newAlbum, ...prev]);

      setName("");

      setDescription("");


    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700  px-4">


      {/* Main Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 border border-white/20">

        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          Welcome to <span className="text-indigo-300">Snapify</span> 📸
        </h1>

        <p className="text-center text-white/70 mt-2">
          Create and manage your albums easily
        </p>

        {/* Create Album */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Create Album</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="px-4 py-3 rounded-xl outline-none bg-white/20 text-white placeholder-white/60 border border-white/20 focus:border-indigo-400"
              placeholder="Album Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="px-4 py-3 rounded-xl outline-none bg-white/20 text-white placeholder-white/60 border border-white/20 focus:border-indigo-400"
              placeholder="Album Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-300 text-sm mt-2 font-medium">{error}</p>
          )}

          <button
          onClick={handleCreateAlbum}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
            Create
          </button>
        </div>

        {/* Albums List */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white mb-4">Albums</h2>

          {album.length === 0 ? (
            <p className="text-white/60 text-center">No albums found</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {album.map((alb) => (
                <div
                  key={alb._id}
                  className="bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition"
                >
                  <h3 className="text-lg font-bold text-white">{alb.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{alb.description}</p>
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
