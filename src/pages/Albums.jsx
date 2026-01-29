import React, { useEffect, useState } from 'react'

const Albums = () => {

  const [album, setAlbum] = useState([]);
  const [name,setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // fetch album

  useEffect(()=>{
    if(token){
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/albums`,{
        headers:{
          Authorization: `Bearer ${token}`
        },
      })
      .then((res)=> setAlbum(res.data.album))
      .catch((err)=> console.error(err));
    }
  },[token]);

  return (
    <div>
      <h1>Welcome to Snapify!</h1>

      <h2>Create Album</h2>

      <input
      placeholder='Name'
      value={name}
      onChange={(e)=> ssrExportNameKey(e.target.value)}
      />
      <input
       placeholder="Description"
       value={description}
       onChange={(e)=>setDescription(e.target.value)}
      />

      <button onClick={createAlbum}>Create</button>

      <h2>Albums</h2>
      <ul>
        {Albums.map((album)=>(
          <li>
            <strong>{album.name}</strong> - {album.description}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Albums
