import { useUsersQuery } from "@/hooks/queries/useUsersQuery";
import { Link } from "react-router-dom";
import { useState } from "react";
import '@/styles/users.css'
import { useDeleteUser } from "@/hooks/mutations/useDeleteUser";
import PageHeader from "@/components/common/PageHeader";
import UsersTable from "../../components/user/UsersTable";
import UsersFooter from "./components/UsersFooter";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

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
        onSuccess: () => {
          if (data?.data.length === 1) {
            setCurrentPage(prev => prev - 1);
          }
        },
        onSettled: () => setDeletingID(null), // 成功或失败都重置

      });

    }
  }

  if (isQuerying) {
    return (<LoadingState />);
  }

  if (isError) {
    return <ErrorState />;
  }

  if (data.data.length === 0) {
    return <EmptyState message="暂无用户" />
  }

  return (
    <div className="admin-content-main">
      <PageHeader
        title="用户管理"
        pageText="管理系统中的所有用户"
        action={<Link to="/users/new" className="link-btn">新增用户</Link>}
      />

      <UsersTable
        users={data.data}
        isAction={true}
        deletingID={deletingID}
        isDeleting={isDeleting}
        onDel={onDel}
      />

      <UsersFooter
        page={currentPage}
        total={data.pageTotal}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );

}