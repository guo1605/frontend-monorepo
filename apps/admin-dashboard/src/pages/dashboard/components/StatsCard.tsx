import type { StatsData } from "@/types/dashboard";

export default function StatsCard({ label, value, trend }: StatsData) {

  return (
    <div className="stats-card">
      <p>{label}</p>
      <p>{value}</p>
      <p>{trend}</p>
    </div>
  );
}