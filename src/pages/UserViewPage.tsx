import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useParams, useNavigate } from "react-router-dom";

const UserViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === id)
  );

  if (!user) {
    return <p className="text-center mt-6">User not found.</p>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dob}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Status:</strong> {user.status}
        </p>
        <button
          onClick={() => navigate("/users")}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserViewPage;
