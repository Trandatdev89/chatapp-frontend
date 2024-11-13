import React, { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState([]);
  const token=localStorage.getItem('token');

  const handleClick=async()=>{
      
  }
  return (
    <div className="card-header">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search..."
          name
          className="form-control search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="input-group-prepend">
          <span
            className="input-group-text search_btn"
            style={{ height: "100%" }}
            onClick={handleClick}
          >
            <i className="fas fa-search" />
          </span>
        </div>
      </div>
    </div>
  );
}
