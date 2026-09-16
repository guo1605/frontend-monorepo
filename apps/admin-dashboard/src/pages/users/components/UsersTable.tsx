import type { User } from "@/types/user";
import { Link } from "react-router-dom";

export default function UserTable({ users, deletingID, isDeleting, onDel }:
  {
    users: User[],
    deletingID: string | null,
    isDeleting: boolean,
    onDel: (id: string) => (() => void)
  }) {

  return (
    <div className="users-table">

      <table style={{ "width": "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户</th>
            <th>Email</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {users.map(item => {
            return <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link to={`/users/${item.id}`} className="link-dedult">
                  {item.name}
                </Link>
              </td>
              <td>{item.email}</td>
              <td>{item.status}</td>
              <td>{item.createdAt}</td>
              <td>
                <Link to={`/users/${item.id}`} className="link-dedult">
                  查看
                </Link>
                |
                <Link to={`/users/${item.id}/edit`} className="link-dedult">
                  编辑
                </Link>
                |
                <button
                  onClick={onDel(item.id)}
                  className="link-dedult"
                  disabled={deletingID === item.id ? isDeleting : false}
                >
                  {deletingID === item.id && isDeleting ? '删除中..' : '删除'}
                </button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}