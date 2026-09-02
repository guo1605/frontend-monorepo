import type { StatsCardProps } from "@/types/types";

export default function StatsCard({ label, value }: StatsCardProps) {

  return (
    <div className="stats-card">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}