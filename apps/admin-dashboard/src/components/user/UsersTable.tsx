import type { User } from "@/types/user";
import { Link } from "react-router-dom";
import StatusTag from "../common/StatusTag";

export default function UsersTable({ users, deletingID, isDeleting, onDel, isAction = false }:
  {
    users: User[],
    deletingID?: string | null,
    isDeleting?: boolean,
    isAction?: boolean,
    onDel?: (id: string) => (() => void)
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
            {isAction ? <th>操作</th> : ''}
          </tr>
        </thead>

        <tbody>
          {users.map(item => {
            return <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link to={`/users/${item.id}`} className="link-default">
                  {item.name}
                </Link>
              </td>
              <td>{item.email}</td>
              <td>
                <StatusTag status={item.status} />
              </td>
              <td>{item.createdAt}</td>
              {isAction && onDel ? (
                <td>
                  <Link to={`/users/${item.id}`} className="link-default">
                    查看
                  </Link>
                  |
                  <Link to={`/users/${item.id}/edit`} className="link-default">
                    编辑
                  </Link>
                  |
                  <button
                    onClick={onDel(item.id)}
                    disabled={deletingID === item.id ? isDeleting : false}
                  >
                    {deletingID === item.id && isDeleting ? '删除中..' : '删除'}
                  </button>
                </td>
              ) : ''}

            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}