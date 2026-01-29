// import React, { useEffect, useState } from 'react'
// import axios from "axios";


// const Albums = () => {

//   const [album, setAlbum] = useState([]);
//   const [name,setName] = useState("");
//   const [description, setDescription] = useState("");

//   const token = localStorage.getItem("token");

//   // fetch album

//   useEffect(()=>{
//     if(token){
//       axios.get(`${import.meta.env.VITE_BACKEND_URL}/albums`,{
//         headers:{
//           Authorization: `Bearer ${token}`
//         },
//       })
//       .then((res)=> {
//         // convert to array if needed
//         const albumsArray = Array.isArray(res.data.album) ? res.data.album : Object.values(res.data.album);
//         console.log(albumsArray)
//         setAlbum(albumsArray);
//       })
//       .catch((err)=> console.error(err));
//     }
//   },[token]);

//   return (
//     <div>
//       <h1 className='text-3xl font-bold'>Welcome to Snapify!</h1>

//       <h2>Create Album</h2>

//       <input
//       placeholder='Name'
//       value={name}
//       onChange={(e)=>setName(e.target.value)}
//       />
//       <input
//        placeholder="Description"
//        value={description}
//        onChange={(e)=>setDescription(e.target.value)}
//       />

//       <button >Create</button>
//       {/* onClick={createAlbum}ch */}

//       <h2>Albums</h2>
//       <ul>
//         {album.map((album)=>(
//           <li>
//             <strong>{album.name}</strong> - {album.description}
//           </li>
//         ))}
//       </ul>

//     </div>
//   )
// }

// export default Albums

import React, { useEffect, useState } from "react";
import axios from "axios";

const Albums = () => {
  const [album, setAlbum] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // fetch album
  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/albums`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const albumsArray = Array.isArray(res.data.album)
            ? res.data.album
            : Object.values(res.data.album || {});
          console.log(albumsArray);
          setAlbum(albumsArray);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950 relative overflow-hidden">

      {/* Option 3 Professional Pattern Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 border border-white/20">

        <h1 className="text-3xl font-bold text-white text-center">
          Welcome to Snapify!
        </h1>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">
          Create Album
        </h2>

        <div className="flex flex-col gap-3">
          <input
            className="px-4 py-3 rounded-xl outline-none bg-white/20 text-white placeholder-white/60 border border-white/20 focus:border-indigo-400"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="px-4 py-3 rounded-xl outline-none bg-white/20 text-white placeholder-white/60 border border-white/20 focus:border-indigo-400"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
            Create
          </button>
        </div>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          Albums
        </h2>

        <ul className="space-y-3">
          {album.map((album) => (
            <li
              key={album._id}
              className="bg-white/10 border border-white/20 rounded-xl p-4 text-white hover:bg-white/20 transition"
            >
              <strong className="text-lg">{album.name}</strong> -{" "}
              <span className="text-white/70">{album.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Albums;
