// src/components/SuperAdminAnalytics.js
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Box,
  Tooltip as NewTooltip,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import CalendarHeatmap from "react-calendar-heatmap";
// import ReactTooltip from "react-tooltip";
import GlobalSalesMap from "./GlobalSalesMap";
import "./css/calenderHeatmap.css"; // Import the CSS file

// Import dummy data
import {
  keyMetricsData,
  regionalSalesData,
  marketShareData,
  userGrowthData,
  activityHeatmapData,
  conversionFunnelData,
} from "./data/superAdminData";
import { useTheme } from "react-admin";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8042"];
const FUNNEL_COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d"];

const SuperAdminAnalytics = () => {
  const [theme, setTheme] = useTheme();
  return (
    <Grid container spacing={2}>
      {/* Key Metrics Over Time */}
      <Grid item xs={12} md={8}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor:
              theme && theme === "dark" ? "#222 !important" : "#fff !important",
            color: theme && theme === "dark" ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Key Metrics Over Time" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={keyMetricsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                <Line type="monotone" dataKey="users" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Global Sales Map */}
      <Grid item xs={12} md={4}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor:
              theme && theme === "dark" ? "#222 !important" : "#fff !important",
            color: theme && theme === "dark" ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Sales Distribution Across Africa" />
          <CardContent 
          sx={{ maxHeight: "350px" }}
          >
            <GlobalSalesMap />
          </CardContent>
        </Card>
      </Grid>

      {/* Regional Sales Comparison */}
      <Grid item xs={12}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor:
              theme && theme === "dark" ? "#222 !important" : "#fff !important",
            color: theme && theme === "dark" ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Sales by Country and Category" />
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={regionalSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="region"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="electronics" stackId="a" fill="#8884d8" />
                <Bar dataKey="fashion" stackId="a" fill="#82ca9d" />
                <Bar dataKey="groceries" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Market Share Pie Chart */}
      <Grid item xs={12} md={6}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor:
              theme && theme === "dark" ? "#222 !important" : "#fff !important",
            color: theme && theme === "dark" ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Market Share by Vendor" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketShareData}
                  dataKey="value"
                  nameKey="vendor"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  label
                >
                  {marketShareData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Conversion Funnel */}
      <Grid item xs={12} md={6}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor:
              theme && theme === "dark" ? "#222 !important" : "#fff !important",
            color: theme && theme === "dark" ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Conversion Funnel" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={conversionFunnelData}
                  isAnimationActive
                >
                  {conversionFunnelData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]}
                    />
                  ))}
                  <LabelList
                    position="right"
                    fill="#000"
                    stroke="none"
                    dataKey="stage"
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* User Growth Area Chart */}
      <Grid item xs={12}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor:
              theme && theme === "dark" ? "#222 !important" : "#fff !important",
            color: theme && theme === "dark" ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="User Growth Over Time" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
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

      {/* Activity Heatmap */}
      <Grid item xs={12}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor:
              theme && theme === "dark" ? "#222 !important" : "#fff !important",
            color: theme && theme === "dark" ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Activity Heatmap" />
          <CardContent>
            <CalendarHeatmap
              startDate={new Date("2022-01-01")}
              endDate={new Date("2022-12-31")}
              values={activityHeatmapData}
              classForValue={(value) => {
                if (!value || value.count === 0) {
                  return "color-empty";
                } else if (value.count >= 4) {
                  return "color-scale-4";
                } else if (value.count >= 3) {
                  return "color-scale-3";
                } else if (value.count >= 2) {
                  return "color-scale-2";
                } else {
                  return "color-scale-1";
                }
              }}
              titleForValue={(value) =>
                value && value.date
                  ? `${value.date}: ${value.count} activities`
                  : "No data"
              }
              showWeekdayLabels
              transformDayElement={(element, value, index) => {
                const tooltipTitle =
                  value && value.date
                    ? `${value.date}: ${value.count} activities`
                    : "No data";
                return (
                  <NewTooltip key={index} title={tooltipTitle} arrow>
                    {element}
                  </NewTooltip>
                );
              }}
            />

            {/* Legend */}
            <Box mt={2} display="flex" alignItems="center">
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginRight: 8 }}
              >
                Less
              </Typography>
              <Box display="flex">
                <Box
                  width={20}
                  height={20}
                  bgcolor="#c6e48b"
                  border={1}
                  borderColor="grey.400"
                  mr={0.5}
                />
                <Box
                  width={20}
                  height={20}
                  bgcolor="#7bc96f"
                  border={1}
                  borderColor="grey.400"
                  mr={0.5}
                />
                <Box
                  width={20}
                  height={20}
                  bgcolor="#239a3b"
                  border={1}
                  borderColor="grey.400"
                  mr={0.5}
                />
                <Box
                  width={20}
                  height={20}
                  bgcolor="#196127"
                  border={1}
                  borderColor="grey.400"
                />
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginLeft: 8 }}
              >
                More
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SuperAdminAnalytics;
