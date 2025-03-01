import { User } from "../types";
import Papa from "papaparse";

export const exportUsersToCSV = (users: User[]) => {
  if (!users || users.length === 0) {
    alert("No users to export.");
    return;
  }

  const csvData = Papa.unparse(users, {
    header: true,
  });

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "users.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
