/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Fragment, useEffect, useState } from "react";
import {
  useGetIdentity,
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
  useTheme,
  useSidebarState,
  Form,
  SelectInput,
} from "react-admin";
import { useMediaQuery, Fab } from "@mui/material";
import IconEvent from "@mui/icons-material/Event";
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
import Divider from "@mui/material/Divider";
import {
  TrendingUp,
  TrendingDown,
  Category,
  Visibility,
  People,
  ShoppingCart,
  MoneyOffCsred,
  ChevronRight,
  ChevronLeft,
  Key,
  CurrencyExchange,
  AccountCircle,
  LocationOn,
  Refresh,
  AccountTree,
  AccountBalance,
  Storefront,
  RestorePage,
  Edit,
  ArrowBack
} from "@mui/icons-material";
import {
  DescriptionField,
  StatusField,
  ThumbnailField,
} from "./components/pages/products/ProductListComp";
import { supabase } from "./supabase/SupabaseConfig";
import Medusa from "@medusajs/medusa-js";
import { ToastContainer, toast } from "react-toastify";

const Curr_Avatar = (props) => {
  const { av_size, av_font_size, name, symbol } = props;
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
        // bgcolor: stringToColor(name),
        bgColor: "rgba(243, 244, 246, 1)",
        height: av_size ? av_size : "35px",
        min_width: av_size ? av_size : "35px",
        fontSize: av_font_size ? av_font_size : "15px",
        borderRadius: "7px",
      },
      children: `${symbol}`,
    };
  }
  return <Avatar {...stringAvatar(`${name}`)} />;
};

const StoreCurrencies = () => {
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [currncs, setCurrncs] = useState(null);
  const [currncy, setCurrncy] = useState(null);
  const identity = useGetIdentity();
  const redirect = useRedirect();
  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });

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
      if (identity?.data?.medusa_store) {
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
  return (
    <Stack>
      <Stack>
        <Stack direction="row" marginTop={5} paddingX={2}>
          <Button
            sx={{
              fontSize: "12px",
              // fontWeight: "600",
              textTransform: 'capitalize'
            }}
            onClick={() => {
              redirect('/settings');
            }}
            // variant='outlined'
          >
            <ArrowBack fontSize="small" /> Back to Settings
          </Button>
        </Stack>
        <Stack direction="row" marginTop={0} paddingX={2}>
          <Typography
            sx={{
              fontSize: { sm: "23px", md: "23px", xs: "20px" },
              fontWeight: "600",
            }}
          >
            Currencies
          </Typography>
        </Stack>
        <Stack direction="row" marginTop={0} paddingX={2}>
          <Typography
            sx={{
              fontSize: { sm: "14px", md: "14px", xs: "14px" },
              // fontWeight: "600",
            }}
          >
            Manage the markets that you will operate within.
          </Typography>
        </Stack>
      </Stack>

      <Stack flex={"0 1 auto"} direction="row">
        <Stack width={"100%"}>
          {isLarge && (
            <Stack className="card" padding={3}>
              <Stack direction="row" paddingX={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Default store currency
                </Typography>
              </Stack>
              <Stack direction="row" marginTop={0} paddingX={1}>
                <Typography
                  sx={{
                    fontSize: { sm: "14px", md: "14px", xs: "14px" },
                    // fontWeight: "600",
                  }}
                >
                  This is the currency your prices are shown in.
                </Typography>
              </Stack>
              <Stack marginTop={2} paddingX={1}>
                <Form>
                  <SelectInput
                    source="default_currency"
                    fullWidth
                    defaultValue={
                      identity?.data?.medusa_store?.default_currency_code
                    }
                    choices={
                      currncs
                        ? currncs.map((crncy) => {
                            return {
                              id: crncy.currency_code,
                              name: `${crncy.currency_code.toUpperCase()} - ${
                                currncy &&
                                currncy.find(
                                  (t) => t.code == crncy.currency_code
                                ).name
                              }`,
                            };
                          })
                        : []
                    }
                    onChange={(crncy) => {
                      toast.promise(
                        medusa.admin.store
                          .update({
                            default_currency_code: crncy.target.value,
                          })
                          .then(({ store }) => {
                            // console.log(store);
                            identity.refetch();
                          })
                          .catch((e) => {
                            console.log(e);
                          }),
                        {
                          pending: "Updating Default Currency",
                          success: "Default currency updated",
                          error: "Default currency update failed",
                        }
                      );
                    }}
                  />
                </Form>
              </Stack>
            </Stack>
          )}
          <Stack className="card" padding={3}>
            <Stack direction="row" paddingX={1}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Store Currencies
              </Typography>
            </Stack>
            <Stack direction="row" marginTop={0} paddingX={1}>
              <Typography
                sx={{
                  fontSize: { sm: "14px", md: "14px", xs: "14px" },
                  // fontWeight: "600",
                }}
              >
                All the currencies available in your store.
              </Typography>
            </Stack>
            <Stack marginTop={1} spacing={1} paddingX={1}>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Currencies
              </Typography>
              {currncs
                ? currncs.map((crncy) => {
                    return (
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <Curr_Avatar
                          av_size="28px"
                          name={
                            currncy
                              ? currncy.find(
                                  (t) => t.code == crncy.currency_code
                                ).name
                              : null
                          }
                          symbol={
                            currncy
                              ? currncy.find(
                                  (t) => t.code == crncy.currency_code
                                ).symbol_native
                              : null
                          }
                        />
                        <Typography
                          sx={{
                            fontSize: { sm: "14px", md: "14px", xs: "14px" },
                            fontWeight: "600",
                          }}
                        >
                          {crncy.currency_code.toUpperCase()}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: { sm: "14px", md: "14px", xs: "14px" },
                            color: "#8d9498",
                            // fontWeight: "600",
                          }}
                        >
                          {currncy &&
                            currncy.find((t) => t.code == crncy.currency_code)
                              .name}
                        </Typography>
                        {crncy.currency_code ===
                          identity?.data?.medusa_store
                            ?.default_currency_code && (
                          <Chip
                            label="Default"
                            sx={{
                              height: "20px",
                              "& span": { padding: "10px" },
                            }}
                          />
                        )}
                      </Stack>
                    );
                  })
                : null}
            </Stack>
          </Stack>
        </Stack>

        {!isLarge && (
          <Stack className="card" width={"500px"} padding={3} height={'max-content'}>
            <Stack direction="row" paddingX={1}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Default store currency
              </Typography>
            </Stack>
            <Stack direction="row" marginTop={0} paddingX={1}>
              <Typography
                sx={{
                  fontSize: { sm: "14px", md: "14px", xs: "14px" },
                  // fontWeight: "600",
                }}
              >
                This is the currency your prices are shown in.
              </Typography>
            </Stack>
            <Stack marginTop={2} paddingX={1}>
              <Form>
                <SelectInput
                  source="default_currency"
                  fullWidth
                  defaultValue={
                    identity?.data?.medusa_store?.default_currency_code
                  }
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
                  onChange={(crncy) => {
                    toast.promise(
                      medusa.admin.store
                        .update({
                          default_currency_code: crncy.target.value,
                        })
                        .then(({ store }) => {
                          // console.log(store);
                          identity.refetch();
                        })
                        .catch((e) => {
                          console.log(e);
                        }),
                      {
                        pending: "Updating Default Currency",
                        success: "Default currency updated",
                        error: "Default currency update failed",
                      }
                    );
                  }}
                />
              </Form>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default StoreCurrencies;
