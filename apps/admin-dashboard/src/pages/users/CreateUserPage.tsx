import { useNavigate } from "react-router-dom";
import { useCreatUser } from "@/hooks/queries/useCreateUser";
import PageHeader from "@/components/common/PageHeader";
import UserForm from "@/components/user/UserForm";
import type { UserInput } from "@/types/user";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const { creatUser, isPending } = useCreatUser();

  const onSubmit = (userInput: UserInput) => {
    creatUser(userInput, {
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
