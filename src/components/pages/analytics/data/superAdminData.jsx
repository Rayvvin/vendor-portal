// src/data/superAdminData.js

// 1. Key Metrics Over Time
export const keyMetricsData = Array.from({ length: 12 }, (_, index) => ({
  month: new Date(2022, index).toLocaleString("default", { month: "short" }),
  revenue: Math.floor(Math.random() * 100000) + 50000,
  orders: Math.floor(Math.random() * 10000) + 5000,
  users: Math.floor(Math.random() * 5000) + 1000,
}));

// 2. Regional Sales Data
export const regionalSalesData = [
  { region: "Nigeria", electronics: 50000, fashion: 30000, groceries: 20000 },
  {
    region: "South Africa",
    electronics: 45000,
    fashion: 28000,
    groceries: 18000,
  },
  { region: "Egypt", electronics: 40000, fashion: 26000, groceries: 16000 },
  { region: "Kenya", electronics: 35000, fashion: 24000, groceries: 14000 },
  { region: "Morocco", electronics: 32000, fashion: 22000, groceries: 13000 },
  { region: "Ghana", electronics: 30000, fashion: 21000, groceries: 12000 },
  { region: "Algeria", electronics: 28000, fashion: 20000, groceries: 11000 },
  { region: "Ethiopia", electronics: 25000, fashion: 18000, groceries: 10000 },
  { region: "Uganda", electronics: 22000, fashion: 16000, groceries: 9000 },
  { region: "Tunisia", electronics: 20000, fashion: 15000, groceries: 8000 },
];

// 3. Market Share Data
export const marketShareData = [
  { vendor: "Vendor A", value: 400 },
  { vendor: "Vendor B", value: 300 },
  { vendor: "Vendor C", value: 300 },
  { vendor: "Vendor D", value: 200 },
];

// 4. User Growth Over Time
export const userGrowthData = Array.from({ length: 12 }, (_, index) => ({
  date: new Date(2022, index + 1, 0).toISOString().split("T")[0],
  users: Math.floor(Math.random() * 10000) + 5000,
}));

// 5. Activity Heatmap Data
export const activityHeatmapData = Array.from({ length: 365 }, (_, index) => ({
  date: new Date(2022, 0, index + 1).toISOString().split("T")[0],
  count: Math.floor(Math.random() * 5),
}));

// 6. Conversion Funnel Data
export const conversionFunnelData = [
  { stage: "Visits", value: 100000 },
  { stage: "Add to Cart", value: 60000 },
  { stage: "Purchases", value: 30000 },
  { stage: "Repeat Purchases", value: 15000 },
];


// 7. Africa Sales Data
export const africaSalesData = [
  { countryCode: 'DZ', sales: 50000 }, // Algeria
  { countryCode: 'AO', sales: 45000 }, // Angola
  { countryCode: 'BJ', sales: 30000 }, // Benin
  { countryCode: 'BW', sales: 20000 }, // Botswana
  { countryCode: 'BF', sales: 15000 }, // Burkina Faso
  { countryCode: 'BI', sales: 10000 }, // Burundi
  { countryCode: 'CM', sales: 35000 }, // Cameroon
  { countryCode: 'CV', sales: 5000 },  // Cape Verde
  { countryCode: 'CF', sales: 8000 },  // Central African Republic
  { countryCode: 'TD', sales: 12000 }, // Chad
  { countryCode: 'KM', sales: 4000 },  // Comoros
  { countryCode: 'CD', sales: 60000 }, // Congo (Dem. Rep.)
  { countryCode: 'CG', sales: 25000 }, // Congo (Rep.)
  { countryCode: 'CI', sales: 28000 }, // Côte d'Ivoire
  { countryCode: 'DJ', sales: 7000 },  // Djibouti
  { countryCode: 'EG', sales: 80000 }, // Egypt
  { countryCode: 'GQ', sales: 9000 },  // Equatorial Guinea
  { countryCode: 'ER', sales: 6000 },  // Eritrea
  { countryCode: 'ET', sales: 55000 }, // Ethiopia
  { countryCode: 'GA', sales: 14000 }, // Gabon
  { countryCode: 'GM', sales: 5000 },  // Gambia
  { countryCode: 'GH', sales: 40000 }, // Ghana
  { countryCode: 'GN', sales: 11000 }, // Guinea
  { countryCode: 'GW', sales: 4000 },  // Guinea-Bissau
  { countryCode: 'KE', sales: 45000 }, // Kenya
  { countryCode: 'LS', sales: 8000 },  // Lesotho
  { countryCode: 'LR', sales: 7000 },  // Liberia
  { countryCode: 'LY', sales: 30000 }, // Libya
  { countryCode: 'MG', sales: 20000 }, // Madagascar
  { countryCode: 'MW', sales: 10000 }, // Malawi
  { countryCode: 'ML', sales: 15000 }, // Mali
  { countryCode: 'MR', sales: 9000 },  // Mauritania
  { countryCode: 'MU', sales: 12000 }, // Mauritius
  { countryCode: 'MA', sales: 50000 }, // Morocco
  { countryCode: 'MZ', sales: 18000 }, // Mozambique
  { countryCode: 'NA', sales: 14000 }, // Namibia
  { countryCode: 'NE', sales: 8000 },  // Niger
  { countryCode: 'NG', sales: 90000 }, // Nigeria
  { countryCode: 'RW', sales: 13000 }, // Rwanda
  { countryCode: 'ST', sales: 3000 },  // São Tomé and Príncipe
  { countryCode: 'SN', sales: 20000 }, // Senegal
  { countryCode: 'SC', sales: 5000 },  // Seychelles
  { countryCode: 'SL', sales: 6000 },  // Sierra Leone
  { countryCode: 'SO', sales: 7000 },  // Somalia
  { countryCode: 'ZA', sales: 85000 }, // South Africa
  { countryCode: 'SS', sales: 10000 }, // South Sudan
  { countryCode: 'SD', sales: 25000 }, // Sudan
  { countryCode: 'TZ', sales: 40000 }, // Tanzania
  { countryCode: 'TG', sales: 9000 },  // Togo
  { countryCode: 'TN', sales: 35000 }, // Tunisia
  { countryCode: 'UG', sales: 30000 }, // Uganda
  { countryCode: 'ZM', sales: 20000 }, // Zambia
  { countryCode: 'ZW', sales: 15000 }, // Zimbabwe
  // Add more countries if needed
];
