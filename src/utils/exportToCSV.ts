import { User } from "../types";
import Papa from "papaparse";

export const exportUsersToCSV = (users: User[]) => {
  if (!users || users.length === 0) {
    alert("No users to export.");
    return;
  }

  // Format data to only include necessary fields
  const formattedUsers = users.map(({ id, name, email, role }) => ({
    ID: id,
    Name: name,
    Email: email,
    Role: role,
  }));

  const csvData = Papa.unparse(formattedUsers, {
    header: true,
  });

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Create a download link
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `users_${new Date().toISOString()}.csv`);
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
