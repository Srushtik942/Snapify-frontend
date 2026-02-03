import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onSearch = () => {} }) {
  const [query, setQuery] = useState("");
    const navigate = useNavigate();

  const handleSearch = async(e) => {
    e.preventDefault();
    if (query.trim() === "")  return;

     navigate(`/albums/${encodeURIComponent(query)}`);

    // try{
    //   const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/albums/name/${encodeURIComponent(query)}`);
    //   console.log(res);

    //   onSearch(res.data.findAlbum);


    // }catch(error){
    //   console.log(error);

    //   // no album found

    //   onSearch([]);
    // }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="text-indigo-300 font-bold text-4xl">Snapify</h1>

        {/* <form className="flex gap-2"> */}
          <input
            type="text"
            placeholder="Search albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 outline-none border border-white/10 focus:border-indigo-400"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            Search
          </button>
        {/* </form> */}
      </div>
    </nav>
  );
}
