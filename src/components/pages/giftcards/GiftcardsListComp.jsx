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
} from "react-admin";
import { useMediaQuery, Fab } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CardActions,
  Stack,
  Card,
  Avatar,
} from "@mui/material";

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

export default function GiftcardListComp(props) {
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
  useEffect(() => {
    console.log(record, isLoading);
  }, [record, isLoading]);
  if (!record) return null;
  return (
    <Stack
      direction="row"
      padding={0}
      width={
        sidebarState[0] && !isSmall ? "calc(95vw - 240px) !important" : "90vw"
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
        "& .MuiTable-root": {
          width: `${
            sidebarState[0] && !isSmall
              ? "calc(95vw - 240px) !important"
              : "90vw"
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
      <Datagrid size="medium" bulkActionButtons={false}>
        {/* <TextField source="id" /> */}
        <TextField source="code" />
        <TextField source="value" />
        <TextField source="balance" />
        <DateField source="ends_at" />
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
          options={{
            year: "numeric",
            month: "long",
            day: "numeric",
          }}
        />
        {/* <TextField source="deleted_at" /> */}
        {/* <TextField source="metadata" /> */}
      </Datagrid>
    </Stack>
  );
}
