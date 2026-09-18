import UsersTable from "@/components/user/UsersTable";
import type { RecentUsers } from "@/types/dashboard";

export default function RecentUsers({ users, onAllUsers }: { users: RecentUsers, onAllUsers: () => void }) {

  return (
    <div className="recent-users">
      <header className="recent-users-head">
        <p>最近新增用户</p>
        <button onClick={onAllUsers}>查看全部</button>
      </header>

      <UsersTable
        users={users}
      />

    </div>
  );
}