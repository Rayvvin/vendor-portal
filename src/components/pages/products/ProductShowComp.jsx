/* eslint-disable react/prop-types */
import Divider from "@mui/material/Divider";
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
  WrapperField,
} from "react-admin";
import { useMediaQuery, Fab } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParentSize } from "@cutting/use-get-parent-size";
// import type { U}  from "@cutting/use-get-parent-size";
import DataGridWithIndex from "../../elements/dataGridWithIndex";
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
import { toTitleCase } from "../../helpers/helpers";
import ProductAsideComp from "./ProductAsideComp";
import Medusa from "@medusajs/medusa-js";
import ReactJson from "@microlink/react-json-view";

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

export const StatusField = () => {
  const record = useRecordContext();
  let color = "";
  switch (record.status) {
    case "published":
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
        sx={{
          fontSize: { md: "15px", sm: "13px", xs: "14px" },
          overflowWrap: "break-word !important",
        }}
        component={"p"}
      >
        {record.status}
      </Box>
    </Stack>
  );
};

export const JSONField = (props) => {
  const { source, product } = props;
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
        {product ? (
          <ReactJson src={product} collapsed={0} />
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
          fontSize: { md: "15px", sm: "13px", xs: "14px" },
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
                  fontSize: { md: "15px", sm: "13px", xs: "14px" },
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
                    fontSize: { md: "15px", sm: "13px", xs: "14px" },
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

export default function ProductShowComp(props) {
  const { setShowTitle, product, setProduct } = props;
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
  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });
  const slider1 = useRef();
  const slider2 = useRef();

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  useEffect(() => {
    if (slider1.current && slider2.current) {
      slider1.current.sync(slider2.current.splide);
    }
  }, [slider1, slider2]);

  useEffect(() => {
    if (record) {
      medusa.products.retrieve(record.id).then(({ product }) => {
        // console.log(product);
        setProduct(product);
      });
    }
  }, [record]);

  useEffect(() => {
    if (product) {
      console.log(product);
    }
  }, [product]);

  // const { width, height } = useParentSize(curr_content_card, {width: 100, height: 50, callback: ()=>{
  //   console.log("here", curr_content_card)
  // }});

  const listRowSx = (record, index) => ({
    // margin: "10px",
  });

  const _details_list = [
    "Subtitle",
    "Handle",
    "Type",
    "Collection",
    "Discountable",
    "Metadata",
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
              <TextField
                source="title"
                sx={{
                  fontSize: { sm: "23px", md: "23px", xs: "20px" },
                  fontWeight: "600",
                }}
              />
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <StatusField source="status" />
            </Stack>
          </Stack>
          <Stack>
            <TextField
              source="description"
              sx={{ fontSize: { md: "15px", sm: "13px", xs: "14px" } }}
            />
          </Stack>

          <DetailsList fields={_details_list} title={"Details"} />
        </Stack>

        {isXLarge && (
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            marginTop={"10px"}
          >
            <Stack
              width={"-webkit-fill-available"}
              maxWidth={{ md: "45%", sm: "90vw" }}
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
                    fontSize: { sm: "23px", md: "23px", xs: "20px" },
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
              maxWidth={{ md: "45%", sm: "90vw" }}
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
                    fontSize: { sm: "23px", md: "23px", xs: "20px" },
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
        )}

        <Stack
          className="card"
          spacing={3}
          padding={{ md: 4, sm: 3, xs: 2 }}
          margin={1}
          // ref={curr_content_card}
          // sx={{

          // }}
        >
          <Stack>
            <Typography
              sx={{
                fontSize: { sm: "23px", md: "23px", xs: "20px" },
                fontWeight: "500",
              }}
            >
              Variants
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            flexWrap="wrap"
            spacing={"8px !important"}
            // divider={<Divider orientation="vertical" flexItem />}
          >
            {product?.options.map((opts, i) => {
              return (
                <Stack
                  key={i}
                  spacing={1}
                  marginTop={"8px !important"}
                  marginLeft={"8px !important"}
                >
                  <Stack direction={"row"}>
                    <Typography
                      sx={{ fontSize: { md: "15px", sm: "13px", xs: "14px" } }}
                    >{`${opts.title}(s)`}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {opts.values
                      .map((opt_val) => opt_val.value)
                      .filter(onlyUnique)
                      .map((opt_value, i) => {
                        return <Chip key={i} label={opt_value} />;
                      })}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>

          <Stack>
            <Typography
              sx={{
                fontSize: { md: "15px", sm: "13px", xs: "14px" },
                fontWeight: "500",
              }}
            >
              Product Variants (
              <ReferenceManyCount
                label="Product Variants"
                reference="product_variant"
                target="product_id"
                // link
              />
              )
            </Typography>
          </Stack>
          <Stack
            // overflow={"auto"}
            // width={"100%"}
            maxWidth={sidebarState[0] && !isSmall ? "calc(95vw - 240px) !important" : '-webkit-fill-available'}
            paddingY={2}
            // paddingTop='2px !important'
            marginTop={'0px !important'}
            // height={"380px"}
            // className="card"
            // width={`${isSmall ? "85vw !important" : "calc(100% - 400px)"}`}
            // overflow={"hidden"}
            sx={{
              "& .RaDatagrid-rowEven": {
                background: "none !important",
              },
            }}
          >
            <Stack
              className="list_container"
              // width={`${isSmall ? "80vw !important" : "100%"}`}
              maxWidth={sidebarState[0] && !isSmall ? "calc(95vw - 240px) !important" : '-webkit-fill-available'}
              overflow={"auto"}
              sx={{
                transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                scrollbarColor: "#8d9498 rgba(0, 0, 0, 0.1)",
                scrollbarWidth: "thin",
              }}
            >
              <List
                resource={"product_variant"}
                actions={false}
                disableSyncWithLocation
                // perPage={10}
                title={" "}
                error={false}
                pagination={false}
                filter={record && record.id ? { product_id: record.id } : null}
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
                <Stack
                  className="list_container"
                  // minHeight={'350px'}
                  backgroundColor={theme && theme === "dark" ? "#222" : "#fff"}
                  color={theme && theme === "dark" ? "#fff" : "inherit"}
                  overflow={"hidden"}
                  // width={`${sidebarState[0] && !isSmall ? "calc(100% - 240px) !important" : "90vw"}`}
                  sx={{
                    borderRadius: "4px",
                    transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                    scrollbarColor: "#8d9498 rgba(0, 0, 0, 0.1)",
                    scrollbarWidth: "thin",
                    "& .MuiTable-root": {
                      // width: "100%",
                      transition:
                        "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
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
                  <Datagrid size={"large"} bulkActionButtons={false}>
                    <TextField source="title" />
                    <WrapperField
                      label={`Options (${
                        product && product.options
                          ? product.options.map((opts) => ` ${opts.title}`)
                          : ""
                      })`}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                      >
                        {product?.options.map((opts, i) => {
                          // console.log(opts);
                          return (
                            <ReferenceManyField
                              key={i}
                              target="variant_id"
                              reference="product_option_value"
                              filter={{ option_id: opts.id }}
                              label="Options"
                            >
                              <WithListContext
                                render={({ isPending, data }) =>
                                  !isPending && (
                                    <Stack direction="row" spacing={1}>
                                      {data?.map((tag) => {
                                        return (
                                          <TextField
                                            key={tag.id}
                                            source="value"
                                            record={tag}
                                          />
                                        );
                                      })}
                                    </Stack>
                                  )
                                }
                              />
                            </ReferenceManyField>
                          );
                        })}
                      </Stack>
                    </WrapperField>
                    <ReferenceManyField
                      target="variant_id"
                      // source="product_id"
                      reference="product_option_value"
                      // filter={{ is_published: true }}
                    ></ReferenceManyField>
                    <TextField
                      source="inventory_quantity"
                      label={"Inventory"}
                      emptyText={"-"}
                    />
                  </Datagrid>
                </Stack>
              </List>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          className="card"
          spacing={2}
          padding={{ md: 4, sm: 3, xs: 2 }}
          margin={1}
        >
          <Typography
            sx={{
              fontSize: { sm: "23px", md: "23px", xs: "20px" },
              fontWeight: "600",
            }}
          >
            Attributes
          </Typography>

          <DetailsList fields={_dimensions_list} title={"Dimensions"} />

          <DetailsList fields={_customs_list} title={"Customs"} />
        </Stack>

        <Stack
          className="card"
          spacing={2}
          padding={{ md: 4, sm: 3, xs: 2 }}
          margin={1}
        >
          <Typography
            sx={{
              fontSize: { sm: "23px", md: "23px", xs: "20px" },
              fontWeight: "500",
            }}
          >
            RAW JSON
          </Typography>

          <JSONField product={product} />
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
