import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

const AlbumDetail = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [commentText, setCommentText] = useState({});

  // image upload
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");

  // ------------------ Fetch Album Details ------------------
  const fetchAlbumDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/albums/${albumId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const albumData = res.data.album || res.data;
      setAlbum(albumData);
      setDesc(albumData.description || "");
      setIsFavorite(albumData.isFavorite || false);

    } catch (err) {
      console.log(err);
      setError("Failed to load album details");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ Fetch All Images ------------------
  const fetchAlbumImages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/albums/${albumId}/images`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const imagesData = res.data.findImage || res.data.images || [];
      setImages(imagesData);

    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch images");
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAlbumDetails();
    fetchAlbumImages();
  }, [token]);

  // ------------------ Favorite Album ------------------
  const handleFavorite = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/albums/${albumId}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFavorite((prev) => !prev);
    } catch (err) {
      console.log(err);
      toast.error("Failed to favorite album");
    }
  };

// ------------------ Favorite Image ------------------
const handleFavoriteImage = async (imageId) => {
  try {
    // Find image using imageId (NOT _id)
    const img = images.find(i => i.imageId === imageId);

    if (!img) {
      toast.error("Image not found in state");
      return;
    }

    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/albums/${albumId}/images/${imageId}/favorite`,
      { isFavorite: !img.isFavorite },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // Update UI state
    setImages(prev =>
      prev.map(i =>
        i.imageId === imageId
          ? { ...i, isFavorite: res.data.image.isFavorite }
          : i
      )
    );

    toast.success("Image favorite updated!");

  } catch (err) {
    console.log(err);
    toast.error("Failed to update favorite");
  }
};




  // ------------------ Upload Image ------------------
  const handleUploadImage = async () => {
    if (!file) return toast.error("Please select an image");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("person", person);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/albums/${albumId}/images`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      toast.success("Image uploaded successfully!");
      setFile(null);
      setTags("");
      setPerson("");
      fetchAlbumImages();

    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ------------------ Delete Album ------------------
  const handleDeleteAlbum = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this album? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Album deleted successfully!");
      navigate("/albums");

    } catch (err) {
      console.log(err);
      toast.error("Failed to delete album");
    }
  };

  // update description
  const handleUpdateDescription = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/albums/${albumId}`,
        { description: desc },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Description updated!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update description");
    }
  };

  // -----------------Add Comment------------------

  const handleAddComment = async(imageId)=>{
    const text = commentText[imageId];

    if(!text?.trim()){
      toast.error("Enter a comment");
      return;
    }

    try{
      await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/albums/${albumId}/images/${imageId}/comments`,
              {comment: text},
              {headers: {Authorization: `Bearer ${token}`}}
      );
      toast.success("Comment added!");

      setCommentText(prev => ({...prev, [imageId]: ""}));

      fetchAlbumImages();

    }catch(err){
      console.log(err);
      toast.err("Failed to add comment")
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 my-15">
        {loading ? (
          <p className=" text-center text-lg">Loading album...</p>
        ) : error ? (
          <p className="text-red-200 text-center text-lg">{error}</p>
        ) : (
          <div className="bg-white/10  rounded-2xl shadow-sm p-6 md:p-10 border ">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl font-bold ">{album?.name}</h1>
              <div className="flex gap-3">
                <button
                  onClick={handleFavorite}
                  className="p-2 rounded-full hover:bg-white/20 transition"
                >
                  <Star
                    size={28}
                    className={isFavorite ? "text-yellow-400 fill-yellow-400" : "text-black"}
                  />
                </button>
                <button
                  onClick={handleDeleteAlbum}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-black font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Description */}
           <div className="mt-8 max-w-2xl">
  <label className="block text-gray-700 font-medium mb-2">
    Description
  </label>

  <textarea
    value={desc}
    onChange={(e) => setDesc(e.target.value)}
    rows={3}
    className="w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-400"
  />

  <button
    onClick={handleUpdateDescription}
    className="mt-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-black rounded-lg font-medium"
  >
    Save
  </button>
</div>


            {/* Upload Image */}
            <div className="mt-10">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-black  "

              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full mt-3 px-4 py-3 rounded-xl outline-none text-black placeholder-black/60 border border-black/40 focus:border-indigo-400"
              />
              <input
                type="text"
                placeholder="Person name"
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                className="w-full mt-3 px-4 py-3 rounded-xl outline-none bg-white/20 text-black placeholder-black/60 border border-black/20 focus:border-indigo-400"
              />
              <button
                onClick={handleUploadImage}
                disabled={uploading}
                className="mt-3 w-full bg-green-600 hover:bg-green-700 text-black font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>


            {/* Images */}
<div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
  {images.length === 0 ? (
    <p className="text-red">No images uploaded yet.</p>
  ) : (
    images.map((img) => (
     <div
  key={img._id}
  className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
>

        <img
          src={img.path }
          alt="album"
          className="w-full h-48 object-cover"
        />
<div className="p-3 space-y-2">

  {/* Person */}
  {img.person && (
    <p className="text-sm text-gray-700">
      👤 <span className="font-medium">Person:</span> {img.person}
    </p>
  )}

  {/* Tags */}
  {img.tags?.length > 0 && (
    <div className="flex flex-wrap gap-1">
      {img.tags.map((tag, i) => (
        <span
          key={i}
          className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
  )}

  {/* Existing comments */}
  <div className="text-sm text-black mb-2">
    {img.comments?.map(c => (
      <p key={c.commentId}>• {c.text}</p>
    ))}
  </div>

  {/* Add comment */}
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Add comment..."
      value={commentText[img.imageId] || ""}
      onChange={(e) =>
        setCommentText(prev => ({
          ...prev,
          [img.imageId]: e.target.value
        }))
      }
      className="flex-1 px-2 py-1 rounded bg-white/20 text-black text-md outline-none"
    />

    <button
      onClick={() => handleAddComment(img.imageId)}
      className="px-3 py-1 bg-indigo-500 text-black rounded text-sm"
    >
      Post
    </button>
  </div>
</div>


        {/* Favorite Button */}
        <button
  onClick={() => handleFavoriteImage(img.imageId)}
  className="absolute top-2 right-2 p-1 bg-black rounded-full hover:bg-white/50 transition"
>

          <Star
            size={20}
            className={
              img.isFavorite ? "text-yellow-400 fill-yellow-400" : "text-black"
            }
          />
        </button>
      </div>
    ))
  )}
</div>


          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
