import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const AlbumDetails = () => {

    const {albumId} = useParams();
    const [album,setAlbum] = useState(null);

    useEffect(()=>{
        const fetchAlbum = async()=>{
            try{
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/albums/${albumId}`);
                if(!res.ok) throw new Error("Failed to fetch album");
                const data = await res.json();
                console.log(data);

                setAlbum(data);

            }catch(error){
                console.error(error);
            }
        }
        fetchAlbum();
    },[albumId])

    if(!album) return <p>Loading...</p>

  return (
    <div className="flex justify-center mt-8">
      <div className=' w-96
        p-8
        rounded-2xl
        bg-white/10
        backdrop-blur-md
        border border-white/20
        shadow-lg
        text-white
        text-center
        bg-gradient-to-br from-yellow-200 to-orange-400
        transition-transform transform hover:-translate-y-2 hover:shadow-2xl'>
        <h2  className="mb-2 text-2xl font-semibold"> {album.name}</h2>
      <p className="mb-4">{album.description}</p>
      <h3 className="text-lg font-medium mb-2">Shared With:</h3>
      {album.sharedUser.length === 0 ? (
        <p>No shared users</p>
      ):(
        <ul>
            {album.sharedUser.map((user,index)=>(
                <li key={index}>{user}</li>
            ))}
        </ul>
      )
    }


      </div>
    </div>
  )
}

export default AlbumDetails
