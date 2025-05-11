/* eslint-disable react/prop-types */
// MediaPickerInput.js
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  useInput,
  FileField,
  FileInput,
  SimpleForm,
  ImageInput,
  ImageField,
  useRedirect,
  useTranslate,
  useTheme,
  useGetIdentity,
  Toolbar,
  SaveButton,
} from "react-admin";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import MediaPickerModal from "./MediaPickerModal";
import { useMediaQuery, Fab } from "@mui/material";
import UploadButton from "./UploadButton";
import theme from "../../../theme/Theme";
import CenteredTab from "../../tabs/centeredTab";
import Medusa from "@medusajs/medusa-js";
import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";

const MediaPickerInput = (props) => {
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { type, record, source, upload_source, getSource } = props;
  const [inputType, setInputType] = useState(type ? type : "multi");
  const {
    field: { onChange, value, name },
  } = useInput(props);
  const [selectedImages, setSelectedImages] = useState(value);
  const [tabState, setTabState] = useState(null);
  const form = useWatch();
  const { setValue } = useFormContext();

  const [open, setOpen] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const firstLoadCount = useRef(0);

  const handleSelectImages = () => {
    if (selectedImages.length) {
      onChange(inputType == "single" ? selectedImages[0] : selectedImages);
    }
    setOpen(false);
  };

  const SaveToolbar = (props) => {
    const { type, product, setValue } = props;
    const [theme, setTheme] = useTheme();
    const translate = useTranslate();
    const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const identity = useGetIdentity();
    const [Thumb_data, setThumb_data] = useState(null);
    const medusa = new Medusa({
      maxRetries: 3,
      baseUrl: import.meta.env.VITE_MEDUSA_URL,
      apiKey: identity?.data?.medusa_user?.api_token,
    });

    const redirect = useRedirect();

    const handleSubmitWithImage = async (data) => {
      if (!data.image_upload) {
        toast.warning(`You need at least 1 image file to initiate upload`);
        return;
      }
      await toast.promise(
        medusa.admin.uploads
          .create(data.image_upload.map((img) => img.rawFile))
          .then(({ uploads }) => {
            if (uploads.length) {
              if (typeof selectedImages == "string" && selectedImages == "") {
                if (uploads.length > 0) {
                  setSelectedImages((prev) => uploads.map((img) => img.url));
                }
              } else if (Array.isArray(selectedImages)) {
                setSelectedImages((prev) =>
                  prev.concat(uploads.map((img) => img.url))
                );
              }
              setValue(upload_source, null);

              setOpen(false);
            }
          }),
        {
          pending: "Uploading Images",
          success: "Images Uploaded 👌",
          error: "Upload Failed",
        }
      );
    };

    return (
      <Toolbar
        sx={{
          // width: '100%',
          justifyContent: isSmall ? "flex-end" : "center",
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
          // variant="outlined"
          variant="contained"
          type="button"
          color="primary"
          disabled={
            type == "edit"
              ? !(record && record.image_upload && record.image_upload.length)
              : record
              ? !(record && record.image_upload && record.image_upload.length)
              : !(form && form.image_upload && form.image_upload.length)
          }
          // fullWidth
          style={{
            padding: "5px 45px",
          }}
          onClick={(e) => {
            if (record && record.image_upload) {
              handleSubmitWithImage({ ...record });
            } else if (form && form.image_upload) {
              handleSubmitWithImage({ ...form });
            }
          }}
        >
          {/* {loading && <CircularProgress size={25} thickness={2} />} */}
          {translate("Upload Images")}
        </Button>
      </Toolbar>
    );
  };

  useEffect(() => {
    // console.log(record);
    // if (
    //   record &&
    //   record[source] &&
    //   typeof record[source] != "string" &&
    //   record[source].length
    // ) {
    //   if (firstLoad && firstLoadCount.current <= 1 && upload_source) {
    //     onChange(record[source].map((imgObj) => imgObj.url));
    //     setSelectedImages(record[source].map((imgObj) => imgObj.url));
    //     firstLoadCount.current += 1;
    //   } else {
    //     setFirstLoad(false);
    //   }
    // }
  }, [record]);

  useEffect(() => {
    if (selectedImages.length) {
      console.log(record);
      // if (getSource && !record.thumbnail) {
      //   setValue(getSource("thumbnail"), selectedImages[0]);
      // } else if (!form.thumbnail) {
      //   setValue("thumbnail", selectedImages[0]);
      // }

      if (typeof selectedImages == "string") {
        onChange(inputType == "single" && selectedImages);
      } else if (Array.isArray(selectedImages)) {
        onChange(inputType == "single" ? selectedImages[0] : selectedImages);
      }
    }
  }, [selectedImages]);

  useEffect(() => {
    if (form && form.image_upload && form.image_upload.length) {
      console.log(form);
    }
  }, [form]);

  const MediaInput = (
    <ImageInput
      source={upload_source ? upload_source : "image_upload"}
      // format={(value) => {
      //   // console.log(value);
      //   // return value.map((img) => {
      //   //   return { src: img };
      //   // });
      // }}
      label=" "
      multiple
      // maxSize={30000000}
      // accept={{ "image/*": [".png", ".jpeg"] }}
      placeholder={
        <Stack
          border={`2px dashed ${
            theme && theme === "dark" ? "rgba(244, 244, 244, .4)" : "#007867"
          }`}
          borderRadius="6px"
          paddingY={5}
          paddingX={5}
          width="100%"
          // maxWidth={{ md: "95%" }}
          fontSize="14px"
          color={"#007867"}
        >
          <p style={{ fontSize: "13px" }}>
            <span>
              Drop your images here, or{" "}
              <span className="input_title">click to browse</span>
            </span>
          </p>
        </Stack>
      }
    >
      <ImageField source="src" title="title" />
    </ImageInput>
  );

  return (
    <>
      {/* <Button variant="outlined" onClick={() => setOpen(true)}>
        {value && value.length > 0 ? "Change Images" : "Select Images"}
      </Button> */}
      <Stack width={"100%"} px={1} py={2} alignItems={"center"} marginY={3}>
        <Stack
          onClick={() => setOpen(true)}
          border={`1px dashed ${
            theme && theme === "dark" ? "rgba(244, 244, 244, .4)" : "#007867"
          }`}
          borderRadius="6px"
          paddingY={7}
          paddingX={5}
          width="90%"
          // maxWidth={{ md: "95%" }}
          fontSize="14px"
          color={"#6b7280"}
          alignItems={"center"}
        >
          {value ? (
            typeof value === "string" ? (
              <Stack alignItems={"center"}>
                <Box component="img" width={100} src={value} alt={""} />
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "15px",
                    textAlign: "center",
                  }}
                >
                  <span>
                    {`Click to ${
                      value && value != ""
                        ? "Change Images"
                        : "Select from Gallery"
                    } `}
                    or <span className="input_title">Upload a new one</span>
                  </span>
                </p>
              </Stack>
            ) : (
              <>
                <Grid container spacing={2} justifyContent={"center"}>
                  {value.slice(0, 8).map((img, index) => {
                    if (index >= 7 && value.length >= 9) {
                      return (
                        <Grid
                          item
                          key={index}
                          xs={3}
                          sm={3}
                          md={3}
                          lg={2}
                          xl={1}
                          style={{ position: "relative" }}
                        >
                          <Box
                            key={index}
                            component="img"
                            width={100}
                            src={img}
                            alt={""}
                            style={{ opacity: 0.4 }}
                          />
                          <p
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                              fontSize: "18px",
                              fontWeight: "700",
                              // color: 'white'
                            }}
                          >
                            {`+${value.length - 8}`}
                          </p>
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid
                          item
                          key={index}
                          xs={3}
                          sm={3}
                          md={3}
                          lg={2}
                          xl={1}
                        >
                          <Box
                            key={index}
                            component="img"
                            width={100}
                            src={img}
                            alt={""}
                          />
                        </Grid>
                      );
                    }
                  })}
                </Grid>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "15px",
                    textAlign: "center",
                  }}
                >
                  <span>
                    {`Click to ${
                      value && value.length > 0
                        ? "Change Image(s)"
                        : "Select from Gallery"
                    } `}
                    or <span className="input_title">Upload a new one</span>
                  </span>
                </p>
              </>
            )
          ) : (
            <>
              <p style={{ fontSize: "13px", textAlign: "center" }}>
                <span>
                  Click to Select from Gallery or{" "}
                  <span className="input_title">Upload a new one</span>
                </span>
              </p>
              <p
                style={{
                  fontSize: "11px",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {`Note: This input requires ${
                  inputType === "single" ? "a single image" : "multiple images"
                }`}
              </p>
            </>
          )}
        </Stack>
      </Stack>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        // maxWidth="lg"
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen={fullScreen}
        // fullWidth={true}
        fullWidth
      >
        <DialogTitle>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <p>Media Manager</p>
            <Button
              type="button"
              color="primary"
              onClick={(e) => {
                setOpen(false);
              }}
            >
              <Close />
            </Button>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <CenteredTab setTabState={setTabState}>
            {[
              {
                label: "Select Images",
                child: (
                  <Stack px={2}>
                    <MediaPickerModal
                      onSelect={handleSelectImages}
                      value={value}
                      selectedImages={selectedImages}
                      setSelectedImages={setSelectedImages}
                      inputType={inputType}
                    />
                  </Stack>
                ),
              },
              {
                label: "Upload Images",
                child: <Stack px={2}>{MediaInput}</Stack>,
              },
            ]}
          </CenteredTab>
        </DialogContent>

        <DialogActions>
          <Stack direction={"row"}>
            {tabState &&
              {
                "Select Images": (
                  <Fragment>
                    <Button
                      // variant="contained"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        onChange(null);
                        setSelectedImages([]);
                        setOpen(false);
                      }}
                      style={{ marginInline: 8 }}
                    >
                      Clear
                    </Button>
                    <Button
                      // variant="contained"
                      variant="outlined"
                      color="primary"
                      onClick={handleSelectImages}
                      style={{ marginInline: 8 }}
                    >
                      Confirm Selection
                    </Button>
                  </Fragment>
                ),
                "Upload Images": <SaveToolbar setValue={setValue} />,
              }[tabState]}
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MediaPickerInput;
