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
} from "react-admin";
// import { client } from '../../App';
import Box from "@mui/material/Box";
import { useMediaQuery, Fab } from "@mui/material";
import Medusa from "@medusajs/medusa-js";
import CenteredTab from "../../tabs/centeredTab";
import { useWatch } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import AnimatedStep from "../../containers/animatedStep";
import Step from "../../containers/verification/step";
import StepperForm from "../../containers/verification/stepperForm";
import CountryCurrencies from "../../constants/country_currencies";
import PinInput from "react-pin-input";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const Logo =  '/assets/img/rayvvin_pngs/Logo.png?url';

const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: import.meta.env.VITE_MEDUSA_URL,
  apiKey: "usr_01HPESKGDTMNHYK8HXH1A7AP4Q",
});

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
        margin: "1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Avatar sx={{ bgcolor: 'info.main' }}>
            A
        </Avatar> */}
      {/* <p
        style={{ marginLeft: "5px", marginBottom: "3px" }}
        className="card-title section-title"
      >
        Welcome to Afriomarkets
      </p> */}
      <img src={Logo} alt="Icon" width={250} />
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
      Complete these steps to verify <br /> your Email
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
  setMode
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

  // This handler is optional
  handleStep(() => {
    // alert("Going to step 2");
  });
  return (
    <Stack justifyContent="center" alignItems="center" marginTop={3}>
      {/* <CardActions
        sx={{ padding: "0 1em 1em 1em", marginY: "1em", maxWidth: 300 }}
      >
        {isLastStep ? (
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
              });
            }}
          >
            {loading && <CircularProgress size={25} thickness={2} />}
            {translate("verify")}
          </Button>
        ) : null}
      </CardActions> */}
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
        <span>Having trouble, Try</span>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Button
            onClick={() => {
              setMode("login");
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
            Signing in
          </Button>
          <span>again.</span>
        </Stack>
      </Stack>
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
      <AnimatePresence initial={false} mode="wait">
        <div className="ant_bubbles">
        <div className="bubble_one" style={{
              transform: `${isSmall ? "translate3d(-120vw,0,0)" : null}`,
              background: 'rgba(0, 255, 153, .2)',
              height: '500px',
              width: '500px',
              borderRadius: '255px'
            }}></div>
            <div className="bubble_two" style={{
              transform: `${isSmall ? "translate3d(100vw,0,0)" : null}`,
              background: 'rgba(0, 255, 153, .2)',
              height: '287px',
              width: '287px',
              borderRadius: '255px'
            }}></div>
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
        defaultCountry={"NG"}
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
        length={6}
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

const VerificationWizardForm = ({
  hndlSbmtRef,
  mode,
  setMode,
  cred,
  setCred,
}) => {
  const [loading, setLoading] = useState(false);
  const [showVendor, setShowVendor] = useState(false);
  const translate = useTranslate();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [signup_user, setSignUpUser] = useStore("signup_user");
  const [user, setUser] = useState(null);
  const [markets, setMarkets] = useState(null);
  const [miniMarkets, setMiniMarkets] = useState(null);
  const [states, setStates] = useState(null);
  const [countries, setCountries] = useState(CountryCurrencies);
  const [market_obj, setMarket_Obj] = useState(null);
  const [state_obj, setState_Obj] = useState(null);
  const [country_obj, setCountry_Obj] = useState(null);
  const [nearby_market_obj, setNearbyMarket_Obj] = useState(null);
  const [new_market_obj, setNewMarket_Obj] = useState(null);
  const [new_market_name, setNewMarket_Name] = useState(null);
  const [formComplete, setFormComplete] = useState(false);
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

  React.useEffect(() => {
    hndlSbmtRef.current = handleSubmit;
    async function ReadUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: cred.email,
        password: cred.password,
      });

      // console.log(nw_data);
      if (error) {
        if (error.message === "Email not confirmed") {
          // toast.warning(error.message);
          setUser({});
        } else {
          // toast.error(error.message);
        }
      }
      if (!error && user) {
        setUser(user);
      }
    }
    ReadUser();
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

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
      console.log("Here");
      let { data: un_reg_market_obj, error: new_error } = await supabase
        .from("un_reg_market")
        .select("*")
        .eq("un_reg_market", un_reg_market);
      // .limit(1);

      if (new_error) {
        throw new_error;
      }

      if (un_reg_market_obj.length) {
        // let mrkt = un_reg_market_obj[0];
        return { un_reg_market_obj, error: null };
      } else {
        const { data, error } = await supabase
          .from("un_reg_market")
          .insert([
            {
              country_id,
              country,
              state_id,
              state,
              un_reg_market,
              nearby_market,
            },
          ])
          .select();

        if (error) {
          throw error;
        }

        return { data, error: null };
      }
    } catch (error) {
      // console.error("Supabase insert error:", error.message);
      notify("New Market Creation Error", { type: "error" });
      return { data: null, error: error.message };
    }
  };

  const Steps = [
    <>
      <Stack
        spacing={0}
        sx={{ padding: "10px" }}
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
              mb: 2,
              textAlign: "center",
              fontWeight: "600",
              lineHeight: "1.2175",
              color: "var(--title-color)",
              fontFamily: "Rubik, sans-serif",
              // whiteSpace: "nowrap",
              fontSize: "15px",
            }}
          >
            Congratulations on Signing Up!
          </Typography>
          {user ? (
            user?.email_confirmed_at ? (
              <>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ mt: 3, mb: 3 }}
                >
                  <CheckCircleOutlineIcon color="secondary" fontSize="large" />
                </Stack>{" "}
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
                    fontSize: "18px",
                  }}
                >
                  Your email has been verified
                </Typography>
              </>
            ) : (
              <Typography
                sx={{
                  mt: 3,
                  mb: 3,
                  textAlign: "center",
                  fontWeight: "300",
                  lineHeight: "1.2175",
                  color: "var(--title-color)",
                  fontFamily: "Rubik, sans-serif",
                  // whiteSpace: "nowrap",
                  fontSize: "12px",
                }}
              >
                Please check your email for the verification link to complete
                your registration. If you don&apos;t see the email, make sure to
                check your spam or junk folder.
              </Typography>
            )
          ) : (
            <Typography
              sx={{
                mt: 3,
                mb: 3,
                textAlign: "center",
                fontWeight: "300",
                lineHeight: "1.2175",
                color: "var(--title-color)",
                fontFamily: "Rubik, sans-serif",
                // whiteSpace: "nowrap",
                fontSize: "12px",
              }}
            >
              Retrieving Your Info...
            </Typography>
          )}

          <Typography
            sx={{
              // mt: 1,
              mb: 1,
              textAlign: "center",
              fontWeight: "300",
              lineHeight: "1.2175",
              color: "var(--title-color)",
              fontFamily: "Rubik, sans-serif",
              // whiteSpace: "nowrap",
              fontSize: "10px",
            }}
          >
            We look forward to having you on board!
          </Typography>
        </Box>
      </Stack>
    </>,
  ];

  const handleSubmit = async ({
    auth,
    state_obj,
    nearby_market_obj,
    new_market_obj,
    market_obj,
    country_obj,
  }) => {
    console.log("Verifying");
    toast.success("User Account Verification Complete");
    
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
          setMode={setMode}
        />
      }
      wrapper={<Wrapper />}
    >
      {Steps.map((_, index) => {
        return (
          <AnimatedStep key={index} previousStepIndex={previousStep}>
            <Step
              number={index + 1}
              withCallback={false}
              submitRef={hndlSbmtRef.current}
              inputBody={_}
              user={user}
              setUser={setUser}
              cred={cred}
              setCred={setCred}
            ></Step>
          </AnimatedStep>
        );
      })}
    </Wizard>
  );
};
const FormWrapper = ({ mode, setMode, cred, setCred }) => {
  const hndlSbmtRef = useRef(null);
  return (
    <Form onSubmit={hndlSbmtRef.current} className="auth_form">
      <VerificationWizardForm
        hndlSbmtRef={hndlSbmtRef}
        mode={mode}
        setMode={setMode}
        cred={cred}
        setCred={setCred}
      />
    </Form>
  );
};

export default FormWrapper;
