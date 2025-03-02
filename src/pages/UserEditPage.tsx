import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, modifyUser } from "../store/userSlice";
import { RootState, AppDispatch } from "../store/store";
import { User } from "../types";

const UserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === id)
  );

  const [formData, setFormData] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && id) {
      dispatch(modifyUser({ id, user: formData })); //  Dispatch update action
      navigate("/users"); //  Navigate after update
    }
  };

  if (!formData) {
    return <p className="text-center mt-6">Loading user data...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Email"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserEditPage;
