// Dashboard.js
import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", sales: 4000, vendors: 2400 },
  { month: "Feb", sales: 3000, vendors: 1398 },
  // Add more data points
];

const AnalyDashboard = () => (
  <Card>
    <CardHeader title="Sales Analytics" />
    <CardContent>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <Line type="monotone" dataKey="vendors" stroke="#82ca9d" />
      </LineChart>
    </CardContent>
  </Card>
);

export default AnalyDashboard;
