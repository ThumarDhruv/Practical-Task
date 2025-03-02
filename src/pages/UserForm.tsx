import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, modifyUser } from "../store/userSlice";
import { RootState, AppDispatch } from "../store/store";
import { User } from "../types";

const UserForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>() as { id?: string };
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    if (id) {
      const existingUser = users.find((u) => u.id === id);
      if (existingUser) {
        Object.entries(existingUser).forEach(([key, value]) => {
          setValue(key as keyof User, value as User[keyof User]);
        });
      }
    }
  }, [id, users, setValue]);

  const onSubmit = (data: User) => {
    if (id) {
      dispatch(modifyUser({ id, user: data }));
    } else {
      dispatch(createUser(data));
    }
    navigate("/users");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit User" : "Add User"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="w-full p-2 border rounded-md"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
          })}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <select {...register("role")} className="w-full p-2 border rounded-md">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <input
          {...register("dob", { required: "Date of Birth is required" })}
          type="date"
          className="w-full p-2 border rounded-md"
        />
        {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

        <select
          {...register("gender")}
          className="w-full p-2 border rounded-md"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select
          {...register("status")}
          className="w-full p-2 border rounded-md"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md"
        >
          {id ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
