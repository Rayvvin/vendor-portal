/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Fragment, useEffect, useState } from "react";
import {
  useGetIdentity,
  BooleanField,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  useListContext,
  useNotify,
  useRedirect,
  useRefresh,
  useResourceContext,
  useStore,
  TopToolbar,
  CreateButton,
  FilterButton,
  TextInput,
  DateInput,
  FilterForm,
  useTheme,
  useSidebarState,
} from "react-admin";
import { useMediaQuery, Fab } from "@mui/material";
import IconEvent from "@mui/icons-material/Event";
import {
  Box,
  Button,
  Typography,
  CardActions,
  Stack,
  Card,
  Avatar,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  TrendingUp,
  TrendingDown,
  Category,
  Visibility,
  People,
  ShoppingCart,
  MoneyOffCsred,
  ChevronRight,
  Key,
  CurrencyExchange,
  AccountCircle,
  LocationOn,
  Refresh,
  AccountTree,
  AccountBalance,
  Storefront,
  RestorePage,
} from "@mui/icons-material";
import {
  DescriptionField,
  StatusField,
  ThumbnailField,
} from "./components/pages/products/ProductListComp";
import { createClient } from "@supabase/supabase-js";
import SuperAdminAnalytics from "./components/pages/analytics/superAdminAnalytics";
import CenteredTab from "./components/tabs/centeredTab";
import Switch from "react-switch";
import SellerAnalytics from "./components/pages/analytics/sellerAnalytics";
// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase URL and key
const supabase = createClient(
  import.meta.env.VITE_BASE_URL,
  import.meta.env.VITE_ANON_KEY
);

const StatCard = (props) => {
  const { title, value, percentage, icon, color } = props;
  return (
    <Fragment>
      <Stack
        className="card stat-card"
        width={"100%"}
        maxWidth={{ lg: "22%", sm: "45%", xs: "45%" }}
        paddingY={1}
        paddingX={2}
        height={"101px"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Stack justifyContent={"center"} alignItems={"stretch"} spacing={'5px'}>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#71717A",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
            {value}
          </Typography>
        </Stack>
        <Stack justifyContent={"center"}>
          {icon}
          <Typography sx={{ fontSize: "12px", color: color }}>
            {percentage}
          </Typography>
        </Stack>
      </Stack>
    </Fragment>
  );
};

const DashCard = (props) => {
  const { title, icon, resource, fields, theme, row_size, filter } = props;
  const dividerOpacity = 0.2;
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const sidebarState = useSidebarState();
  return (
    <Fragment>
      <Stack
        // width={"100%"}
        maxWidth={{ lg: "45%", sm: "80vw" }}
        paddingY={2}
        // height={"380px"}
        className="card"
        width={`${isSmall ? "85vw !important" : "calc(100% - 100px)"}`}
        overflow={"hidden"}
      >
        <Stack
          direction={"row"}
          paddingX={1}
          paddingBottom={2}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Stack direction={"row"} spacing={1}>
            {icon}
            <Typography
              sx={{
                fontSize: { sm: "16px", md: "17px", lg: "18px" },
                fontWeight: "500",
              }}
            >
              {title}
            </Typography>
          </Stack>
        </Stack>
        <Divider
          sx={{ opacity: dividerOpacity, backgroundColor: "#000" }}
          variant={"fullWidth"}
          flexItem
        />
        <Stack
          className="list_container"
          width={`${isSmall ? "85vw !important" : "100%"}`}
          overflow={"auto"}
          sx={{
            transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            scrollbarColor: "#8d9498 rgba(0, 0, 0, 0.1)",
            scrollbarWidth: "thin",
          }}
        >
          <List
            resource={resource}
            actions={false}
            disableSyncWithLocation
            perPage={4}
            title={" "}
            error={false}
            pagination={false}
            filter={filter}
            // aside={<Aside quickLinks={quickLinks} />}
            empty={false}
            sort={{ field: "updated_at", order: "DESC" }}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              "& .RaList-content": {
                backgroundColor: "transparent !important",
                boxShadow: "none",
                border: "none",
                padding: "0px",
                margin: "5px",
              },
              "& .RaList-actions": {
                backgroundColor: "transparent !important",
              },
            }}
          >
            <Stack
              className="list_container"
              // minHeight={'350px'}
              backgroundColor={theme && theme === "dark" ? "#222" : "#fff"}
              color={theme && theme === "dark" ? "#fff" : "inherit"}
              overflow={"hidden"}
              // width={`${sidebarState[0] && !isSmall ? "calc(100% - 240px) !important" : "90vw"}`}
              sx={{
                borderRadius: "4px",
                transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                scrollbarColor: "#8d9498 rgba(0, 0, 0, 0.1)",
                scrollbarWidth: "thin",
                "& .MuiTable-root": {
                  // width: "100%",
                  transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                  borderRadius: "6px",
                },
                "& .MuiTypography-root, p, span": {
                  fontFamily: "Rubik !important",
                  fontSize: "13px !important",
                },
                "& span": {
                  display: "inline-block",
                  width: "max-content",
                },
              }}
            >
              <Datagrid size={row_size} bulkActionButtons={false}>
                {fields &&
                  fields.map((field) => {
                    return field;
                  })}
              </Datagrid>
            </Stack>
          </List>
        </Stack>
      </Stack>
    </Fragment>
  );
};

function Home() {
  const identity = useGetIdentity();
  const [theme, setTheme] = useTheme();
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [viewAdmin, setViewAdmin] = useState(false);

  function handleChangeView(checked) {
    setViewAdmin(checked);
  }

  useEffect(() => {
    async function fetchOrders() {
      if (identity?.identity?.medusa_store) {
        try {
          let { data: order, error } = await supabase
            .from("order")
            .select("*")
            .eq("store_id", identity?.data?.medusa_store.id);
          // .maybeSingle();

          setOrders(order);
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    async function fetchProducts() {
      if (identity?.identity?.medusa_store) {
        try {
          let { data: product, error } = await supabase
            .from("product")
            .select("*")
            .eq("store_id", identity?.data?.medusa_store.id);
          // .maybeSingle();

          // console.log(product);
          setProducts(product);
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    fetchOrders();
    fetchProducts();
  }, [identity]);

  const stats = [
    {
      title: "Orders Processed",
      value: `${orders && orders.length > 0 ? orders?.length : 0}`,
      percentage: "+15%",
      icon: <TrendingUp sx={{ color: "var(--emerald)" }} fontSize="small" />,
      color: "var(--emerald)",
    },
    {
      title: "Monthly Revenue",
      value: "$50000",
      percentage: "-5%",
      icon: (
        <TrendingDown sx={{ color: "var(--imperial-red)" }} fontSize="small" />
      ),
      color: "var(--imperial-red)",
    },
    {
      title: "Product Count",
      value: `${products && products.length > 0 ? products?.length : 0}/40`,
      percentage: "",
      icon: <Category sx={{ color: "var(--sunglow)" }} fontSize="small" />,
      color: "var(--sunglow)",
    },
    {
      title: "Monthly Views",
      value: "522",
      percentage: "+15%",
      icon: <Visibility sx={{ color: "var(--emerald)" }} fontSize="small" />,
      color: "var(--emerald)",
    },
  ];

  const dashInfo = [
    {
      title: "Trending Products",
      icon: <Category sx={{ color: "var(--sunglow)" }} fontSize="medium" />,
      resource: "product",
      fields: [
        <ThumbnailField source="thumbnail" />,
        <TextField source="title" />,

        <StatusField source="status" />,

        <DateField
          source="updated_at"
          options={{
            year: "numeric",
            month: "long",
            day: "numeric",
          }}
        />,
      ],
      row_size: "small",
      filter:
        identity && identity.data && identity.data?.medusa_store
          ? { store_id: identity?.data?.medusa_store?.id }
          : null,
    },
    {
      title: "New Customers",
      icon: <People sx={{ color: "var(--blue-ryb)" }} fontSize="medium" />,
      resource: "customer",
      fields: [
        <TextField source="email" />,
        <TextField source="first_name" />,

        <TextField source="last_name" />,

        <DateField
          source="updated_at"
          options={{
            year: "numeric",
            month: "long",
            day: "numeric",
          }}
        />,
      ],
      row_size: "medium",
    },
    {
      title: "Latest Orders",
      icon: <ShoppingCart sx={{ color: "var(--coral)" }} fontSize="medium" />,
      resource: "order",
      fields: [
        <TextField source="email" />,
        <TextField source="status" />,

        <TextField source="payment_status" />,

        <DateField
          source="created_at"
          options={{
            year: "numeric",
            month: "long",
            day: "numeric",
          }}
        />,
      ],
      row_size: "medium",
    },
    {
      title: "Discounts",
      icon: (
        <MoneyOffCsred sx={{ color: "var(--emerald)" }} fontSize="medium" />
      ),
      resource: "discount",
      fields: [
        <TextField source="code" />,
        <DateField source="start_at" />,

        <DateField source="ends_at" />,

        <DateField
          source="created_at"
          options={{
            year: "numeric",
            month: "long",
            day: "numeric",
          }}
        />,
      ],
      row_size: "medium",
    },
  ];
  useEffect(() => {
    if (!theme) {
      setTheme("light");
    }
  }, []);
  // useEffect(() => {
  //   if (identity) {
  //     console.log(identity);
  //   }
  // }, [identity]);

  return (
    <Stack
      paddingX={0}
      paddingY={1}
      // backgroundColor={theme && theme === "dark" ? "#222" : "#fff"}
      color={theme && theme === "dark" ? "#fff" : "inherit"}
      sx={{
        fontFamily: "Rubik !important",
        "& .card": {
          backgroundColor: `${theme && theme === "dark" ? "#222" : "#fff"}`,
          border: "1px solid rgba(244, 244, 244, 0.4)",
        },
        "& p, h2": {
          fontFamily: "Rubik !important",
          color: `${theme && theme === "dark" ? "#fff" : "inital"}`,
        },
        "& .RaDatagrid-rowEven": {
          background: "none",
        },
      }}
    >
      <Stack
        direction={"row"}
        paddingX={2}
        marginTop={"40px"}
        justifyContent={"space-between"}
      >
        <h2
          style={{
            fontFamily: "Rubik !important",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          Home
        </h2>
        <Stack alignItems={"center"}>
          <Switch onChange={handleChangeView} checked={viewAdmin} />
          {viewAdmin ? (
            <p style={{ fontSize: "13px", fontFamily: "Rubik" }}>Admin On</p>
          ) : (
            <p style={{ fontSize: "13px", fontFamily: "Rubik" }}>Admin Off</p>
          )}
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        flexWrap={"wrap"}
        marginTop={"10px"}
      >
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        flexWrap={"wrap"}
        marginTop={"10px"}
        paddingX={1}
      >
        {/* {dashInfo.map((info, index) => (
          <DashCard key={index} {...info} theme={theme} />
        ))} */}

        {viewAdmin ? <SuperAdminAnalytics /> : <SellerAnalytics />}
      </Stack>
    </Stack>
  );
}

export default Home;
