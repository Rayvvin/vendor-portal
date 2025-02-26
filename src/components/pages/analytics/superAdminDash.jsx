// SuperAdminDashboard.js
import React from "react";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Sample data for line chart
const lineData = [
  { month: 'Jan', revenue: 40000 },
  { month: 'Feb', revenue: 30000 },
  // Add more data points
];

// Sample data for bar chart
const barData = [
  { region: 'North America', sales: 50000 },
  { region: 'Europe', sales: 40000 },
  // Add more data points
];

// Sample data for pie chart
const pieData = [
  { vendor: 'Vendor A', value: 400 },
  { vendor: 'Vendor B', value: 300 },
  // Add more data points
];

// Sample data for area chart
const areaData = [
  { date: '2022-01-01', users: 1000 },
  { date: '2022-02-01', users: 1500 },
  // Add more data points
];


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SuperAdminDashboard = () => (
  <Grid container spacing={2}>
    {/* Line Chart */}
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader title="Monthly Revenue" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Bar Chart */}
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader title="Top Regions by Sales" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Pie Chart */}
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader title="Market Share by Vendor" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="vendor"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Area Chart */}
    <Grid item xs={12} md={8}>
      <Card>
        <CardHeader title="User Growth Over Time" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Additional Charts */}
    {/* Add more charts as needed */}
  </Grid>
);

export default SuperAdminDashboard;
