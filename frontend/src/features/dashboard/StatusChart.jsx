import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Explicit color mapping based on status name
const STATUS_COLORS = {
  shortlisted: "#00C49F", // green
  rejected: "#fa5252", // red
  applied: "#0088FE", // blue
};

const StatusChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label={({ name, value }) => `${name}: ${value}`}
          labelLine={false}
          outerRadius={155} // Increased radius for larger chart
          fill="#8884d8"
          dataKey="value"
          innerRadius={85}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={STATUS_COLORS[entry.name.toLowerCase()] || "#ccc"} // fallback color
            />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} jobs`, name]} />
        <Legend
          verticalAlign="middle"
          align="right"
          width="20%"
          layout="vertical"
          iconSize={15}
          iconType="circle"
        />{" "}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusChart;
