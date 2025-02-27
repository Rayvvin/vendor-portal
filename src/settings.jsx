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

const SettingsCard = (props) => {
  const redirect = useRedirect();
  const { title, value, percentage, icon, color, route } = props;
  return (
    <Fragment>
      <Stack
        className="card stat-card"
        width={"100%"}
        maxWidth={{ lg: "45%", sm: "80vw" }}
        paddingY={1}
        paddingX={2}
        height={"101px"}
        direction={"row"}
        justifyContent={"space-between"}
        onClick={() => {
          route ? redirect(route) : null;
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Stack justifyContent={"center"}>{icon}</Stack>
          <Stack justifyContent={"center"} alignItems={"stretch"}>
            <Typography
              sx={{ fontSize: { md: "20px", sm: "18px" }, fontWeight: "600" }}
            >
              {value}
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>{title}</Typography>
          </Stack>
        </Stack>
        <Stack justifyContent={"center"}>
          <ChevronRight sx={{ color: "var(--onyx)" }} fontSize="large" />
        </Stack>
      </Stack>
    </Fragment>
  );
};

function Settings() {
  const identity = useGetIdentity();
  const [theme, setTheme] = useTheme();

  const settings = [
    // {
    //   title: "Create and manage API keys",
    //   value: "API Key Management",
    //   percentage: "+15%",
    //   icon: <Key sx={{ color: "var(--emerald)" }} fontSize="large" />,
    //   color: "var(--emerald)",
    // },
    // {
    //   title: "Manage the currencies of your store",
    //   value: "Currencies",
    //   percentage: "-5%",
    //   icon: (
    //     <CurrencyExchange
    //       sx={{ color: "var(--imperial-red)" }}
    //       fontSize="large"
    //     />
    //   ),
    //   color: "var(--imperial-red)",
    // },
    {
      title: "Manage your Medusa profile",
      value: "Personal Information",
      percentage: "",
      icon: <AccountCircle sx={{ color: "var(--sunglow)" }} fontSize="large" />,
      color: "var(--sunglow)",
      // route:
      //   identity && identity.data && identity.data.medusa_user
      //     ? `/user/${identity?.data?.medusa_user?.id}/show`
      //     : null,
      route: '/personal-settings'
    },
    // {
    //   title: "Manage shipping, payment, and fulfillment across regions",
    //   value: "Regions",
    //   percentage: "+15%",
    //   icon: <LocationOn sx={{ color: "var(--emerald)" }} fontSize="large" />,
    //   color: "var(--emerald)",
    //   route: '/region'
    // },
    {
      title: "Manage the currencies of your store",
      value: "Currencies",
      percentage: "+15%",
      icon: <RestorePage sx={{ color: "var(--emerald)" }} fontSize="large" />,
      color: "var(--emerald)",
      route: '/store-currencies'
    },
    // {
    //   title: "Control which product are available in which channels",
    //   value: "Sales Channels",
    //   percentage: "-5%",
    //   icon: (
    //     <AccountTree sx={{ color: "var(--imperial-red)" }} fontSize="large" />
    //   ),
    //   color: "var(--imperial-red)",
    // },
    {
      title: "Manage your business details",
      value: "Store Details",
      percentage: "",
      icon: <Storefront sx={{ color: "var(--sunglow)" }} fontSize="large" />,
      color: "var(--sunglow)",
      route:
        identity && identity.data && identity.data.medusa_user
          ? `/user/${identity?.data?.medusa_user?.id}/show`
          : null,
    },
    // {
    //   title: "Manage taxes across regions and products",
    //   value: "Taxes",
    //   percentage: "+15%",
    //   icon: (
    //     <AccountBalance sx={{ color: "var(--emerald)" }} fontSize="large" />
    //   ),
    //   color: "var(--emerald)",
    // },
    // {
    //   title: "Manage users of your Medusa Store",
    //   value: "The Team",
    //   percentage: "+15%",
    //   icon: <People sx={{ color: "var(--emerald)" }} fontSize="large" />,
    //   color: "var(--emerald)",
    // },
  ];

  useEffect(() => {
    if (!theme) {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (identity) {
      console.log(identity);
    }
  }, [identity]);
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
      <Stack direction={"row"} paddingX={2} marginTop={"40px"}>
        <h2
          style={{
            fontFamily: "Rubik !important",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          Settings
        </h2>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"start"}
        flexWrap={"wrap"}
        marginTop={"10px"}
      >
        {settings.map((setting, index) => (
          <SettingsCard key={index} {...setting} />
        ))}
      </Stack>
    </Stack>
  );
}

export default Settings;
