import { useEditUser } from "@/hooks/queries/useEditUser";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "@/components/user/UserForm";
import PageHeader from "@/components/common/PageHeader";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import type { UserInput } from "@/types/user";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: user, isPending: isQueryPending, isError } = useUserQuery(id!);
  const { editUser, isPending: isEditing } = useEditUser();

  const onSubmit = (data: UserInput) => {
    editUser({ ...data, id: id! }, {
      onSuccess: () => {
        navigate(`/users/${id}`);
      }
    });
  }

  if (isQueryPending) {
    return (<LoadingState />);
  }

  if (isError) {
    return <ErrorState />
  }

  return (
    <div className="create-user">
      <PageHeader
        route={`/users/${id}`}
        backText="返回用户详情"
        title="编辑用户"
      />

      <UserForm
        user={user}
        isDisabled={isEditing}
        onSubmit={onSubmit}
        submitText={'修改用户'}
        onCancel={() => { navigate(`/users/${id}`) }}
      />

    </div>
  )
}