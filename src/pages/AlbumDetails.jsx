import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/AlbumDetails.css'

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
    <div className='album-card-container'>
      <div className='album-card'>
        <h2> {album.name}</h2>
      <p>{album.description}</p>
      <h3>Shared With:</h3>
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
