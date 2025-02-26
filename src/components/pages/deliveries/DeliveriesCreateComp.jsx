/* eslint-disable react/prop-types */
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import differenceBy from "lodash/differenceBy";
import { useMemo } from "react";

import {
  SimpleForm,
  useTheme,
  Toolbar,
  SaveButton,
  useTranslate,
  Form,
  required,
  TextInput,
  DateInput,
  CheckboxGroupInput,
  useRedirect,
  useLogin,
  useNotify,
  useStore,
  email,
  minLength,
  maxLength,
  PasswordInput,
  SelectInput,
  useInput,
  AutocompleteInput,
  ReferenceInput,
  BooleanInput,
  ImageInput,
  ImageField,
  NumberInput,
  SimpleFormIterator,
  ArrayInput,
  FormDataConsumer,
  Labeled,
  TextField,
  Confirm,
  AutocompleteArrayInput,
  useGetIdentity,
  useRecordContext,
  ReferenceManyField,
  WithListContext,
  ReferenceArrayField,
  ReferenceManyCount,
  ReferenceField,
  FunctionField,
} from "react-admin";
import { useMediaQuery, Fab, CircularProgress } from "@mui/material";
import { useEffect, useState, Fragment } from "react";
import {
  Box,
  Button,
  Typography,
  CardActions,
  Stack,
  Card,
  Avatar,
} from "@mui/material";
import {
  MoreVert,
  MoreHoriz,
  LocalShipping,
  ShoppingCart,
} from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useWatch } from "react-hook-form";
import Medusa from "@medusajs/medusa-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createMultipartFormData } from "../../helpers/helpers";
import { supabase } from "../../../supabase/SupabaseConfig";
import { OrderSummary, PaymentSummary } from "../orders/OrderShowComp";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: `${
    theme && theme === "dark" ? "#222 !important" : "#fff !important"
  }`,
  width: "100%",
  borderRadius: "4px",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: `${theme && theme === "dark" ? "#222" : "#fff"}`,
  paddingBlock: "5px",
  color: `${theme && theme === "dark" ? "#fff" : "inherit"}`,
  borderBottom: `1px solid ${
    theme && theme === "dark"
      ? "rgba(244, 244, 244, .4)"
      : "rgba(0, 0, 0, .125)"
  }`,
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: `${theme && theme === "dark" ? "#fff" : "inherit"}`,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: 1,
    flexDirection: "column",

    "& .MuiTypography-root, p, span": {
      fontWeight: "500",
      fontSize: "16px !important",
    },
    "& .section_subtitle": {
      fontWeight: "300 !important",
      fontSize: "14px !important",
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  display: "flex",
  width: "-webkit-fill-available",
  borderBlock: "",
  justifyContent: "center",
  padding: "16px",
  borderBottom: `1px solid ${
    theme && theme === "dark"
      ? "rgba(244, 244, 244, .4)"
      : "rgba(0, 0, 0, .125)"
  }`,
  background: `${
    theme && theme === "dark"
      ? "#222 !important"
      : "var(--onyx-row-light) !important"
  }`,
  color: `${theme && theme === "dark" ? "#fff" : "inherit"}`,

  "& .MuiOutlinedInput-input": {
    // boxShadow: "0 2px 20px hsla(0, 0%, 0%, 0.06)",
    // borderRadius: "6px",
    // margin: "10px",
    // backgroundColor: "#fff",
    // color: "rgba(0, 0, 0, 0.87)",
    border: "none",
    background: `${
      theme && theme === "dark" ? "#222 !important" : "transparent !important"
    }`,
    color: `${theme && theme === "dark" ? "#fff" : "inherit"}`,
    boxShadow: "none",
  },
}));

export const SaveToolbar = (props) => {
  const { type, product } = props;
  const [theme, setTheme] = useTheme();
  const translate = useTranslate();
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const record = useRecordContext();
  const identity = useGetIdentity();
  const [Thumb_data, setThumb_data] = useState(null);
  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });
  const { reset } = useFormContext();
  const form = useWatch();
  const redirect = useRedirect();

  const onSuccess = (data) => {
    toast.success(`Request ${type === "edit" ? "updated" : "created"}!`);
    reset();
    redirect("/pickup_requests");
  };

  const onError = (error) => {
    toast.error(error.message);
  };

  const transformData = (data) => {
    delete data.orders;
    // console.log(identity?.data?.medusa_user?.id);
    return {
      ...data,
      vendor_id:
        record && record.vendor_id
          ? record.vendor_id
          : identity?.data?.medusa_user?.id,
    };
  };

  return (
    <Toolbar
      sx={{
        justifyContent: "flex-end",
        gap: "10px",
        //   flexDirection: "column",
        backgroundColor: `${
          theme && theme === "dark"
            ? isSmall
              ? "transparent"
              : "#222 !important"
            : "#fff !important"
        }`,
      }}
    >
      <SaveButton
        label={type && type === "edit" ? "Update Request" : "Create Request"}
        alwaysEnable
        disabled
        variant="contained"
        type="button"
        color="primary"
        // disabled={loading}
        // fullWidth
        icon={false}
        style={{
          padding: "5px 40px",
        }}
        transform={transformData}
        mutationOptions={{ onSuccess, onError }}

        // sx={{ display: "none" }}
      />

      {/* <Button
        variant="contained"
        type="button"
        color="primary"
        
        style={{
          padding: "5px 45px",
        }}
        
        onClick={(e) => {
          handleSubmit({
            ...form,
            countries: form.countries.map((country) => country.toUpperCase()),
          });
        }}
      >
        {loading && <CircularProgress size={25} thickness={2} />}
        {type && type === "edit" ? translate("Update") : translate("Create")}
      </Button> */}
    </Toolbar>
  );
};

const CreateAccordions = (props) => {
  const { createSection, index, expanded, handleChange } = props;
  const [theme, setTheme] = useTheme();

  return (
    <Accordion
      expanded={expanded === `panel${index}`}
      onChange={handleChange(`panel${index}`)}
    >
      <AccordionSummary
        aria-controls={`panel${index}d-content`}
        id={`panel${index}d-header`}
        theme={theme}
      >
        <Typography>{createSection?.summaryTitle}</Typography>
        <Typography className="section_subtitle">
          {createSection?.summarySubTitle}
        </Typography>
      </AccordionSummary>
      <AccordionDetails theme={theme}>{createSection?.body}</AccordionDetails>
    </Accordion>
  );
};

function NestedOrderInput(props) {
  const {
    getSource,
    scopedFormData,
    formData,
    fulfil_prov_list,
    ship_prof_list,
    is_return,
    refetch,
    currncy,
  } = props;
  const { setValue } = useFormContext(); // retrieve all hook methods
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [theme, setTheme] = useTheme();
  const [inner_expanded, setInnerExpanded] = React.useState("panel0");
  const [order_full, setOrder_full] = React.useState(null);
  const handleInnerChange = (panel) => (event, newExpanded) => {
    setInnerExpanded(newExpanded ? panel : false);
  };
  const price_type = useWatch({ name: getSource("price_type") });
  const form = useWatch();
  function formatPrice(price) {
    return parseFloat(price / 100).toFixed(2);
  }
  const redirect = useRedirect();
  const record = useRecordContext();
  const identity = useGetIdentity();
  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });

  useEffect(() => {
    if (scopedFormData && scopedFormData.id) {
      medusa.admin.orders.retrieve(scopedFormData.id).then(({ order }) => {
        // console.log(order);
        setOrder_full({ ...scopedFormData, ...order });
      });
    }
  }, []);

  useEffect(() => {
    // console.log(scopedFormData);
  }, [scopedFormData]);
  const createVariantSections = [
    {
      summaryTitle: "General",
      summarySubTitle: "Configure the general information for this order.",
      body: (
        <Stack width={"-webkit-fill-available"}>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            marginTop={"10px"}
          >
            {order_full ? (
              <OrderSummary
                order={order_full}
                currncy={currncy}
                record={scopedFormData}
                sx={{ width: "-webkit-fill-available" }}
              />
            ) : (
              <CircularProgress size={25} thickness={2} />
            )}
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Confirmations",
      summarySubTitle: "Necessary confirmations before pickup",
      body: (
        <Stack maxWidth={"-webkit-fill-available"}>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            marginTop={"10px"}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
              marginTop={"10px"}
              width={"-webkit-fill-available"}
            >
              {order_full ? (
                <PaymentSummary
                  order={order_full}
                  currncy={currncy}
                  record={scopedFormData}
                  sx={{ width: "-webkit-fill-available" }}
                />
              ) : (
                <CircularProgress size={25} thickness={2} />
              )}
            </Stack>

            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
            >
              <Stack
                direction="row"
                spacing={2}
                maxWidth={"webkit-fill-available"}
                margin={2}
                // justifyContent="space-around"
                justifyContent={{
                  md: "center",
                  lg: "center",
                  sm: "space-around",
                }}
              >
                <Stack
                  direction="column"
                  justifyContent={{ md: "start", lg: "center" }}
                  // marginX={2}
                  // width={'webkit-fill-available'}
                >
                  <Typography className="input_title">Payment</Typography>
                  <Typography className="section_subtitle">
                    Check to confirm that you have recieved payment for the
                    order in your wallet.
                  </Typography>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent={"center"}
                  alignItems={"center"}
                  // marginX={{ lg: "42px" }}
                  // padding={2}
                >
                  <BooleanInput
                    label=""
                    source={getSource("confirm_payment")}
                    record={scopedFormData}
                    helperText={false}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            marginTop={"10px"}
          >
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
            >
              <Stack
                direction="row"
                spacing={2}
                maxWidth={"webkit-fill-available"}
                margin={2}
                // justifyContent="space-around"
                justifyContent={{
                  md: "center",
                  lg: "center",
                  sm: "space-around",
                }}
              >
                <Stack
                  direction="column"
                  justifyContent={{ md: "start", lg: "center" }}
                  // marginX={2}
                  // width={'webkit-fill-available'}
                >
                  <Typography className="input_title">Processing</Typography>
                  <Typography className="section_subtitle">
                    Check to confirm that you have processed this order and made
                    available all the items listed.
                  </Typography>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent={"center"}
                  alignItems={"center"}
                  // marginX={{ lg: "42px" }}
                  // padding={2}
                >
                  <BooleanInput
                    label=""
                    source={getSource("confirm_processing")}
                    record={scopedFormData}
                    helperText={false}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            marginTop={"10px"}
          >
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
            >
              <Stack
                direction="row"
                spacing={2}
                maxWidth={"webkit-fill-available"}
                margin={2}
                // justifyContent="space-around"
                justifyContent={{
                  md: "center",
                  lg: "center",
                  sm: "space-around",
                }}
              >
                <Stack
                  direction="column"
                  justifyContent={{ md: "start", lg: "center" }}
                  // marginX={2}
                  // width={'webkit-fill-available'}
                >
                  <Typography className="input_title">Packaging</Typography>
                  <Typography className="section_subtitle">
                    Check to confirm that you have at least, packaged this order
                    in a manner that ensures safety and delivery in optimal
                    condition.
                  </Typography>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent={"center"}
                  alignItems={"center"}
                  // marginX={{ lg: "42px" }}
                  // padding={2}
                >
                  <BooleanInput
                    label=""
                    source={getSource("confirm_packaging")}
                    record={scopedFormData}
                    helperText={false}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
  ];

  return (
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
      justifyContent={"space-between"}
      // onClick={() => {
      //   redirect("show", "region", id);
      // }}
    >
      <Stack direction={"row"} spacing={2}>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"rgba(243, 244, 246, 1)"}
          paddingX={1}
          borderRadius={2}
        >
          <ShoppingCart
            sx={{
              color: "rgba(107, 114, 128, 1)",
            }}
          />
        </Stack>
        <Stack justifyContent={"center"} alignItems={"stretch"}>
          <Typography
            sx={{
              fontSize: { md: "17px", sm: "15px", xs: "13px" },
              fontWeight: "600",
              // textTransform: "capitalize",
            }}
          >
            {`Order #${scopedFormData?.display_id} - `}

            <ReferenceField
              reference="cart"
              source="cart_id"
              record={scopedFormData}
            >
              <ReferenceField reference="payment" source="payment_id">
                <FunctionField
                  source="amount"
                  sx={{
                    fontSize: { md: "17px", sm: "15px", xs: "13px" },
                    fontWeight: "600",
                    // textTransform: "capitalize",
                  }}
                  render={(record) => `${formatPrice(record.amount)}`}
                />
              </ReferenceField>
            </ReferenceField>
            {` ${scopedFormData?.currency_code.toUpperCase()}`}
          </Typography>
          {/* <Labeled label={'Name'}>
            <TextField source={getSource("name")} record={scopedFormData} />{" "}
          </Labeled> */}
          <Typography
            sx={{
              fontSize: { md: "14px", sm: "13px", xs: "12px" },
              color: "#8d9498",
            }}
          >
            {`Payment: ${scopedFormData?.payment_status} - Items: `}
            <ReferenceManyCount
              reference="line_item"
              source="cart_id"
              target="cart_id"
              record={scopedFormData}
            />
            {!isLarge ? `` : null}
          </Typography>
        </Stack>
      </Stack>
      <span>
        <Button
          sx={{ minWidth: "fit-content" }}
          onClick={() => {
            // console.log(scopedFormData["variant_open"]);
            setValue(getSource("variant_open"), true);
            // console.log(scopedFormData["variant_open"]);
          }}
        >
          <MoreVert fontSize="medium" />
        </Button>
      </span>
      <BooleanInput
        sx={{ display: "none" }}
        source={getSource("variant_open")}
        record={scopedFormData}
        onChange={(e) => {
          // console.log(getSource("variant_open"));
          // console.log(scopedFormData);
        }}
      />
      <Dialog
        open={
          scopedFormData && scopedFormData["variant_open"]
            ? scopedFormData["variant_open"]
            : false
        }
        onClose={() => {
          setValue(getSource("variant_open"), false);
        }}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen={fullScreen}
        fullWidth={true}
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            color: `${
              theme && theme === "dark" ? "#8D9498" : "rgba(0, 0, 0, .87)"
            }`,

            fontFamily: "Rubik !important",
            fontWeight: "500",
            fontSize: "24px",
          }}
        >
          {scopedFormData &&
            scopedFormData.display_id &&
            `Order #${scopedFormData.display_id} `}
        </DialogTitle>
        <DialogContent dividers={"paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              backgroundColor: `${theme && theme === "dark" ? "#222" : "#fff"}`,
              // "& .MuiCard-root": {
              //   backgroundColor: `${theme && theme === "dark" ? "#222" : "#fff"}`,
              // },
              fontFamily: "Rubik !important",
              "& .MuiTypography-root, p, span": {
                fontFamily: "Rubik !important",
                //   fontSize: "13px !important",
              },

              "& .section_subtitle": {
                color: `${theme && theme === "dark" ? "#8D9498" : "#6b7280"}`,
                fontSize: "14px !important",
              },
              "& .input_title": {
                fontWeight: "500",
                fontSize: "14px !important",
              },
            }}
          >
            {createVariantSections.map((createSection, index) => {
              return (
                <CreateAccordions
                  createSection={createSection}
                  index={index}
                  key={index}
                  expanded={inner_expanded}
                  handleChange={handleInnerChange}
                />
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setValue(getSource("variant_open"), false);
            }}
          >
            Cancel
          </Button>
          {scopedFormData && scopedFormData.id && (
            <Button
              onClick={() => {
                setValue(
                  "order_ids",
                  form.order_ids?.filter((ord) => ord !== scopedFormData.id)
                );
              }}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={() => {
              setValue(getSource("variant_open"), false);
            }}
          >
            Save and Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

const OrderList = ({ currncy, setRegionID, setDestRegionID }) => {
  const { setValue } = useFormContext(); // retrieve all hook methods
  const record = useRecordContext();
  const formdata = useWatch();
  const region_id = useWatch({ name: "region_id" });
  const dest_region_id = useWatch({ name: "dest_region_id" });
  if (region_id) {
    setRegionID(region_id);
  }
  if (dest_region_id) {
    setDestRegionID(dest_region_id);
  }

  return (
    <ReferenceArrayField
      label="Orders"
      reference="order"
      source="order_ids"
      record={formdata}
    >
      <WithListContext
        render={({ isLoading, data, refetch }) => {
          if (data.length && !formdata.orders?.length) {
            setValue("orders", data);
          } else if (data.length && formdata.orders && formdata.orders.length) {
            if (differenceBy(data, formdata.orders, "id").length) {
              setValue(
                "orders",
                formdata.orders.concat(
                  differenceBy(data, formdata.orders, "id")
                )
              );
            } else if (differenceBy(formdata.orders, data, "id").length) {
              setValue("orders", data);
            }
          } else if (
            !data.length &&
            formdata.orders &&
            formdata.orders.length
          ) {
            setValue("orders", []);
          }

          return (
            !isLoading && (
              <ArrayInput
                source="orders"
                fullWidth
                // defaultValue={data}
                // record={data}
              >
                <SimpleFormIterator
                  inline
                  disableAdd
                  sx={
                    {
                      // gap: "10px",
                      // flexWrap: `${isMedium ? "nowrap" : "wrap"}`,
                    }
                  }
                >
                  <FormDataConsumer>
                    {({ scopedFormData, formData, getSource }) => {
                      // console.log(scopedFormData);
                      return (
                        <NestedOrderInput
                          scopedFormData={scopedFormData}
                          getSource={getSource}
                          formData={formData}
                          // ship_prof_list={ship_prof_list}
                          // fulfil_prov_list={fulfil_prov_list}
                          refetch={refetch}
                          currncy={currncy}
                        />
                      );
                    }}
                  </FormDataConsumer>
                </SimpleFormIterator>
              </ArrayInput>
            )
          );
        }}
      />
    </ReferenceArrayField>
  );
};

export default function DeliveriesCreateComp(props) {
  const { type } = props;
  const [expanded, setExpanded] = React.useState("panel0");
  const [theme, setTheme] = useTheme();
  const options = [];
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const record = useRecordContext();
  const [currncs, setCurrncs] = useState(null);
  const [currncy, setCurrncy] = useState(null);
  const [countryList, setCountryList] = useState(null);
  const [pay_prov_list, setPay_prov_list] = useState(null);
  const [fulfil_prov_list, setFulfil_prov_list] = useState(null);
  const [ship_prof_list, setShip_prof_list] = useState(null);
  const [my_pay_prov_list, setMyPay_prov_list] = useState(null);
  const [my_fulfil_prov_list, setMyFulfil_prov_list] = useState(null);
  const [regionIds, setRegionIds] = useState(null);
  const [logOrgs, setLogOrgs] = useState(null);
  const [orders, setOrders] = useState(null);
  const [regionID, setRegionID] = useState(null);
  const [dest_regionID, setDestRegionID] = useState(null);
  const [ordersState, setOrdersState] = useState(null);
  const identity = useGetIdentity();
  const [product, setDeliveries] = React.useState(null);
  const temp_coll = React.useRef(null);
  const temp_coll2 = React.useRef(null);
  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (regionID) {
        temp_coll.current = await collection_station_states;
      }
      if (dest_regionID) {
        temp_coll2.current = await dest_collection_station_states;
      }
    };
    fetchData();
  }, [regionID, dest_regionID]);

  async function fetchCollectionStationStates(region_id) {
    try {
      let { data, error } = await supabase
        .from("collection_station_states")
        .select(
          "state (*), region (*), logistics_orgs (*), collection_stations (*)"
        )
        .eq("region_id", region_id);

      return Promise.resolve(data);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  const collection_station_states = useMemo(
    () => fetchCollectionStationStates(regionID),
    [regionID]
  );

  const dest_collection_station_states = useMemo(
    () => fetchCollectionStationStates(dest_regionID),
    [dest_regionID]
  );

  useEffect(() => {
    async function fetchCountryObj() {
      try {
        let { data: country, error } = await supabase
          .from("country")
          .select("*");
        // .eq("code", record?.currency_code)
        // .maybeSingle();

        setCountryList(country);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchCountryObj();
  }, []);

  useEffect(() => {
    async function fetchCurrencyObj() {
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

    fetchCurrencyObj();
  }, []);

  // useEffect(() => {
  //   async function fetchStoreCurrncs() {
  //     if (identity?.data?.medusa_store) {
  //       try {
  //         let { data: store_currencies, error } = await supabase
  //           .from("store_currencies")
  //           .select("*")
  //           .eq("store_id", identity?.data?.medusa_store?.id);
  //         // .maybeSingle();
  //         setCurrncs(store_currencies);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   }

  //   fetchStoreCurrncs();
  // }, [identity]);

  // useEffect(() => {
  //   async function fetchMyPayProvs() {
  //     if (identity?.data?.medusa_store && record && record.id) {
  //       try {
  //         let { data: region_payment_providers, error } = await supabase
  //           .from("region_payment_providers")
  //           .select("*");
  //         // .maybeSingle();
  //         setMyPay_prov_list(region_payment_providers);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   }

  //   async function fetchMyFulfilProvs() {
  //     if (identity?.data?.medusa_store && record && record.id) {
  //       try {
  //         let { data: region_fulfillment_providers, error } = await supabase
  //           .from("region_fulfillment_providers")
  //           .select("*")
  //           .eq("region_id", record?.id);
  //         // .maybeSingle();
  //         setMyFulfil_prov_list(region_fulfillment_providers);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   }

  //   fetchMyPayProvs();
  //   fetchMyFulfilProvs();
  // }, [identity]);

  useEffect(() => {
    async function fetchPayProvs() {
      try {
        let { data: payment_provider, error } = await supabase
          .from("payment_provider")
          .select("*");
        // .maybeSingle();
        setPay_prov_list(payment_provider);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function fetchFulfilProvs() {
      try {
        let { data: fulfillment_provider, error } = await supabase
          .from("fulfillment_provider")
          .select("*");
        // .maybeSingle();
        setFulfil_prov_list(fulfillment_provider);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function fetchShipProfs() {
      try {
        let { data: shipping_profile, error } = await supabase
          .from("shipping_profile")
          .select("*");
        // .maybeSingle();
        setShip_prof_list(shipping_profile);
      } catch (error) {
        console.log(error.message);
      }
    }
    async function fetchRegions() {
      try {
        let { data: logistics_org_regions, error } = await supabase
          .from("logistics_org_regions")
          .select("*");
        // .eq("logistics_org_id", record?.id)
        // .maybeSingle();

        // console.log(logistics_org_regions);
        setRegionIds(logistics_org_regions);
      } catch (error) {
        console.log(error.message);
      }
    }
    async function fetchLogOrgs() {
      try {
        let { data: logistics_orgs, error } = await supabase
          .from("logistics_orgs")
          .select("*");
        // .eq("logistics_org_id", record?.id)
        // .maybeSingle();

        // console.log(logistics_org_regions);
        setLogOrgs(logistics_orgs);
      } catch (error) {
        console.log(error.message);
      }
    }
    async function fetchOrders() {
      if (
        identity &&
        identity.data &&
        identity.data.medusa_store &&
        identity.data.medusa_store.id
      ) {
      }
      try {
        let { data: orders, error } = await supabase
          .from("order")
          .select("*")
          .eq("store_id", identity.data.medusa_store.id);
          
        // .maybeSingle();

        // console.log(logistics_org_regions);
        setOrders(orders);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchOrders();
    fetchLogOrgs();
    fetchRegions();
    // fetchShipProfs();
    // fetchPayProvs();
    // fetchFulfilProvs();
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // useEffect(() => {
  //   if (record) {
  //     medusa.admin.products.retrieve(record.id).then(({ product }) => {
  //       // console.log(product);
  //       setDeliveries(product);
  //     });
  //   }
  // }, [record]);

  useEffect(() => {
    if (product) {
      // console.log(product);
    }
  }, [product]);

  const OptionRenderer = () => {
    const record = useRecordContext();
    return (
      <span style={{ textTransform: "capitalize" }}>
        {/* <img src={record.avatar} /> */}
        {record.make} {record.model} {record.color}{" "}
        {record.licence_plate_number}
      </span>
    );
  };

  const optionText = <OptionRenderer />;
  const inputText = (choice) =>
    `${choice.make} ${choice.model} ${choice.color} ${choice.licence_plate_number}`;
  const matchSuggestion = (filter, choice) => {
    return (
      choice.make.toLowerCase().includes(filter.toLowerCase()) ||
      choice.model.toLowerCase().includes(filter.toLowerCase()) ||
      choice.color.toLowerCase().includes(filter.toLowerCase()) ||
      choice.license_plate_number.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const createSections = [
    {
      summaryTitle: "General Info",
      summarySubTitle: "Add/Update the basic information for this request",
      body: (
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          marginTop={"10px"}
        >
          <Stack
            width={"-webkit-fill-available"}
            maxWidth={{ lg: "60vw", md: "70vw", sm: "80vw", xs: "90vw" }}
            overflow={"hidden"}
            direction={"row"}
            margin={0}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
          >
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"200px"}
            >
              <Typography className="input_title">Region</Typography>
              <ReferenceInput source="region_id" reference="region">
                <AutocompleteInput optionText="name" optionValue="id" />
              </ReferenceInput>
            </Stack>
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"200px"}
            >
              <Typography className="input_title">Logistics Org</Typography>
              <FormDataConsumer>
                {({ scopedFormData, formData, getSource }) => {
                  // console.log(scopedFormData);
                  return (
                    <AutocompleteInput
                      optionText="name"
                      optionValue="id"
                      source="logistics_org_id"
                      defaultValue={record && record.order_ids}
                      choices={
                        regionIds && logOrgs && formData.region_id
                          ? regionIds
                              .filter((reg) => {
                                return reg.region_id === formData.region_id;
                              })
                              .map((reg_data) => {
                                return {
                                  id: reg_data.logistics_org_id,
                                  name: logOrgs.find(
                                    (log_org) =>
                                      log_org.id === reg_data.logistics_org_id
                                  ).name,
                                };
                              })
                          : []
                      }
                    />
                  );
                }}
              </FormDataConsumer>
            </Stack>
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"200px"}
            >
              <Typography className="input_title">Shipping Option</Typography>
              <FormDataConsumer>
                {({ scopedFormData, formData, getSource }) => {
                  // console.log(formData);
                  return (
                    <ReferenceInput
                      source="shipping_option"
                      reference="shipping_option"
                      filter={{ region_id: formData.region_id }}
                    >
                      <AutocompleteInput optionText="name" optionValue="id" />
                    </ReferenceInput>
                  );
                }}
              </FormDataConsumer>
            </Stack>
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"200px"}
            >
              <Typography className="input_title">Type</Typography>
              <FormDataConsumer>
                {({ scopedFormData, formData, getSource }) => {
                  // console.log(formData);
                  return (
                    <AutocompleteInput
                      optionText="name"
                      optionValue="id"
                      source="type"
                      defaultValue={record && record.state}
                      choices={[
                        { id: "intra_state", name: "Intra State" },
                        { id: "inter_state", name: "Inter State" },
                        { id: "international", name: "International" },
                      ]}
                    />
                  );
                }}
              </FormDataConsumer>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Route Info",
      summarySubTitle: "Specify the origin & destination of this delivery",
      body: (
        <FormDataConsumer>
          {({ scopedFormData, formData, getSource }) => {
            // console.log(formData);
            return (
              <Stack
                direction={"row"}
                justifyContent={"space-around"}
                flexWrap={"wrap"}
                marginTop={"10px"}
              >
                <Stack
                  width={"-webkit-fill-available"}
                  maxWidth={{ lg: "60vw", md: "70vw", sm: "80vw", xs: "90vw" }}
                  overflow={"hidden"}
                  direction={"row"}
                  margin={0}
                  justifyContent={"space-around"}
                  flexWrap={"wrap"}
                >
                  <Stack
                    spacing={2}
                    padding={{ md: 3, sm: 2, xs: 0 }}
                    paddingX={{ md: "16px !important" }}
                    paddingBottom={{ md: "0px !important" }}
                    width={{ lg: "50%", md: "45%", xs: "100%" }}
                    minWidth={"200px"}
                  >
                    <Typography className="input_title">
                      Origin State
                    </Typography>
                    <AutocompleteInput
                      optionText="name"
                      optionValue="id"
                      source="origin_state"
                      defaultValue={record && record.state}
                      choices={
                        temp_coll &&
                        temp_coll.current &&
                        temp_coll.current.length
                          ? temp_coll.current.map((coll_st_data) => {
                              return {
                                id: coll_st_data.state.id,
                                name: coll_st_data.state.state,
                              };
                            })
                          : []
                      }
                    />
                  </Stack>
                  <Stack
                    spacing={2}
                    padding={{ md: 3, sm: 2, xs: 0 }}
                    paddingX={{ md: "16px !important" }}
                    paddingBottom={{ md: "0px !important" }}
                    width={{ lg: "50%", md: "45%", xs: "100%" }}
                    minWidth={"200px"}
                  >
                    <Typography className="input_title">
                      Origin Collection Station
                    </Typography>
                    <ReferenceInput
                      source="origin_collection_station_id"
                      reference="collection_stations"
                      filter={{ region_id: formData.region_id }}
                    >
                      <AutocompleteInput optionText="name" optionValue="id" />
                    </ReferenceInput>
                  </Stack>
                  {
                    {
                      intra_state: (
                        <Fragment>
                          <Stack
                            spacing={2}
                            padding={{ md: 3, sm: 2, xs: 0 }}
                            paddingX={{ md: "16px !important" }}
                            paddingBottom={{ md: "0px !important" }}
                            width={{ lg: "100%", md: "45%", xs: "100%" }}
                            minWidth={"200px"}
                          >
                            <Typography className="input_title">
                              Dest. Collection Station
                            </Typography>
                            <FormDataConsumer>
                              {({ scopedFormData, formData, getSource }) => {
                                // console.log(formData);
                                return (
                                  <ReferenceInput
                                    source="dest_collection_station_id"
                                    reference="collection_stations"
                                    filter={{
                                      region_id: formData.region_id,
                                    }}
                                  >
                                    <AutocompleteInput
                                      optionText="name"
                                      optionValue="id"
                                    />
                                  </ReferenceInput>
                                );
                              }}
                            </FormDataConsumer>
                          </Stack>
                        </Fragment>
                      ),
                      inter_state: (
                        <Fragment>
                          <Stack
                            spacing={2}
                            padding={{ md: 3, sm: 2, xs: 0 }}
                            paddingX={{ md: "16px !important" }}
                            paddingBottom={{ md: "0px !important" }}
                            width={{ lg: "50%", md: "45%", xs: "100%" }}
                            minWidth={"200px"}
                          >
                            <Typography className="input_title">
                              Dest. State
                            </Typography>
                            <AutocompleteInput
                              optionText="name"
                              optionValue="id"
                              source="dest_state"
                              defaultValue={record && record.state}
                              choices={
                                temp_coll2 &&
                                temp_coll2.current &&
                                temp_coll2.current.length
                                  ? temp_coll2.current.map((coll_st_data) => {
                                      return {
                                        id: coll_st_data.state.id,
                                        name: coll_st_data.state.state,
                                      };
                                    })
                                  : []
                              }
                            />
                          </Stack>
                          <Stack
                            spacing={2}
                            padding={{ md: 3, sm: 2, xs: 0 }}
                            paddingX={{ md: "16px !important" }}
                            paddingBottom={{ md: "0px !important" }}
                            width={{ lg: "50%", md: "45%", xs: "100%" }}
                            minWidth={"200px"}
                          >
                            <Typography className="input_title">
                              Dest. Collection Station
                            </Typography>
                            <FormDataConsumer>
                              {({ scopedFormData, formData, getSource }) => {
                                // console.log(formData);
                                return (
                                  <ReferenceInput
                                    source="dest_collection_station_id"
                                    reference="collection_stations"
                                    filter={{
                                      region_id: formData.region_id,
                                    }}
                                  >
                                    <AutocompleteInput
                                      optionText="name"
                                      optionValue="id"
                                    />
                                  </ReferenceInput>
                                );
                              }}
                            </FormDataConsumer>
                          </Stack>
                        </Fragment>
                      ),
                      international: (
                        <Fragment>
                          <Stack
                            spacing={2}
                            padding={{ md: 3, sm: 2, xs: 0 }}
                            paddingX={{ md: "16px !important" }}
                            paddingBottom={{ md: "0px !important" }}
                            width={{ lg: "100%", md: "45%", xs: "100%" }}
                            minWidth={"200px"}
                          >
                            <Typography className="input_title">
                              Dest. Region
                            </Typography>
                            <ReferenceInput
                              source="dest_region_id"
                              reference="region"
                              filter={{ "id@neq": formData.region_id }}
                            >
                              <AutocompleteInput
                                optionText="name"
                                optionValue="id"
                              />
                            </ReferenceInput>
                          </Stack>
                          <Stack
                            spacing={2}
                            padding={{ md: 3, sm: 2, xs: 0 }}
                            paddingX={{ md: "16px !important" }}
                            paddingBottom={{ md: "0px !important" }}
                            width={{ lg: "50%", md: "45%", xs: "100%" }}
                            minWidth={"200px"}
                          >
                            <Typography className="input_title">
                              Dest. State
                            </Typography>
                            <AutocompleteInput
                              optionText="name"
                              optionValue="id"
                              source="dest_state"
                              defaultValue={record && record.state}
                              choices={
                                temp_coll2 &&
                                temp_coll2.current &&
                                temp_coll2.current.length
                                  ? temp_coll2.current.map((coll_st_data) => {
                                      return {
                                        id: coll_st_data.state.id,
                                        name: coll_st_data.state.state,
                                      };
                                    })
                                  : []
                              }
                            />
                          </Stack>
                          <Stack
                            spacing={2}
                            padding={{ md: 3, sm: 2, xs: 0 }}
                            paddingX={{ md: "16px !important" }}
                            paddingBottom={{ md: "0px !important" }}
                            width={{ lg: "50%", md: "45%", xs: "100%" }}
                            minWidth={"200px"}
                          >
                            <Typography className="input_title">
                              Dest. Collection Station
                            </Typography>
                            <FormDataConsumer>
                              {({ scopedFormData, formData, getSource }) => {
                                // console.log(formData);
                                return (
                                  <ReferenceInput
                                    source="dest_collection_station_id"
                                    reference="collection_stations"
                                    filter={{
                                      region_id: formData.dest_region_id,
                                    }}
                                  >
                                    <AutocompleteInput
                                      optionText="name"
                                      optionValue="id"
                                    />
                                  </ReferenceInput>
                                );
                              }}
                            </FormDataConsumer>
                          </Stack>
                        </Fragment>
                      ),
                    }[formData.type]
                  }
                  {/* {formData &&
                    (formData.type === "inter_state" ||
                      formData.type === "international") && (
                      <Fragment>
                        <Stack
                          spacing={2}
                          padding={{ md: 3, sm: 2, xs: 0 }}
                          paddingX={{ md: "16px !important" }}
                          paddingBottom={{ md: "0px !important" }}
                          width={{ lg: "100%", md: "45%", xs: "100%" }}
                          minWidth={"200px"}
                        >
                          <Typography className="input_title">
                            Dest. Region
                          </Typography>
                          <ReferenceInput
                            source="dest_region_id"
                            reference="region"
                            filter={{ "id@eq": formData.region_id }}
                          >
                            <AutocompleteInput
                              optionText="name"
                              optionValue="id"
                            />
                          </ReferenceInput>
                        </Stack>
                        <Stack
                          spacing={2}
                          padding={{ md: 3, sm: 2, xs: 0 }}
                          paddingX={{ md: "16px !important" }}
                          paddingBottom={{ md: "0px !important" }}
                          width={{ lg: "50%", md: "45%", xs: "100%" }}
                          minWidth={"200px"}
                        >
                          <Typography className="input_title">
                            Dest. State
                          </Typography>
                          <AutocompleteInput
                            optionText="name"
                            optionValue="id"
                            source="dest_state"
                            defaultValue={record && record.state}
                            choices={
                              temp_coll2 &&
                              temp_coll2.current &&
                              temp_coll2.current.length
                                ? temp_coll2.current.map((coll_st_data) => {
                                    return {
                                      id: coll_st_data.state.id,
                                      name: coll_st_data.state.state,
                                    };
                                  })
                                : []
                            }
                          />
                        </Stack>
                        <Stack
                          spacing={2}
                          padding={{ md: 3, sm: 2, xs: 0 }}
                          paddingX={{ md: "16px !important" }}
                          paddingBottom={{ md: "0px !important" }}
                          width={{ lg: "50%", md: "45%", xs: "100%" }}
                          minWidth={"200px"}
                        >
                          <Typography className="input_title">
                            Dest. Collection Station
                          </Typography>
                          <FormDataConsumer>
                            {({ scopedFormData, formData, getSource }) => {
                              // console.log(formData);
                              return (
                                <ReferenceInput
                                  source="dest_collection_station_id"
                                  reference="collection_stations"
                                  filter={{
                                    region_id: formData.dest_region_id,
                                  }}
                                >
                                  <AutocompleteInput
                                    optionText="name"
                                    optionValue="id"
                                  />
                                </ReferenceInput>
                              );
                            }}
                          </FormDataConsumer>
                        </Stack>
                      </Fragment>
                    )} */}
                </Stack>
              </Stack>
            );
          }}
        </FormDataConsumer>
      ),
    },
    {
      summaryTitle: "Driver & Vehicle Info",
      summarySubTitle:
        "Add/Update the basic information about the driver and vehicle",
      body: (
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          marginTop={"10px"}
        >
          <Stack
            width={"-webkit-fill-available"}
            maxWidth={{ lg: "60vw", md: "70vw", sm: "80vw", xs: "90vw" }}
            overflow={"hidden"}
            direction={"row"}
            margin={0}
            // marginLeft={{lg: '15px', md: '20px'}}
            justifyContent={"start"}
            flexWrap={"wrap"}
          >
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "100%", md: "45%", xs: "100%" }}
              minWidth={"250px"}
            >
              <Typography className="input_title">Vehicle</Typography>
              <FormDataConsumer>
                {({ scopedFormData, formData, getSource }) => {
                  // console.log(formData);
                  return (
                    <ReferenceInput
                      source="vehicle"
                      reference="vehicles"
                      filter={{ logistics_org_id: formData.logistics_org_id }}
                    >
                      <AutocompleteInput
                        optionText={optionText}
                        inputText={inputText}
                        // matchSuggestion={matchSuggestion}
                        optionValue="id"
                      />
                    </ReferenceInput>
                  );
                }}
              </FormDataConsumer>
            </Stack>
          </Stack>
          <Stack
            width={"-webkit-fill-available"}
            maxWidth={{ lg: "60vw", md: "70vw", sm: "80vw", xs: "90vw" }}
            overflow={"hidden"}
            direction={"row"}
            margin={0}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
          >
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"200px"}
            >
              <Typography className="input_title">Driver</Typography>
              <FormDataConsumer>
                {({ scopedFormData, formData, getSource }) => {
                  // console.log(scopedFormData);
                  return (
                    <ReferenceInput
                      source="driver"
                      reference="staff"
                      filter={{
                        role: "driver",
                        org_id: formData.logistics_org_id,
                      }}
                    >
                      <AutocompleteInput optionText="name" optionValue="id" />
                    </ReferenceInput>
                  );
                }}
              </FormDataConsumer>
            </Stack>
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"200px"}
            >
              <Typography className="input_title">Supervisor</Typography>
              <FormDataConsumer>
                {({ scopedFormData, formData, getSource }) => {
                  // console.log(scopedFormData);
                  return (
                    <ReferenceInput
                      source="supervisor"
                      reference="staff"
                      filter={{
                        role: "admin",
                        org_id: formData.logistics_org_id,
                      }}
                    >
                      <AutocompleteInput optionText="name" optionValue="id" />
                    </ReferenceInput>
                  );
                }}
              </FormDataConsumer>
            </Stack>

            {/* <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ lg: "60vw", md: "70vw", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
              // marginLeft={{lg: '15px', md: '20px'}}
              justifyContent={"start"}
              flexWrap={"wrap"}
            >
              <Stack
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "100%", md: "45%", xs: "100%" }}
                minWidth={"250px"}
              >
                <Typography className="input_title">Order IDs</Typography>
                <FormDataConsumer>
                  {({ scopedFormData, formData, getSource }) => {
                    // console.log(formData);
                    return (
                      <AutocompleteArrayInput
                        fullWidth
                        variant="outlined"
                        source="order_ids"
                        label="Order IDs"
                        helperText="Specify orders to be picked up upon processing of this request."
                        defaultValue={
                          record && orders && orders.length && record.order_ids
                        }
                        choices={
                          orders && formData && formData.region_id
                            ? orders
                                .filter(
                                  (ord) => ord.region_id === formData.region_id
                                )
                                .map((order) => {
                                  return {
                                    id: order.id,
                                    name: order.display_id,
                                  };
                                })
                            : []
                        }
                        onChange={(value) => {
                          // console.log(value);
                        }}
                      />
                    );
                  }}
                </FormDataConsumer>
              </Stack>
            </Stack> */}
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Verify Order Info",
      summarySubTitle: "Confirm order details before submission.",
      body: (
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          marginTop={"10px"}
          // width={"-webkit-fill-available"}
        >
          <Stack
            width={"-webkit-fill-available"}
            maxWidth={{ lg: "80vw", md: "80vw", sm: "80vw", xs: "90vw" }}
            overflow={"hidden"}
            direction={"column"}
            margin={0}
            // marginLeft={{lg: '15px', md: '20px'}}
            // justifyContent={"start"}
            alignItems={"baseline"}
            flexWrap={"wrap"}
          >
            <Stack
              width={"-webkit-fill-available"}
              // maxWidth={{ lg: "60vw", md: "70vw", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
              // marginLeft={{lg: '15px', md: '20px'}}
              // justifyContent={"start"}
              justifyContent={"center"}
              flexWrap={"wrap"}
            >
              <Stack
                spacing={2}
                // padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important", sm: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={"79vw"}
                // minWidth={"250px"}
              >
                <Typography className="input_title">Order IDs</Typography>
                <FormDataConsumer>
                  {({ scopedFormData, formData, getSource }) => {
                    // console.log(formData);
                    return (
                      <AutocompleteArrayInput
                        fullWidth
                        variant="outlined"
                        source="order_ids"
                        label="Order IDs"
                        helperText="Specify orders to be picked up upon processing of this request."
                        defaultValue={
                          record && orders && orders.length && record.order_ids
                        }
                        choices={
                          orders && formData && formData.region_id
                            ? orders
                                .filter(
                                  (ord) => ord.region_id === formData.region_id
                                )
                                .map((order) => {
                                  return {
                                    id: order.id,
                                    name: order.display_id,
                                  };
                                })
                            : []
                        }
                        onChange={(value) => {
                          // console.log(value);
                        }}
                      />
                    );
                  }}
                </FormDataConsumer>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent={"center"}
              padding={{ md: "16px !important" }}
              sx={{
                "& .RaSimpleFormIterator-line, .ra-input": {
                  marginY: "10px",
                },
                // "& .MuiInputLabel-root, span": {
                //   fontSize: '18px',
                //   fontWeight: '500'
                // }
                "& .RaSimpleFormIterator-inline": {
                  alignItems: "center !important",
                  minWidth: { lg: "75vw", md: "70vw", sm: "75vw", xs: "80vw" },
                },
              }}
            >
              <OrderList
                currncy={currncy}
                setRegionID={setRegionID}
                setDestRegionID={setDestRegionID}
              />
            </Stack>
          </Stack>
        </Stack>
      ),
    },

    {
      summaryTitle: "Additional Info",
      summarySubTitle: "Add Additional Information about this request.",
      body: (
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          marginTop={"10px"}
          // width={"-webkit-fill-available"}
        >
          <Stack
            width={"-webkit-fill-available"}
            maxWidth={{ lg: "60vw", md: "70vw", sm: "80vw", xs: "90vw" }}
            overflow={"hidden"}
            direction={"row"}
            margin={0}
            // marginLeft={{lg: '15px', md: '20px'}}
            justifyContent={"start"}
            flexWrap={"wrap"}
          >
            <Stack
              direction="row"
              justifyContent={"start"}
              sx={{
                "& .RaSimpleFormIterator-line, .ra-input": {
                  marginY: "10px",
                },
                // "& .MuiInputLabel-root, span": {
                //   fontSize: '18px',
                //   fontWeight: '500'
                // }
                "& .RaSimpleFormIterator-inline": {
                  alignItems: "center !important",
                },
              }}
            >
              {/* <ArrayInput
                source="metadata"
                fullWidth
                defaultValue={record ? record?.metadata : null}
              >
                <SimpleFormIterator
                  inline
                  sx={
                    {
                      // gap: "10px",
                      // flexWrap: `${isMedium ? "nowrap" : "wrap"}`,
                    }
                  }
                >
                  <TextInput source="key" />
                  <TextInput source="value" />
                </SimpleFormIterator>
              </ArrayInput> */}
            </Stack>
          </Stack>
        </Stack>
      ),
    },
  ];

  return (
    <SimpleForm
      defaultValues={{
        metadata: record && record.metadata,
        order_ids: record && orders && orders.length && record.order_ids,
        vendor_id: record && record.vendor_id,
      }}
      toolbar={<SaveToolbar type={type} />}
      sx={{
        backgroundColor: `${theme && theme === "dark" ? "#222" : "#fff"}`,
        // "& .MuiCard-root": {
        //   backgroundColor: `${theme && theme === "dark" ? "#222" : "#fff"}`,
        // },
        fontFamily: "Rubik !important",
        "& .MuiTypography-root, p, span": {
          fontFamily: "Rubik !important",
          //   fontSize: "13px !important",
        },

        "& .section_subtitle": {
          color: `${theme && theme === "dark" ? "#8D9498" : "#6b7280"}`,
          fontSize: "14px !important",
        },
        "& .input_title": {
          fontWeight: "500",
          fontSize: "14px !important",
        },
      }}
    >
      {createSections.map((createSection, index) => {
        return (
          <CreateAccordions
            createSection={createSection}
            index={index}
            key={index}
            handleChange={handleChange}
            expanded={expanded}
          />
        );
      })}
    </SimpleForm>
  );
}
