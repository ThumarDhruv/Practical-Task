import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  userId: string | number;
  onDelete: (id: string | number) => void; 
}

const UserActions: React.FC<Props> = ({ userId, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/users/edit/${userId}`);

  
  const handleView = () => navigate(`/users/view/${userId}`);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      onDelete(userId);
    }
  };

  return (
    <div className="flex space-x-3">
      <FaEye className="text-blue-500 cursor-pointer" onClick={handleView} />
      <FaEdit className="text-green-500 cursor-pointer" onClick={handleEdit} />
      <FaTrash className="text-red-500 cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default UserActions;
