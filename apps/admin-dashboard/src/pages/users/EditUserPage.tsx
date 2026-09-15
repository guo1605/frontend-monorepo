import { useEditUser } from "@/hooks/queries/useEditUser";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string()
    .trim()
    .min(1, '不能为空')
    .max(10, '最多10个字符'),
  email: z.email('邮箱格式不正确'),
  status: z.enum(['active', 'inactive'])
});

type UpdateUserInput = z.infer<typeof updateUserSchema>;

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: user, isPending: isQueryPending, isError } = useUserQuery(id!);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: '',
      email: '',
      status: 'active'
    }
  });
  const { editUser, isPending: isEditing } = useEditUser();

  // 更新用户数据
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        status: user.status,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UpdateUserInput) => {
    editUser({ ...data, id: id! }, {
      onSuccess: () => {
        navigate(`/users/${id}`);
      }
    });
  }

  if (isQueryPending) {
    return <div>
      加载中...
    </div>
  }

  if (isError) {
    return <div>
      加载失败
    </div>
  }

  return (
    <div className="create-user">
      <div>
        <Link to={`/users/${id}`}>返回用户详情</Link>
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
            onClick={() => { navigate(`/users/${id}`) }}
            disabled={isEditing}
          >取消</button>
          <button type="submit" disabled={isEditing}>修改用户</button>
        </div>
      </form>

    </div>
  )
}