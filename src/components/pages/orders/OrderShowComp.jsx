/* eslint-disable react/prop-types */
// import { useListContext, useRecordContext, useRedirect, useResourceContext } from "react-admin";
import {
  useRecordContext,
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
  useSidebarState,
  useTheme,
  SimpleShowLayout,
  useShowContext,
  ImageField,
  ReferenceManyCount,
  WithListContext,
  ReferenceManyField,
  useGetIdentity,
  useGetOne,
  useGetMany,
  useGetList,
  useTranslate,
} from "react-admin";
import { MoreVert, MoreHoriz } from "@mui/icons-material";
import { useMediaQuery, Fab } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParentSize } from "@cutting/use-get-parent-size";
// import type { U}  from "@cutting/use-get-parent-size";
import Divider from "@mui/material/Divider";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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
import ReactJson from "@microlink/react-json-view";
import { toTitleCase } from "../../helpers/helpers";
import OrderAsideComp from "./OrderAsideComp";
import Medusa from "@medusajs/medusa-js";
import { JsonField, JsonInput } from "react-admin-json-view";
import { createClient } from "@supabase/supabase-js";
// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase URL and key
const supabase = createClient(
  import.meta.env.VITE_BASE_URL,
  import.meta.env.VITE_ANON_KEY
);
export const ThumbnailField = () => {
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

export const DescriptionField = () => {
  const record = useRecordContext();
  return (
    <Box
      component={"p"}
      maxWidth={"300px"}
      textOverflow={"ellipsis"}
      whiteSpace={"nowrap"}
      overflow={"hidden"}
    >
      {record.description}
    </Box>
  );
};

export const StatusField = (props) => {
  const { source, nw_record } = props;
  const record = nw_record ? nw_record : useRecordContext();
  let color = "";
  let new_name = "";
  switch (record[source]) {
    case "fulfiled":
      color = "var(--emerald)";
      break;

    case "pending":
      color = "var(--sunglow)";
      new_name = "Processing";
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
      <Box
        component={"p"}
        sx={{ fontSize: { md: "14px", sm: "13px", xs: "12px" } }}
      >
        {new_name || record[source]}
      </Box>
    </Stack>
  );
};

export const JSONField = (props) => {
  const { source, order } = props;
  const record = useRecordContext();
  if (!record) return null;
  // if (typeof record[source] === "object") return null;
  return (
    <Stack
      padding={2}
      overflow={"auto"}
      width={"100%"}
      maxWidth={{
        lg: `calc(100vw - 500px)`,
        sm: "80vw !important",
        xs: "80vw !important",
      }}
      backgroundColor={"var(--onyx-row)"}
    >
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: { md: "15px", sm: "13px", xs: "12px" },
          color: "#8d9498",
        }}
      >
        {order ? (
          <ReactJson src={order} collapsed={0} />
        ) : (
          <ReactJson src={record} collapsed={0} />
        )}
      </pre>
    </Stack>
  );
};

const DetailsList = (props) => {
  const { fields, title } = props;
  const record = useRecordContext();
  return (
    <Stack style={{ marginY: "32px !important" }} margin spacing={1}>
      <Stack
        sx={{
          fontSize: { md: "15px", sm: "13px", xs: "12px" },
          fontWeight: "500",
        }}
      >
        {title}
      </Stack>
      {fields &&
        fields.length &&
        fields.map((field, i) => {
          return (
            <Stack
              key={i}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              // marginTop={1}
            >
              <Stack
                sx={{
                  fontSize: { md: "15px", sm: "13px", xs: "12px" },
                  // fontWeight: "500",
                  color: "#8d9498",
                }}
              >
                {toTitleCase(field)}
              </Stack>
              <Stack>
                <TextField
                  source={field.toLowerCase()}
                  sx={{
                    fontSize: { md: "15px", sm: "13px", xs: "12px" },
                    color: "#8d9498",
                  }}
                  emptyText="-"
                />
              </Stack>
            </Stack>
          );
        })}
    </Stack>
  );
};

function formatPrice(price) {
  return parseFloat(price / 100).toFixed(2);
}
const DetailsListHoriz = (props) => {
  const { fields, title } = props;
  const record = useRecordContext();
  return (
    <Stack style={{ marginY: "32px !important" }} margin spacing={1}>
      <Stack
        sx={{
          fontSize: { md: "15px", sm: "13px", xs: "12px" },
          fontWeight: "500",
        }}
      >
        {title}
      </Stack>
      <Stack
        direction={{ sm: "row", xs: "column" }}
        justifyContent={{ md: "flex-start", sm: "space-around" }}
        alignItems={{ sm: "center", xs: "flex-start" }}
        spacing={{ lg: 5, md: 3, sm: 2, xs: 1 }}
        flexWrap={"wrap"}
        // marginTop={1}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {fields &&
          fields.length &&
          fields.map((fields, i) => {
            return (
              <Stack
                key={i}
                // direction={"row"}
                justifyContent={"center"}
                alignItems={"start"}
                // marginTop={1}
              >
                <Stack
                  sx={{
                    fontSize: { md: "15px", sm: "14px", xs: "13px" },
                    // fontWeight: "500",
                    color: "#8d9498",
                  }}
                >
                  {toTitleCase(fields.name)}
                </Stack>
                <Stack>
                  {fields.comp ? (
                    fields.comp
                  ) : (
                    <TextField
                      source={fields.name.toLowerCase()}
                      sx={{
                        fontSize: { md: "15px", sm: "14px", xs: "13px" },
                        color: "#8d9498",
                      }}
                      emptyText="-"
                    />
                  )}
                </Stack>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};

export const OrderSummary = (props) => {
  const { currncy, record, order, sx } = props;
  return (
    <Stack
      className="card"
      spacing={3}
      padding={{ md: 4, sm: 3, xs: 2 }}
      margin={1}
      sx={sx}
    >
      <Stack>
        <Typography
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          sx={{
            fontSize: { sm: "20px", md: "20px", xs: "18px" },
            fontWeight: "500",
          }}
        >
          Summary
        </Typography>
      </Stack>

      <Stack>
        {order &&
          order.items &&
          order.items.map((item, index) => {
            return (
              <Stack
                key={index}
                direction="row"
                justifyContent={"space-between"}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: { md: "14px", sm: "13px", xs: "12px" },
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  spacing={{ md: 2, sm: 1 }}
                >
                  <ImageField
                    source="thumbnail"
                    title="thumbnail"
                    record={item}
                    sx={{
                      "& img": {
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "initial !important",
                        height: "48px !important",
                        objectFit: "contain",
                      },
                    }}
                  />
                  <Stack>
                    <Typography
                      sx={{
                        fontSize: { md: "14px", sm: "13px", xs: "12px" },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { md: "14px", sm: "13px", xs: "12px" },
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  alignItems={"center"}
                  spacing={{ md: 4, sm: 3, xs: 2 }}
                >
                  <Stack
                    direction="row"
                    alignItems={"center"}
                    spacing={{ md: 2, sm: 1, xs: 1 }}
                  >
                    <Typography>
                      {currncy ? currncy.symbol : null}
                      {formatPrice(item.unit_price)}
                    </Typography>
                    <Typography>X</Typography>
                    <Typography>{item.quantity}</Typography>
                  </Stack>

                  <Typography>
                    {currncy ? currncy.symbol : null}
                    {formatPrice(item.total)}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
      </Stack>
      {[
        { id: "subtotal", name: toTitleCase("subtotal") },
        { id: "shipping_total", name: toTitleCase("Shipping") },
        { id: "tax_total", name: toTitleCase("Tax") },
        {
          id: "total",
          name: toTitleCase("Total"),
          idStyle: {
            fontSize: {
              md: "24px !important",
              sm: "22px !important",
              xs: "20px !important",
            },
            fontWeight: "600",
          },
          nameStyle: { fontWeight: "600" },
        },
      ].map((param, index) => {
        return (
          <Stack
            key={index}
            direction="row"
            justifyContent={"space-between"}
            marginTop={"16px !important"}
            sx={{
              "& .MuiTypography-root": {
                fontSize: { md: "14px", sm: "13px", xs: "14px" },
              },
            }}
          >
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={{ md: 4, sm: 3, xs: 2 }}
            >
              <Stack
                direction="row"
                alignItems={"center"}
                spacing={{ md: 2, sm: 1, xs: 1 }}
              >
                <Typography sx={{ ...param?.nameStyle }}>
                  {param.name}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              alignItems={"center"}
              spacing={{ md: 4, sm: 3, xs: 2 }}
            >
              <Typography sx={{ ...param?.idStyle }}>
                {currncy ? currncy.symbol : null}
                {order ? formatPrice(order[param?.id]) : null}
              </Typography>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export const PaymentSummary = (props) => {
  const { currncy, record, order, sx } = props;
  const translate = useTranslate();
  return (
    <Stack
      className="card"
      spacing={3}
      padding={{ md: 4, sm: 3, xs: 2 }}
      margin={1}
      sx={sx}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Typography
          sx={{
            fontSize: { sm: "20px", md: "20px", xs: "18px" },
            fontWeight: "500",
          }}
        >
          Payment
        </Typography>

        <Stack direction={"row"} spacing={{ md: 2, sm: 1, xs: 1 }}>
          <StatusField source="payment_status" nw_record={record} />
          <Button
            variant="outlined"
            type="button"
            color="primary"
            // disabled
            // fullWidth
            sx={{
              paddingY: "5px",
              paddingX: { md: "20px", sm: "15px", xs: "10px" },
              borderRadius: "12px",
              textTransform: "capitalize",
              border: "1px solid rgba(229, 231, 235, 1)",
            }}
            onClick={(e) => {}}
          >
            {/* {loading && <CircularProgress size={25} thickness={2} />} */}
            {translate("Capture Payment")}
          </Button>
        </Stack>
      </Stack>

      <Stack>
        {order &&
          order.payments &&
          order.payments.map((payment, index) => {
            return (
              <Stack
                key={index}
                direction="row"
                justifyContent={"space-between"}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: { md: "14px", sm: "13px", xs: "12px" },
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  spacing={{ md: 2, sm: 1 }}
                >
                  <Stack>
                    <Typography
                      sx={{
                        fontSize: { md: "14px", sm: "13px", xs: "12px" },
                      }}
                    >
                      {payment.id}
                    </Typography>
                    <Typography
                      sx={
                        {
                          // fontSize: { md: "14px", sm: "13px", xs: "12px" },
                        }
                      }
                    >
                      <DateField
                        showTime={true}
                        source="created_at"
                        options={{
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }}
                        sx={{
                          fontSize: { md: "13px", sm: "12px", xs: "12px" },
                          color: "#8d9498",
                        }}
                        record={payment}
                      />
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  alignItems={"center"}
                  spacing={{ md: 4, sm: 3, xs: 2 }}
                >
                  <Typography>
                    {currncy ? currncy.symbol : null}
                    {formatPrice(payment.amount)}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
      </Stack>
      {[
        {
          id: "total",
          name: toTitleCase("Total"),
          idStyle: {
            fontSize: {
              md: "24px !important",
              sm: "22px !important",
              xs: "20px !important",
            },
            fontWeight: "600",
          },
          nameStyle: { fontWeight: "600" },
        },
      ].map((param, index) => {
        return (
          <Stack
            key={index}
            direction="row"
            justifyContent={"space-between"}
            marginTop={"16px !important"}
            sx={{
              "& .MuiTypography-root": {
                fontSize: { md: "14px", sm: "13px", xs: "14px" },
              },
            }}
          >
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={{ md: 4, sm: 3, xs: 2 }}
            >
              <Stack
                direction="row"
                alignItems={"center"}
                spacing={{ md: 2, sm: 1, xs: 1 }}
              >
                <Typography sx={{ ...param?.nameStyle }}>
                  {param.name}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              alignItems={"center"}
              spacing={{ md: 4, sm: 3, xs: 2 }}
            >
              <Typography sx={{ ...param?.idStyle }}>
                {currncy ? currncy.symbol : null}
                {order ? formatPrice(order[param?.id]) : null}
              </Typography>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export const FulfilmentSummary = (props) => {
  const { currncy, record, order } = props;
  const translate = useTranslate();
  return (
    <Stack
      className="card"
      spacing={3}
      padding={{ md: 4, sm: 3, xs: 2 }}
      margin={1}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Typography
          sx={{
            fontSize: { sm: "23px", md: "25px", xs: "16px" },
            fontWeight: "500",
          }}
        >
          Fulfillment
        </Typography>

        <Stack direction={"row"} spacing={{ md: 2, sm: 1, xs: 1 }}>
          <StatusField source="fulfillment_status" />
          <Button
            variant="outlined"
            type="button"
            color="primary"
            // disabled
            // fullWidth
            sx={{
              paddingY: "5px",
              paddingX: { md: "20px", sm: "15px", xs: "10px" },
              borderRadius: "12px",
              textTransform: "capitalize",
              border: "1px solid rgba(229, 231, 235, 1)",
            }}
            onClick={(e) => {}}
          >
            {/* {loading && <CircularProgress size={25} thickness={2} />} */}
            {translate("Create Fulfillment")}
          </Button>
        </Stack>
      </Stack>

      <Stack>
        {order &&
          order.shipping_methods &&
          order.shipping_methods.map((method, index) => {
            return (
              <Stack
                key={index}
                direction="row"
                justifyContent={"space-between"}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: { md: "14px", sm: "13px", xs: "12px" },
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  spacing={{ md: 2, sm: 1 }}
                >
                  <Stack>
                    <Typography
                      sx={{
                        fontSize: { md: "14px", sm: "13px", xs: "12px" },
                      }}
                    >
                      Shipping Method
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { md: "14px", sm: "13px", xs: "12px" },
                        color: "#8d9498",
                      }}
                    >
                      {method.shipping_option.name}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            );
          })}
      </Stack>
      <Stack
        padding={2}
        overflow={"auto"}
        width={"100%"}
        borderRadius={2}
        maxWidth={{
          lg: `calc(100vw - 500px)`,
          sm: "80vw !important",
          xs: "80vw !important",
        }}
        backgroundColor={"var(--onyx-row)"}
      >
        {order && order.fulfillments && (
          <ReactJson src={order["fulfillments"]} />
        )}
      </Stack>
    </Stack>
  );
};

const CustomerSummary = (props) => {
  const { currncy, record, order } = props;
  const translate = useTranslate();
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
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const _cust_details_list = [
    {
      name: "Contact",
      comp: (
        <Stack marginTop={1}>
          <TextField source="email" />
          <ReferenceField
            source="customer_id"
            reference="customer"
            label="Phone"
          >
            <TextField source="phone" />
          </ReferenceField>
        </Stack>
      ),
    },
    {
      name: "Shipping",
      comp: (
        <>
          {order && order.shipping_address && (
            <Stack
              marginTop={1}
              sx={{
                fontSize: { md: "15px", sm: "14px", xs: "13px" },
                "& p": {
                  fontSize: { md: "15px", sm: "14px", xs: "14px" },
                },
                // fontWeight: "500",
                // color: "#8d9498",
              }}
            >
              <Typography>
                {`${order.shipping_address.address_1} ${order.shipping_address.address_2}`}
              </Typography>
              <Typography>
                {`${order.shipping_address.postal_code}, ${order.shipping_address.city}, ${order.shipping_address.province}`}
              </Typography>
              <Typography>
                {`${order.shipping_address.country_code} `}
              </Typography>
            </Stack>
          )}
        </>
      ),
    },
    {
      name: "Billing",
      comp: (
        <>
          {order && order.billing_address && (
            <Stack
              marginTop={1}
              sx={{
                fontSize: { md: "15px", sm: "14px", xs: "13px" },
                "& p": {
                  fontSize: { md: "15px", sm: "14px", xs: "14px" },
                },
                // fontWeight: "500",
                // color: "#8d9498",
              }}
            >
              <Typography>
                {`${order.billing_address.address_1} ${order.billing_address.address_2}`}
              </Typography>
              <Typography>
                {`${order.billing_address.postal_code}, ${order.billing_address.city}, ${order.billing_address.province}`}
              </Typography>
              <Typography>
                {`${order.billing_address.country_code} `}
              </Typography>
            </Stack>
          )}
        </>
      ),
    },
  ];
  return (
    <Stack
      className="card"
      spacing={3}
      padding={{ md: 4, sm: 3, xs: 2 }}
      margin={1}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Typography
          sx={{
            fontSize: { sm: "23px", md: "25px", xs: "18px" },
            fontWeight: "500",
          }}
        >
          Customer
        </Typography>
        <Stack direction={"row"} spacing={{ md: 2, sm: 1, xs: 1 }}>
          {/* <StatusField source="fulfillment_status" /> */}
          <Button
            variant="outlined"
            type="button"
            color="primary"
            // disabled
            // fullWidth
            sx={{
              paddingY: "5px",
              paddingX: { md: "20px", sm: "15px", xs: "10px" },
              borderRadius: "12px",
              textTransform: "capitalize",
              border: "1px solid rgba(229, 231, 235, 1)",
            }}
            onClick={(e) => {}}
          >
            {/* {loading && <CircularProgress size={25} thickness={2} />} */}
            <MoreHoriz />
          </Button>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        sx={{
          "& .MuiTypography-root": {
            fontSize: { md: "15px", sm: "14px", xs: "13px" },
          },
        }}
      >
        {order && order.customer && (
          <Stack
            direction="row"
            alignItems={"center"}
            spacing={{ md: 2, sm: 1, xs: 1 }}
          >
            <Avatar
              {...stringAvatar(
                `${order.customer.first_name} ${order.customer.last_name}`
              )}
              // sx={{ height: "50px", width: "50px" }}
            />
            <Stack>
              <Typography
                sx={{
                  fontSize: { md: "15px", sm: "14px", xs: "13px" },
                  fontWeight: "600",
                }}
              >
                {`${order.customer.first_name} ${order.customer.last_name}`}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "14px", sm: "13px", xs: "12px" },
                }}
              >
                {`${order.billing_address.city} ${order.billing_address.province}`}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
      <DetailsListHoriz fields={_cust_details_list} />
    </Stack>
  );
};

export default function OrderShowComp(props) {
  const { setShowTitle, order, setOrder } = props;
  const { record, isLoading } = useShowContext();
  const [theme, setTheme] = useTheme();
  const resource = useResourceContext();
  const redirect = useRedirect();
  const isXLarge = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const curr_content_card = useRef(null);
  const content_cards = useRef([]);
  const sidebarState = useSidebarState();
  const identity = useGetIdentity();
  const [currncy, setCurrncy] = useState(null);

  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });
  const slider1 = useRef();
  const slider2 = useRef();

  useEffect(() => {
    if (slider1.current && slider2.current) {
      slider1.current.sync(slider2.current.splide);
    }
  }, [slider1, slider2]);

  useEffect(() => {
    if (record) {
      medusa.admin.orders.retrieve(record.id).then(({ order }) => {
        console.log(order);
        setOrder(order);
      });
    }
  }, [record]);

  useEffect(() => {
    async function fetchCurrencyObj() {
      if (record) {
        try {
          let { data: currency, error } = await supabase
            .from("currency")
            .select("*")
            .eq("code", record?.currency_code)
            .maybeSingle();

          // console.log(currency, error)

          setCurrncy(currency);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    fetchCurrencyObj();
  }, [record]);

  // const { width, height } = useParentSize(curr_content_card, {width: 100, height: 50, callback: ()=>{
  //   console.log("here", curr_content_card)
  // }});

  const listRowSx = (record, index) => ({
    // margin: "10px",
  });

  const _details_list = [
    { name: "Email" },
    {
      name: "Phone",
      comp: (
        <ReferenceField source="customer_id" reference="customer" label="Phone">
          <TextField source="phone" />
        </ReferenceField>
      ),
    },
    {
      name: "Payment",
      comp: (
        <ReferenceField source="cart_id" reference="cart" label="Cart">
          <ReferenceField source="payment_id" reference="payment" label="Cart">
            <TextField source="provider_id" />
          </ReferenceField>
        </ReferenceField>
      ),
    },
  ];

  const _dimensions_list = ["height", "width", "length", "weight"];

  const _customs_list = ["mid_code", "hs_code", "origin_country"];

  useEffect(() => {
    // console.log(record, isLoading);
    if (!isLoading && record && record.title) {
      setShowTitle(record?.title);
    }
  }, [record, isLoading]);

  if (!record) return null;
  return (
    <SimpleShowLayout sx={{ backgroundColor: "transparent", padding: "0px" }}>
      <Stack
        spacing={2}
        paddingX={1}
        paddingY={2}
        paddingTop={1}
        // width={
        //   sidebarState[0] && !isSmall ? "calc(95vw - 240px) !important" : "80vw"
        // }
        width={"100%"}
        // backgroundColor={theme && theme === "dark" ? "#222" : "#fff"}
        color={theme && theme === "dark" ? "#fff" : "inherit"}
        overflow={"auto"}
        border={
          theme && theme === "dark"
            ? "1px solid rgba(244, 244, 244, 0.2)"
            : "none"
        }
        className="list_container"
        sx={{
          transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
          scrollbarColor: "#8d9498 rgba(0, 0, 0, 0.1)",
          scrollbarWidth: "thin",
          // "& .MuiTable-root": {
          //   width: `${
          //     sidebarState[0] && !isSmall
          //       ? "calc(95vw - 240px) !important"
          //       : "90vw"
          //   }`,
          //   transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
          //   borderRadius: "6px",
          // },
          "& .MuiTypography-root, p, span": {
            fontFamily: "Rubik !important",
            // fontSize: "13px !important",
            overflowWrap: "anywhere",
          },
          "& span": {
            display: "inline-block",
            // width: "max-content",
          },
          "& .card": {
            backgroundColor: `${theme && theme === "dark" ? "#222" : "#fff"}`,
            color: `${theme && theme === "dark" ? "#fff" : "inherit"}`,
          },
          "& .MuiChip-root": {
            borderRadius: 2,
            backgroundColor: `${
              theme && theme === "dark" ? "var(--onyx)" : "var(--onyx-row)"
            }`,
            color: `${theme && theme === "dark" ? "#fff" : "inherit"}`,
          },
        }}
      >
        <Stack
          className="card"
          spacing={2}
          padding={{ md: 4, sm: 3, xs: 2 }}
          margin={1}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography
                sx={{
                  fontSize: { sm: "23px", md: "25px", xs: "20px" },
                  fontWeight: "600",
                }}
              >
                #
                <TextField
                  source="display_id"
                  sx={{
                    fontSize: { sm: "23px", md: "25px", xs: "20px" },
                    fontWeight: "600",
                  }}
                />
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <StatusField source="status" />
            </Stack>
          </Stack>
          <Stack>
            <DateField
              showTime={true}
              source="created_at"
              options={{
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }}
              sx={{ fontSize: { md: "14px", sm: "13px", xs: "12px" } }}
            />
          </Stack>

          <DetailsListHoriz fields={_details_list} />
        </Stack>

        {/* {isXLarge && (
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            marginTop={"10px"}
          >
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "45%", sm: "80vw" }}
              // paddingY={2}
              // height={"380px"}
              className="card"
              // width={`${isSmall ? "85vw !important" : "calc(100% - 100px)"}`}
              overflow={"hidden"}
              direction={"row"}
              marginY={1}
            >
              <Stack
                // className="card"
                spacing={2}
                padding={{ md: 4, sm: 3, xs: 2 }}
                // margin={1}
              >
                <Typography
                  sx={{
                    fontSize: { sm: "19px", md: "20px", xs: "18px" },
                    fontWeight: "500",
                  }}
                >
                  Thumbnail
                </Typography>
                <ImageField
                  source="thumbnail"
                  sx={{
                    "& img": {
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "initial !important",
                      objectFit: "contain",
                    },
                  }}
                />
              </Stack>
            </Stack>
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "45%", sm: "80vw" }}
              // paddingY={2}
              // height={"380px"}
              // className="card"
              // width={`${isSmall ? "85vw !important" : "calc(100% - 100px)"}`}
              overflow={"hidden"}
              direction={"row"}
              className="card"
              marginY={1}
            >
              <Stack
                // className="card"
                spacing={2}
                padding={{ md: 4, sm: 3, xs: 2 }}
                // margin={1}
              >
                <Typography
                  sx={{
                    fontSize: { sm: "19px", md: "20px", xs: "18px" },
                    fontWeight: "500",
                  }}
                >
                  Media
                </Typography>

                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{
                    "& img": {
                      borderRadius: "4px",
                    },
                  }}
                >
                  <Stack>
                    <Splide
                      ref={(slider) => (slider2.current = slider)}
                      aria-label="Product Images big"
                      options={{
                        arrows: false,
                        autoplay: true,
                        type: "loop",
                      }}
                    >
                      {product &&
                        product.images &&
                        product.images.map((image) => {
                          // console.log(image);
                          return (
                            <SplideSlide key={image.id}>
                              <img
                                src={image.url}
                                title={image.id}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  width: "initial !important",
                                  objectFit: "contain",
                                }}
                              />
                            </SplideSlide>
                          );
                        })}
                    </Splide>
                  </Stack>
                  <Stack
                    sx={{
                      "& .splide__list": {
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      "& .is-active": {
                        border: "2px solid var(--onyx)",
                        borderRadius: "4px",
                      },

                      "& .splide": {
                        border: "none !important",
                      },
                    }}
                  >
                    <Splide
                      ref={(slider) => (slider1.current = slider)}
                      aria-label="Product Images small"
                      options={{
                        fixedWidth: "max-content",
                        fixedHeight: "max-content",
                        height: "300px",
                        gap: 10,
                        rewind: true,
                        pagination: false,
                        direction: "ttb",
                        arrows: false,
                      }}
                    >
                      {product &&
                        product.images &&
                        product.images.map((image) => {
                          // console.log(image);
                          return (
                            <SplideSlide key={image.id}>
                              <img
                                src={image.url}
                                title={image.id}
                                style={{
                                  maxWidth: "50px",
                                  maxHeight: "80px",
                                  // width: "initial !important",
                                  objectFit: "contain",
                                }}
                              />
                            </SplideSlide>
                          );
                        })}
                    </Splide>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )} */}

        <OrderSummary order={order} currncy={currncy} record={record} />

        <PaymentSummary order={order} currncy={currncy} record={record} />

        <FulfilmentSummary order={order} currncy={currncy} record={record} />

        <CustomerSummary order={order} currncy={currncy} record={record} />

        {/* <Stack
          className="card"
          spacing={2}
          padding={{ md: 4, sm: 3, xs: 2 }}
          margin={1}
        >
          <Typography
            sx={{
              fontSize: { sm: "23px", md: "25px", xs: "20px" },
              fontWeight: "600",
            }}
          >
            Attributes
          </Typography>

          <DetailsList fields={_dimensions_list} title={"Dimensions"} />

          <DetailsList fields={_customs_list} title={"Customs"} />
        </Stack> */}

        <Stack
          className="card"
          spacing={2}
          padding={{ md: 4, sm: 3, xs: 2 }}
          margin={1}
        >
          <Typography
            sx={{
              fontSize: { sm: "23px", md: "25px", xs: "18px" },
              fontWeight: "500",
            }}
          >
            RAW JSON
          </Typography>
          <JSONField order={order} />
        </Stack>

        {/* <Stack className="card" spacing={0} padding={2} margin={1}>
          <TextField source="mid_code" />
          <TextField source="material" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
          <TextField source="deleted_at" />
          <TextField source="metadata" />
          <ReferenceField source="collection_id" reference="collections" />
          <ReferenceField source="type_id" reference="types" />
          <BooleanField source="discountable" />
          <TextField source="status" />
          <ReferenceField source="external_id" reference="externals" />
          <ReferenceField source="store_id" reference="stores" />
        </Stack> */}
      </Stack>
    </SimpleShowLayout>
  );
}
