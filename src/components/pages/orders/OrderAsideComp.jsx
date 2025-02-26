/* eslint-disable react/prop-types */
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
  ReferenceManyField,
  WithListContext,
  ListBase,
} from "react-admin";
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
  Chip,
} from "@mui/material";
import { toTitleCase } from "../../helpers/helpers";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { MoreVert, MoreHoriz } from "@mui/icons-material";

export function BasicTimeline(props) {
  const { items, position } = props;
  return (
    <Timeline
      position={position}
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {items &&
        items.length &&
        items.map((item, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot sx={{padding: '2px'}} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={item.sx}>{item.name}</TimelineContent>
            </TimelineItem>
          );
        })}
    </Timeline>
  );
}

export default function OrderAsideComp(props) {
  const { record, isLoading } = useShowContext();
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
  const { product, setProduct } = props;
  const slider1 = useRef();
  const slider2 = useRef();
  const [timeline, setTimeline] = useState([
    { name: "Order Recieved", sx: { fontSize: "15px" } },
  ]);

  useEffect(() => {
    if (slider1.current && slider2.current) {
      slider1.current.sync(slider2.current.splide);
    }
  }, [slider1, slider2]);

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

  useEffect(() => {
    if (product) {
      console.log(product.images);
    }
  }, [product]);
  if (!record) return null;
  return (
    <Card>
    <SimpleShowLayout>
      <Stack
        spacing={2}
        paddingX={1}
        paddingY={2}
        paddingTop={0}
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
        }}
      >
        <Stack
          // className="card"
          spacing={2}
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
                fontSize: { sm: "19px", md: "20px", xs: "18px" },
                fontWeight: "500",
              }}
            >
              Timeline
            </Typography>
          </Stack>
          <Stack
            padding={2}
            overflow={"auto"}
            width={"100%"}
            direction={'row'}
            borderRadius={1}
            backgroundColor={"var(--onyx-row)"}
          >
          </Stack>
          <BasicTimeline items={timeline} />
        </Stack>

        {/* <Stack
          className="card"
          spacing={2}
          padding={{ md: 4, sm: 3, xs: 2 }}
          margin={1}
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
        </Stack> */}
      </Stack>
    </SimpleShowLayout>
    </Card>
  );
}
