import { useUsersQuery } from "@/hooks/queries/useUsersQuery";
import UsersHeader from "./components/UsersHeader";
import UserTable from "./components/UsersTable";
import UsersFooter from "./components/UsersFooter";
import { useState } from "react";
import '@/styles/users.css'
import { useDeleteUser } from "@/hooks/queries/useDeleteUser";

export default function UserListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingID, setDeletingID] = useState<string | null>(null);

  const { data, isPending: isQuerying, isError } = useUsersQuery({
    page: currentPage, pageSize: 10
  });

  const { deleteUser, isPending: isDeleting } = useDeleteUser();

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  }

  const onDel = (id: string) => {
    return () => {
      const result = window.confirm('确认删除用户吗');
      if (!result) return;

      setDeletingID(id);
      deleteUser(id, {
        onSettled: () => setDeletingID(null), // 成功或失败都重置
      });

    }
  }

  if (isQuerying) {
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
        deletingID={deletingID}
        isDeleting={isDeleting}
        onDel={onDel}
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