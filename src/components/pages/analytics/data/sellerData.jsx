// src/data/sellerData.js

// 1. Sales Over Time
export const salesOverTimeData = Array.from({ length: 12 }, (_, index) => ({
  date: new Date(2022, index).toISOString().split("T")[0],
  sales: Math.floor(Math.random() * 50000) + 10000,
}));

// 2. Product Performance
export const productPerformanceData = [
  { product: "Product A", sales: 15000, returns: 500 },
  { product: "Product B", sales: 20000, returns: 700 },
  { product: "Product C", sales: 12000, returns: 300 },
  { product: "Product D", sales: 18000, returns: 600 },
  { product: "Product E", sales: 22000, returns: 800 },
];

// 3. Category Sales
export const categorySalesData = [
  { category: "Electronics", value: 40000 },
  { category: "Fashion", value: 30000 },
  { category: "Home & Garden", value: 20000 },
  { category: "Sports", value: 15000 },
];

// 4. Customer Ratings
export const customerRatingsData = [
  { aspect: "Quality", rating: 4.5 },
  { aspect: "Value", rating: 4.0 },
  { aspect: "Shipping", rating: 3.5 },
  { aspect: "Customer Service", rating: 4.2 },
  { aspect: "Overall", rating: 4.3 },
];

// 5. Sales Heatmap Data
export const salesHeatmapData = Array.from({ length: 365 }, (_, index) => ({
  date: new Date(2022, 0, index + 1).toISOString().split("T")[0],
  count: Math.floor(Math.random() * 5),
}));

// 6. Inventory Scatter Data
export const inventoryScatterData = Array.from({ length: 50 }, () => ({
  stock: Math.floor(Math.random() * 500) + 50,
  sales: Math.floor(Math.random() * 100000) + 10000,
  returns: Math.floor(Math.random() * 5000),
}));
