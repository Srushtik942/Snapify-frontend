import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onSearch = () => {} }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    navigate(`/albums/name/${encodeURIComponent(query)}`);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">

        {/* Logo */}
        <h1
          onClick={() => navigate("/albums")}
          className="text-2xl font-semibold text-indigo-600 cursor-pointer tracking-tight"
        >
          Snapify
        </h1>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center w-full max-w-xl bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-400 transition">

            <input
              type="text"
              placeholder="Search albums"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />

            <button
              onClick={handleSearch}
              className="ml-3 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
            >
              Search
            </button>

          </div>
        </div>

        {/* Optional Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-200 flex items-center justify-center text-gray-600 font-semibold">
            S
          </div>
        </div>

      </div>
    </nav>
  );
}
