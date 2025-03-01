import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface Props {
  userId: number;
}

const UserActions: React.FC<Props> = ({ userId }) => {
  const handleEdit = () => alert(`Edit User ${userId}`);
  const handleDelete = () => alert(`Delete User ${userId}`);
  const handleView = () => alert(`View User ${userId}`);

  return (
    <div className="flex space-x-3">
      <FaEye className="text-blue-500 cursor-pointer" onClick={handleView} />
      <FaEdit className="text-green-500 cursor-pointer" onClick={handleEdit} />
      <FaTrash className="text-red-500 cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default UserActions;
