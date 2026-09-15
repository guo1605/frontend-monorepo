import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/dashboard/DashboardPage";
import UserListPage from "@/pages/users/UserListPage";
import UserDetailPage from "@/pages/users/UserDetailPage";
import CreateUserPage from "@/pages/users/CreateUserPage";
import NotFoundPage from "@/pages/NotFoundPage";
import EditUserPage from "@/pages/users/EditUserPage";

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
          path="/users/:id"
          element={<UserDetailPage />}
        />

        <Route
          path="/users/new"
          element={<CreateUserPage />}
        />

        <Route
          path="/users/:id/edit"
          element={<EditUserPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}