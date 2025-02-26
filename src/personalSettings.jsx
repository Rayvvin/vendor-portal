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
  Chip,
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
  ChevronLeft,
  Key,
  CurrencyExchange,
  AccountCircle,
  LocationOn,
  Refresh,
  AccountTree,
  AccountBalance,
  Storefront,
  RestorePage,
  Edit,
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
        maxWidth={{
          xl: "45%",
          lg: "80vw",
        }}
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

const CustAvatar = (props) => {
  const { av_size, av_font_size, name } = props;
  // const record = useRecordContext();

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: av_size ? av_size : "35px",
        width: av_size ? av_size : "35px",
        fontSize: av_font_size ? av_font_size : "15px",
      },
      children: `${name.split(" ")[0][0].toUpperCase()}`,
    };
  }
  return <Avatar {...stringAvatar(name)} />;
};

function PersonalSettings() {
  const identity = useGetIdentity();
  const [theme, setTheme] = useTheme();
  const redirect = useRedirect();

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
      route:
        identity && identity.data && identity.data.medusa_user
          ? `/user/${identity?.data?.medusa_user?.id}/show`
          : null,
    },
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
      <Stack direction={"row"} paddingX={2} marginTop={"8px"}>
        <Button color="primary" onClick={() => redirect('/settings')}>
          <ChevronLeft />
          <Typography
            sx={{
              fontFamily: "Rubik !important",
              fontSize: { lg: "14px", sm: "13px", xs: "12px" },
              fontWeight: "500",
            }}
          >
            Back to Settings
          </Typography>
        </Button>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        marginTop={"0px"}
      >
        {/* {settings.map((setting, index) => (
          <SettingsCard key={index} {...setting} />
        ))} */}
        <Stack
          className="card stat-card"
          width={"100%"}
          maxWidth={{
            xl: "60%",
            lg: "90vw",
          }}
          paddingY={{ lg: 4, xs: 2 }}
          paddingX={{ lg: 5, xs: 3 }}
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack justifyContent={"flex-start"} alignItems={"stretch"}>
              <Typography
                sx={{ fontSize: { lg: "24px", md: "20px" }, fontWeight: "500" }}
              >
                Personal Information
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Manage your Medusa profile
              </Typography>
            </Stack>
          </Stack>
          <Stack
            justifyContent={"space-between"}
            direction={{ md: "row", sm: "column" }}
            alignItems={{ md: "center", sm: "stretch" }}
            paddingY={4}
            // spacing={5}
            marginTop={"0px !important"}
          >
            <Stack
              // component={"span"}
              maxWidth={"550px"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              direction={"row"}
              spacing={1}
              alignItems={"center"}
            >
              {identity && identity.data && identity.data.medusa_user ? (
                <Fragment>
                  <CustAvatar
                    av_size="64px"
                    av_font_size="30px"
                    name={identity.data.medusa_user.email}
                  />
                  <Stack>
                    <Stack
                      sx={{
                        "& p, span": {
                          fontSize: { md: "24px", sm: "20px", xs: "18px" },
                          fontWeight: "600",
                        },
                      }}
                      alignItems={"center"}
                      direction={"row"}
                      spacing={1}
                    >
                      {identity.data.medusa_user.email}
                    </Stack>
                  </Stack>
                </Fragment>
              ) : (
                "loading..."
              )}
            </Stack>
            <Stack marginTop={3}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  redirect("/update-account");
                }}
                sx={{
                  textTransform: "capitalize",
                  // maxWidth: 'max-content'
                }}
              >
                {/* <Edit /> */}
                <h2
                  style={{
                    fontFamily: "Rubik !important",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Edit Information
                </h2>
              </Button>
            </Stack>
          </Stack>
          <Stack
            justifyContent={"space-between"}
            direction={{ md: "row", sm: "column" }}
            alignItems={{ md: "center", sm: "stretch" }}
            paddingY={4}
            // spacing={5}
            marginTop={"0px !important"}
          >
            <Stack
              // component={"span"}
              maxWidth={"550px"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              direction={"row"}
              spacing={1}
              alignItems={"center"}
            >
              {identity && identity.data && identity.data.medusa_user ? (
                <Fragment>
                  <Stack spacing={1}>
                    <Typography
                      sx={{
                        fontSize: { md: "16px", sm: "15px" },
                        fontWeight: "500",
                      }}
                    >
                      Language
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      Adjust the language of Medusa Admin
                    </Typography>
                  </Stack>
                </Fragment>
              ) : (
                "loading..."
              )}
            </Stack>
            <Stack marginTop={3}>
              <Button
                color="primary"
                variant="outlined"
                onClick={null}
                disabled
                sx={{
                  textTransform: "capitalize",
                  // maxWidth: 'max-content'
                }}
              >
                {/* <Edit /> */}
                <h2
                  style={{
                    fontFamily: "Rubik !important",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  English
                </h2>
              </Button>
            </Stack>
          </Stack>
          <Stack
            justifyContent={"space-between"}
            direction={{ md: "row", sm: "column" }}
            alignItems={{ md: "center", sm: "stretch" }}
            paddingY={4}
            // spacing={5}
            marginTop={"0px !important"}
          >
            <Stack
              // component={"span"}
              maxWidth={"550px"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              direction={"row"}
              spacing={1}
              alignItems={"center"}
            >
              {identity && identity.data && identity.data.medusa_user ? (
                <Fragment>
                  <Stack
                    spacing={1}
                    sx={{
                      "& .MuiChip-root": {
                        marginInline: 2,
                        paddingBlock: "12px",
                        height: 0,
                        borderRadius: 12,
                        backgroundColor: `${
                          theme && theme === "dark"
                            ? "var(--onyx)"
                            : "var(--onyx-row)"
                        }`,
                        color: `${
                          theme && theme === "dark" ? "#fff" : "inherit"
                        }`,
                      },
                      "& .MuiChip-label": {
                        paddingInline: "10px",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { md: "16px", sm: "15px" },
                        fontWeight: "500",
                      }}
                    >
                      Usage insights <Chip label={"Disabled"} />
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      Share usage insights and help us improve Medusa
                    </Typography>
                  </Stack>
                </Fragment>
              ) : (
                "loading..."
              )}
            </Stack>
            <Stack marginTop={3}>
              <Button
                color="primary"
                variant="outlined"
                onClick={null}
                disabled
                sx={{
                  textTransform: "capitalize",
                  // maxWidth: 'max-content'
                }}
              >
                {/* <Edit /> */}
                <h2
                  style={{
                    fontFamily: "Rubik !important",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Edit Preferences
                </h2>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default PersonalSettings;
