import React from "react";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
}) => {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search users..."
        className="p-2 border border-gray-300 rounded-md w-full sm:w-64"
      />

      <select
        value={roleFilter}
        onChange={(e) => onRoleChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full sm:w-48"
      >
        <option value="">Filter by Role</option>
        <option value="admin">Administrator</option>
        <option value="user">User</option>
      </select>
    </div>
  );
};

export default SearchFilter;
