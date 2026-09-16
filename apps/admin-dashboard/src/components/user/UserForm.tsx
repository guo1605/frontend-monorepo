import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';

const userSchema = z.object({
  name: z.string()
    .trim()
    .min(1, '不能为空')
    .max(30),
  email: z.email('邮箱格式不正确'),
  status: z.enum(['active', 'inactive'])
});

type UserInput = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: UserInput;
  submitText: string;
  isDisabled: boolean;
  onSubmit: (data: UserInput) => void;
  onCancel: () => void;
}

export default function UserForm({
  user = { name: '', email: '', status: 'active' },
  isDisabled, onSubmit, submitText, onCancel
}: UserFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: user
  })

  return (
    <form className='user-form' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="user-form-name">用户名</label>
      <input
        id='user-form-name'
        type="text"
        placeholder="请输入用户名"
        {...register('name')}
      />
      {errors.name && <span>{errors.name.message}</span>}

      <label htmlFor="user-form-email">Email</label>
      <input id='user-form-email' type="text"
        placeholder="请输入Email"
        {...register('email')}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <label htmlFor="user-form-status">状态</label>
      <select id="user-form-statu" {...register('status')}>
        <option value="active">正常</option>
        <option value="inactive">失效</option>
      </select>

      <div className="create-user-btns">
        <button
          type="button"
          onClick={onCancel}
          disabled={isDisabled}
        >取消</button>
        <button type="submit" disabled={isDisabled}>
          {submitText}
        </button>
      </div>
    </form>
  );
}