// SellerDashboard.js
import React from "react";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Sales data for line chart
const salesData = [
  { date: '2022-01-01', sales: 1000 },
  { date: '2022-02-01', sales: 1500 },
  // Add more data points
];

// Product data for bar chart
const productData = [
  { product: 'Product A', unitsSold: 500 },
  { product: 'Product B', unitsSold: 300 },
  // Add more data points
];

// Performance data for radar chart
const performanceData = [
  { metric: 'Sales', value: 120 },
  { metric: 'Returns', value: 80 },
  { metric: 'Ratings', value: 130 },
  // Add more data points
];


const SellerDashboard = () => (
  <Grid container spacing={2}>
    {/* Line Chart */}
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader title="Sales Over Time" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Bar Chart */}
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader title="Best Selling Products" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="unitsSold" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Radar Chart */}
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader title="Performance Metrics" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar
                name="Seller"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Heatmap or Additional Charts */}
    {/* Implement additional charts as needed */}
  </Grid>
);

export default SellerDashboard;
