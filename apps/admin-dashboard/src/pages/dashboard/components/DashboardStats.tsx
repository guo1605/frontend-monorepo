import type { StatsData } from "@/types/types";
import StatsCard from "./StatsCard";

export default function DashboardStats({ statsDatas }: { statsDatas: StatsData[] }) {

  return (
    <div className="dashboard-stats">
      {
        statsDatas.map(item => {
          return <StatsCard key={item.label}
            label={item.label}
            value={item.value}
            trend={item.trend} />
        })
      }
    </div>
  );
}