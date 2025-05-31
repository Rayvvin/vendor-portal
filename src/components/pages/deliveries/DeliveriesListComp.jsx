/* eslint-disable react/prop-types */
// import { useListContext, useRecordContext, useRedirect, useResourceContext } from "react-admin";
import {
  useRecordContext,
  BooleanField,
  Datagrid,
  EmailField,
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
  useSidebarState,
  useTheme,
  SimpleList,
  useGetIdentity,
  WithListContext,
  ReferenceManyCount,
  ReferenceManyField,
  FunctionField,
} from "react-admin";
import {
  MoreVert,
  MoreHoriz,
  ShoppingCart,
  LocalShipping,
} from "@mui/icons-material";
import { useMediaQuery, Fab } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CardActions,
  Stack,
  Card,
  Avatar,
} from "@mui/material";
import Medusa from "@medusajs/medusa-js";
import { supabase } from "../../../supabase/SupabaseConfig";
import ReactCountryFlag from "react-country-flag";

const ThumbnailField = () => {
  const record = useRecordContext();
  return (
    <Box
      width={"40px"}
      height={"50px"}
      component="img"
      src={record.thumbnail}
      alt="img"
    ></Box>
  );
};

const DescriptionField = () => {
  const record = useRecordContext();
  return (
    <Box
      component={"p"}
      maxWidth={"550px"}
      textOverflow={"ellipsis"}
      whiteSpace={"nowrap"}
      overflow={"hidden"}
    >
      {record.description}
    </Box>
  );
};

const RegionField = (props) => {
  const { source, regionsIds, currncy } = props;
  const record = useRecordContext();
  let reff =
    regionsIds &&
    regionsIds.length &&
    regionsIds.filter((r) => r.logistics_org_id == record.id);
  let reffObj = reff && reff.length ? reff.slice(0, 3) : null;
  if (!reffObj) return null;
  return (
    reffObj.length &&
    reffObj.map((refObj) => (
      <ReferenceField
        label="Region"
        source="region_id"
        reference="region"
        record={refObj}
        link={false}
      >
        <TextField source="name" />
      </ReferenceField>
    ))
  );
};

const FormatPriceField = (props) => {
  const { source, currencies, currncy } = props;
  const record = useRecordContext();
  return (
    <Box
      component={"p"}
      maxWidth={"300px"}
      textOverflow={"ellipsis"}
      whiteSpace={"nowrap"}
      overflow={"hidden"}
    >
      {currncy
        ? currncy.symbol
        : currencies
        ? currencies.find((curr) => {
            return curr.code == record["currency_code"];
          })?.symbol
        : null}
      {source ? formatPrice(record[source]) : null}
    </Box>
  );
};

const CustAvatar = (props) => {
  // const { source, currencies, currncy } = props;
  const record = useRecordContext();

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
        height: "35px",
        width: "35px",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <Avatar {...stringAvatar(`${record.first_name} ${record.last_name}`)} />
  );
};

const CustomerField = (props) => {
  const { source, currencies, currncy } = props;
  const record = useRecordContext();
  return (
    <ReferenceField label="Customer" source="customer_id" reference="customer">
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
        <CustAvatar /> <TextField source="first_name" />{" "}
        <TextField source="last_name" />
      </Stack>
    </ReferenceField>
  );
};

export const StatusField = (props) => {
  const { source, suffix } = props;
  const record = useRecordContext();
  let color = "";
  let new_name = "";
  switch (record[source]) {
    case "fulfiled":
      color = "var(--emerald)";
      break;

    case "pending":
      color = "var(--sunglow)";
      break;

    case "awaiting":
      color = "var(--sunglow)";
      if (source === "payment_status") {
        // new_name = "Awaiting Payment";
        color = "var(--coral)";
      }
      break;

    case "not_fulfilled":
      color = "var(--coral)";
      break;

    case "success":
      color = "var(--emerald)";
      break;

    default:
      color = "#eee";
      break;
  }
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <Box
        component={"div"}
        width={"5px"}
        height={"5px"}
        borderRadius={"90px"}
        backgroundColor={color}
      ></Box>
      <Box component={"p"}>{new_name || record[source]}</Box>
    </Stack>
  );
};

function formatPrice(price) {
  return parseFloat(price / 100).toFixed(2);
}

export default function DeliveriesListComp(props) {
  const { data: record, isLoading } = useListContext();
  const [theme, setTheme] = useTheme();
  const resource = useResourceContext();
  const redirect = useRedirect();
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const curr_content_card = useRef(null);
  const content_cards = useRef([]);
  const sidebarState = useSidebarState();
  const [currncy, setCurrncy] = useState(null);
  const [regionIds, setRegionIds] = useState(null);
  const identity = useGetIdentity();

  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });

  useEffect(() => {
    async function fetchCurrencyObj() {
      if (record) {
        try {
          let { data: currency, error } = await supabase
            .from("currency")
            .select("*");
          // .eq("code", record?.currency_code)
          // .maybeSingle();

          setCurrncy(currency);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    async function fetchRegions() {
      if (record) {
        try {
          let { data: logistics_org_regions, error } = await supabase
            .from("logistics_org_regions")
            .select("*");
          // .eq("logistics_org_id", record?.id)
          // .maybeSingle();

          console.log(logistics_org_regions);
          setRegionIds(logistics_org_regions);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    // fetchRegions();
    fetchCurrencyObj();
  }, [record]);

  useEffect(() => {
    console.log(record, isLoading);
  }, [record, isLoading]);

  if (!record) return null;
  return (
    <Stack
      direction="row"
      padding={0}
      width={
        sidebarState[0] && !isSmall ? "calc(95vw - 240px) !important" : "93vw"
      }
      backgroundColor={theme && theme === "dark" ? "#222" : "#fff"}
      color={theme && theme === "dark" ? "#fff" : "inherit"}
      overflow={"auto"}
      border={
        theme && theme === "dark"
          ? "1px solid rgba(244, 244, 244, 0.2)"
          : "none"
      }
      className="card list_container"
      sx={{
        transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
        scrollbarColor: "#8d9498 rgba(0, 0, 0, 0.1)",
        scrollbarWidth: "thin",
        backgroundColor: `${
          isSmall
            ? "transparent !important"
            : theme && theme === "dark"
            ? "#222"
            : "#fff"
        }`,
        boxShadow: `${isSmall ? "none !important" : "initial"}`,
        margin: `${isSmall ? "0px !important" : "initial"}`,
        "& .MuiList-root": {
          paddingInline: `${isSmall ? "8px !important" : "initial"}`,
        },
        "& .MuiListItem-root": {
          backgroundColor: `${isSmall ? "#fff !important" : "initial"}`,
          boxShadow: `${
            isSmall ? "0 2px 20px hsla(0, 0%, 0%, 0.06) !important" : "initial"
          }`,
          marginY: `${isSmall ? "10px !important" : "initial"}`,
          borderRadius: `${isSmall ? "9px !important" : "initial"}`,
        },
        "& .MuiTable-root": {
          width: `${
            sidebarState[0] && !isSmall
              ? "calc(95vw - 240px) !important"
              : "93vw"
          }`,
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
      {isSmall ? (
        <SimpleList
          sx={{
            width: "100%",
            "& .MuiListItemText-primary > div": {
              display: "flex",
              width: "100%",
            },
            "& .MuiListItemSecondaryAction-root > .MuiListItemIcon-root": {
              justifyContent: "flex-end",
            },
          }}
          leftAvatar={(record) => (
            <Avatar
              src={record.thumbnail}
              children={<LocalShipping />}
              sx={{ borderRadius: "9px" }}
            />
          )}
          rightIcon={(record) => <MoreVert />}
          primaryText={(record) => (
            <Stack direction="row" spacing={1} divider={<p>-</p>}>
              <FunctionField
                label="id"
                render={(record) =>
                  record.id
                    ? record.id.toString().length > 10
                      ? record.id.toString().substring(0, 10) + "..."
                      : record.id
                    : "N/A"
                }
              />
              <FunctionField
                label="Delivery Mode"
                render={(record) => record.delivery_mode || "N/A"}
              />
            </Stack>
          )}
          secondaryText={(record) => (
            <Stack direction="row" spacing={1} divider={<p>-</p>}>
              <ReferenceField
                label="Regions"
                reference="region"
                source="region_id"
                link={false}
              >
                <TextField source="name" />
              </ReferenceField>
              <FunctionField
                label="Orders"
                render={(record) =>
                  record && record.order_ids && record.order_ids.length
                    ? `${record.order_ids.length} Order(s)`
                    : "0 Orders"
                }
              />
              <DateField
                source="created_at"
                options={{
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }}
              />
            </Stack>
          )}
          linkType={(record) => (record.canEdit ? "edit" : "show")}
        />
      ) : (
        <Datagrid size="small" bulkActionButtons={false} rowClick="show">
          <FunctionField
            label="id"
            render={(record) =>
              record.id
                ? record.id.toString().length > 10
                  ? record.id.toString().substring(0, 10) + "..."
                  : record.id
                : "N/A"
            }
          />
          <ReferenceField
            label="Regions"
            reference="region"
            source="region_id"
            link={false}
          >
            <TextField source="name" />
          </ReferenceField>
          <FunctionField
            label="Orders"
            render={(record) =>
              record && record.order_ids && record.order_ids.length
                ? record.order_ids.length
                : 0
            }
          />
          <TextField source="delivery_mode" />
          <TextField source="route_category" label="Category" />
          <DateField
            label="Date Added"
            source="created_at"
            options={{
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
        </Datagrid>
      )}
    </Stack>
  );
}
