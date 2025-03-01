import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import UserViewPage from "./pages/UserViewPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route - Redirect to Users Page */}
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/edit/:id" element={<UserEditPage />} />
        <Route path="/users/view/:id" element={<UserViewPage />} />

        {/* Handle Undefined Routes */}
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </Router>
  );
};

export default App;
