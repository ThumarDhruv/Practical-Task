import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import UserTable from "../components/UserTable";
import SearchFilter from "../components/SeachFliter";
import { RootState, useAppDispatch } from "../store/store"; // Import useAppDispatch

const UserList: React.FC = () => {
  const dispatch = useAppDispatch(); // Use typed dispatch
  const { users, loading } = useSelector((state: RootState) => state.users); // Make sure state.users matches store

  useEffect(() => {
    dispatch(fetchUsers()); // No TypeScript error
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <SearchFilter />
      {loading ? <p>Loading users...</p> : <UserTable users={users} />}
    </div>
  );
};

export default UserList;
