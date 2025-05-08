/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import CreateMiniMarket from "./createNewMarket";
import { Wizard, useWizard } from "react-use-wizard";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
// import bg from '../../dashboard/images/bg.jpg'
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { reactCodeInput } from "CodeInputField.scss";
import ReactCodeInput from "react-code-input";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
  useInput,
  AutocompleteInput,
  ReferenceInput,
  useGetIdentity,
} from "react-admin";
// import { client } from '../../App';
import Box from "@mui/material/Box";
import { useMediaQuery, Fab } from "@mui/material";
import Medusa from "@medusajs/medusa-js";
import CenteredTab from "../../tabs/centeredTab";
import { useWatch } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import AnimatedStep from "../../containers/animatedStep";
import Step from "../../containers/phoneVerification/step";
import StepperForm from "../../containers/phoneVerification/stepperForm";
import SignUpStepper from "../../containers/signup/signupStepperForm";
import CountryCurrencies from "../../constants/country_currencies";
import PinInput from "react-pin-input";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const Logo = "/assets/img/rayvvin_pngs/Logo.png?url";
// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase URL and key
const supabase = createClient(
  import.meta.env.VITE_BASE_URL,
  import.meta.env.VITE_ANON_KEY
);

// Example: show the active step in the header
const Header = () => (
  <>
    <Box
      sx={{
        marginTop: { lg: "3.5em", md: "2.5em", sm: "1.5em" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Avatar sx={{ bgcolor: 'info.main' }}>
            A
        </Avatar> */}
      {/* <p
        style={{
          marginLeft: "5px",
          marginBottom: "1px",
          fontFamily: "Rubik !important",
        }}
        className="card-title section-title-withLayout"
      >
        Account Update
      </p> */}

      <img src={Logo} alt="Icon" width={150} />
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
        // whiteSpace: "nowrap",
        paddingInline: "20px",
        marginBottom: "1em",
      }}
    >
      Follow these steps to update your account
    </Box>
  </>
);

// Example: show the "previous" and "next" buttons in the footer
const Footer = ({
  loading,
  translate,
  redirect,
  formComplete,
  state_obj,
  nearby_market_obj,
  new_market_obj,
  market_obj,
  country_obj,
  hndlSbmtRef,
  setLoading,
}) => {
  const {
    isLoading,
    isLastStep,
    isFirstStep,
    activeStep,
    stepCount,
    previousStep,
    nextStep,
    goToStep,
    handleStep,
  } = useWizard();

  const auth = useWatch();
  const user_obj = useGetIdentity();
  // This handler is optional
  handleStep(() => {
    // alert("Going to step 2");
  });
  return (
    <Stack justifyContent="center" alignItems="center" marginTop={3}>
      <CardActions
        sx={{ padding: "0 1em 1em 1em", marginY: "1em", maxWidth: 300 }}
      >
        {formComplete ? (
          <Button
            variant="contained"
            type="button"
            color="primary"
            disabled={loading}
            fullWidth
            style={{
              padding: "5px 45px",
            }}
            onClick={(e) => {
              hndlSbmtRef.current({
                auth,
                state_obj,
                nearby_market_obj,
                new_market_obj,
                market_obj,
                country_obj,
                setLoading,
                identity: user_obj,
              });
            }}
          >
            {loading && <CircularProgress size={25} thickness={2} />}
            {translate("Update Info")}
          </Button>
        ) : null}
      </CardActions>
      {/* <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        // draggable
        pauseOnHover
        theme="light"
      /> */}
      {user_obj && user_obj?.data?.user?.email && (
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
          <span>
            You&apos;re signed in as <br /> {user_obj?.data?.user?.email}
          </span>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                redirect("/login");
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
              logout
            </Button>
            {/* <span>again.</span> */}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

// Example: Wrap steps in an `<AnimatePresence` from framer-motion
const Wrapper = ({ children }) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "40vh",
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
      <AnimatePresence initial={false} mode="wait">
        <div className="ant_bubbles">
          <div
            className="bubble_one"
            style={{
              transform: `${isSmall ? "translate3d(-120vw,0,0)" : null}`,
              background: "rgba(0, 255, 153, .2)",
              height: "500px",
              width: "500px",
              borderRadius: "255px",
            }}
          ></div>
          <div
            className="bubble_two"
            style={{
              transform: `${isSmall ? "translate3d(100vw,0,0)" : null}`,
              background: "rgba(0, 255, 153, .2)",
              height: "287px",
              width: "287px",
              borderRadius: "255px",
            }}
          ></div>
          {/* <img
            className="bubble_one"
            src="https://gw.alipayobjects.com/zos/bmw-prod/bd71b0c6-f93a-4e52-9c8a-f01a9b8fe22b.svg"
            alt=""
            style={{
              transform: `${isSmall ? "translate3d(-120vw,0,0)" : null}`,
            }}
          ></img>
          <img
            className="bubble_two"
            src="https://gw.alipayobjects.com/zos/bmw-prod/84ad805a-74cb-4916-b7ba-9cdc2bdec23a.svg"
            alt=""
            style={{
              transform: `${isSmall ? "translate3d(100vw,0,0)" : null}`,
            }}
          ></img> */}
        </div>
        {children}
      </AnimatePresence>
    </Box>
  );
};

const PhoneNumberInput = ({ source, label }) => {
  const [value, setValue] = useState(null);
  const { id, field, fieldState } = useInput({ source });

  return (
    <label htmlFor={id} style={{ marginTop: "10px" }}>
      {/* {label} */}
      <PhoneInput
        placeholder={label}
        {...field}
        defaultCountry={"GB"}
        className="MuiOutlinedInput-root MuiInputBase-colorPrimary"
      />
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </label>
  );
};

const CustomPinInput = ({ source, label }) => {
  const [value, setValue] = useState(null);
  const { id, field, fieldState } = useInput({ source });

  return (
    <label htmlFor={id} style={{ marginTop: "10px" }}>
      {/* {label} */}
      <PinInput
        // placeholder={label}
        {...field}
        length={4}
        initialValue=""
        secret
        secretDelay={100}
        type="numeric"
        inputMode="number"
        style={{ padding: "5px" }}
        inputStyle={{
          // borderColor: "red",
          boxShadow: "0 2px 20px hsla(0, 0%, 0%, 0.06)",
          borderRadius: "4px",
        }}
        inputFocusStyle={{
          borderColor: "blue",
          boxShadow: "0 2px 20px hsla(0, 0%, 0%, 0.06)",
          borderRadius: "4px",
        }}
        onComplete={(value, index) => {
          console.log(value);
        }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        // defaultCountry={"NG"}
        className="MuiOutlinedInput-root MuiInputBase-colorPrimary"
      />
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </label>
  );
};

const AccountUpdateWizardForm = ({
  hndlSbmtRef,
  states,
  setStates,
  state_obj,
  setState_Obj,
  country_obj,
  setCountry_Obj,
  nearby_market_obj,
  setNearbyMarket_Obj,
  new_market_obj,
  setNewMarket_Obj,
  markets,
  setMarkets,
  miniMarkets,
  setMiniMarkets,
  countries,
  setCountries,
  market_obj,
  setMarket_Obj,
}) => {
  const [loading, setLoading] = useState(false);
  const [showVendor, setShowVendor] = useState(false);
  const translate = useTranslate();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [signup_user, setSignUpUser] = useStore("signup_user");
  const [user, setUser] = useState(null);
  const [new_market_name, setNewMarket_Name] = useState(null);
  const [formComplete, setFormComplete] = useState(false);
  const identity = useGetIdentity();
  const previousStep = useRef(0);
  const redirect = useRedirect();
  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();
  const phone = useWatch({ name: "phone" });
  const emaill = useWatch({ name: "email" });
  const type = useWatch({ name: "type" });
  const country = useWatch({ name: "country" });
  const province = useWatch({ name: "province" });
  const market = useWatch({ name: "market" });
  const nw_market_name = useWatch({ name: "new_market_name" });
  const nearby_market = useWatch({ name: "nearby_market" });
  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: import.meta.env.VITE_MEDUSA_URL,
    apiKey: identity?.data?.medusa_user?.api_token,
  });

  React.useEffect(() => {
    hndlSbmtRef.current = handleSubmit;
    const fetchCountries = async () => {
      try {
        const { data, error } = await supabase.from("country").select("*");
        if (error) throw error;
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const Steps = [
    <>
      <Stack
        spacing={0}
        sx={{ padding: "5px 10px" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          // sx={{ marginBlock: "1em" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              mt: 1,
              mb: 1,
              textAlign: "center",
              fontWeight: "600",
              lineHeight: "1.2175",
              color: "var(--title-color)",
              fontFamily: "Rubik, sans-serif",
              // whiteSpace: "nowrap",
              fontSize: "15px",
            }}
          >
            Verify Phone (1/2)
          </Typography>
          <Typography
            sx={{
              mt: 1,
              mb: 4,
              textAlign: "center",
              fontWeight: "300",
              lineHeight: "1.2175",
              color: "var(--title-color)",
              fontFamily: "Rubik, sans-serif",
              // whiteSpace: "nowrap",
              fontSize: "12px",
            }}
          >
            Enter your contact phone number for verification
          </Typography>
          <PhoneNumberInput source="phone" label={translate("Your Phone")} />
          <Typography
            sx={{
              mt: 1,
              mb: 4,
              textAlign: "center",
              fontWeight: "300",
              lineHeight: "1.2175",
              color: "var(--title-color)",
              fontFamily: "Rubik, sans-serif",
              // whiteSpace: "nowrap",
              fontSize: "12px",
            }}
          ></Typography>
        </Box>
      </Stack>
    </>,
    <>
      <Stack
        spacing={0}
        sx={{ padding: "5px 10px" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          sx={{ marginBottom: "1.5em" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              mt: 1,
              mb: 1,
              textAlign: "center",
              fontWeight: "600",
              lineHeight: "1.2175",
              color: "var(--title-color)",
              fontFamily: "Rubik, sans-serif",
              // whiteSpace: "nowrap",
              fontSize: "15px",
            }}
          >
            Verify Phone (2/2)
          </Typography>

          <Typography
            sx={{
              mt: 2,
              mb: 1,
              textAlign: "center",
              fontWeight: "300",
              lineHeight: "1.2175",
              color: "var(--title-color)",
              fontFamily: "Rubik, sans-serif",
              // whiteSpace: "nowrap",
              fontSize: "12px",
            }}
          >
            Enter OTP code sent to <strong>{phone ? phone : null}</strong>
          </Typography>
          <CustomPinInput
            source="phone_pin"
            label={translate("Your Phone Pin")}
          />
        </Box>
      </Stack>
    </>,
  ];

  const DetailedFormData = [
    {
      title: "Personal Info",
      body: (
        <Stack spacing={0} sx={{ padding: "10px 15px" }}>
          <Box
            sx={{ marginTop: "1em" }}
            gap={2}
            display="flex"
            flexWrap={"wrap"}
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
          </Box>
          <Box
            sx={{ marginTop: "1em" }}
            gap={2}
            display="flex"
            flexWrap={"wrap"}
          >
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
            <AutocompleteInput
              // autoFocus
              source="country"
              type="text"
              label={translate("Your Country/Region")}
              disabled={loading}
              validate={required()}
              fullWidth={isSmall ? true : false}
              variant="outlined"
              defaultValue={"gb"}
              choices={
                countries
                  ? countries
                      .filter((ctry) => ctry.iso_2 === "gb")
                      .map((cntry) => {
                        return { id: cntry.iso_2, name: cntry.display_name };
                      })
                  : []
              }
              sx={{ minWidth: "197px" }}
              onChange={(e) => {
                setCountry_Obj(
                  countries.find((cntry) => {
                    return cntry.iso_2 === e;
                  })
                );
              }}
            />
          </Box>
          <PhoneNumberInput source="phone" label={translate("Your Phone")} />
        </Stack>
      ),
    },
    {
      title: "Business and Location Info",
      body: (
        <Stack spacing={0} sx={{ padding: "10px 15px" }}>
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
          <Box
            sx={{ marginTop: "1em" }}
            gap={2}
            display="flex"
            flexWrap={"wrap"}
          >
            <TextInput
              source="province"
              label={translate("Your State/Province")}
              type="text"
              disabled={loading}
              validate={[required()]}
              fullWidth={isSmall ? true : false}
              variant="outlined"
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
          </Box>
          <Box
            sx={{ marginTop: "1em" }}
            gap={2}
            display="flex"
            flexWrap={"wrap"}
          >
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
        </Stack>
      ),
    },
  ];

  const handleSubmit = async ({
    auth,
    state_obj,
    nearby_market_obj,
    new_market_obj,
    market_obj,
    country_obj,
    identity,
  }) => {
    // console.log("Updating", auth, new_market_obj);
    if (identity?.data?.medusa_user) {
      medusa.admin.users
        .update(identity?.data?.medusa_user?.id, {
          first_name: auth.firstname,
          last_name: auth.lastname,
          metadata: {
            phone: auth.phone,
            username: auth.username,
            address: auth.address,
            businessName: auth.business_name,
            city: auth.city,
            province: auth.province,
            country: auth.country,
            country_obj,
          },
        })
        .then(({ user }) => {
          // setUser(user);
          medusa.admin.store
            .update({
              name: auth.business_name,
              // default_currency_code: country_obj.currency_iso.toLowerCase(),
              metadata: {
                city: auth.city,
                province: auth.province,
                address: auth.address,
                country_code: auth.country,
                country: {
                  ...country_obj,
                },
              },
            })
            .then(({ store }) => {
              console.log(store);
              toast.success("User data updated");
              redirect("/settings");
            });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("Identity not loaded");
    }
  };

  return (
    <Wizard
      startIndex={0}
      header={<Header />}
      footer={
        <Footer
          loading={loading}
          redirect={redirect}
          translate={translate}
          formComplete={formComplete}
          hndlSbmtRef={hndlSbmtRef}
          state_obj={state_obj}
          nearby_market_obj={nearby_market_obj}
          new_market_obj={new_market_obj}
          market_obj={market_obj}
          country_obj={country_obj}
          setLoading={setLoading}
        />
      }
      wrapper={<Wrapper />}
    >
      {/* {Steps.map((_, index) => {
        return (
          <AnimatedStep key={index} previousStepIndex={previousStep}>
            <Step
              number={index + 1}
              withCallback={false}
              submitRef={hndlSbmtRef.current}
              inputBody={_}
              user={user}
              setUser={setUser}
            ></Step>
          </AnimatedStep>
        );
      })} */}
      <SignUpStepper
        // regNewMarket={createUnregisteredMarket}
        state_obj={state_obj}
        nearby_market_obj={nearby_market_obj}
        new_market_obj={new_market_obj}
        formComplete={formComplete}
        setFormComplete={setFormComplete}
      >
        {DetailedFormData}
      </SignUpStepper>
    </Wizard>
  );
};
const FormWrapper = () => {
  const hndlSbmtRef = useRef(null);
  const identity = useGetIdentity();
  const [states, setStates] = useState(null);
  const [state_obj, setState_Obj] = useState(null);
  const [country_obj, setCountry_Obj] = useState(null);
  const [nearby_market_obj, setNearbyMarket_Obj] = useState(null);
  const [new_market_obj, setNewMarket_Obj] = useState(null);
  const [markets, setMarkets] = useState(null);
  const [miniMarkets, setMiniMarkets] = useState(null);
  const [countries, setCountries] = useState(null);
  const [market_obj, setMarket_Obj] = useState(null);

  React.useEffect(() => {
    if (
      identity?.data?.medusa_user &&
      identity?.data?.medusa_store &&
      states &&
      countries &&
      identity &&
      markets &&
      miniMarkets
    ) {
      setCountry_Obj(
        countries.find((cntry) => {
          return (
            cntry.country_iso === identity?.data?.medusa_user?.metadata?.country
          );
        })
      );

      // setState_Obj(
      //   states.find((st) => {
      //     return st.id === identity?.data?.medusa_store?.metadata?.state.id;
      //   })
      // );

      // setMarket_Obj(
      //   markets.find((mrkt) => {
      //     return mrkt.id === identity?.data?.medusa_store?.metadata?.market.id;
      //   })
      // );

      // setNearbyMarket_Obj(
      //   markets.find((mrkt) => {
      //     return (
      //       mrkt.id ===
      //       identity?.data?.medusa_store?.metadata?.un_reg_market?.nearby_market
      //         ?.id
      //     );
      //   })
      // );

      // setNewMarket_Obj(
      //   miniMarkets.find((mrkt) => {
      //     return (
      //       mrkt.id ===
      //       identity?.data?.medusa_store?.metadata?.un_reg_market?.id
      //     );
      //   })
      // );
    }
  }, [countries, markets, miniMarkets, states]);
  return (
    <Form
      onSubmit={hndlSbmtRef.current}
      className="auth_form_withLayout"
      defaultValues={{
        firstname: identity?.data?.medusa_user?.first_name,
        lastname: identity?.data?.medusa_user?.last_name,
        country: identity?.data?.medusa_user?.metadata?.country,
        username: identity?.data?.medusa_user?.metadata?.username,
        phone: identity?.data?.medusa_user?.metadata?.phone,
        business_name: identity?.data?.medusa_user?.metadata?.businessName,
        province: identity?.data?.medusa_store?.metadata?.province,
        city: identity?.data?.medusa_user?.metadata?.city,
        address: identity?.data?.medusa_user?.metadata?.address,
        // market: identity?.data?.medusa_store?.metadata?.market?.id
        //   ? identity?.data?.medusa_store?.metadata?.market?.id
        //   : identity?.data?.medusa_store?.metadata?.un_reg_market
        //   ? `others`
        //   : null,
        // nearby_market: identity?.data?.medusa_store?.metadata?.un_reg_market
        //   ?.nearby_market?.id
        //   ? identity?.data?.medusa_store?.metadata?.un_reg_market?.nearby_market
        //       ?.id
        //   : null,
        // new_market_name: identity?.data?.medusa_store?.metadata?.un_reg_market
        //   ?.id
        //   ? identity?.data?.medusa_store?.metadata?.un_reg_market?.id
        //   : null,
      }}
    >
      <AccountUpdateWizardForm
        hndlSbmtRef={hndlSbmtRef}
        states={states}
        setStates={setStates}
        state_obj={state_obj}
        setState_Obj={setState_Obj}
        country_obj={country_obj}
        setCountry_Obj={setCountry_Obj}
        nearby_market_obj={nearby_market_obj}
        setNearbyMarket_Obj={setNearbyMarket_Obj}
        new_market_obj={new_market_obj}
        setNewMarket_Obj={setNewMarket_Obj}
        markets={markets}
        setMarkets={setMarkets}
        miniMarkets={miniMarkets}
        setMiniMarkets={setMiniMarkets}
        countries={countries}
        setCountries={setCountries}
        market_obj={market_obj}
        setMarket_Obj={setMarket_Obj}
      />
    </Form>
  );
};

export default FormWrapper;
