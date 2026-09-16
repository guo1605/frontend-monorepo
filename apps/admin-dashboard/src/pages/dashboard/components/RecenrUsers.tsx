import UserTable from "@/components/user/UsersTable";
import type { RecentUser } from "@/types/dashboard";

export default function RecenrUsers({ users, onAllUsers }: { users: RecentUser[], onAllUsers: () => void }) {

  return (
    <div className="recenr-users">
      <header className="recenr-users-head">
        <p>最近新增用户</p>
        <button onClick={onAllUsers}>查看全部</button>
      </header>

      <UserTable
        users={users}
      />

    </div>
  );
}