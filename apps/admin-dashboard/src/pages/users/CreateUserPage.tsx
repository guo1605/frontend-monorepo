import { useNavigate } from "react-router-dom";
import { useCreateUser } from "@/hooks/mutations/useCreateUser";
import PageHeader from "@/components/common/PageHeader";
import UserForm from "@/components/user/UserForm";
import type { UserInput } from "@/types/user";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const { createUser, isPending } = useCreateUser();

  const onSubmit = (userInput: UserInput) => {
    createUser(userInput, {
      onSuccess: () => {
        navigate('/users');
      }
    });
  };

  return (
    <div className="create-user">
      <PageHeader
        route='/users'
        backText="返回用户列表"
        title="新增用户"
        pageText="创建一个新的系统用户"
      />

      <UserForm
        user={{ name: '', email: '', status: 'active' }}
        isDisabled={isPending}
        onSubmit={onSubmit}
        submitText={'创建新用户'}
        onCancel={() => { navigate('/users') }}
      />

    </div>
  );
}
