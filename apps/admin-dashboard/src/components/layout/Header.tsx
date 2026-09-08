import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const pageTile: string = location.pathname === "/dashboard" ? "Dashboard" : "用户管理";


  return (
    <header className="header">
      <div>{pageTile}</div>
      <div>Admin</div>
    </header>
  );
}