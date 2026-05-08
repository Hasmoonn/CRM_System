"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#eab308",
  "#a855f7",
  "#06b6d4",
  "#10b981",
  "#ef4444",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "10px 14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "2px",
          }}
        >
          {label || payload[0].name}
        </p>
        <p style={{ fontSize: "12px", color: "#059669", fontWeight: 500 }}>
          {payload[0].value} leads
        </p>
      </div>
    );
  }
  return null;
};

export function StatusPieChart({ data }) {
  const chartData =
    data?.map((item) => ({
      name: item._id,
      value: item.count,
    })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "12px",
      }}
    >
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#111827",
          marginBottom: "20px",
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        Leads by Status
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                opacity={0.85}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div
        className="flex flex-wrap justify-center"
        style={{ gap: "12px", marginTop: "16px" }}
      >
        {chartData.map((entry, index) => (
          <div
            key={entry.name}
            className="flex items-center"
            style={{ gap: "6px" }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "2px",
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />
            <span style={{ fontSize: "12px", color: "#6b7280" }}>
              {entry.name} ({entry.value})
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function SourceBarChart({ data }) {
  const chartData =
    data?.map((item) => ({
      name: item._id,
      count: item.count,
    })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "12px",
      }}
    >
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#111827",
          marginBottom: "20px",
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        Leads by Source
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="name"
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                opacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
