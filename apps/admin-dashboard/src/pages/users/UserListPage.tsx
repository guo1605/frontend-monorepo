import { useUsersQuery } from "@/hooks/queries/useUsersQuery";
import UsersHeader from "./components/UsersHeader";
import UserTable from "./components/UsersTable";
import UsersFooter from "./components/UsersFooter";
import { useState } from "react";
import '@/styles/users.css'

export default function UserListPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError } = useUsersQuery({
    page: currentPage, pageSize: 10
  });

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  }

  if (isPending) {
    return (
      <div>
        加载中...
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        加载失败
      </div>
    )
  }

  return (
    <div className="admin-content-main">
      <UsersHeader />

      <UserTable
        users={data.data}
      />

      <UsersFooter
        page={currentPage}
        total={data.total}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );

}