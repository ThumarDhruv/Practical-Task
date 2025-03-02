import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store/store";
import { RootState } from "./store/store";
import { fetchUsers } from "./store/userSlice";

// Pages
import LoginPage from "./pages/LoginPage";
import UserList from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import UserViewPage from "./pages/UserViewPage";
import UserForm from "./pages/UserForm"; // Import UserForm
import './index.css'; 
// Components
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // ✅ Get authentication state directly from Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUsers()); // ✅ Will only run once when isAuthenticated changes
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/users" replace /> : <LoginPage />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/view/:id"
          element={
            <ProtectedRoute>
              <UserViewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/add"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />

        {/* Redirect to login if no matching route */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/users" : "/login"} replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;