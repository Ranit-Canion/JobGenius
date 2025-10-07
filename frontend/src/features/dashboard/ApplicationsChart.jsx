import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ApplicationsBarChart = ({ applicationStates = [] }) => {
  console.log(applicationStates);
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={applicationStates}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis allowDecimals={false} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, applications, shortlisted } = payload[0].payload;
                return (
                  <div className="bg-white shadow p-2 rounded text-sm">
                    <p className="font-semibold text-blue-500">{name}</p>
                    <p>Applications: {applications}</p>
                    <p>Shortlisted: {shortlisted}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar
            dataKey="applications"
            fill="#1c7ed6"
            name="Total Applications"
          />
          <Bar dataKey="shortlisted" fill="#8ce99a" name="Shortlisted" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationsBarChart;
