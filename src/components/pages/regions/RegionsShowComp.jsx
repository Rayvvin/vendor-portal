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
  useTranslate,
  ReferenceOneField,
  FunctionField,
} from "react-admin";
import { useMediaQuery, Fab } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParentSize } from "@cutting/use-get-parent-size";
// import type { U}  from "@cutting/use-get-parent-size";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { supabase } from "../../../supabase/SupabaseConfig";
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
import { toTitleCase } from "../../helpers/helpers";
// import RegionAsideComp from "./RegionAsideComp";
import Medusa from "@medusajs/medusa-js";
import ReactJson from "@microlink/react-json-view";
import {
  MoreVert,
  MoreHoriz,
  AccountCircleOutlined,
  LocationOn,
  RadioButtonChecked,
  LocalShipping,
} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import ReactCountryFlag from "react-country-flag";

const DetailsListHoriz = (props) => {
  const { fields, title } = props;
  const record = useRecordContext();
  return (
    <Stack style={{ marginY: "32px !important" }} margin spacing={1}>
      <Stack
        sx={{
          fontSize: { md: "15px", sm: "13px", xs: "14px" },
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

const PriceField = (props) => {
  const { source, currencies, currncy } = props;
  const record = useRecordContext();
  return (
    <ReferenceField label="Paid Total" source="cart_id" reference="cart">
      <ReferenceField source="payment_id" reference="payment">
        <FormatPriceField
          source="amount"
          currencies={currencies}
          currncy={currncy}
        />
      </ReferenceField>
    </ReferenceField>
  );
};

const FormatPriceField = (props) => {
  const { source, currencies, currncy } = props;
  const record = useRecordContext();

  useEffect(() => {
    console
      .log
      // currencies.find((curr) => {
      //   return curr.code == record["currency_code"];
      // })?.symbol
      ();
  }, []);
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
  const { av_size, av_font_size } = props;
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
        height: av_size ? av_size : "35px",
        width: av_size ? av_size : "35px",
        fontSize: av_font_size ? av_font_size : "15px",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[0][1]}`,
    };
  }
  return <Avatar {...stringAvatar(`${record?.name}`)} />;
};

const RegionField = (props) => {
  const { source, currencies, currncy } = props;
  const record = useRecordContext();
  return (
    <Stack
      // component={"span"}
      maxWidth={"550px"}
      textOverflow={"ellipsis"}
      whiteSpace={"nowrap"}
      overflow={"hidden"}
      direction={"row"}
      spacing={2}
      alignItems={"center"}
    >
      {/* <CustAvatar av_size="64px" av_font_size="30px" /> */}
      <ReferenceManyField
        label="Countries"
        reference="country"
        target="region_id"
      >
        <WithListContext
          render={({ isLoading, data }) => {
            // console.log(data);
            return (
              !isLoading &&
              [data[0]].flatMap((country) => (
                <ReactCountryFlag
                  className="emojiFlag"
                  countryCode={`${country.iso_2}`}
                  style={{
                    fontSize: "4em",
                    lineHeight: "4em",
                  }}
                  aria-label={`${country.display_name}`}
                  svg
                />
              ))
            );
          }}
        />
      </ReferenceManyField>
      <Stack spacing={0}>
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
          <TextField source="name" />
        </Stack>

        <Stack
          alignItems={"center"}
          direction={"row"}
          spacing={1}
          sx={{
            fontSize: { md: "14px", sm: "13px", xs: "14px" },
          }}
        >
          <LocationOn sx={{ fontWeight: "400", fontSize: "14px" }} />
          {record.first_name || record.last_name ? (
            <Fragment>
              <TextField source="first_name" /> <TextField source="last_name" />
            </Fragment>
          ) : (
            <Stack
              // component={"span"}
              // maxWidth={{ lg: "fit-content", sm: "100px", xs: "100px" }}
              // display={"inline-block"}
              // textOverflow={"ellipsis"}
              // whiteSpace={"nowrap"}
              // overflow={"hidden"}
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              sx={{
                fontSize: { md: "15px", sm: "13px", xs: "14px" },
                color: "#8d9498",
              }}
            >
              <ReferenceManyField
                label="Countries"
                reference="country"
                target="region_id"
                // record={props}
              >
                <WithListContext
                  render={({ isLoading, data }) => {
                    // console.log(data);
                    if (!data) return null;
                    return !isLoading && data.length && data.length > 1 ? (
                      <Fragment>{`${data[0].display_name}, ...`}</Fragment>
                    ) : (
                      <Fragment>{`${data[0].display_name}, ...`}</Fragment>
                    );
                  }}
                />
              </ReferenceManyField>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export const ThumbnailField = () => {
  const record = useRecordContext();
  return (
    <Box
      width={"30px"}
      height={"40px"}
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
  const { source, label } = props;
  const record = useRecordContext();
  let color = "";
  let text = source ? record[source] : record.status;
  switch (text) {
    case "published":
      color = "var(--emerald)";
      break;

    case true:
      color = "var(--emerald)";
      if (source == "has_account") {
        text = label ? label : "Registered";
      }
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
        sx={{
          fontSize: { md: "15px", sm: "13px", xs: "11px" },
          overflowWrap: "break-word !important",
        }}
        component={"p"}
      >
        {text}
      </Box>
    </Stack>
  );
};

export const JSONField = (props) => {
  const { source, customer } = props;
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
          fontSize: { md: "15px", sm: "13px", xs: "14px" },
          color: "#8d9498",
        }}
      >
        {customer ? <ReactJson src={customer} /> : <ReactJson src={record} />}
      </pre>
    </Stack>
  );
};

const DetailsList = (props) => {
  const { fields, title, nw_record } = props;
  const record = useRecordContext();
  useEffect(() => {
    // console.log(nw_record);
  }, [nw_record]);
  return (
    <Stack style={{ marginY: "32px !important" }} spacing={1}>
      <Stack
        sx={{
          fontSize: { md: "15px", sm: "13px", xs: "14px" },
          fontWeight: "500",
        }}
      >
        {title}
      </Stack>
      {!nw_record ? (
        fields &&
        fields.length &&
        fields.map((field, i) => {
          return (
            <Stack
              key={i}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              // marginTop={1}
              flexWrap={"wrap"}
            >
              <Stack
                sx={{
                  fontSize: { md: "15px", sm: "13px", xs: "14px" },
                  // fontWeight: "500",
                  color: "#8d9498",
                  textTransform: "capitalize",
                }}
              >
                {field.title
                  ? field.title
                  : field.source.search(".") == "-1"
                  ? toTitleCase(field.source)
                  : field.source.split(".")[field.source.split(".").length - 1]}
              </Stack>
              <Stack>
                {field && field.data ? (
                  field.data
                ) : (
                  <TextField
                    source={
                      field.source.search(".") == "-1"
                        ? field.source.toLowerCase()
                        : field.source
                    }
                    sx={{
                      fontSize: { md: "15px", sm: "13px", xs: "14px" },
                      color: "#8d9498",
                    }}
                    emptyText="-"
                  />
                )}
              </Stack>
            </Stack>
          );
        })
      ) : (
        <ReferenceField
          reference={nw_record?.reference}
          target={nw_record?.target}
          source={nw_record?.source}
        >
          {fields &&
            fields.length &&
            fields.map((field, i) => {
              return (
                <Stack
                  key={i}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  marginTop={1}
                  flexWrap={"wrap"}
                >
                  <Stack
                    sx={{
                      fontSize: { md: "15px", sm: "13px", xs: "14px" },
                      // fontWeight: "500",
                      color: "#8d9498",
                      textTransform: "capitalize",
                    }}
                  >
                    {field.title
                      ? field.title
                      : field.source.search(".") == "-1"
                      ? toTitleCase(field.source)
                      : field.source.split(".")[
                          field.source.split(".").length - 1
                        ]}
                  </Stack>
                  <Stack>
                    {field && field.data ? (
                      field.data
                    ) : (
                      <TextField
                        source={
                          field.source.search(".") == "-1"
                            ? field.source.toLowerCase()
                            : field.source
                        }
                        sx={{
                          fontSize: { md: "15px", sm: "13px", xs: "14px" },
                          color: "#8d9498",
                        }}
                        emptyText="-"
                      />
                    )}
                  </Stack>
                </Stack>
              );
            })}
        </ReferenceField>
      )}
    </Stack>
  );
};

function formatPrice(price) {
  return parseFloat(price / 100).toFixed(2);
}

const RegionSummary = (props) => {
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
      name: "Created",
      comp: (
        <Stack marginTop={1}>
          <DateField
            label="Date Added"
            source="created_at"
            options={{
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
        </Stack>
      ),
    },
    {
      name: "Primary Location",
      comp: (
        <Stack
          marginTop={1}
          sx={{
            fontSize: { md: "15px", sm: "15px", xs: "14px" },
            // color: "#8d9498",
          }}
        >
          <ReferenceManyField
            label="Countries"
            reference="country"
            target="region_id"
            // record={props}
          >
            <WithListContext
              render={({ isLoading, data }) => {
                // console.log(data);
                if (!data) return null;
                return !isLoading && data.length && data.length > 1 ? (
                  <Fragment>{`${data[0].display_name}`}</Fragment>
                ) : (
                  <Fragment>{`${data[0].display_name}`}</Fragment>
                );
              }}
            />
          </ReferenceManyField>
        </Stack>
      ),
    },
    // {
    //   name: "States",
    //   comp: (
    //     <Stack marginTop={1}>
    //       <ReferenceManyCount
    //         label="Region States"
    //         reference="state"
    //         target="state"
    //         // source="store_id"
    //         // link
    //       />
    //     </Stack>
    //   ),
    // },
    // {
    //   name: "Markets",
    //   comp: (
    //     <Stack marginTop={1}>
    //       <ReferenceManyCount
    //         label="Region Markets"
    //         reference="market"
    //         target="market_name"
    //         // source="store_id"
    //         // link
    //       />
    //     </Stack>
    //   ),
    // },
    // {
    //   name: "Exchange Rate",
    //   comp: (
    //     <Stack
    //       marginTop={1}
    //       sx={{
    //         fontSize: { md: "15px", sm: "15px", xs: "14px" },
    //         // color: "#8d9498",
    //       }}
    //     >
    //       <ReferenceOneField
    //         label="Exchange Rate"
    //         reference="exchange_rate"
    //         target="currency_code"
    //         source="currency_code"
    //         record={{
    //           ...record,
    //           currency_code: record.currency_code.toUpperCase(),
    //         }}
    //       >
    //         <FunctionField
    //           label="Exchange Rate"
    //           render={(record) =>
    //             `1$ = ${parseFloat(record.average_rate).toFixed(2)} ${
    //               currncy
    //                 ? currncy.find(
    //                     (c) => c.code === record?.currency_code.toLowerCase()
    //                   )?.symbol
    //                 : ""
    //             }`
    //           }
    //         />
    //       </ReferenceOneField>
    //     </Stack>
    //   ),
    // },
    // {
    //   name: "Status",
    //   comp: (
    //     <Stack marginTop={1}>
    //       <StatusField source="has_account" label="Registered" />
    //     </Stack>
    //   ),
    // },
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
        {/* <Typography
          sx={{
            fontSize: { sm: "23px", md: "25px", xs: "18px" },
            fontWeight: "500",
          }}
        >
          Region
        </Typography> */}
        <RegionField label="Region" />
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
              borderRadius: "14px",
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

      <DetailsListHoriz fields={_cust_details_list} />
    </Stack>
  );
};

export const InventoryListField = (props) => {
  const record = useRecordContext();
  return (
    <ReferenceManyField
      label="Variants"
      reference="product_variant"
      target="product_id"
    >
      <WithListContext
        render={({ isLoading, data }) => {
          return (
            !isLoading && (
              <Box
                component={"p"}
                maxWidth={"200px"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
              >
                {`${data
                  ?.map((item) => item.inventory_quantity)
                  .reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;
                  }, 0)} in stock for ${data.length} variant(s)`}
              </Box>
            )
          );
        }}
      />
    </ReferenceManyField>
  );
};

export default function RegionShowComp(props) {
  const {
    setShowTitle,
    customer,
    setRegion,
    paymentProvs,
    setPaymentProvs,
    fulfilmentProvs,
    setFulfilmentProvs,
  } = props;
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
  const [currncy, setCurrncy] = useState(null);
  const identity = useGetIdentity();

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

    fetchCurrencyObj();
  }, [record]);

  useEffect(() => {
    async function fetchPaymentProvs() {
      if (record) {
        try {
          let { data: region_payment_providers, error } = await supabase
            .from("region_payment_providers")
            .select("*");
          // .eq("code", record?.currency_code)
          // .maybeSingle();
          // console.log(region_payment_providers);
          setPaymentProvs(region_payment_providers);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    fetchPaymentProvs();
  }, [record]);

  useEffect(() => {
    async function fetchFulfilmentProvs() {
      if (record) {
        try {
          let { data: region_fulfilment_providers, error } = await supabase
            .from("region_fulfillment_providers")
            .select("*");
          // .eq("code", record?.currency_code)
          // .maybeSingle();

          setFulfilmentProvs(region_fulfilment_providers);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    fetchFulfilmentProvs();
  }, [record]);

  // useEffect(() => {
  //   if (record) {
  //     medusa.customers.retrieve(record.id).then(({ customer }) => {
  //       // console.log(customer);
  //       setRegion(customer);
  //     });
  //   }
  // }, [record]);

  // useEffect(() => {
  //   if (currncy) {
  //     console.log(currncy);
  //   }
  // }, [currncy]);

  // const { width, height } = useParentSize(curr_content_card, {width: 100, height: 50, callback: ()=>{
  //   console.log("here", curr_content_card)
  // }});

  const listRowSx = (record, index) => ({
    // margin: "10px",
  });

  const _details_list = [
    {
      source: "currency_code",
      title: "Currency",
      data: (
        <Typography
          sx={{
            fontSize: { md: "15px", sm: "13px", xs: "14px" },
            // color: "#8d9498",
          }}
        >
          {currncy
            ? `${
                currncy.find(
                  (c) => c.code === record?.currency_code.toLowerCase()
                )?.name
              } 
            (${
              currncy.find(
                (c) => c.code === record?.currency_code.toLowerCase()
              )?.symbol
            })`
            : ""}
        </Typography>
      ),
    },
    {
      source: "metadata.province",
      title: "Countries",
      data: (
        <Stack
          // component={"span"}
          // maxWidth={"250px"}
          // display={"inline-block"}
          // textOverflow={"ellipsis"}
          // whiteSpace={"nowrap"}
          // overflow={"hidden"}
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          sx={{
            fontSize: { md: "15px", sm: "13px", xs: "14px" },
            // color: "#8d9498",
          }}
        >
          <ReferenceManyField
            label="Countries"
            reference="country"
            target="region_id"
            // record={props}
          >
            <WithListContext
              render={({ isLoading, data }) => {
                // console.log(data);
                return (
                  !isLoading &&
                  data.flatMap((country) => (
                    <Fragment>{`${country.display_name}, `}</Fragment>
                  ))
                );
              }}
            />
          </ReferenceManyField>
        </Stack>
      ),
    },
    {
      title: "Payment Providers",
      data: (
        <Typography
          sx={{
            fontSize: { md: "15px", sm: "13px", xs: "14px" },
            // color: "#8d9498",
          }}
        >
          {paymentProvs && paymentProvs.length
            ? paymentProvs.filter(
                (payPrv) => payPrv["region_id"] == record?.id
              )[0]["provider_id"]
            : null}
        </Typography>
      ),
    },
    {
      title: "Fulfilment Providers",
      data: (
        <Typography
          sx={{
            fontSize: { md: "15px", sm: "13px", xs: "14px" },
            // color: "#8d9498",
          }}
        >
          {fulfilmentProvs && fulfilmentProvs.length
            ? fulfilmentProvs.filter(
                (fulfilPrv) => fulfilPrv["region_id"] === record?.id
              )[0]["provider_id"]
            : null}
        </Typography>
      ),
    },
  ];

  const _details_market_list = [
    { source: "metadata.market.market_name", title: "Market" },
    { source: "metadata.un_reg_market.un_reg_market", title: "Mini Market" },
    {
      source: "metadata.un_reg_market.nearby_market.market_name",
      title: "Nearest Major Market",
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
        <RegionSummary currncy={currncy} record={record} />

        <Stack
          className="card"
          spacing={1}
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
                  fontSize: { sm: "23px", md: "23px", xs: "20px" },
                  fontWeight: "600",
                }}
              >
                Region Information
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              {/* <StatusField source="has_account" label="Registered" /> */}
            </Stack>
          </Stack>
          {/* <Stack marginTop={"4px"}>
            <Typography
              sx={{ fontSize: { md: "15px", sm: "13px", xs: "12px" } }}
            >
              More info on this Region
            </Typography>
          </Stack> */}

          <DetailsList fields={_details_list} title={"Details"} />
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
                      aria-label="Region Images big"
                      options={{
                        arrows: false,
                        autoplay: true,
                        type: "loop",
                      }}
                    >
                      {customer &&
                        customer.images &&
                        customer.images.map((image) => {
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
                      aria-label="Region Images small"
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
                      {customer &&
                        customer.images &&
                        customer.images.map((image) => {
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

        <ShippingOptionCard
          title={"Shipping Options"}
          subtitle={
            "Enter specifics about available regional shipment methods."
          }
          target={"region_id"}
          reference={"shipping_option"}
          filter={{ is_return: false }}
          record={record}
          currncy={currncy}
        />

        <ShippingOptionCard
          title={"Return Shipping Options"}
          subtitle={
            "Enter specifics about available regional return shipment methods."
          }
          target={"region_id"}
          reference={"shipping_option"}
          filter={{ is_return: true }}
          record={record}
          currncy={currncy}
        />
      </Stack>
    </SimpleShowLayout>
  );
}

const ShippingOptionCard = (props) => {
  const { title, subtitle, target, reference, filter, record, currncy } = props;
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
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
        marginTop={"0px !important"}
      >
        <Stack>
          <Typography
            sx={{
              fontSize: { sm: "23px", md: "23px", xs: "20px" },
              fontWeight: "600",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: { sm: "14px", md: "13px", xs: "14px" },
              fontWeight: "300",
              color: "#6b7280",
            }}
          >
            {subtitle}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          {/* <StatusField source="has_account" label="Registered" /> */}
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <ReferenceManyField
          reference={reference}
          target={target}
          filter={filter}

          // record={props}
        >
          <WithListContext
            render={({ isLoading, data }) => {
              // console.log(data);
              return (
                !isLoading &&
                data.flatMap((shipping_option) => (
                  <Stack
                    className="stat-card"
                    paddingY={2}
                    paddingX={2}
                    overflow={"auto"}
                    width={"100%"}
                    direction={"row"}
                    borderRadius={2}
                    border={"2px solid rgba(228, 228, 231, 1)"}
                    spacing={1}
                    justifyContent={"start"}
                    // onClick={() => {
                    //   redirect("show", "region", id);
                    // }}
                  >
                    <Stack
                      justifyContent={"center"}
                      alignItems={"center"}
                      backgroundColor={"rgba(243, 244, 246, 1)"}
                      paddingX={1}
                      borderRadius={2}
                    >
                      <LocalShipping
                        sx={{
                          color: "rgba(107, 114, 128, 1)",
                        }}
                      />
                    </Stack>
                    <Stack justifyContent={"center"} alignItems={"stretch"}>
                      <Typography
                        sx={{
                          fontSize: "17px",
                          fontWeight: "600",
                          // textTransform: "capitalize",
                        }}
                      >
                        {shipping_option?.name}
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#8d9498" }}>
                        {`${shipping_option?.price_type}: ${formatPrice(
                          shipping_option?.amount
                        )} ${
                          currncy
                            ? currncy.find(
                                (c) =>
                                  c.code === record?.currency_code.toLowerCase()
                              )?.symbol
                            : ""
                        }
                         `}
                        {!isLarge
                          ? "- Min. Subtotal: N/A - Max. Subtotal: N/A "
                          : null}
                      </Typography>
                    </Stack>
                  </Stack>
                ))
              );
            }}
          />
        </ReferenceManyField>
      </Stack>
    </Stack>
  );
};
