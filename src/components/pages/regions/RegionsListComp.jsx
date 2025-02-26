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
  ReferenceManyCount,
  SimpleForm,
  SimpleList,
  ReferenceManyField,
  WithListContext,
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
import {
  MoreVert,
  MoreHoriz,
  ShoppingCart,
  Store,
  LocationOn,
} from "@mui/icons-material";
import ReactCountryFlag from "react-country-flag";

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
      height: "35px",
      width: "35px",
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

const CustAvatar = (props) => {
  // const { source, currencies, currncy } = props;
  const record = useRecordContext();

  return (
    <Avatar
      {...stringAvatar(
        `${(
          <ReferenceField source="store_id" reference="store">
            <TextField source="name" />
          </ReferenceField>
        )}`
      )}
    />
  );
};

const RegionCountriesField = (props) => {
  const { source, currencies, currncy } = props;
  const record = useRecordContext();
  return (
    <Stack
      // component={"span"}
      maxWidth={"150px"}
      display={"inline-block"}
      textOverflow={"ellipsis"}
      whiteSpace={"nowrap"}
      overflow={"hidden"}
      direction={"row"}
      spacing={1}
      alignItems={"center"}
    >
      {/* <Avatar
        src={record.thumbnail}
        sx={{
          borderRadius: "9px",
          bgcolor: stringToColor(
            record?.metadata?.businessName
              ? record?.metadata?.businessName
              : record.id
          ),
        }}
      >
        <Store />
      </Avatar> */}
      (
      <ReferenceManyCount
        label="Countries"
        reference="country"
        target="region_id"
        // link
      />
      )
      <ReferenceManyField
        label="Countries"
        reference="country"
        target="region_id"
      >
        <WithListContext
          render={({ isLoading, data }) => {
            console.log(data);
            return (
              !isLoading &&
              data.flatMap((country) => (
                <Fragment>{` ${country.display_name},`}</Fragment>
              ))
            );
          }}
        />
      </ReferenceManyField>
    </Stack>
  );
};

const RegionField = (props) => {
  const { source, currencies, currncy } = props;
  const record = useRecordContext();
  return (
    <Stack
      // component={"span"}
      maxWidth={"150px"}
      display={"inline-block"}
      textOverflow={"ellipsis"}
      whiteSpace={"nowrap"}
      overflow={"hidden"}
      direction={"row"}
      spacing={1}
      alignItems={"center"}
    >
      <ReferenceManyField
        label="Countries"
        reference="country"
        target="region_id"
      >
        <WithListContext
          render={({ isLoading, data }) => {
            console.log(data);
            return (
              !isLoading &&
              [data[0]].flatMap((country) => (
                <WrapperField label="Region">
                  <ReactCountryFlag
                    className="emojiFlag"
                    countryCode={`${country.iso_2}`}
                    style={{
                      fontSize: "2em",
                      lineHeight: "2em",
                    }}
                    aria-label={`${country.display_name}`}
                    svg
                  />
                  <TextField source="name" label="Region" />
                </WrapperField>
              ))
            );
          }}
        />
      </ReferenceManyField>
    </Stack>
  );
};

const OrdersCountField = (props) => {
  const { source, currencies, currncy } = props;
  const record = useRecordContext();
  return (
    <ReferenceManyCount
      label="Orders"
      reference="order"
      target="customer_id"
      // link
    />
  );
};

const ProductsCountField = (props) => {
  const { source, currencies, currncy } = props;
  const record = useRecordContext();
  return (
    <ReferenceManyCount
      label="Products"
      reference="product"
      target="store_id"
      // link
    />
  );
};

export default function RegionListComp(props) {
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
  // useEffect(() => {
  //   console.log(record, isLoading);
  // }, [record, isLoading]);
  if (!record) return null;
  return (
    <Stack
      direction="row"
      padding={0}
      width={
        sidebarState[0] && !isSmall ? "calc(95vw - 240px) !important" : "93vw"
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

        backgroundColor: `${
          isSmall
            ? "transparent !important"
            : theme && theme === "dark"
            ? "#222"
            : "#fff"
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
                          fontSize: "2em",
                          lineHeight: "2em",
                        }}
                        aria-label={`${country.display_name}`}
                        svg
                      />
                    ))
                  );
                }}
              />
            </ReferenceManyField>
          )}
          // rightIcon={(record) => <MoreVert />}
          primaryText={(record) =>
            `${record.name} Region - Tax Rate: ${record.tax_rate}`
          }
          secondaryText={(record) => (
            <Stack direction="row" spacing={1} divider={<p>-</p>}>
              <span>
                <ReferenceManyCount
                  label="Countries"
                  reference="country"
                  target="region_id"
                  // link
                />
                {` Countries`}
              </span>

              <span>
                {`Currency: `}
                <TextField source="currency_code" label="Default Currency" />
              </span>

              <span>
                {/* {`Joined `} */}
                <DateField
                  source="created_at"
                  label="Date Added"
                  options={{
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }}
                />
              </span>
            </Stack>
          )}
          linkType={(record) => (record.canEdit ? "edit" : "show")}
        />
      ) : (
        <Datagrid size="medium" bulkActionButtons={false} rowClick="show">
          <RegionField label="Region" />

          <RegionCountriesField label="Countries" />
          <TextField source="currency_code" label="Default Currency" />
          <TextField source="tax_rate" />

          <DateField
            source="created_at"
            label="Date Added"
            options={{
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
        </Datagrid>
      )}
    </Stack>
  );
}
