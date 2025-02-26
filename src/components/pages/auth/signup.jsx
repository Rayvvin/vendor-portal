import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
// import bg from '../../dashboard/images/bg.jpg'

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Stack,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import {
  Form,
  required,
  TextInput,
  DateInput,
  CheckboxGroupInput,
  useTranslate,
  useRedirect,
  useLogin,
  useNotify,
  useStore,
  email,
  minLength,
  maxLength,
  PasswordInput,
  SelectInput,
} from "react-admin";
// import { client } from '../../App';
import Box from "@mui/material/Box";
import { useMediaQuery, Fab } from "@mui/material";
import Medusa from "@medusajs/medusa-js";
import CenteredTab from "../../tabs/centeredTab";
import { useWatch } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";

const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: "https://eke.afriomarkets.com",
  apiKey: "usr_01HPESKGDTMNHYK8HXH1A7AP4Q",
});

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase URL and key
const supabase = createClient(
  import.meta.env.VITE_BASE_URL,
  import.meta.env.VITE_ANON_KEY
);

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showVendor, setShowVendor] = useState(false);
  const translate = useTranslate();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [user, setUser] = useStore("user");
  const [markets, setMarkets] = useState(null);
  const [states, setStates] = useState(null);
  const [market_obj, setMarket_Obj] = useState(null);
  const [state_obj, setState_Obj] = useState(null);
  const [nearby_market_obj, setNearbyMarket_Obj] = useState(null);
  const [new_market_name, setNewMarket_Name] = useState(null);

  const redirect = useRedirect();
  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();

  React.useEffect(() => {
    async function ReadMarkets() {
      let { data: market, error } = await supabase.from("market").select("*");
      if (!error && market) {
        setMarkets(market);
      }
    }
    ReadMarkets();
  }, []);

  React.useEffect(() => {
    const getUniqueStates = (markets) => {
      const states = markets.map((market) => {
        return { id: market.state_id, name: market.state };
      });

      const uniqueStates = [...new Set(states.map((st) => st.id))].map(
        (st_id) => {
          return states.find((stt) => {
            return stt.id === st_id;
          });
        }
      );
      return uniqueStates;
    };

    if (markets) {
      // console.log(markets)
      setStates(getUniqueStates(markets));
    }
  }, [markets]);

  React.useEffect(() => {
    if (new_market_name) {
      console.log(new_market_name);
    }
  }, [new_market_name]);

  const createUnregisteredMarket = async (
    country_id,
    country,
    state_id,
    state,
    un_reg_market,
    nearby_market
  ) => {
    try {
      const { data, error } = await supabase.from("un_reg_market").insert([
        {
          country_id,
          country,
          state_id,
          state,
          un_reg_market,
          nearby_market,
        },
      ]);

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      // console.error("Supabase insert error:", error.message);
      notify("New Market Creation Error", { type: "error" });
      return { data: null, error: error.message };
    }
  };

  const handleSubmit = (auth) => {
    setLoading(true);
    if (auth.market === "others") {
      createUnregisteredMarket(
        null,
        "Nigeria",
        state_obj?.id,
        state_obj?.name,
        auth.new_market_name,
        nearby_market_obj
      ).then(({ data:new_mrkt_data, error }) => {
        console.log(new_mrkt_data)
        if (!error) {
          medusa.admin.users
          .create({
            email: auth.email,
            password: auth.password,
            first_name: auth.firstname,
            last_name: auth.lastname,
          })
          .then(({ user }) => {
            medusa.admin.users
              .update(user.id, {
                api_token: user.id,
                metadata: {
                  phone: auth.phone,
                  username: auth.username,
                  address: auth.address,
                  businessName: auth.business_name,
                  city: auth.city,
                  province: states.find(st => {return st.id === auth.province}).name,
                  country: auth.country,
                },
              })
              .then(({ user }) => {
                medusa.admin.auth.deleteSession().then(() => {
                  medusa.admin.auth
                    .createSession({
                      email: auth.email,
                      password: auth.password,
                    })
                    .then(({ user }) => {
                      setUser(user);
                      medusa.admin.store
                        .update({
                          name: auth.business_name,
                          metadata: {
                            market: { ...market_obj },
                            un_reg_market: {
                              ...new_mrkt_data,
                            },
                            state: {
                              ...state_obj
                            }
                          },
                        })
                        .then(({ store }) => {
                          notify("New Market and User Account Created", { type: "success" });
                          redirect("https://eke.afriomarkets.com/app");
                        });
                    });
                });
              });
          })
          .catch((error) => {
            setLoading(false);
            notify(
              typeof error === "string"
                ? error
                : typeof error === "undefined" || !error.message
                ? "Sign Up Error"
                : error.message,
              {
                type: "warning",
                messageArgs: {
                  _:
                    typeof error === "string"
                      ? error
                      : error && error.message
                      ? error.message
                      : undefined,
                },
              }
            );
          });
          console.log(
            "Unregistered market created successfully:",
            new_mrkt_data
          );
        } else {

          console.error(
            "Error creating unregistered market:",
            error
          );
        }
        
      });
    } else {
      medusa.admin.users
        .create({
          email: auth.email,
          password: auth.password,
          first_name: auth.firstname,
          last_name: auth.lastname,
        })
        .then(({ user }) => {
          medusa.admin.users
            .update(user.id, {
              api_token: user.id,
              metadata: {
                phone: auth.phone,
                username: auth.username,
                address: auth.address,
                businessName: auth.business_name,
                city: auth.city,
                province: states.find(st => {return st.id === auth.province}).name,
                country: auth.country,
              },
            })
            .then(({ user }) => {
              medusa.admin.auth.deleteSession().then(() => {
                medusa.admin.auth
                  .createSession({
                    email: auth.email,
                    password: auth.password,
                  })
                  .then(({ user }) => {
                    setUser(user);
                    medusa.admin.store
                      .update({
                        name: auth.business_name,
                        metadata: {
                          market: { ...market_obj },
                          un_reg_market: {
                            ...new_market_name,
                          },
                          state: {
                            ...state_obj
                          }
                        },
                      })
                      .then(({ store }) => {
                        notify("User Account Created", { type: "success" });
                        redirect("https://eke.afriomarkets.com/app");
                      });
                  });
              });
            });
        })
        .catch((error) => {
          setLoading(false);
          notify(
            typeof error === "string"
              ? error
              : typeof error === "undefined" || !error.message
              ? "Sign Up Error"
              : error.message,
            {
              type: "warning",
              messageArgs: {
                _:
                  typeof error === "string"
                    ? error
                    : error && error.message
                    ? error.message
                    : undefined,
              },
            }
          );
        });
    }
  };

  const VendorInput = () => {
    const emaill = useWatch({ name: "email" });
    const type = useWatch({ name: "type" });
    const province = useWatch({ name: "province" });
    const market = useWatch({ name: "market" });
    const nw_market_name = useWatch({ name: "new_market_name" });

    return (
      <>
        {type ? (
          <>
            <Stack
              spacing={1}
              direction="row"
              flexWrap="wrap"
              sx={{ marginTop: "1em" }}
            >
              <TextInput
                // autoFocus
                source="email"
                label={translate("Your Email")}
                disabled={loading}
                validate={[required(), email()]}
                fullWidth
                variant="outlined"
              />
              {emaill && !showVendor && type === "vendor" && (
                <Button
                  variant="contained"
                  type="button"
                  color="primary"
                  // disabled={}
                  style={{
                    padding: "5px 10px",
                    height: "38px",
                    fontSize: "12px",
                  }}
                  onClick={() => {
                    setShowVendor(true);
                  }}
                >
                  {translate("Continue")}
                </Button>
              )}
            </Stack>
          </>
        ) : null}
        {emaill && showVendor && type === "vendor" ? (
          <>
            <Stack
              spacing={1}
              direction="row"
              flexWrap="wrap"
              sx={{ marginTop: "1em" }}
            >
              <TextInput
                // autoFocus
                source="firstname"
                type="text"
                label={translate("FirstName")}
                disabled={loading}
                validate={required()}
                fullWidth={isSmall ? true : false}
                variant="outlined"
              />
              <TextInput
                // autoFocus
                source="lastname"
                type="text"
                label={translate("LastName")}
                disabled={loading}
                validate={required()}
                fullWidth={isSmall ? true : false}
                variant="outlined"
              />
            </Stack>

            <Stack
              spacing={1}
              direction="row"
              flexWrap="wrap"
              sx={{ marginTop: "1em" }}
            >
              <TextInput
                source="phone"
                label={translate("Your Phone")}
                type="text"
                disabled={loading}
                validate={[required(), maxLength(11)]}
                fullWidth={isSmall ? true : false}
                variant="outlined"
              />
              <TextInput
                // autoFocus
                source="username"
                type="text"
                label={translate("Username")}
                disabled={loading}
                validate={required()}
                fullWidth={isSmall ? true : false}
                variant="outlined"
              />
            </Stack>

            <Box sx={{ marginTop: "1em" }}>
              <PasswordInput
                source="password"
                label={translate("ra.auth.password")}
                // type="password"
                disabled={loading}
                validate={[required(), minLength(6)]}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                // autoFocus
                source="business_name"
                label={translate("Your Business Name")}
                disabled={loading}
                validate={[required()]}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Stack
              spacing={2}
              direction="row"
              flexWrap="wrap"
              sx={{ marginTop: "1em" }}
            >
              <SelectInput
                // autoFocus
                source="country"
                // type='text'
                label={translate("Your Country/Region")}
                disabled={loading}
                validate={required()}
                fullWidth
                variant="outlined"
                choices={[{ id: "NG", name: "Nigeria" }]}
                sx={{}}
              />
            </Stack>
            <Stack
              spacing={1}
              direction="row"
              flexWrap="wrap"
              sx={{ marginTop: "1em" }}
            >
              <SelectInput
                // autoFocus
                source="province"
                // type="text"
                label={translate("Your State/Province")}
                disabled={loading}
                validate={required()}
                fullWidth={isSmall ? true : false}
                variant="outlined"
                choices={states ? states : []}
                onChange={(e) => {
                  setState_Obj(
                    states.find((st) => {
                      return st.id === e.target.value;
                    })
                  );
                }}
              />
              <TextInput
                source="city"
                label={translate("Your City")}
                type="text"
                disabled={loading}
                validate={[required()]}
                fullWidth={isSmall ? true : false}
                variant="outlined"
              />
            </Stack>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                // autoFocus
                source="address"
                type="text"
                label={translate("Your Address")}
                disabled={loading}
                validate={required()}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <SelectInput
                // autoFocus
                source="market"
                // type="text"
                label={translate("Market")}
                disabled={loading}
                validate={required()}
                fullWidth
                variant="outlined"
                choices={
                  province && markets
                    ? markets
                        .filter((mrkt) => {
                          return mrkt.state_id === province;
                        })
                        .map((st) => {
                          return { id: st.id, name: st.market_name };
                        })
                        .concat([{ id: "others", name: "Others" }])
                    : []
                }
                onChange={(e) => {
                  setMarket_Obj(
                    markets.find((mrkt) => {
                      return mrkt.id === e.target.value;
                    })
                  );
                }}
              />
            </Box>

            {market && market === "others" && (
              <Box sx={{ marginTop: "1em" }}>
                <SelectInput
                  // autoFocus
                  source="nearby_market"
                  // type="text"
                  label={translate("Nearby Market")}
                  disabled={loading}
                  validate={market && market === "others" ? [required()] : null}
                  fullWidth
                  variant="outlined"
                  choices={
                    province && markets
                      ? markets
                          .filter((mrkt) => {
                            return mrkt.state_id === province;
                          })
                          .map((st) => {
                            return { id: st.id, name: st.market_name };
                          })
                      : []
                  }
                  onChange={(e) => {
                    setNearbyMarket_Obj(
                      markets.find((mrkt) => {
                        return mrkt.id === e.target.value;
                      })
                    );
                  }}
                />
                <TextInput
                  autoFocus
                  source="new_market_name"
                  label={translate("New Market Name")}
                  type="text"
                  disabled={loading}
                  validate={market && market === "others" ? [required()] : null}
                  fullWidth
                  variant="outlined"
                  // onChange={(e) => setNewMarket_Name(e.target.value)}
                />
              </Box>
            )}
          </>
        ) : null}
      </>
    );
  };

  return (
    <Form onSubmit={handleSubmit} noValidate className="auth_form">
      <Box
        sx={{
          margin: "1em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Avatar sx={{ bgcolor: 'info.main' }}>
                    A
                </Avatar> */}
        <p
          style={{ marginLeft: "5px", marginBottom: "3px" }}
          className="card-title section-title"
        >
          Welcome to Afriomarkets
        </p>
      </Box>
      <Box
        sx={{
          marginTop: "0.1em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontWeight: "600",
          lineHeight: "1.2175",
          color: "var(--title-color)",
          fontFamily: "Rubik, sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        Register here to create an account
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "70vh",
          alignItems: "center",
          justifyContent: "center",
          // background: 'url(https://source.unsplash.com/random/1600x900)',
          // background: 'linear-gradient(-45deg, #610212, #E0455F)',
          // background: 'white',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginTop: "20px",
        }}
      >
        <Card
          sx={{
            minWidth: 300,
            marginY: "1em",
            padding: "20px 10px",
            boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px",
            borderRadius: "6px",
          }}
        >
          <Stack spacing={0} sx={{ padding: "10px 30px" }}>
            <Box sx={{ marginTop: "1em" }}>
              <SelectInput
                choices={[{ id: "vendor", name: "Vendor" }]}
                source="type"
                label={"I want to register as a"}
                fullWidth
                variant="outlined"
              />
            </Box>
            <VendorInput />
          </Stack>
        </Card>

        <CardActions sx={{ padding: "0 1em 1em 1em", marginY: "1em" }}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading}
            fullWidth
            style={{
              padding: "5px 45px",
            }}
          >
            {loading && <CircularProgress size={25} thickness={2} />}
            {translate("register")}
          </Button>
        </CardActions>
        <Stack
          paddingX={1}
          justifyContent="center"
          alignItems="center"
          fontSize={14}
          sx={{
            textAlign: "center",
            fontWeight: "600",
            lineHeight: "1.2175",
            color: "var(--title-color)",
            fontFamily: "Rubik, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          <span>Already have an Account?</span>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                redirect("https://eke.afriomarkets.com/app");
              }}
              variant="text"
              color="secondary"
              style={{
                minWidth: "max-content",
                padding: "0px",
                marginInline: "5px",
                textTransform: "none",
              }}
            >
              Login
            </Button>
            <span>instead.</span>
          </Stack>
          {/* <Stack direction="row" justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                createUnregisteredMarket(
                  null,
                  "Nigeria",
                  state_obj?.id,
                  state_obj?.name,
                  new_market_name,
                  nearby_market_obj
                ).then((response) => {
                  if (response.error) {
                    console.error(
                      "Error creating unregistered market:",
                      response.error
                    );
                  } else {
                    console.log(
                      "Unregistered market created successfully:",
                      response.data
                    );
                  }
                });
              }}
              variant="text"
              color="secondary"
              style={{
                minWidth: "max-content",
                padding: "0px",
                marginInline: "5px",
                textTransform: "none",
              }}
            >
              Create New Market
            </Button>
            <span>instead.</span>
          </Stack> */}
        </Stack>
      </Box>
    </Form>
  );
};

SignUp.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default SignUp;
