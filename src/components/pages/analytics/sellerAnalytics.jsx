// src/components/SellerAnalytics.js
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import CalendarHeatmap from "react-calendar-heatmap";
import "./css/calenderHeatmap.css"; // Import the CSS file
// import ReactTooltip from "react-tooltip";

// Import dummy data
// import {
//   salesOverTimeData,
//   productPerformanceData,
//   categorySalesData,
//   customerRatingsData,
//   salesHeatmapData,
//   inventoryScatterData,
// } from "./data/sellerData";
import { useTheme } from "react-admin";
import { useGetIdentity } from "react-admin";
import Medusa from "@medusajs/medusa-js";
import { useStore } from "react-admin";
import { useEffect, useState } from "react";
import {
  // Import new data functions from the updated data file
  getSalesOverTimeData,
  getProductPerformanceData,
  getCategorySalesData,
  getCustomerRatingsData,
  getSalesHeatmapData,
  getInventoryScatterData,
} from "./data/sellerDataNew";

const SellerAnalytics = () => {
  // useTheme now returns the theme object directly
  const theme = useTheme();
  const { identity, data, isLoading } = useGetIdentity();
  const [medusa, setMedusa] = useState(null);
  const [orderList, setOrderList] = useState(null);
  const [productList, setProductList] = useState(null);

  // Initialize Medusa client once the API token is available
  useEffect(() => {
    if (data?.medusa_user?.api_token) {
      const medusaInstance = new Medusa({
        maxRetries: 3,
        baseUrl: import.meta.env.VITE_MEDUSA_URL,
        apiKey: data.medusa_user.api_token,
      });
      setMedusa(medusaInstance);
    }
  }, [data]);

  // Define state variables for each data set
  const [salesOverTimeData, setSalesOverTimeData] = useState([]);
  const [productPerformanceData, setProductPerformanceData] = useState([]);
  const [categorySalesData, setCategorySalesData] = useState([]);
  const [customerRatingsData, setCustomerRatingsData] = useState([]);
  const [salesHeatmapData, setSalesHeatmapData] = useState([]);
  const [inventoryScatterData, setInventoryScatterData] = useState([]);

  useEffect(() => {
    if (medusa) {
      const fetchOrdersAndProducts = async () => {
        try {
          const ordersResponse = await medusa.admin.orders.list();
          const productsResponse = await medusa.admin.products.list();
          // Process fetched orders and products as needed
          setOrderList(ordersResponse.orders);
          setProductList(productsResponse.products);
        } catch (error) {
          console.error("Error fetching orders and products:", error);
        }
      };
      fetchOrdersAndProducts();
    }
  }, [medusa]);

  // Fetch data from Medusa once it is initialized
  useEffect(() => {
    if (medusa && orderList && productList) {
      // Fetch data using the new functions

      const fetchData = async () => {
        const salesData = await getSalesOverTimeData(orderList);
        const productData = await getProductPerformanceData(orderList);
        const categoryData = await getCategorySalesData(productList, orderList);
        // const ratingsData = await getCustomerRatingsData(medusa);
        const heatmapData = await getSalesHeatmapData(orderList);
        const scatterData = await getInventoryScatterData(productList, orderList);

        setSalesOverTimeData(salesData);
        setProductPerformanceData(productData);
        setCategorySalesData(categoryData);
        // setCustomerRatingsData(ratingsData);
        setSalesHeatmapData(heatmapData);
        setInventoryScatterData(scatterData);
      };
      fetchData();
    }
  }, [productList, orderList, medusa]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // Get the mode from theme palette if available
  const isDarkMode = theme && theme.palette && theme.palette.mode === "dark";

  return (
    <Grid container spacing={2}>
      {/* Sales Over Time */}
      <Grid item xs={12} md={8}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor: isDarkMode ? "#222 !important" : "#fff !important",
            color: isDarkMode ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Sales Over Time" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Category Sales Donut Chart */}
      <Grid item xs={12} md={4}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor: isDarkMode ? "#222 !important" : "#fff !important",
            color: isDarkMode ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Sales by Category" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySalesData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  label
                >
                  {categorySalesData.map((entry, index) => (
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

      {/* Customer Ratings Radar Chart */}
      <Grid item xs={12} md={4}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor: isDarkMode ? "#222 !important" : "#fff !important",
            color: isDarkMode ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Customer Ratings" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={customerRatingsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="aspect" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar
                  name="Ratings"
                  dataKey="rating"
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

      {/* Product Performance */}
      <Grid item xs={12} md={8}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor: isDarkMode ? "#222 !important" : "#fff !important",
            color: isDarkMode ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Product Performance" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="returns" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Sales Heatmap */}
      <Grid item xs={12}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor: isDarkMode ? "#222 !important" : "#fff !important",
            color: isDarkMode ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Sales Heatmap" />
          <CardContent>
            <CalendarHeatmap
              startDate={new Date("2022-01-01")}
              endDate={new Date("2022-12-31")}
              values={salesHeatmapData}
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
              showWeekdayLabels
              transformDayElement={(element, value, index) => {
                const tooltipTitle =
                  value && value.date
                    ? `${value.date}: ${value.count} sales`
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

      {/* Inventory Scatter Plot */}
      <Grid item xs={12}>
        <Card
          className="card"
          sx={{
            borderRadius: "6px",
            "& .MuiCardHeader-title": {
              fontWeight: "500",
            },
            "& p, tspan, span": { fontFamily: "Rubik" },
            backgroundColor: isDarkMode ? "#222 !important" : "#fff !important",
            color: isDarkMode ? "#fff" : "inherit",
          }}
        >
          <CardHeader title="Inventory Scatter Plot" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="stock"
                  name="Stock Level"
                  unit="units"
                />
                <YAxis type="number" dataKey="sales" name="Sales" unit="$" />
                <ZAxis
                  type="number"
                  dataKey="returns"
                  range={[60, 400]}
                  name="Returns"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter
                  name="Products"
                  data={inventoryScatterData}
                  fill="#8884d8"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SellerAnalytics;
