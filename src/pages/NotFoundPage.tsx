import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>

      <p>页面不存在</p>

      <Link to="/dashboard">
        返回Dashboard
      </Link>
    </div>
  );
}