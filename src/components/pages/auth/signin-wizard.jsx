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

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Stack,
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
  useLogout,
} from "react-admin";
// import { client } from '../../App';
import Box from "@mui/material/Box";
import { useMediaQuery, Fab } from "@mui/material";
import Medusa from "@medusajs/medusa-js";
import CenteredTab from "../../tabs/centeredTab";
import { useWatch } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import AnimatedStep from "../../containers/animatedStep";
import SigninStep from "../../containers/signin/signinStep";
import SignInStepper from "../../containers/signin/signinStepperForm";
import CountryCurrencies from "../../constants/country_currencies";
const Logo = "/assets/img/rayvvin_pngs/Logo.png?url";

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
        whiteSpace: "nowrap",
      }}
    >
      Vendor Login
    </Box>
  </>
);

// Example: show the "previous" and "next" buttons in the footer
const Footer = ({
  loading,
  translate,
  redirect,
  formComplete,
  hndlSbmtRef,
  mode,
  setMode,
  cred,
  setCred,
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
            onClick={() => {
              hndlSbmtRef.current({ auth, mode, setMode, cred, setCred });
            }}
          >
            {loading && <CircularProgress size={25} thickness={2} />}
            {translate("Login")}
          </Button>
        ) : null}
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
        <span>Don&apos;t have an Account?</span>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Button
            onClick={() => {
              setMode("signup");
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
            Register
          </Button>
          <span>instead.</span>
        </Stack>
      </Stack>
    </Stack>
  );
};

// Example: Wrap steps in an `<AnimatePresence` from framer-motion
const Wrapper = ({ children, formComplete, setFormComplete }) => {
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
        defaultCountry={"NG"}
        className="MuiOutlinedInput-root MuiInputBase-colorPrimary"
      />
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </label>
  );
};

const SignInWizardForm = ({ hndlSbmtRef, mode, setMode, cred, setCred }) => {
  const [loading, setLoading] = useState(false);
  const [showVendor, setShowVendor] = useState(false);
  const translate = useTranslate();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
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
  const logout = useLogout();
  const emaill = useWatch({ name: "email" });
  const type = useWatch({ name: "type" });
  const country = useWatch({ name: "country" });
  const province = useWatch({ name: "province" });
  const market = useWatch({ name: "market" });
  const nw_market_name = useWatch({ name: "new_market_name" });
  const nearby_market = useWatch({ name: "nearby_market" });

  React.useEffect(() => {
    hndlSbmtRef.current = handleSubmit;
    async function RefreshUser() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // toast.error(
        //   `Couldn't fetch user data, Please Reload to restart the process`
        // );
        console.log(error);
      }
      logout();
    }
    RefreshUser();
  }, []);

  const Steps = [
    <>
      <p>Enter Your Email</p>
      <Stack spacing={0} sx={{ padding: "10px" }}>
        <Box sx={{ marginTop: "1em" }}>
          <TextInput
            // autoFocus
            source="email"
            label={translate("Your Email")}
            disabled={loading}
            validate={[required(), email()]}
            fullWidth
            variant="outlined"
          />
        </Box>
      </Stack>
    </>,

    <>
      <p>Enter Your Password</p>
      <Stack spacing={0} sx={{ padding: "10px 15px" }}>
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
          {/* <PasswordInput
            source="confirm_password"
            label={translate("Confirm Password")}
            // type="password"
            disabled={loading}
            validate={[required(), minLength(6)]}
            fullWidth
            variant="outlined"
          /> */}
        </Box>
      </Stack>
    </>,
  ];

  // const DetailedFormData = [
  //   {
  //     title: "Personal Info",
  //     body: (
  //       <Stack spacing={0} sx={{ padding: "10px 15px" }}>
  //         <Box
  //           sx={{ marginTop: "1em" }}
  //           gap={2}
  //           display="flex"
  //           flexWrap={"wrap"}
  //         >
  //           <TextInput
  //             // autoFocus
  //             source="firstname"
  //             type="text"
  //             label={translate("FirstName")}
  //             disabled={loading}
  //             validate={required()}
  //             fullWidth={isSmall ? true : false}
  //             variant="outlined"
  //           />
  //           <TextInput
  //             // autoFocus
  //             source="lastname"
  //             type="text"
  //             label={translate("LastName")}
  //             disabled={loading}
  //             validate={required()}
  //             fullWidth={isSmall ? true : false}
  //             variant="outlined"
  //           />
  //         </Box>
  //         <Box
  //           sx={{ marginTop: "1em" }}
  //           gap={2}
  //           display="flex"
  //           flexWrap={"wrap"}
  //         >
  //           <TextInput
  //             // autoFocus
  //             source="username"
  //             type="text"
  //             label={translate("Username")}
  //             disabled={loading}
  //             validate={required()}
  //             fullWidth={isSmall ? true : false}
  //             variant="outlined"
  //           />
  //           <AutocompleteInput
  //             // autoFocus
  //             source="country"
  //             type="text"
  //             label={translate("Your Country/Region")}
  //             disabled={loading}
  //             validate={required()}
  //             fullWidth={isSmall ? true : false}
  //             variant="outlined"
  //             choices={countries.map((cntry) => {
  //               return { id: cntry.country_iso, name: cntry.country };
  //             })}
  //             sx={{ minWidth: "197px" }}
  //             onChange={(e) => {
  //               setCountry_Obj(
  //                 countries.find((cntry) => {
  //                   return cntry.country_iso === e;
  //                 })
  //               );
  //             }}
  //           />
  //         </Box>
  //         {/* <TextInput
  //           source="phone"
  //           label={translate("Your Phone")}
  //           type="text"
  //           disabled={loading}
  //           validate={[required(), maxLength(11)]}
  //           fullWidth={isSmall ? true : false}
  //           variant="outlined"
  //         /> */}
  //         <PhoneNumberInput source="phone" label={translate("Your Phone")} />
  //       </Stack>
  //     ),
  //   },
  //   {
  //     title: "Business and Location Info",
  //     body: (
  //       <Stack spacing={0} sx={{ padding: "10px 15px" }}>
  //         <Box sx={{ marginTop: "1em" }}>
  //           <TextInput
  //             // autoFocus
  //             source="business_name"
  //             label={translate("Your Business Name")}
  //             disabled={loading}
  //             validate={[required()]}
  //             fullWidth
  //             variant="outlined"
  //           />
  //         </Box>
  //         <Box
  //           sx={{ marginTop: "1em" }}
  //           gap={2}
  //           display="flex"
  //           flexWrap={"wrap"}
  //         >
  //           <SelectInput
  //             // autoFocus
  //             source="province"
  //             // type="text"
  //             label={translate("Your State/Province")}
  //             disabled={loading}
  //             validate={required()}
  //             fullWidth={isSmall ? true : false}
  //             variant="outlined"
  //             choices={states && country && country === "NG" ? states : []}
  //             onChange={(e) => {
  //               setState_Obj(
  //                 states.find((st) => {
  //                   return st.id === e.target.value;
  //                 })
  //               );
  //             }}
  //             sx={{ minWidth: "197px" }}
  //           />
  //           <TextInput
  //             source="city"
  //             label={translate("Your City")}
  //             type="text"
  //             disabled={loading}
  //             validate={[required()]}
  //             fullWidth={isSmall ? true : false}
  //             variant="outlined"
  //           />
  //         </Box>
  //         <Box
  //           sx={{ marginTop: "1em" }}
  //           gap={2}
  //           display="flex"
  //           flexWrap={"wrap"}
  //         >
  //           <TextInput
  //             // autoFocus
  //             source="address"
  //             type="text"
  //             label={translate("Your Address")}
  //             disabled={loading}
  //             validate={required()}
  //             fullWidth
  //             variant="outlined"
  //           />
  //         </Box>
  //       </Stack>
  //     ),
  //   },
  //   {
  //     title: "Market Info",
  //     body: (
  //       <Stack spacing={0} sx={{ padding: "10px 15px" }}>
  //         <Box sx={{ marginTop: "1em" }}>
  //           <SelectInput
  //             // autoFocus
  //             source="market"
  //             // type="text"
  //             label={translate("Market")}
  //             disabled={loading}
  //             validate={required()}
  //             fullWidth
  //             variant="outlined"
  //             choices={
  //               province && markets
  //                 ? markets
  //                     .filter((mrkt) => {
  //                       return mrkt.state_id === province;
  //                     })
  //                     .map((st) => {
  //                       return { id: st.id, name: st.market_name };
  //                     })
  //                     .concat([{ id: "others", name: "Others" }])
  //                 : []
  //             }
  //             onChange={(e) => {
  //               setMarket_Obj(
  //                 markets.find((mrkt) => {
  //                   return mrkt.id === e.target.value;
  //                 })
  //               );
  //             }}
  //           />
  //           {market && market === "others" && (
  //             <Box sx={{ marginTop: "1em" }}>
  //               <SelectInput
  //                 // autoFocus
  //                 source="nearby_market"
  //                 // type="text"
  //                 label={translate("Nearby Market")}
  //                 disabled={loading}
  //                 validate={market && market === "others" ? [required()] : null}
  //                 fullWidth
  //                 variant="outlined"
  //                 choices={
  //                   province && markets
  //                     ? markets
  //                         .filter((mrkt) => {
  //                           return mrkt.state_id === province;
  //                         })
  //                         .map((st) => {
  //                           return { id: st.id, name: st.market_name };
  //                         })
  //                     : []
  //                 }
  //                 onChange={(e) => {
  //                   setNearbyMarket_Obj(
  //                     markets.find((mrkt) => {
  //                       return mrkt.id === e.target.value;
  //                     })
  //                   );
  //                 }}
  //               />

  //               <AutocompleteInput
  //                 autoFocus
  //                 source="new_market_name"
  //                 label={translate("New Market Name")}
  //                 type="text"
  //                 disabled={loading}
  //                 validate={market && market === "others" ? [required()] : null}
  //                 fullWidth
  //                 variant="outlined"
  //                 onCreate={async (new_markt) => {
  //                   const { data: new_mrkt_data, error } =
  //                     await createUnregisteredMarket(
  //                       null,
  //                       "Nigeria",
  //                       state_obj?.id,
  //                       state_obj?.name,
  //                       new_markt,
  //                       nearby_market_obj
  //                     );
  //                   console.log(new_mrkt_data);
  //                   setMiniMarkets(miniMarkets.concat(new_mrkt_data));
  //                   return {
  //                     id: new_mrkt_data[0].id,
  //                     name: new_mrkt_data[0].un_reg_market,
  //                   };
  //                 }}
  //                 createItemLabel="Add a new Market: %{item}"
  //                 choices={
  //                   province && markets && nearby_market
  //                     ? miniMarkets
  //                         .filter((mrkt) => {
  //                           return mrkt.state_id === province;
  //                         })
  //                         .map((st) => {
  //                           return { id: st.id, name: st.un_reg_market };
  //                         })
  //                     : []
  //                 }
  //                 onChange={(e) => {
  //                   // console.log(
  //                   //   miniMarkets.find((mrkt) => {
  //                   //     return mrkt.id === e;
  //                   //   })
  //                   // );
  //                   setNewMarket_Obj(
  //                     miniMarkets.find((mrkt) => {
  //                       return mrkt.id === e;
  //                     })
  //                   );
  //                 }}
  //               />
  //             </Box>
  //           )}
  //         </Box>
  //       </Stack>
  //     ),
  //   },
  // ];

  const handleSubmit = async ({ auth, mode, setMode, cred, setCred }) => {
    console.log("Logging In", auth);
    if (auth) {
      setLoading(true);
      let email = auth.email;
      let password = auth.password;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.log(error.name, error.status, error.message);
        toast.error(error.message);
        setLoading(false);
        if (error.message === "Email not confirmed") {
          setCred({ email, password });
          setMode("verify");
        }
      } else {
        medusa.admin.auth
          .createSession({
            email: auth.email,
            password: auth.password,
          })
          .then(({ user }) => {
            login({ email, password })
              .then((user) => {
                setCred({ email, password });
                setLoading(false);
                // toast.success("Login Successful");
                redirect("/");
                // setMode("verify");
              })
              .catch((e) => {
                console.log(e);
                toast.error(e.message);
                setLoading(false);
              });
          })
          .catch((e) => {
            console.log(e);
            // toast.error("Invalid email or password");
            setLoading(false);
          });
      }

      // if (auth.market === "others") {
      //   medusa.admin.users
      //     .create({
      //       email: auth.email,
      //       password: auth.password,
      //       first_name: auth.firstname,
      //       last_name: auth.lastname,
      //     })
      //     .then(({ user }) => {
      //       medusa.admin.users
      //         .update(user.id, {
      //           api_token: user.id,
      //           metadata: {
      //             phone: auth.phone,
      //             username: auth.username,
      //             address: auth.address,
      //             businessName: auth.business_name,
      //             city: auth.city,
      //             province: state_obj.name,
      //             country: auth.country,
      //             country_obj,
      //           },
      //         })
      //         .then(({ user }) => {
      //           medusa.admin.auth.deleteSession().then(() => {
      //             medusa.admin.auth
      //               .createSession({
      //                 email: auth.email,
      //                 password: auth.password,
      //               })
      //               .then(({ user }) => {
      //                 setUser(user);
      //                 medusa.admin.store
      //                   .update({
      //                     name: auth.business_name,
      //                     default_currency_code:
      //                       country_obj.currency_iso.toLowerCase(),
      //                     metadata: {
      //                       market: { ...market_obj },
      //                       un_reg_market: {
      //                         ...new_market_obj,
      //                       },
      //                       state: {
      //                         ...state_obj,
      //                       },
      //                       country: {
      //                         ...country_obj,
      //                       },
      //                     },
      //                   })
      //                   .then(({ store }) => {
      //                     toast.success("New Market and User Account Created");
      //                     redirect("https://eke.afriomarkets.com/app");
      //                   });
      //               });
      //           });
      //         });
      //     })
      //     .catch((error) => {
      //       setLoading(false);
      //       notify(
      //         typeof error === "string"
      //           ? error
      //           : typeof error === "undefined" || !error.message
      //           ? "Sign Up Error"
      //           : error.message,
      //         {
      //           type: "warning",
      //           messageArgs: {
      //             _:
      //               typeof error === "string"
      //                 ? error
      //                 : error && error.message
      //                 ? error.message
      //                 : undefined,
      //           },
      //         }
      //       );
      //     });
      // } else {
      //   medusa.admin.users
      //     .create({
      //       email: auth.email,
      //       password: auth.password,
      //       first_name: auth.firstname,
      //       last_name: auth.lastname,
      //     })
      //     .then(({ user }) => {
      //       medusa.admin.users
      //         .update(user.id, {
      //           api_token: user.id,
      //           metadata: {
      //             phone: auth.phone,
      //             username: auth.username,
      //             address: auth.address,
      //             businessName: auth.business_name,
      //             city: auth.city,
      //             province: state_obj.name,
      //             country: auth.country,
      //             country_obj,
      //           },
      //         })
      //         .then(({ user }) => {
      //           medusa.admin.auth.deleteSession().then(() => {
      //             medusa.admin.auth
      //               .createSession({
      //                 email: auth.email,
      //                 password: auth.password,
      //               })
      //               .then(({ user }) => {
      //                 setUser(user);
      //                 medusa.admin.store
      //                   .update({
      //                     name: auth.business_name,
      //                     default_currency_code:
      //                       country_obj.currency_iso.toLowerCase(),
      //                     metadata: {
      //                       market: { ...market_obj },
      //                       un_reg_market: {
      //                         ...new_market_obj,
      //                       },
      //                       state: {
      //                         ...state_obj,
      //                       },
      //                       country: {
      //                         ...country_obj,
      //                       },
      //                     },
      //                   })
      //                   .then(({ store }) => {
      //                     toast.success("User Account Created");
      //                     redirect("https://eke.afriomarkets.com/app");
      //                   });
      //               });
      //           });
      //         });
      //     })
      //     .catch((error) => {
      //       setLoading(false);
      //       notify(
      //         typeof error === "string"
      //           ? error
      //           : typeof error === "undefined" || !error.message
      //           ? "Sign Up Error"
      //           : error.message,
      //         {
      //           type: "warning",
      //           messageArgs: {
      //             _:
      //               typeof error === "string"
      //                 ? error
      //                 : error && error.message
      //                 ? error.message
      //                 : undefined,
      //           },
      //         }
      //       );
      //     });
      // }
    } else {
      return false;
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
          mode={mode}
          setMode={setMode}
          cred={cred}
          setCred={setCred}
        />
      }
      wrapper={
        <Wrapper
          formComplete={formComplete}
          setFormComplete={setFormComplete}
        />
      }
    >
      {Steps.map((_, index) => {
        return (
          <AnimatedStep key={index} previousStepIndex={previousStep}>
            <SigninStep
              number={index + 1}
              withCallback={false}
              submitRef={hndlSbmtRef.current}
              inputBody={_}
              formComplete={formComplete}
              setFormComplete={setFormComplete}
            ></SigninStep>
          </AnimatedStep>
        );
      })}
      {/* <SignInStepper
        regNewMarket={createUnregisteredMarket}
        state_obj={state_obj}
        nearby_market_obj={nearby_market_obj}
        new_market_obj={new_market_obj}
        formComplete={formComplete}
        setFormComplete={setFormComplete}
      >
        {DetailedFormData}
      </SignInStepper> */}
    </Wizard>
  );
};
const FormWrapper = ({ mode, setMode, cred, setCred }) => {
  const hndlSbmtRef = useRef(null);
  return (
    <Form onSubmit={hndlSbmtRef.current} className="auth_form">
      <SignInWizardForm
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
