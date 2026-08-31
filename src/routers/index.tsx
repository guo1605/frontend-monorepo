import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/DashboardPage";
import UserListPage from "../pages/users/UserListPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AdminRoute() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          path="/"
          element={
            <Navigate
              to={"/dashboard"}
              replace
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/users"
          element={<UserListPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}