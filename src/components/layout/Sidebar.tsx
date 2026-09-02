import { NavLink } from "react-router-dom";
import "@/styles/sidebar.css"

const appTilte = import.meta.env.VITE_APP_TITLE;

console.log('----', appTilte);
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        {appTilte}
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