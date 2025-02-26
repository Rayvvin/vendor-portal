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
  ReferenceArrayInput,
} from "react-admin";
import { useMediaQuery, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CardActions,
  Stack,
  Card,
  Avatar,
} from "@mui/material";
import { MoreVert, MoreHoriz } from "@mui/icons-material";
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
import MediaPickerInput from "../../elements/mediaPicker/MediaPickerInput";

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

  const convertToBase64 = (data) => {
    const reader = new FileReader();

    reader.readAsDataURL(data?.thumbnail?.rawFile);

    reader.onloadend = () => {
      // console.log('called: ', reader)
      setThumb_data(reader.result);
    };
  };

  function extractImageUrls(text) {
    // Define the regex pattern to match URLs ending with image file extensions
    const urlPattern =
      /(https?:\/\/[^\s]+?\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;

    // Use the match method to extract all URLs
    const urls = text.match(urlPattern);

    // Return an array of URLs or an empty array if no matches found
    return urls || [];
  }

  const handleSubmitWithImage = async (data) => {
    // console.log("Right", data)
    if (!data.title) {
      toast.warning(`You need at least a product title to create a product`);
      return;
    }
    delete data.sales_channels;
    if (!data.images) {
      delete data.images;
    }
    if (!data.thumbnail || !data.thumbnail.rawFile) {
      delete data.thumbnail;
    }
    if (data.options && data.options.length) {
      const deleteProductOption = async (optionId) => {
        // Perform your API call to delete the option here
        try {
          await medusa.admin.products.deleteOption(record.id, optionId);
          console.log(`Deleted option with ID: ${optionId}`);
        } catch (error) {
          console.error(`Error deleting option with ID: ${optionId}`, error);
        }
      };

      const addProductOption = async (option) => {
        // Perform your API call to add a new option here
        try {
          const response = await medusa.admin.products.addOption(record.id, {
            title: option.title,
          });
          const newOption = response.product.options.filter((e) => {
            return e.title === option.title;
          })[0];
          console.log(`Added new option: ${newOption}`);
        } catch (error) {
          console.error(`Error adding option`, error);
        }
      };

      const updateProductOptions = async (oldOptions, newOptions) => {
        // Create a set of new option IDs to help with comparisons
        const newOptionIds = new Set(newOptions.map((option) => option.id));

        // Handle options that are in the old list but not in the new list (deletion)
        for (const oldOption of oldOptions) {
          if (!newOptionIds.has(oldOption.id)) {
            // Option is in the old list but not the new one, so delete it
            await deleteProductOption(oldOption.id);
          }
        }

        // Handle new options (addition)
        let new_prod;
        for (const newOption of newOptions) {
          if (!newOption.id) {
            // Option does not have an ID, so it's a new option and needs to be added
            new_prod = await addProductOption(newOption);
          }
        }

        // After handling deletion and addition, return the updated list for future processing
        if (new_prod) return new_prod.product.options;
        return newOptions;
      };

      data.options = await updateProductOptions(product.options, data.options);
    } else {
      delete data.options;
    }
    if (data.variants && data.variants.length) {
      data.variants = data.variants.map((v) => {
        // console.log(v)
        let variant = {
          ...v,
          manage_inventory: v.manage_inventory ? true : false,
          prices: [{ amount: v.amount, currency_code: v.currency }],
          options: v.options.map((opt, i) => {
            return { option_id: data.options[i].id, value: opt.value };
          }),
        };

        delete variant.variant_open;
        delete variant.amount;
        delete variant.currency;
        delete variant.created_at;
        delete variant.updated_at;
        delete variant.deleted_at;
        delete variant.product_id;
        delete variant.variant_rank;
        delete variant.original_price;
        delete variant.calculated_price;
        delete variant.original_price_incl_tax;
        delete variant.calculated_price_incl_tax;
        delete variant.original_tax;
        delete variant.calculated_tax;
        delete variant.tax_rates;
        delete variant.allow_backorders;
        delete variant.allow_backorder;

        return { ...variant };
      });
    } else {
      delete data.variants;
    }
    if (data.newStatus) {
      data.status = data.newStatus;
      delete data.newStatus;
    }
    console.log(data.variants);

    if (type === "edit") {
      delete data.store_id;
      delete data.external_id;
      delete data.type_id;
      delete data.deleted_at;
      delete data.updated_at;
      delete data.created_at;
      delete data.is_giftcard;
      delete data.id;
      delete data.collection;
      delete data.options;
      delete data.profiles;
      delete data.profile;
      delete data.profile_id;
      delete data.store;

      medusa.admin.products
        .update(record?.id, {
          ...data,
          // images: data.images.map((img) => extractImageUrls(img.url)[0]),
          // images: data.images,
        })
        .then(({ product }) => {
          toast.success("Product Updated");
          redirect("show", "product", record.id);
        })
        .catch((error) => {
          toast.error(`Product Updated Error: ${error.message}`);
        });
      // if (data.thumbnail?.rawFile) {
      //   medusa.admin.uploads
      //     .create(
      //       [data.thumbnail?.rawFile].concat(
      //         data.images?.map((img) => img.rawFile)
      //       )
      //     )
      //     .then(({ uploads }) => {
      //       // console.log({ in: [data.thumbnail?.rawFile].concat(data.images.map((img) => img.rawFile)), out: uploads});
      //       if (uploads.length) {
      //         delete data.thumbnail;
      //         delete data.images;
      //       }
      //       // console.log({ thumbnail: uploads[0].url, images: uploads, ...data });
      //       medusa.admin.products
      //         .update(record?.id, {
      //           thumbnail: uploads.length ? uploads[0].url : record.thumbnail,
      //           images: uploads.length
      //             ? uploads.map((img) => img.url)
      //             : record.images,
      //           ...data,
      //         })
      //         .then(({ product }) => {
      //           toast.success("Product Updated");
      //           redirect("show", "product", record.id);
      //         })
      //         .catch((error) => {
      //           toast.error(`Product Updated Error: ${error.message}`);
      //         });
      //     });
      // } else {

      // }
    } else {
      medusa.admin.products
        .create({
          // thumbnail: uploads[0].url,
          // images: uploads.map((img) => extractImageUrls(img.url)[0]),
          ...data,
        })
        .then(({ product }) => {
          toast.success("New Product Created");
          redirect("/product");
        })
        .catch((error) => {
          toast.error(`Product Create Error: ${error.message}`);
        });

      // medusa.admin.uploads
      //   .create(
      //     [data.thumbnail?.rawFile].concat(
      //       data.images.map((img) => img.rawFile)
      //     )
      //   )
      //   .then(({ uploads }) => {
      //     // console.log({ in: [data.thumbnail?.rawFile].concat(data.images.map((img) => img.rawFile)), out: uploads});
      //     if (uploads.length) {
      //       delete data.thumbnail;
      //       delete data.images;
      //     }
      //     // console.log({ thumbnail: uploads[0].url, images: uploads, ...data });
      //     medusa.admin.products
      //       .create({
      //         thumbnail: uploads[0].url,
      //         images: uploads.map((img) => extractImageUrls(img.url)[0]),
      //         ...data,
      //       })
      //       .then(({ product }) => {
      //         toast.success("New Product Created");
      //         redirect("/product");
      //       })
      //       .catch((error) => {
      //         toast.error(`Product Create Error: ${error.message}`);
      //       });
      //   });
    }
  };

  const handleSubmit = async (data) => {
    // console.log(data);
    delete data.sales_channels;
    if (!data.options.length) {
      delete data.options;
    }
    if (!data.variants.length) {
      delete data.variants;
    }
    // console.log(uploads);
    medusa.admin.products
      .create({ ...data })
      .then(({ product }) => {
        toast.success("New Product Created");
        redirect("/product");
      })
      .catch((error) => {
        toast.error(`Product Create Error: ${error.message}`);
      });
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
        variant="outlined"
        type="button"
        color="primary"
        // disabled
        // fullWidth
        style={{
          padding: "5px 45px",
        }}
        onClick={(e) => {
          handleSubmitWithImage({ newStatus: "draft", ...form });
          // handleSubmitWithImage({ status: "draft", ...form });
          // console.log(form);
        }}
      >
        {/* {loading && <CircularProgress size={25} thickness={2} />} */}
        {translate("Save Draft")}
      </Button>

      <Button
        variant="contained"
        type="button"
        color="primary"
        disabled={
          identity?.data?.medusa_store?.default_currency_code ? false : true
        }
        // disabled={product && identity?.data?.medusa_store?.default_currency_code ? false: true}
        // fullWidth
        style={{
          padding: "5px 45px",
        }}
        // onClick={handleSubmit}
        onClick={(e) => {
          handleSubmitWithImage(
            type && type === "edit"
              ? { newStatus: "published", ...form }
              : { status: "published", ...form }
          );
        }}
      >
        {/* {loading && <CircularProgress size={25} thickness={2} />} */}
        {type && type === "edit" ? translate("Update") : translate("Publish")}
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

function NestedVariantInput(props) {
  const { getSource, scopedFormData, formData, currncy } = props;
  const { setValue } = useFormContext(); // retrieve all hook methods
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [theme, setTheme] = useTheme();
  const [inner_expanded, setInnerExpanded] = React.useState("panel0");
  const handleInnerChange = (panel) => (event, newExpanded) => {
    setInnerExpanded(newExpanded ? panel : false);
  };
  const identity = useGetIdentity();
  const form = useWatch();

  // useEffect(() => {
  //   console.log(currncy);
  // }, [currncy]);
  const createVariantSections = [
    {
      summaryTitle: "General",
      summarySubTitle: "Configure the general information for this variant.",
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
                <Typography className="input_title">Custom title</Typography>
                <TextInput
                  fullWidth
                  variant="outlined"
                  source={getSource("title")}
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
                <Typography className="input_title">Material</Typography>
                <TextInput
                  fullWidth
                  variant="outlined"
                  source={getSource("material")}
                  record={scopedFormData}
                />
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
              justifyContent={"start"}
              flexWrap={"wrap"}
            >
              {formData?.options &&
                formData?.options.map((option, index) => {
                  return (
                    <Stack
                      key={index}
                      spacing={2}
                      padding={{ md: 3, sm: 2, xs: 0 }}
                      paddingX={{ md: "16px !important" }}
                      paddingBottom={{ md: "0px !important" }}
                      width={{ lg: "50%", md: "45%", xs: "100%" }}
                      minWidth={"200px"}
                    >
                      <Typography className="input_title">
                        {option.title}
                      </Typography>
                      <SelectInput
                        fullWidth
                        variant="outlined"
                        // source={`options.${index}.value`}
                        source={getSource(`options.${index}.value`)}
                        record={scopedFormData}
                        choices={
                          option.variations
                            ? option.variations.map((variant) => {
                                return {
                                  id: variant.toLowerCase(),
                                  name: variant,
                                };
                              })
                            : []
                        }
                      />
                    </Stack>
                  );
                })}
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Stock & Inventory",
      summarySubTitle: "Configure the inventory and stock for this variant.",
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
                <Typography className="input_title">
                  Stock keeping unit (SKU)
                </Typography>
                <TextInput
                  fullWidth
                  variant="outlined"
                  source={getSource("sku")}
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
                <Typography className="input_title">
                  Quantity in stock
                </Typography>
                <NumberInput
                  fullWidth
                  variant="outlined"
                  source={getSource("inventory_quantity")}
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
                <Typography className="input_title">EAN (Barcode)</Typography>
                <NumberInput
                  fullWidth
                  variant="outlined"
                  source={getSource("ean")}
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
                <Typography className="input_title">UPC (Barcode)</Typography>
                <NumberInput
                  fullWidth
                  variant="outlined"
                  source={getSource("upc")}
                  record={scopedFormData}
                />
              </Stack>
            </Stack>
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
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
                <Typography className="input_title">Barcode</Typography>
                <NumberInput
                  fullWidth
                  variant="outlined"
                  source={getSource("barcode")}
                  record={scopedFormData}
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
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
                  Manage inventory
                </Typography>
                <Typography className="section_subtitle">
                  When checked Medusa will regulate the inventory when orders
                  and returns are made.
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
                  source={getSource("manage_inventory")}
                  record={scopedFormData}
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
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
                  Allow backorders
                </Typography>
                <Typography className="section_subtitle">
                  When checked the product will be available for purchase
                  despite the product being sold out
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
                  source={getSource("allow_backorder")}
                  record={scopedFormData}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Pricing and Currency Management",
      summarySubTitle:
        "Configure pricing and currency management for this variant.",
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
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
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
                minWidth={"200px"}
              >
                <Typography className="input_title">Amount</Typography>
                <NumberInput
                  fullWidth
                  variant="outlined"
                  source={getSource("amount")}
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
                <Typography className="input_title">Currency</Typography>
                <SelectInput
                  fullWidth
                  variant="outlined"
                  source={getSource("currency")}
                  record={scopedFormData}
                  defaultValue={
                    identity?.data?.medusa_store?.default_currency_code
                  }
                  choices={
                    identity
                      ? [
                          {
                            id: identity?.data?.medusa_store
                              ?.default_currency_code,
                            name: `${identity?.data?.medusa_store?.default_currency_code.toUpperCase()} - ${
                              currncy &&
                              currncy.find(
                                (t) =>
                                  t.code ==
                                  identity?.data?.medusa_store
                                    ?.default_currency_code
                              ).name
                            }`,
                          },
                        ]
                      : []
                  }
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Shipping",
      summarySubTitle:
        "Shipping information can be required depending on your shipping provider, and whether or not you are shipping internationally.",
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
            <Stack maxWidth={"-webkit-fill-available"}>
              <Stack
                direction={"row"}
                justifyContent={"start"}
                flexWrap={"wrap"}
                marginTop={"20px"}
              >
                <Stack
                  justifyContent={"start"}
                  spacing={0}
                  marginLeft={{ lg: 2 }}
                  marginY={2}
                >
                  <Typography className="input_title">Dimensions</Typography>
                  <Typography className="section_subtitle">
                    Configure to calculate the most accurate shipping rates.
                  </Typography>
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
                    width={{ lg: "20%", md: "45%", xs: "100%" }}
                    minWidth={"110px"}
                  >
                    <Typography className="input_title">Width</Typography>
                    <NumberInput
                      fullWidth
                      variant="outlined"
                      source={getSource("width")}
                      record={scopedFormData}
                    />
                  </Stack>
                  <Stack
                    spacing={2}
                    padding={{ md: 3, sm: 2, xs: 0 }}
                    paddingX={{ md: "16px !important" }}
                    paddingBottom={{ md: "0px !important" }}
                    width={{ lg: "20%", md: "45%", xs: "100%" }}
                    minWidth={"110px"}
                  >
                    <Typography className="input_title">Length</Typography>
                    <NumberInput
                      fullWidth
                      variant="outlined"
                      source={getSource("length")}
                      record={scopedFormData}
                    />
                  </Stack>
                  <Stack
                    spacing={2}
                    padding={{ md: 3, sm: 2, xs: 0 }}
                    paddingX={{ md: "16px !important" }}
                    paddingBottom={{ md: "0px !important" }}
                    width={{ lg: "20%", md: "45%", xs: "100%" }}
                    minWidth={"110px"}
                  >
                    <Typography className="input_title">Height</Typography>
                    <NumberInput
                      fullWidth
                      variant="outlined"
                      source={getSource("height")}
                      record={scopedFormData}
                    />
                  </Stack>
                  <Stack
                    spacing={2}
                    padding={{ md: 3, sm: 2, xs: 0 }}
                    paddingX={{ md: "16px !important" }}
                    paddingBottom={{ md: "0px !important" }}
                    width={{ lg: "20%", md: "45%", xs: "100%" }}
                    minWidth={"110px"}
                  >
                    <Typography className="input_title">Weight</Typography>
                    <NumberInput
                      fullWidth
                      variant="outlined"
                      source={getSource("weight")}
                      record={scopedFormData}
                    />
                  </Stack>
                </Stack>
                <Stack
                  justifyContent={"start"}
                  spacing={0}
                  marginLeft={{ lg: 2 }}
                  marginY={2}
                >
                  <Typography className="input_title">Customs</Typography>
                  <Typography className="section_subtitle">
                    Used for shipping and customs purposes.
                  </Typography>
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
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "50%", md: "45%", xs: "100%" }}
                minWidth={"200px"}
              >
                <Typography className="input_title">MID Code</Typography>
                <TextInput
                  fullWidth
                  variant="outlined"
                  source={getSource("mid_code")}
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
                <Typography className="input_title">HS Code</Typography>
                <TextInput
                  fullWidth
                  variant="outlined"
                  source={getSource("hs_code")}
                  record={scopedFormData}
                />
              </Stack>
            </Stack>

            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
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
                <Typography className="input_title">
                  Country of origin
                </Typography>
                <NumberInput
                  fullWidth
                  variant="outlined"
                  source={getSource("origin_country")}
                  record={scopedFormData}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
  ];
  return (
    <Stack
      direction="row"
      width="-webkit-fill-available"
      justifyContent={"space-between"}
      alignItems={"center"}
      className="card"
      paddingX={2}
      paddingY={1}
      backgroundColor={"var(--onyx-row) !important"}
      border={"0.5px solid var(--onyx)"}
      sx={{
        "& .MuiTypography-root": {
          color: "var(--onyx)",
          fontSize: "15px",
          fontWeight: "600",
        },
      }}
    >
      <Labeled label={scopedFormData["title"]}>
        <TextField source={getSource("title")} record={scopedFormData} />
      </Labeled>

      <span>
        <Labeled label={scopedFormData["inventory_quantity"]}>
          <TextField
            source={getSource("inventory_quantity")}
            record={scopedFormData}
          />
        </Labeled>

        <Button
          onClick={() => {
            setValue(getSource("variant_open"), true);
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
          console.log(getSource("variant_open"));
          console.log(scopedFormData);
        }}
      />
      <Dialog
        open={scopedFormData["variant_open"]}
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
        >{` Create Variant ${
          scopedFormData["title"] && scopedFormData["title"] !== ""
            ? `: ${scopedFormData["title"]}`
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
          <Button
            onClick={() => {
              setValue(getSource("variant_open"), false);
              console.log(form);
            }}
          >
            Save and Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default function ProductCreateComp(props) {
  const { type } = props;
  const redirect = useRedirect();
  const [expanded, setExpanded] = React.useState("panel0");
  const [theme, setTheme] = useTheme();
  const options = [];
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const record = useRecordContext();
  const identity = useGetIdentity();
  const [product, setProduct] = React.useState(null);
  const [currncy, setCurrncy] = useState(null);
  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (record && identity.data && identity.data.medusa_user && identity.data.medusa_user.api_token) {
      medusa.admin.products.retrieve(record.id).then(({ product }) => {
        setProduct(product);
      });
    }
  }, [record, identity]);

  useEffect(() => {
    if (product) {
      // console.log(product);
    }
  }, [product]);

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

  const createSections = [
    {
      summaryTitle: "General information",
      summarySubTitle: "To start selling, all you need is a name and a price",
      body: (
        <Stack
          //   maxWidth={{ lg: "90vw", md: "90vw", sm: "90vw", xs: "100vw" }}
          alignItems={"center"}
          width="-webkit-fill-available"
        >
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            marginTop={"10px"}
          >
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "45%", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
              justifyContent={{ md: "flex-end" }}
            >
              <Stack
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "50%", md: "85%", xs: "100%" }}
                minWidth={"220px"}
              >
                <Typography className="input_title">Title</Typography>
                <TextInput source="title" fullWidth variant="outlined" />
              </Stack>
            </Stack>
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "45%", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
            >
              <Stack
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "50%", md: "85%", xs: "100%" }}
                minWidth={"220px"}
              >
                <Typography className="input_title">Subtitle</Typography>
                <TextInput source="subtitle" fullWidth variant="outlined" />
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            width="-webkit-fill-available"
          >
            <Stack maxWidth={{ md: "85%" }}>
              <Stack direction="row" justifyContent={"start"}>
                <Typography className="section_subtitle">
                  Give your product a short and clear title.
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent={"start"}>
                <Typography className="section_subtitle">
                  50-60 characters is the recommended length for search engines.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            // marginTop={"10px"}
          >
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "45%", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
              justifyContent={{ md: "flex-end" }}
            >
              <Stack
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "50%", md: "85%", xs: "100%" }}
                minWidth={"220px"}
              >
                <Typography className="input_title">Handle</Typography>
                <TextInput source="handle" fullWidth variant="outlined" />
              </Stack>
            </Stack>
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "45%", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
            >
              <Stack
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "50%", md: "85%", xs: "100%" }}
                minWidth={"220px"}
              >
                <Typography className="input_title">Material</Typography>
                <TextInput source="material" fullWidth variant="outlined" />
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            width="-webkit-fill-available"
          >
            <Stack maxWidth={{ md: "85%" }}>
              <Stack
                direction="column"
                justifyContent={"start"}
                spacing={1}
                marginX={{ lg: 6 }}
              >
                <Typography className="input_title">Description</Typography>
                <TextInput
                  source="description"
                  fullWidth
                  variant="outlined"
                  rows={4}
                  multiline
                />
              </Stack>
              <Stack
                direction="column"
                justifyContent={"start"}
                marginX={{ lg: "42px" }}
              >
                <Typography className="section_subtitle">
                  Give your product a short and clear description.
                </Typography>
                <Typography className="section_subtitle">
                  120-160 characters is the recommended length for search
                  engines.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            width="-webkit-fill-available"
            marginY={3}
          >
            <Stack
              direction="row"
              spacing={1}
              maxWidth={{ md: "85%" }}
              justifyContent="space-around"
            >
              <Stack
                direction="column"
                justifyContent={"start"}
                marginX={{ lg: "42px" }}
                width={"72%"}
              >
                <Typography className="input_title">Discountable</Typography>
                <Typography className="section_subtitle">
                  When unchecked discounts will not be applied to this product.
                </Typography>
              </Stack>
              <Stack
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <BooleanInput source="discountable" label="" />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Organize",
      summarySubTitle: "Organize Product",
      body: (
        <Stack
          //   maxWidth={{ lg: "90vw", md: "90vw", sm: "90vw", xs: "100vw" }}
          alignItems={"center"}
          width="-webkit-fill-available"
          // width={{lg:'80vw'}}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            marginTop={"10px"}
          >
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "45%", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
              justifyContent={{ md: "flex-end" }}
            >
              <Stack
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "50%", md: "85%", xs: "100%" }}
                minWidth={"220px"}
              >
                <Typography className="input_title">Type</Typography>
                <TextInput
                  source="type"
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Stack>
            </Stack>
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "45%", sm: "80vw", xs: "90vw" }}
              overflow={"hidden"}
              direction={"row"}
              margin={0}
            >
              <Stack
                spacing={2}
                padding={{ md: 3, sm: 2, xs: 0 }}
                paddingX={{ md: "16px !important" }}
                paddingBottom={{ md: "0px !important" }}
                width={{ lg: "50%", md: "85%", xs: "100%" }}
                minWidth={"220px"}
              >
                <Typography className="input_title">Collection</Typography>
                <TextInput
                  source="collection"
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            width="-webkit-fill-available"
          >
            <Stack maxWidth={{ md: "85%" }}>
              <Stack
                direction="column"
                justifyContent={"start"}
                spacing={1}
                marginX={{ lg: 6 }}
              >
                <Typography className="input_title">Tags</Typography>
                <AutocompleteArrayInput
                  source="tags"
                  label=" "
                  fullWidth
                  variant="outlined"
                  rows={4}
                  multiline
                  onCreate={(newOptionName) => {
                    const newOption = {
                      id: newOptionName.toLowerCase(),
                      name: newOptionName,
                    };
                    options.push(newOption);
                    return newOption;
                  }}
                  // helperText="Eg. Blue, Red, Black"
                  choices={options}
                  createItemLabel={`Add a new tag : %{item}`}
                />
              </Stack>
              <Stack
                direction="column"
                justifyContent={"start"}
                marginX={{ lg: "62px" }}
                width={"100%"}
                paddingY={2}
              >
                <Typography className="section_subtitle">
                  Don&apos;t worry, It&apos;s is optional, You can always come
                  back to this.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            width="-webkit-fill-available"
            marginY={3}
          >
            <Stack
              direction="row"
              spacing={1}
              maxWidth={{ md: "85%" }}
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
                marginX={{ lg: "45px" }}
                width={{ xs: "80%", sm: "62%" }}
              >
                <Typography className="input_title">Sales Channels</Typography>
                <Typography className="section_subtitle">
                  This product will only be available in the default sales
                  channel if left untouched.
                </Typography>
              </Stack>
              <Stack
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
                // marginX={{ lg: "42px" }}
                // padding={2}
              >
                <BooleanInput source="sales_channels" disabled label="" />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Variants",
      summarySubTitle: "Add variations of this product",
      body: (
        <Stack
          //   maxWidth={{ lg: "90vw", md: "90vw", sm: "90vw", xs: "100vw" }}
          alignItems={"center"}
          width="-webkit-fill-available"
          spacing={2}
        >
          <Stack direction={"row"} justifyContent={"start"}>
            <Stack
              maxWidth={"-webkit-fill-available"}
              width={{ lg: "50vw" }}
              spacing={3}
            >
              <Stack maxWidth={"-webkit-fill-available"}>
                {/* <Stack direction="row" justifyContent={"start"}>
                  <Typography className="section_subtitle">
                    Add variations of this product.
                  </Typography>
                </Stack> */}
                <Stack direction="row" justifyContent={"start"}>
                  <Typography className="section_subtitle">
                    Offer your customers different options for color, format,
                    size, shape, etc.
                  </Typography>
                </Stack>
              </Stack>

              <Stack maxWidth={"-webkit-fill-available"}>
                <Stack direction="row" justifyContent={"start"}>
                  <Typography className="input_title">
                    Product Options
                  </Typography>
                </Stack>
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
                  <ArrayInput source="options" label=" ">
                    <SimpleFormIterator
                      inline
                      sx={{
                        gap: "10px",
                        // flexWrap: `${isMedium ? "nowrap" : "wrap"}`,
                      }}
                    >
                      <FormDataConsumer>
                        {({ scopedFormData, formData, getSource }) => {
                          return (
                            <React.Fragment>
                              <Stack
                                direction={"row"}
                                width={"-webkit-fill-available"}
                                alignItems={"start"}
                                justifyContent={"space-between"}
                              >
                                <TextInput
                                  source={getSource("title")}
                                  label="Option Title"
                                  helperText="Eg. Color"
                                />
                                {product &&
                                  product.options &&
                                  product.options.length &&
                                  scopedFormData["title"] &&
                                  !product?.options
                                    .map((opt) => opt?.title?.toLowerCase())
                                    .includes(
                                      scopedFormData["title"].toLowerCase()
                                    ) && (
                                    <Button
                                      // variant="outlined"
                                      sx={{
                                        height: "min-content",
                                        marginRight: "15px",
                                        marginTop: "10px",
                                      }}
                                      onClick={() => {
                                        const addProductOption = async (
                                          option
                                        ) => {
                                          // Perform your API call to add a new option here
                                          try {
                                            const response =
                                              await medusa.admin.products.addOption(
                                                record.id,
                                                {
                                                  title: option.title,
                                                }
                                              );
                                            const newOption =
                                              response.product.options.filter(
                                                (e) => {
                                                  return (
                                                    e.title === option.title
                                                  );
                                                }
                                              )[0];
                                            toast.success(
                                              `Added new option: ${newOption.title}`
                                            );
                                            if (record) {
                                              medusa.admin.products.retrieve(record.id).then(({ product }) => {
                                                // console.log(product);
                                                setProduct(product);
                                              });
                                            }
                                          } catch (error) {
                                            toast.error(
                                              `Error adding option`,
                                              error
                                            );
                                          }
                                        };

                                        addProductOption(scopedFormData);
                                      }}
                                    >
                                      Create Option
                                    </Button>
                                  )}
                              </Stack>
                              <AutocompleteArrayInput
                                disabled={
                                  (product &&
                                    product.options &&
                                    product.options.length &&
                                    scopedFormData["title"] == null) ||
                                  !product?.options
                                    .map((opt) => opt?.title?.toLowerCase())
                                    .includes(
                                      scopedFormData["title"].toLowerCase()
                                    )
                                }
                                sx={{
                                  "& .RaAutocompleteInput-textField": {
                                    xl: { minWidth: "44vw" },
                                    lg: { minWidth: "41vw" },
                                    md: { minWidth: "75vw" },
                                    sm: { minWidth: "75vw" },
                                  },
                                }}
                                // fullWidth
                                onCreate={(newOptionName) => {
                                  console.log(scopedFormData);
                                  const newOption = {
                                    id: newOptionName.toLowerCase(),
                                    name: newOptionName,
                                  };
                                  options.push(newOption);
                                  return newOption;
                                }}
                                label="Variations"
                                source={getSource("variations")}
                                record={scopedFormData}
                                helperText="Eg. Blue, Red, Black"
                                choices={options.concat(
                                  scopedFormData?.variations?.map((v) => {
                                    return { id: v, name: v };
                                  })
                                )}
                                createItemLabel={`Add a new ${scopedFormData["title"]} : %{item}`}
                              />
                            </React.Fragment>
                          );
                        }}
                      </FormDataConsumer>
                    </SimpleFormIterator>
                  </ArrayInput>
                </Stack>
              </Stack>
              <Stack maxWidth={"-webkit-fill-available"}>
                <Stack direction="row" justifyContent={"start"}>
                  <Typography className="input_title">
                    Product Variants
                  </Typography>
                </Stack>
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
                  }}
                >
                  <ArrayInput source="variants" label=" ">
                    <SimpleFormIterator
                      fullWidth
                      inline
                      sx={{ gap: "10px", "& .RaSimpleFormIterator-form": {} }}
                    >
                      <FormDataConsumer>
                        {({ scopedFormData, formData, getSource }) => (
                          <NestedVariantInput
                            scopedFormData={scopedFormData}
                            getSource={getSource}
                            formData={formData}
                            currncy={currncy}
                          />
                        )}
                      </FormDataConsumer>
                    </SimpleFormIterator>
                  </ArrayInput>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Attributes",
      summarySubTitle: "Used for shipping and customs purposes.",
      body: (
        <Stack
          //   maxWidth={{ lg: "90vw", md: "90vw", sm: "90vw", xs: "100vw" }}
          alignItems={"center"}
          width="-webkit-fill-available"
        >
          <Stack direction={"row"} justifyContent={"start"}>
            <Stack maxWidth={"-webkit-fill-available"} spacing={3}>
              <Stack maxWidth={"-webkit-fill-available"}></Stack>
            </Stack>
          </Stack>
          <Stack maxWidth={"-webkit-fill-available"}>
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
              marginTop={"20px"}
            >
              <Stack justifyContent={"start"} spacing={1}>
                {/* <Typography className="section_subtitle">
                Used for shipping and customs purposes.
              </Typography> */}
                <Typography className="input_title">Dimensions</Typography>
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
                  width={{ lg: "20%", md: "45%", xs: "100%" }}
                  minWidth={"200px"}
                >
                  <Typography className="input_title">Width</Typography>
                  <NumberInput source="width" fullWidth variant="outlined" />
                </Stack>
                <Stack
                  spacing={2}
                  padding={{ md: 3, sm: 2, xs: 0 }}
                  paddingX={{ md: "16px !important" }}
                  paddingBottom={{ md: "0px !important" }}
                  width={{ lg: "20%", md: "45%", xs: "100%" }}
                  minWidth={"200px"}
                >
                  <Typography className="input_title">Length</Typography>
                  <NumberInput source="length" fullWidth variant="outlined" />
                </Stack>
                <Stack
                  spacing={2}
                  padding={{ md: 3, sm: 2, xs: 0 }}
                  paddingX={{ md: "16px !important" }}
                  paddingBottom={{ md: "0px !important" }}
                  width={{ lg: "20%", md: "45%", xs: "100%" }}
                  minWidth={"200px"}
                >
                  <Typography className="input_title">Height</Typography>
                  <NumberInput source="height" fullWidth variant="outlined" />
                </Stack>
                <Stack
                  spacing={2}
                  padding={{ md: 3, sm: 2, xs: 0 }}
                  paddingX={{ md: "16px !important" }}
                  paddingBottom={{ md: "0px !important" }}
                  width={{ lg: "20%", md: "45%", xs: "100%" }}
                  minWidth={"200px"}
                >
                  <Typography className="input_title">Weight</Typography>
                  <NumberInput source="weight" fullWidth variant="outlined" />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack maxWidth={"-webkit-fill-available"}>
            <Stack direction="row" justifyContent={"start"}>
              <Typography className="input_title">Customs</Typography>
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
                  spacing={2}
                  padding={{ md: 3, sm: 2, xs: 0 }}
                  paddingX={{ md: "16px !important" }}
                  paddingBottom={{ md: "0px !important" }}
                  width={{ lg: "50%", md: "45%", xs: "100%" }}
                  minWidth={"250px"}
                >
                  <Typography className="input_title">MID Code</Typography>
                  <NumberInput source="mid_code" fullWidth variant="outlined" />
                </Stack>
                <Stack
                  spacing={2}
                  padding={{ md: 3, sm: 2, xs: 0 }}
                  paddingX={{ md: "16px !important" }}
                  paddingBottom={{ md: "0px !important" }}
                  width={{ lg: "50%", md: "45%", xs: "100%" }}
                  minWidth={"250px"}
                >
                  <Typography className="input_title">HS Code</Typography>
                  <NumberInput source="hs_code" fullWidth variant="outlined" />
                </Stack>
              </Stack>
              <Stack
                width={"-webkit-fill-available"}
                maxWidth={{ md: "100%", sm: "80vw", xs: "90vw" }}
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
                  <Typography className="input_title">
                    Country of origin
                  </Typography>
                  <NumberInput
                    source="origin_country"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Thumbnail",
      summarySubTitle:
        "Used to represent your product during checkout, social sharing and more.",
      body: (
        <Stack
          maxWidth={{ lg: "90vw", md: "80vw", sm: "75vw", xs: "70vw" }}
          alignItems={"center"}
          justifyContent={"center"}
          width="-webkit-fill-available"
        >
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            width="-webkit-fill-available"
          >
            <Stack>
              <Stack
                direction="column"
                // maxWidth={{ md: "85%" }}
                justifyContent={"center"}
                alignItems={"center"}
                width="80vw"
                sx={{
                  "& .ra-input-pictures": {
                    display: "grid",
                  },
                }}
              >
                <MediaPickerInput source="thumbnail" type="single" />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
    {
      summaryTitle: "Media",
      summarySubTitle: "Add images to your product.",
      body: (
        <Stack
          //   maxWidth={{ lg: "90vw", md: "90vw", sm: "90vw", xs: "100vw" }}
          alignItems={"center"}
          width="-webkit-fill-available"
        >
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            width="-webkit-fill-available"
          >
            <Stack>
              <Stack
                direction="column"
                // maxWidth={{ md: "85%" }}
                justifyContent={"center"}
                alignItems={"center"}
                width="80vw"
                sx={{
                  "& .ra-input-pictures": {
                    display: "grid",
                  },
                }}
              >
                
                <MediaPickerInput source="images" record={product} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ),
    },
  ];

  return (
    <SimpleForm
      defaultValues={{
        ...product,
        options: product?.options.map((opt) => {
          return {
            ...opt,
            variations: opt.values.map((o) => {
              return o.value;
            }),
          };
        }),
        variants: product?.variants.map((vars) => {
          return {
            ...vars,
            amount: vars?.prices?.filter((o) => {
              return (
                o.currency_code ===
                identity?.data?.medusa_store?.default_currency_code
              );
            })[0]?.amount,
            currency: identity?.data?.medusa_store?.default_currency_code,
          };
        }),
      }}
      toolbar={<SaveToolbar type={type} product={product} />}
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
