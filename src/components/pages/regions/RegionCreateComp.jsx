/* eslint-disable react/prop-types */
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";

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
} from "react-admin";
import { useMediaQuery, Fab } from "@mui/material";
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
import { MoreVert, MoreHoriz, LocalShipping } from "@mui/icons-material";
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

  const form = useWatch();
  const redirect = useRedirect();

  const handleSubmit = async (data) => {
    if (!data.name) {
      toast.warning(`You need at least a name to create a region`);
      return;
    }

    if (type === "edit") {
      delete data.currency;
      delete data.id;
      delete data.created_at;
      delete data.updated_at;
      delete data.deleted_at;
      delete data.metadata;
      delete data.shipping_options;
      delete data.return_shipping_options;
      medusa.admin.regions
        .update(record?.id, {
          ...data,
          currency_code: "usd",
        })
        .then(({ region }) => {
          supabase
            .from("region")
            .update({ currency_code: data.currency_code })
            .eq("id", region.id)
            .select()
            .then(({ data: reg, error }) => {
              if (!error) {
                console.log(reg.id);
                toast.success("Region Updated");
                redirect("show", "region", record.id);
              } else {
                console.log(error.message);
                toast.error(`Region Create Error: ${error.message}`);
              }
            });
        })
        .catch((error) => {
          toast.error(`Region Updated Error: ${error.message}`);
        });
    } else {
      delete data.metadata;
      delete data.shipping_options;
      delete data.return_shipping_options;
      medusa.admin.regions
        .create({
          ...data,
          currency_code: "usd",
        })
        .then(({ region }) => {
          supabase
            .from("region")
            .update({ currency_code: data.currency_code })
            .eq("id", region.id)
            .select()
            .then(({ data: reg, error }) => {
              if (!error) {
                console.log(reg.id);
                toast.success("New Region Created");
                redirect("show", "region", record.id);
              } else {
                console.log(error.message);
                toast.error(`Region Create Error: ${error.message}`);
              }
            });
        })
        .catch((error) => {
          toast.error(`Region Create Error: ${error.message}`);
        });
    }
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
        label="Save that shit"
        type="button"
        alwaysEnable
        disabled
        sx={{ display: "none" }}
      />

      <Button
        variant="contained"
        type="button"
        color="primary"
        // disabled={loading}
        // fullWidth
        style={{
          padding: "5px 45px",
        }}
        // onClick={handleSubmit}
        onClick={(e) => {
          handleSubmit({
            ...form,
            countries: form.countries.map((country) => country.toUpperCase()),
          });
        }}
      >
        {/* {loading && <CircularProgress size={25} thickness={2} />} */}
        {type && type === "edit" ? translate("Update") : translate("Create")}
      </Button>
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

function NestedShippingOptionInput(props) {
  const {
    getSource,
    scopedFormData,
    formData,
    fulfil_prov_list,
    ship_prof_list,
    is_return,
    refetch,
  } = props;
  const { setValue } = useFormContext(); // retrieve all hook methods
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [theme, setTheme] = useTheme();
  const [inner_expanded, setInnerExpanded] = React.useState("panel0");
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
    console.log(scopedFormData);
  }, [scopedFormData]);
  const createVariantSections = [
    {
      summaryTitle: "General",
      summarySubTitle:
        "Configure the general information for this Shipping Option.",
      body: (
        <Stack maxWidth={"-webkit-fill-available"}>
          {/* <Stack direction="row" justifyContent={"start"}>
            <Typography className="section_subtitle">
              Configure the general information for this variant.
            </Typography>
          </Stack> */}
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            marginTop={"10px"}
          >
            {record && (
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
                  width="100%"
                  paddingX={fullScreen ? "initial" : 2}
                  // justifyContent="space-around"
                  justifyContent={{
                    md: "space-between",
                    lg: "space-between",
                    sm: "space-between",
                  }}
                >
                  <Stack
                    direction="column"
                    justifyContent={{ md: "start", lg: "center" }}
                    // marginX={2}
                    // width={'webkit-fill-available'}
                  >
                    <Typography className="input_title">
                      Fulfillment Method
                    </Typography>
                    <Typography className="section_subtitle">
                      {scopedFormData &&
                        scopedFormData.data &&
                        scopedFormData.data.id}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="column"
                    justifyContent={"center"}
                    alignItems={"center"}
                    // marginX={{ lg: "42px" }}
                    paddingX={4}
                  ></Stack>
                </Stack>
              </Stack>
            )}
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
                  <Typography className="input_title">
                    Visible in store
                  </Typography>
                  <Typography className="section_subtitle">
                    Enable or disable the shipping option visiblity in store.
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
                    source={getSource("visible")}
                    record={scopedFormData}
                    helperText={false}
                  />
                </Stack>
              </Stack>
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
                  <Typography className="input_title">
                    Admin Only
                  </Typography>
                  <Typography className="section_subtitle">
                    Enable or disable the option visiblity to admins.
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
                    source={getSource("admin_only")}
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
    {
      summaryTitle: "Details",
      summarySubTitle:
        "Configure to calculate the most accurate shipping rates.",
      body: (
        <Stack maxWidth={"-webkit-fill-available"}>
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
              justifyContent={"flex-start"}
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
                <Typography className="input_title">Title</Typography>
                <TextInput
                  fullWidth
                  variant="outlined"
                  source={getSource("name")}
                  record={scopedFormData}
                  label="Title"
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
                <Typography className="input_title">Price Type</Typography>
                <SelectInput
                  fullWidth
                  variant="outlined"
                  source={getSource("price_type")}
                  record={scopedFormData}
                  label="Price Type"
                  choices={[
                    { id: "flat_rate", name: "Flat Rate" },
                    { id: "calculated", name: "Calculated" },
                  ]}
                />
              </Stack>
              {price_type && price_type === "flat_rate" && (
                <Stack
                  spacing={2}
                  padding={{ md: 3, sm: 2, xs: 0 }}
                  paddingX={{ md: "16px !important" }}
                  paddingBottom={{ md: "0px !important" }}
                  width={{ lg: "50%", md: "45%", xs: "100%" }}
                  minWidth={"200px"}
                >
                  <Typography className="input_title">Amount</Typography>
                  <NumberInput
                    fullWidth
                    variant="outlined"
                    source={getSource("amount")}
                    record={scopedFormData}
                    label="Amount"
                  />
                </Stack>
              )}
              <Stack
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "50%", md: "45%", xs: "100%" }}
                minWidth={"200px"}
              >
                <Typography className="input_title">
                  Shipping Profile
                </Typography>
                <SelectInput
                  fullWidth
                  variant="outlined"
                  source={getSource("profile_id")}
                  record={scopedFormData}
                  label="Choose a Shipping Profile"
                  choices={
                    ship_prof_list
                      ? ship_prof_list.map((ship_prof) => {
                          // console.log(fulfil_prov);
                          return {
                            id: ship_prof.id,
                            name: ship_prof.name,
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
                  Fulfillment Method
                </Typography>
                <SelectInput
                  fullWidth
                  variant="outlined"
                  source={getSource("provider_id")}
                  record={scopedFormData}
                  label="Choose a Fulfillment Method"
                  choices={
                    fulfil_prov_list
                      ? fulfil_prov_list.map((fulfil_prov) => {
                          // console.log(fulfil_prov);
                          return {
                            id: fulfil_prov.id,
                            name: fulfil_prov.id,
                          };
                        })
                      : []
                  }
                />
              </Stack>
            </Stack>
            <Stack
              width={"-webkit-fill-available"}
              justifyContent={"start"}
              spacing={0}
              marginLeft={{ lg: 2 }}
              marginY={2}
            >
              <Typography className="input_title">Requirements</Typography>
              {/* <Typography className="section_subtitle">
                Used for calculations.
              </Typography> */}
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
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "50%", md: "45%", xs: "100%" }}
                minWidth={"200px"}
              >
                <Typography className="input_title">Min. subtotal</Typography>
                <NumberInput
                  fullWidth
                  variant="outlined"
                  source={getSource("min_subtotal")}
                  record={scopedFormData}
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
                <Typography className="input_title">Max. subtotal</Typography>
                <NumberInput
                  fullWidth
                  variant="outlined"
                  source={getSource("max_subtotal")}
                  record={scopedFormData}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    // {
    //   summaryTitle: "Metadata",
    //   summarySubTitle: "Additional Info for this shipping option",
    //   body: (
    //     <Stack maxWidth={"-webkit-fill-available"}>
    //       {/* <Stack direction="row" justifyContent={"start"}>
    //         <Typography className="section_subtitle">
    //           Configure the general information for this variant.
    //         </Typography>
    //       </Stack> */}
    //       {/* <Stack
    //         direction={"row"}
    //         justifyContent={"space-around"}
    //         flexWrap={"wrap"}
    //         marginTop={"10px"}
    //       >
    //         <Stack maxWidth={"-webkit-fill-available"}>
    //           <Stack
    //             direction={"row"}
    //             justifyContent={"start"}
    //             flexWrap={"wrap"}
    //             marginTop={"20px"}
    //           >
    //             <Stack
    //               justifyContent={"start"}
    //               spacing={0}
    //               marginLeft={{ lg: 2 }}
    //               marginY={2}
    //             >
    //               <Typography className="input_title">Dimensions</Typography>
    //               <Typography className="section_subtitle">
    //                 Configure to calculate the most accurate shipping rates.
    //               </Typography>
    //             </Stack>
    //             <Stack
    //               width={"-webkit-fill-available"}
    //               maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
    //               overflow={"hidden"}
    //               direction={"row"}
    //               margin={0}
    //               justifyContent={"space-around"}
    //               flexWrap={"wrap"}
    //             >
    //               <Stack
    //                 spacing={2}
    //                 padding={{ md: 3, sm: 2, xs: 0 }}
    //                 paddingX={{ md: "16px !important" }}
    //                 paddingBottom={{ md: "0px !important" }}
    //                 width={{ lg: "20%", md: "45%", xs: "100%" }}
    //                 minWidth={"110px"}
    //               >
    //                 <Typography className="input_title">Width</Typography>
    //                 <NumberInput
    //                   fullWidth
    //                   variant="outlined"
    //                   source={getSource("width")}
    //                   record={scopedFormData}
    //                 />
    //               </Stack>
    //               <Stack
    //                 spacing={2}
    //                 padding={{ md: 3, sm: 2, xs: 0 }}
    //                 paddingX={{ md: "16px !important" }}
    //                 paddingBottom={{ md: "0px !important" }}
    //                 width={{ lg: "20%", md: "45%", xs: "100%" }}
    //                 minWidth={"110px"}
    //               >
    //                 <Typography className="input_title">Length</Typography>
    //                 <NumberInput
    //                   fullWidth
    //                   variant="outlined"
    //                   source={getSource("length")}
    //                   record={scopedFormData}
    //                 />
    //               </Stack>
    //               <Stack
    //                 spacing={2}
    //                 padding={{ md: 3, sm: 2, xs: 0 }}
    //                 paddingX={{ md: "16px !important" }}
    //                 paddingBottom={{ md: "0px !important" }}
    //                 width={{ lg: "20%", md: "45%", xs: "100%" }}
    //                 minWidth={"110px"}
    //               >
    //                 <Typography className="input_title">Height</Typography>
    //                 <NumberInput
    //                   fullWidth
    //                   variant="outlined"
    //                   source={getSource("height")}
    //                   record={scopedFormData}
    //                 />
    //               </Stack>
    //               <Stack
    //                 spacing={2}
    //                 padding={{ md: 3, sm: 2, xs: 0 }}
    //                 paddingX={{ md: "16px !important" }}
    //                 paddingBottom={{ md: "0px !important" }}
    //                 width={{ lg: "20%", md: "45%", xs: "100%" }}
    //                 minWidth={"110px"}
    //               >
    //                 <Typography className="input_title">Weight</Typography>
    //                 <NumberInput
    //                   fullWidth
    //                   variant="outlined"
    //                   source={getSource("weight")}
    //                   record={scopedFormData}
    //                 />
    //               </Stack>
    //             </Stack>
    //             <Stack
    //               justifyContent={"start"}
    //               spacing={0}
    //               marginLeft={{ lg: 2 }}
    //               marginY={2}
    //             >
    //               <Typography className="input_title">Customs</Typography>
    //               <Typography className="section_subtitle">
    //                 Used for shipping and customs purposes.
    //               </Typography>
    //             </Stack>
    //           </Stack>
    //         </Stack>
    //         <Stack
    //           width={"-webkit-fill-available"}
    //           maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
    //           overflow={"hidden"}
    //           direction={"row"}
    //           margin={0}
    //           justifyContent={"space-around"}
    //           flexWrap={"wrap"}
    //         >
    //           <Stack
    //             spacing={2}
    //             padding={{ md: 3, sm: 2, xs: 0 }}
    //             paddingX={{ md: "16px !important" }}
    //             paddingBottom={{ md: "0px !important" }}
    //             width={{ lg: "50%", md: "45%", xs: "100%" }}
    //             minWidth={"200px"}
    //           >
    //             <Typography className="input_title">MID Code</Typography>
    //             <TextInput
    //               fullWidth
    //               variant="outlined"
    //               source={getSource("mid_code")}
    //               record={scopedFormData}
    //             />
    //           </Stack>
    //           <Stack
    //             spacing={2}
    //             padding={{ md: 3, sm: 2, xs: 0 }}
    //             paddingX={{ md: "16px !important" }}
    //             paddingBottom={{ md: "0px !important" }}
    //             width={{ lg: "50%", md: "45%", xs: "100%" }}
    //             minWidth={"200px"}
    //           >
    //             <Typography className="input_title">HS Code</Typography>
    //             <TextInput
    //               fullWidth
    //               variant="outlined"
    //               source={getSource("hs_code")}
    //               record={scopedFormData}
    //             />
    //           </Stack>
    //         </Stack>

    //         <Stack
    //           width={"-webkit-fill-available"}
    //           maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
    //           overflow={"hidden"}
    //           direction={"row"}
    //           margin={0}
    //           // marginLeft={{lg: '15px', md: '20px'}}
    //           justifyContent={"start"}
    //           flexWrap={"wrap"}
    //         >
    //           <Stack
    //             spacing={2}
    //             padding={{ md: 3, sm: 2, xs: 0 }}
    //             paddingX={{ md: "16px !important" }}
    //             paddingBottom={{ md: "0px !important" }}
    //             width={{ lg: "50%", md: "45%", xs: "100%" }}
    //             minWidth={"250px"}
    //           >
    //             <Typography className="input_title">
    //               Country of origin
    //             </Typography>
    //             <NumberInput
    //               fullWidth
    //               variant="outlined"
    //               source={getSource("origin_country")}
    //               record={scopedFormData}
    //             />
    //           </Stack>
    //         </Stack>
    //       </Stack> */}
    //     </Stack>
    //   ),
    // },
  ];

  const handleCreateShippingOption = async (data) => {
    if (!data.name) {
      toast.warning(`You need at least a name to create a shipping option`);
      return;
    }
    delete data.variant_open;
    delete data.visible;
    let req =
      data.max_subtotal || data.min_subtotal
        ? {
            requirements: [
              data &&
                data.max_subtotal && {
                  // id: data.id,
                  type: "max_subtotal",
                  amount: data.max_subtotal,
                },
              data &&
                data.min_subtotal && {
                  // id: data.id,
                  type: "min_subtotal",
                  amount: data.min_subtotal,
                },
            ].filter((e) => e),
          }
        : { requirements: [] };
    let data_fulfil =
      data && data.provider_id && data.provider_id === "manual"
        ? { id: "manual-fulfillment" }
        : {};
    let _id = data.id;
    if (data && data.id) {
      delete data.id;
      delete data.region_id;
      delete data.profile_id;
      delete data.provider_id;
      delete data.is_return;
      delete data.data;
      delete data.created_at;
      delete data.updated_at;
      delete data.deleted_at;
      delete data.max_subtotal;
      delete data.min_subtotal;
      delete data.metadata;

      medusa.admin.shippingOptions
        .update(_id, {
          ...data,
          ...req,
          is_return: is_return,
        })
        .then(({ shipping_option }) => {
          // console.log(shipping_option.id);
          toast.success("Option Updated");
          setValue(getSource("variant_open"), false);
          refetch();
          redirect('show', 'region', record.id);
        })
        .catch((error) => {
          toast.error(`Option Updated Error: ${error.message}`);
        });
    } else {
      delete data.metadata;
      delete data.max_subtotal;
      delete data.min_subtotal;
      delete data.created_at;
      delete data.updated_at;
      delete data.deleted_at;
      medusa.admin.shippingOptions
        .create({
          ...data,
          region_id: record.id,
          data: data_fulfil,
          ...req,
          is_return: is_return,
        })
        .then(({ shipping_option }) => {
          // console.log(shipping_option.id);
          toast.success("Option Created");
          setValue(getSource("variant_open"), false);
          refetch();
          redirect('show', 'region', record.id);
        })
        .catch((error) => {
          toast.error(`Option Created Error: ${error.message}`);
        });
    }
  };

  const handleDeleteShippingOption = async (data) => {
    if (data && data.id) {
      medusa.admin.shippingOptions
        .delete(data.id)
        .then(({ id, object, deleted }) => {
          // console.log(id);
          supabase
            .from("shipping_option_requirement")
            .delete()
            .eq("shipping_option_id", id)
            .then((e) => {
              supabase
                .from("shipping_option")
                .delete()
                .eq("id", id)
                .then((e) => {
                  toast.success("Option Deleted");
                  setValue(getSource("variant_open"), false);
                })
                .catch((error) => {
                  toast.error(`Option Deleted Error: ${error.message}`);
                });
            })
            .catch((error) => {
              toast.error(`Option Deleted Error: ${error.message}`);
            });
        })
        .catch((error) => {
          toast.error(`Option Deleted Error: ${error.message}`);
        });
    }
  };
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
            {scopedFormData?.name}
          </Typography>
          {/* <Labeled label={'Name'}>
            <TextField source={getSource("name")} record={scopedFormData} />{" "}
          </Labeled> */}
          <Typography sx={{ fontSize: "14px", color: "#8d9498" }}>
            {`${scopedFormData?.price_type}: ${formatPrice(
              scopedFormData?.amount
            )} ${record?.currency_code.toUpperCase()}
                         `}
            {!isLarge ? "- Min. Subtotal: N/A - Max. Subtotal: N/A " : null}
          </Typography>
        </Stack>
      </Stack>
      <span>
        <Button
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
        >{` ${is_return ? "Return" : ""} Shipping Option ${
          scopedFormData && scopedFormData.name && scopedFormData.name !== ""
            ? `: ${scopedFormData.name}`
            : `#${getSource("variant_open").split(".")[1]}`
        } `}</DialogTitle>
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
                handleDeleteShippingOption(scopedFormData);
              }}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={() => {
              handleCreateShippingOption(scopedFormData);
            }}
          >
            Save and Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default function RegionCreateComp(props) {
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
  const identity = useGetIdentity();
  const [product, setRegion] = React.useState(null);
  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });

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

  useEffect(() => {
    async function fetchStoreCurrncs() {
      if (identity?.data?.medusa_store && !currncs) {
        try {
          let { data: store_currencies, error } = await supabase
            .from("store_currencies")
            .select("*")
            .eq("store_id", identity?.data?.medusa_store?.id);
          // .maybeSingle();
          setCurrncs(store_currencies);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    fetchStoreCurrncs();
  }, [identity]);

  useEffect(() => {
    async function fetchMyPayProvs() {
      if (identity?.data?.medusa_store && record && record.id && !my_pay_prov_list) {
        try {
          let { data: region_payment_providers, error } = await supabase
            .from("region_payment_providers")
            .select("*");
          // .maybeSingle();
          setMyPay_prov_list(region_payment_providers);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    async function fetchMyFulfilProvs() {
      if (identity?.data?.medusa_store && record && record.id && !my_fulfil_prov_list) {
        try {
          let { data: region_fulfillment_providers, error } = await supabase
            .from("region_fulfillment_providers")
            .select("*")
            .eq("region_id", record?.id);
          // .maybeSingle();
          setMyFulfil_prov_list(region_fulfillment_providers);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    fetchMyPayProvs();
    fetchMyFulfilProvs();
  }, [identity]);

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
    fetchShipProfs();
    fetchPayProvs();
    fetchFulfilProvs();
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // useEffect(() => {
  //   if (record) {
  //     medusa.admin.products.retrieve(record.id).then(({ product }) => {
  //       // console.log(product);
  //       setRegion(product);
  //     });
  //   }
  // }, [record]);

  useEffect(() => {
    if (product) {
      // console.log(product);
    }
  }, [product]);

  const createSections = [
    {
      summaryTitle: "Detail",
      summarySubTitle: "Add the region details",
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
              <Typography className="input_title">Name</Typography>
              <TextInput fullWidth variant="outlined" source="name" />
            </Stack>
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"200px"}
            >
              <Typography className="input_title">Currency</Typography>
              <SelectInput
                fullWidth
                variant="outlined"
                source="currency_code"
                choices={
                  currncs
                    ? currncs.map((crncy) => {
                        return {
                          id: crncy.currency_code,
                          name: `${crncy.currency_code.toUpperCase()} - ${
                            currncy &&
                            currncy.find((t) => t.code == crncy.currency_code)
                              .name
                          }`,
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
              <Typography className="input_title">Default Tax Rate</Typography>
              <NumberInput fullWidth variant="outlined" source="tax_rate" />
            </Stack>
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"200px"}
            >
              <Typography className="input_title">Default Tax Code</Typography>
              <TextInput fullWidth variant="outlined" source="tax_code" />
            </Stack>
          </Stack>
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
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"250px"}
            >
              <Typography className="input_title">Countries</Typography>
              <AutocompleteArrayInput
                fullWidth
                variant="outlined"
                source="countries"
                choices={
                  countryList
                    ? countryList.map((country) => {
                        return {
                          id: country.iso_2,
                          name: country.display_name,
                        };
                      })
                    : []
                }
              />
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Providers",
      summarySubTitle:
        "Add which fulfillment and payment providers should be available in this region.",
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
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"250px"}
            >
              <Typography className="input_title">Payment Providers</Typography>
              <AutocompleteArrayInput
                fullWidth
                variant="outlined"
                source="payment_providers"
                choices={
                  pay_prov_list
                    ? pay_prov_list.map((pay_prov) => {
                        // console.log(pay_prov)
                        return {
                          id: pay_prov.id,
                          name: pay_prov.id,
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
              minWidth={"250px"}
            >
              <Typography className="input_title">
                Fulfillment Providers
              </Typography>
              <AutocompleteArrayInput
                fullWidth
                variant="outlined"
                source="fulfillment_providers"
                choices={
                  fulfil_prov_list
                    ? fulfil_prov_list.map((fulfil_prov) => {
                        // console.log(fulfil_prov);
                        return {
                          id: fulfil_prov.id,
                          name: fulfil_prov.id,
                        };
                      })
                    : []
                }
              />
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
            ></Stack>
            <Stack
              spacing={2}
              padding={{ md: 3, sm: 2, xs: 0 }}
              paddingX={{ md: "16px !important" }}
              paddingBottom={{ md: "0px !important" }}
              width={{ lg: "50%", md: "45%", xs: "100%" }}
              minWidth={"200px"}
            ></Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Shipping Options",
      summarySubTitle:
        "Enter specifics about available regional shipment methods.",
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
                  minWidth: "70vw",
                },
              }}
            >
              <ReferenceManyField
                label="Shipping Options"
                reference="shipping_option"
                target="region_id"
                filter={{ is_return: false }}
                record={record}
              >
                <WithListContext
                  render={({ isLoading, data, refetch }) => {
                    return (
                      !isLoading && (
                        <ArrayInput
                          source="shipping_options"
                          fullWidth
                          defaultValue={data ? data : null}
                          record={data}
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
                            <FormDataConsumer>
                              {({ scopedFormData, formData, getSource }) => {
                                // console.log(scopedFormData);
                                return (
                                  <NestedShippingOptionInput
                                    scopedFormData={scopedFormData}
                                    getSource={getSource}
                                    formData={formData}
                                    ship_prof_list={ship_prof_list}
                                    fulfil_prov_list={fulfil_prov_list}
                                    refetch={refetch}
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
              </ReferenceManyField>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Return Shipping Options",
      summarySubTitle:
        "Enter specifics about available regional return shipment methods.",
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
                  minWidth: "70vw",
                },
              }}
            >
              <ReferenceManyField
                label="Shipping Options"
                reference="shipping_option"
                target="region_id"
                filter={{ is_return: true }}
                record={record}
              >
                <WithListContext
                  render={({ isLoading, data, refetch }) => {
                    return (
                      !isLoading && (
                        <ArrayInput
                          source="return_shipping_options"
                          fullWidth
                          defaultValue={data ? data : null}
                          record={data}
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
                            <FormDataConsumer>
                              {({ scopedFormData, formData, getSource }) => {
                                // console.log(scopedFormData);
                                return (
                                  <NestedShippingOptionInput
                                    scopedFormData={scopedFormData}
                                    getSource={getSource}
                                    formData={formData}
                                    ship_prof_list={ship_prof_list}
                                    fulfil_prov_list={fulfil_prov_list}
                                    is_return={true}
                                    refetch={refetch}
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
              </ReferenceManyField>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Metadata",
      summarySubTitle: "Add Additional Information about this region",
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
              <ArrayInput
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
              </ArrayInput>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
  ];

  return (
    <SimpleForm
      defaultValues={{
        name: record ? record?.name : null,
        currency_code:
          record && currncs && record.currency_code
            ? record.currency_code
            : null,

        tax_rate: record && record.tax_rate ? record.tax_rate : null,

        tax_code: record && record.tax_code ? record.tax_code : null,
        countries:
          countryList &&
          record &&
          record.id &&
          countryList
            .filter((country) => country.region_id == record?.id)
            .map((country) => {
              return country.iso_2;
            }),
        payment_providers:
          my_pay_prov_list &&
          my_pay_prov_list.map((pay_prov) => {
            return pay_prov.provider_id;
          }),
        fulfillment_providers: my_fulfil_prov_list
          ? my_fulfil_prov_list.map((fulfil_prov) => {
              return fulfil_prov.provider_id;
            })
          : [],
        metadata: record && record.metadata,
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
