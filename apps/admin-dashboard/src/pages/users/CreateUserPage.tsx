import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatUser } from "@/hooks/queries/useCreateUser";

const userSchema = z.object({
  name: z.string()
    .trim()
    .min(1, '不能为空')
    .max(5),
  email: z.email('邮箱格式不正确'),
  status: z.enum(['active', 'inactive'])
});

type UserInput = z.infer<typeof userSchema>;

export default function CreateUserPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', status: 'active' }
  });

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
      <div>
        <Link to="/users">返回用户列表</Link>
        <p>新增用户</p>
        <p>创建一个新的系统用户</p>
      </div>

      <form className='create-user-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="cre-name">用户名</label>
        <input
          id='cre-name'
          type="text"
          placeholder="请输入用户名"
          {...register('name')}
        />
        {errors.name && <span>{errors.name.message}</span>}

        <label htmlFor="cre-email">Email</label>
        <input id='cre-email' type="text"
          placeholder="请输入Email"
          {...register('email')}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="cre-status">状态</label>
        <select id="cre-statu" {...register('status')}>
          <option value="active">正常</option>
          <option value="inactive">失效</option>
        </select>

        <div className="create-user-btns">
          <button
            type="button"
            onClick={() => { navigate('/users') }}
            disabled={isPending}
          >取消</button>
          <button type="submit" disabled={isPending}>创建用户</button>
        </div>
      </form>

    </div>
  );
}
