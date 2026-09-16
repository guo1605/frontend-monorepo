import type { UserStatus } from "@/types/user";

export default function StatusTag({ status }: { status: UserStatus }) {
  return (
    <div>
      {status === 'active' ? '正常' : '失效'}
    </div>
  );
}