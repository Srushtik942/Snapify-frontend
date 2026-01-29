import React from 'react'
import { useState } from 'react'

const Navbar = ({onSearch}) => {

    const [query, setQuery] = useState("");
    const handleSearch = (e)=>{
        e.preventDefault();

        if(query.trim() !== ""){
            onSearch(query);
        }

    }

  return (
    <div>
 <nav style={{ padding: "1rem", backgroundColor: "#222", color: "white", display: "flex", justifyContent: "space-between" }}>
      <h1 style={{ margin: 0 }}>My Albums App</h1>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Search albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.3rem", borderRadius: "4px", border: "none" }}
        />
        <button type="submit" style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "none", cursor: "pointer" }}>
          Search
        </button>
      </form>
    </nav>
    </div>
  )
}

export default Navbar
