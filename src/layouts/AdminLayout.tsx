import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import "@/styles/Adminlayout.css"

export default function AdminLayout() {

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}