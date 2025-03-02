import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../store/userSlice";
import UserTable from "../components/UserTable";
import SearchFilter from "../components/SeachFliter";
import { RootState, useAppDispatch } from "../store/store";

import { useNavigate } from "react-router-dom";
import { exportUsersToCSV } from "../utils/exportToCSV";
import { User } from "../types";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state: RootState) => state.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof User>("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(removeUser(id.toString()));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm("Are you sure you want to delete the selected users?")) {
      selectedUsers.forEach((id) => dispatch(removeUser(id)));
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (id: string, selected: boolean) => {
    setSelectedUsers((prevSelectedUsers) => {
      const newSelectedUsers = new Set(prevSelectedUsers);
      if (selected) {
        newSelectedUsers.add(id);
      } else {
        newSelectedUsers.delete(id);
      }
      return newSelectedUsers;
    });
  };

  const handleExportCSV = () => {
    exportUsersToCSV(users);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) => (roleFilter ? user.role === roleFilter : true))
    .sort((a, b) => {
      const field = sortField as keyof User;
      const aValue = a[field] ?? "";
      const bValue = b[field] ?? "";

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 relative">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
      />

      <div className="flex gap-4 mb-4">
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as keyof User)}
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <button
        onClick={handleExportCSV}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Export to CSV
      </button>

      <button
        onClick={() => navigate("/users/add")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Add User
      </button>

      <button
        onClick={handleDeleteSelected}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        disabled={selectedUsers.size === 0}
      >
        Delete Selected
      </button>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <UserTable
          users={paginatedUsers}
          onDelete={handleDelete}
          onSelectUser={handleSelectUser}
        />
      )}

      {filteredUsers.length > itemsPerPage && (
        <div className="mt-4 flex justify-center">
          {[
            ...Array(Math.ceil(filteredUsers.length / itemsPerPage)).keys(),
          ].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 mx-1 rounded-md ${
                currentPage === page + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
