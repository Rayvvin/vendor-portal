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
  SimpleList,
  useGetIdentity,
  ReferenceManyField,
  WithListContext,
  ReferenceManyCount,
  WrapperField,
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
} from "@mui/material";
import { MoreVert, MoreHoriz } from "@mui/icons-material";

export const ThumbnailField = () => {
  const record = useRecordContext();
  return (
    <Box
      width={"20px"}
      height={"30px"}
      component="img"
      src={record.thumbnail}
      alt="img"
    ></Box>
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
                maxWidth={"300px"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
              >
                {
                  `${data
                    ?.map((item) => item.inventory_quantity)
                    .reduce((accumulator, currentValue) => {
                      return accumulator + currentValue;
                    }, 0)} in stock`
                  //  `for ${data.length} variant(s)`
                }
              </Box>
            )
          );
        }}
      />
    </ReferenceManyField>
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
  let bg_color = "";
  let border = "";
  switch (record.status) {
    case "published":
      color = "var(--emerald)";
      bg_color = "#EFFBF2";
      border = "1.42px solid #0EB757";
      break;

    default:
      color = "#eee";

      break;
  }
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      bgcolor={{ sm: "none", md: bg_color }}
      border={{ sm: "none", md: border }}
      borderRadius={"7.1px"}
      justifyContent={"center"}
      padding={"3px"}
    >
      <Box
        component={"div"}
        width={"5px"}
        height={"5px"}
        borderRadius={"90px"}
        backgroundColor={color}
      ></Box>
      <Box component={"p"}>{record.status}</Box>
    </Stack>
  );
};

export default function ProductListComp(props) {
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
  const identity = useGetIdentity();

  const listRowSx = (record, index) => ({
    // margin: "10px",
  });

  useEffect(() => {
    // console.log(record, isLoading);
  }, [record, isLoading]);
  if (!record) return null;
  return (
    <Stack
      direction="row"
      padding={0}
      width={
        sidebarState[0] && !isSmall ? "calc(95vw - 240px) !important" : "93vw"
      }
      backgroundColor={theme && theme === "dark" ? "#222" : "#fff !important"}
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
            : "#fff !important"
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
            "& .MuiAvatar-root": {
              borderRadius: "8px !important",
            },
          }}
          leftAvatar={(record) => (
            <Avatar
              src={record.thumbnail}
              // sx={{ borderRadius: "9px !important" }}
            >
              <MoreHoriz />
            </Avatar>
          )}
          // rightIcon={(record) => <MoreVert />}
          primaryText={(record) => record.title}
          secondaryText={(record) => (
            <Stack direction="row" spacing={1} divider={<p>-</p>}>
              <StatusField />
              <InventoryListField source="inventory" />
            </Stack>
          )}
          linkType={(record) => (record.canEdit ? "edit" : "show")}
        />
      ) : (
        <Datagrid
          size="small"
          rowClick="show"
          rowSx={listRowSx}
          bulkActionButtons={false}
        >
          {/* <TextField source="id" /> */}
          <ThumbnailField source="thumbnail" />
          <TextField source="title" />
          {/* <TextField source="subtitle" /> */}
          {/* <DescriptionField source="description" /> */}
          <InventoryListField source="inventory" />
          <WrapperField label="Variants">
            <ReferenceManyCount
              label="Variants"
              reference="product_variant"
              target="product_id"
            />{" "}
            variants
          </WrapperField>
          <StatusField source="status" />

          {/* <BooleanField source="is_giftcard" /> */}
          {/* <NumberField source="weight" />
              <NumberField source="length" />
              <NumberField source="height" />
              <NumberField source="width" />
              <TextField source="hs_code" /> */}
          {/* <TextField source="origin_country" /> */}
          {/* <TextField source="mid_code" />
              <TextField source="material" /> */}
          <DateField
            source="created_at"
            options={{
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
          <DateField
            source="updated_at"
            label="Last Updated at"
            options={{
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
          {/* 
              <TextField source="deleted_at" />
              <TextField source="metadata" />
              <ReferenceField source="collection_id" reference="collections" />
              <ReferenceField source="type_id" reference="types" />
              <BooleanField source="discountable" /> */}
          {/* <ReferenceField source="external_id" reference="externals" /> */}
          {/* <ReferenceField source="store_id" reference="stores" /> */}
        </Datagrid>
      )}
    </Stack>
  );
}
