import { Fragment, useEffect, useState } from "react";
import {
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
  useGetIdentity,
  SearchInput,
  useTheme,
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
import CustomerListComp from "./OrdersListComp";
import { toTitleCase } from "../../helpers/helpers";
import OrderListComp from "./OrdersListComp";
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

const StatCard = (props) => {
  const { title, value, percentage, icon, color } = props;
  return (
    <Fragment>
      <Stack
        className="card stat-card"
        width={"100%"}
        maxWidth={{
          lg: "22%",
          sm: "45%",
          xs: "45%",
        }}
        paddingY={1}
        paddingX={2}
        height={"101px"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Stack justifyContent={"center"} alignItems={"stretch"}>
          <Typography
            sx={{
              fontSize: "11px",
              color: "#71717A",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
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

const postFilters = [
  <SearchInput
    alwaysOn
    className="card"
    placeholder="Search Orders"
    source="display_id"
    defaultValue=""
    resettable
    sx={{
      background: "#ffffff",
      borderRadius: "9px",
      // color: '#ffffff',
      marginBottom: "0px",
      "& .MuiOutlinedInput-input": {
        boxShadow: "none",
      },
      "& .MuiInputBase-root, .MuiOutlinedInput-notchedOutline, .notranslate": {
        border: "none",
        outline: "none",
        // color: '#ffffff',
        // maxWidth: '250px'
        // minWidth: "90px",
      },
    }}
  />,
  <TextInput label="Description" source="description" defaultValue="" />,
  <TextInput label="Handle" source="handle" defaultValue="" />,
];

const ListActions = () => {
  const { data } = useListContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [payl, setPayl] = useState(null);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useStore("user");
  const listContext = useListContext();
  const refresh = useRefresh();
  const resource = useResourceContext();
  const [theme, setTheme] = useTheme();
  const stats = [
    {
      title: "Total Orders",
      // value: `${orders && orders.length > 0 ? orders?.length : 0}`,
      value: listContext.data && listContext.data.length,
      percentage: "+36%",
      icon: <TrendingUp sx={{ color: "var(--emerald)" }} fontSize="small" />,
      color: "var(--emerald)",
    },
    {
      title: "Fulfilled Orders",
      // value: `${orders && orders.length > 0 ? orders?.length : 0}`,
      value:
        listContext.data &&
        listContext.data.filter((dt) => dt.status === "fulfilled").length,
      percentage: "+36%",
      icon: <TrendingUp sx={{ color: "var(--emerald)" }} fontSize="small" />,
      color: "var(--emerald)",
    },
    {
      title: "Unfulfilled Orders",
      value:
        listContext.data &&
        listContext.data.filter((dt) => dt.status !== "fulfilled")?.length,
      percentage: "-14%",
      icon: (
        <TrendingDown sx={{ color: "var(--imperial-red)" }} fontSize="small" />
      ),
      color: "var(--imperial-red)",
    },
    {
      title: "Total Sales",
      value: "$0",
      percentage: "-14%",
      icon: (
        <TrendingDown sx={{ color: "var(--imperial-red)" }} fontSize="small" />
      ),
      color: "var(--imperial-red)",
    },
  ];

  useEffect(() => {}, []);

  if (!user) {
    // client.authenticate().then((value) => {
    //   setUser(value.user);
    // });
  }

  useEffect(() => {
    if (data) {
      setPayl(data.length);
    }
  }, [data]);

  return (
    <>
      <Stack width={"100%"}>
        {/* <BreadCrumbs resource={[listContext.resource]} showpage={false} /> */}
        <Stack
          direction="row"
          justifyContent="space-around"
          spacing={2}
          marginTop="20px"
          flexWrap={{ md: "nowrap", sm: "nowrap", lg: "nowrap" }}
          width={"100%"}
          overflow="auto"
        >
          {isSmall ? (
            <Stack width={"100%"}>
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-evenly"}
                fontSize={"14px"}
                padding={"5px 5px"}
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gap="5px"
              ></Stack>
            </Stack>
          ) : (
            <Stack width={"100%"}>
              {isLarge ? <></> : <></>}
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-evenly"}
                fontSize={"14px"}
                padding={"10px 20px"}
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gap="20px"
              ></Stack>
            </Stack>
          )}
        </Stack>
        <TopToolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "baseline",
            marginInline: "15px",
            "& .filter-field": {
              marginBottom: "10px",
            },
          }}
        >
          <Stack direction="column">
            <p
              className="h1 card-title"
              style={{
                marginTop: "10px",
                fontSize: "1.5rem",
                fontWeight: "700",
                fontFamily: "Rubik",
              }}
            >
              {"Orders"}
            </p>
          </Stack>
          {/* Add your custom actions */}
          <>
            {isSmall ? (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton filters={postFilters} />
                <Button style={{ padding: "4px 20px" }}>
                  <IconEvent fontSize="small" style={{ marginRight: "2px" }} />
                </Button>
                {/* <CreateButton variant="contained" label="Create" /> */}
              </Stack>
            ) : isMedium ? (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton variant="contained" filters={postFilters} />
                {/* <CreateButton variant="contained" label="Create" /> */}
                {/* <Button
                          variant='contained'
                          style={{padding: '4px 40px'}}
                      >
                          <IconEvent fontSize='small' style={{marginRight: '2px' }}/>
                          <p style={{fontSize: '13px'}}>Schedule</p>
                      </Button> */}
              </Stack>
            ) : (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton filters={postFilters} />
                {/* <CreateButton
                  variant="contained"
                  sx={{ padding: "4px 40px", fontSize: "15px" }}
                  label="Create"
                /> */}
                {/* <Button
                          variant='contained'
                          style={{padding: '4px 40px'}}
                      >
                          <IconEvent fontSize='small' style={{marginRight: '2px' }}/>
                          <p style={{fontSize: '13px'}}>Schedule</p>
                      </Button> */}
              </Stack>
            )}
          </>
        </TopToolbar>
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          marginTop={"5px"}
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
          }}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </Stack>
        {/* <FilterForm style={{marginLeft: '20px'}} filters={postFilters} /> */}
        <div
          className="divider card-divider"
          style={{ marginInline: "10px", margin: "5px" }}
        />
      </Stack>
    </>
  );
};

export const OrderList = () => {
  const identity = useGetIdentity();
  if (!(identity && identity.data && identity.data?.medusa_store)) return null;

  return (
    <List
      actions={<ListActions />}
      title={" "}
      // filter={user.role && user.role === "user" ? { email: user.email } : null}
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
      <OrderListComp />
    </List>
  );
};
