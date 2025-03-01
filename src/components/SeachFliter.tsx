import React from "react";

const SearchFilter: React.FC = () => {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search users..."
        className="p-2 border border-gray-300 rounded-md"
      />
      <select className="p-2 border border-gray-300 rounded-md">
        <option value="">Filter by Role</option>
        <option value="admin">Administrator</option>
        <option value="user">User</option>
      </select>
    </div>
  );
};

export default SearchFilter;
