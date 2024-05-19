import React from "react";
import searchicon from "../../../assets/images/dashboard_search_icon.png";

const RequestModalSearch = ({ setSearch, search }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <div className="mb-2">
        <div className="search--bar">
          <img src={searchicon} alt="search" className="search--icon" />
          <input
            type="text"
            placeholder="Search patient name, phone number"
            className="search--text"
            onChange={handleChange}
            value={search}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestModalSearch;
