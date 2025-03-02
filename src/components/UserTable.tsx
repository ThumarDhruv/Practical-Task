import React from "react";
import UserActions from "./UserAction";
import { Props } from "../types";

const UserTable: React.FC<Props> = ({ users, onDelete, onSelectUser }) => {
  if (!users || users.length === 0) {
    return <p className="text-center py-4 text-gray-500">No users found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border">
              <input
                type="checkbox"
                onChange={(e) => {
                  const checked = e.target.checked;
                  users.forEach((user) =>
                    onSelectUser(user.id.toString(), checked)
                  );
                }}
              />
            </th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Date of Birth</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border hover:bg-gray-200 transition">
              <td className="p-2 border">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    onSelectUser(user.id.toString(), e.target.checked)
                  }
                />
              </td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">{user.dob}</td>
              <td className="p-2 border">{user.gender}</td>
              <td className="p-2 border">{user.status}</td>
              <td className="p-2 border">
                <UserActions userId={user.id} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
