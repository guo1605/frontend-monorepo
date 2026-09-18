import { NavLink } from "react-router-dom";
import "@/styles/sidebar.css"

const appTitle = import.meta.env.VITE_APP_TITLE;

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        {appTitle}
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/users">
          用户管理
        </NavLink>
      </nav>

    </aside>

  );
}